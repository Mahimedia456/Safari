import { supabaseAdmin } from "../../lib/supabase.js";

export async function listStores(input: {
  storeType: "grocery" | "pharmacy";
  cityId?: string;
  search?: string;
  featured?: boolean;
}) {
  let builder = supabaseAdmin
    .from("commerce_stores")
    .select(`
      *,
      service_cities (
        id,
        name,
        city_code,
        currency_code
      )
    `)
    .eq("store_type", input.storeType)
    .eq("is_active", true)
    .order("is_featured", { ascending: false })
    .order("rating", { ascending: false });

  if (input.cityId) builder = builder.eq("city_id", input.cityId);
  if (input.featured !== undefined)
    builder = builder.eq("is_featured", input.featured);

  const { data, error } = await builder;
  if (error) throw new Error(error.message);

  if (!input.search) return data;

  const search = input.search.toLowerCase();

  return data.filter((store) =>
    [store.name, store.description, store.address]
      .filter(Boolean)
      .some((value) =>
        String(value).toLowerCase().includes(search),
      ),
  );
}

export async function getStore(
  storeType: "grocery" | "pharmacy",
  storeId: string,
) {
  const [storeResult, categoryResult, productResult] = await Promise.all([
    supabaseAdmin
      .from("commerce_stores")
      .select("*")
      .eq("id", storeId)
      .eq("store_type", storeType)
      .eq("is_active", true)
      .single(),

    supabaseAdmin
      .from("commerce_categories")
      .select("*")
      .eq("store_type", storeType)
      .eq("is_active", true)
      .order("sort_order"),

    supabaseAdmin
      .from("commerce_products")
      .select("*")
      .eq("store_id", storeId)
      .eq("is_available", true)
      .order("is_featured", { ascending: false })
      .order("name"),
  ]);

  if (storeResult.error) throw new Error(storeResult.error.message);
  if (categoryResult.error) throw new Error(categoryResult.error.message);
  if (productResult.error) throw new Error(productResult.error.message);

  return {
    store: storeResult.data,
    categories: categoryResult.data,
    products: productResult.data,
  };
}

export async function createCommerceOrder(
  passengerId: string,
  orderType: "grocery" | "pharmacy",
  input: {
    storeId: string;
    deliveryAddressId?: string | null;
    deliveryAddress: string;
    deliveryLatitude?: number | null;
    deliveryLongitude?: number | null;
    paymentMethod: "cash" | "wallet" | "card";
    customerNote?: string | null;
    prescriptionStoragePath?: string | null;
    items: Array<{
      productId: string;
      quantity: number;
      note?: string | null;
    }>;
  },
) {
  const { data: store, error: storeError } = await supabaseAdmin
    .from("commerce_stores")
    .select("*")
    .eq("id", input.storeId)
    .eq("store_type", orderType)
    .eq("is_active", true)
    .single();

  if (storeError || !store)
    throw new Error("Safari store is unavailable.");

  if (!store.is_open)
    throw new Error("This Safari store is currently closed.");

  const productIds = input.items.map((item) => item.productId);

  const { data: products, error: productError } = await supabaseAdmin
    .from("commerce_products")
    .select("*")
    .in("id", productIds)
    .eq("store_id", input.storeId)
    .eq("is_available", true);

  if (productError) throw new Error(productError.message);

  const productMap = new Map(products.map((item) => [item.id, item]));

  let requiresPrescription = false;

  const orderItems = input.items.map((requested) => {
    const product = productMap.get(requested.productId);

    if (!product)
      throw new Error("One or more Safari products are unavailable.");

    if (requested.quantity > Number(product.stock_quantity)) {
      throw new Error(`${product.name} does not have enough stock.`);
    }

    if (product.requires_prescription)
      requiresPrescription = true;

    const unitPrice = Number(product.price);
    const lineTotal = unitPrice * requested.quantity;

    return {
      product_id: product.id,
      product_name: product.name,
      unit_label: product.unit_label,
      unit_price: unitPrice,
      quantity: requested.quantity,
      line_total: lineTotal,
      note: requested.note ?? null,
    };
  });

  if (
    orderType === "pharmacy" &&
    requiresPrescription &&
    !input.prescriptionStoragePath
  ) {
    throw new Error(
      "A prescription is required for one or more selected pharmacy products.",
    );
  }

  const itemsSubtotal = orderItems.reduce(
    (sum, item) => sum + item.line_total,
    0,
  );

  if (itemsSubtotal < Number(store.minimum_order)) {
    throw new Error(
      `Minimum order is PKR ${Number(store.minimum_order).toFixed(0)}.`,
    );
  }

  const deliveryFee = Number(store.delivery_fee);
  const serviceFee = Math.round(itemsSubtotal * 0.02 * 100) / 100;
  const total = itemsSubtotal + deliveryFee + serviceFee;

  const prefix = orderType === "grocery" ? "SGR" : "SPH";

  const { data: orderNumber, error: numberError } =
    await supabaseAdmin.rpc(
      "generate_safari_commerce_order_number",
      { prefix },
    );

  if (numberError) throw new Error(numberError.message);

  const { data: order, error: orderError } = await supabaseAdmin
    .from("commerce_orders")
    .insert({
      order_number: orderNumber,
      passenger_id: passengerId,
      store_id: input.storeId,
      order_type: orderType,

      delivery_address_id: input.deliveryAddressId ?? null,
      delivery_address: input.deliveryAddress,
      delivery_latitude: input.deliveryLatitude ?? null,
      delivery_longitude: input.deliveryLongitude ?? null,

      prescription_status:
        orderType === "pharmacy" && requiresPrescription
          ? "uploaded"
          : "not_required",

      prescription_storage_path:
        input.prescriptionStoragePath ?? null,

      currency_code: "PKR",
      items_subtotal: itemsSubtotal,
      delivery_fee: deliveryFee,
      service_fee: serviceFee,
      discount_amount: 0,
      total,

      payment_method: input.paymentMethod,
      payment_status:
        input.paymentMethod === "cash"
          ? "cash_due"
          : "pending",

      customer_note: input.customerNote ?? null,
    })
    .select("*")
    .single();

  if (orderError) throw new Error(orderError.message);

  const { error: itemInsertError } = await supabaseAdmin
    .from("commerce_order_items")
    .insert(
      orderItems.map((item) => ({
        order_id: order.id,
        ...item,
      })),
    );

  if (itemInsertError) throw new Error(itemInsertError.message);

  for (const item of orderItems) {
    const product = productMap.get(item.product_id)!;

    await supabaseAdmin
      .from("commerce_products")
      .update({
        stock_quantity:
          Number(product.stock_quantity) - item.quantity,
        updated_at: new Date().toISOString(),
      })
      .eq("id", item.product_id);
  }

  await supabaseAdmin
    .from("commerce_order_status_events")
    .insert({
      order_id: order.id,
      from_status: null,
      to_status: "placed",
      actor_type: "customer",
      actor_user_id: passengerId,
      note: `Safari ${orderType} order placed.`,
    });

  return getCommerceOrder(passengerId, order.id);
}

export async function listCommerceOrders(
  passengerId: string,
  orderType: "grocery" | "pharmacy",
) {
  const { data, error } = await supabaseAdmin
    .from("commerce_orders")
    .select(`
      *,
      commerce_stores (
        id,
        name,
        store_type,
        logo_url
      )
    `)
    .eq("passenger_id", passengerId)
    .eq("order_type", orderType)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

export async function getCommerceOrder(
  passengerId: string,
  orderId: string,
) {
  const [orderResult, itemResult, eventResult] = await Promise.all([
    supabaseAdmin
      .from("commerce_orders")
      .select(`
        *,
        commerce_stores (
          id,
          name,
          store_type,
          logo_url,
          address,
          phone
        )
      `)
      .eq("id", orderId)
      .eq("passenger_id", passengerId)
      .single(),

    supabaseAdmin
      .from("commerce_order_items")
      .select("*")
      .eq("order_id", orderId)
      .order("created_at"),

    supabaseAdmin
      .from("commerce_order_status_events")
      .select("*")
      .eq("order_id", orderId)
      .order("created_at"),
  ]);

  if (orderResult.error) throw new Error(orderResult.error.message);
  if (itemResult.error) throw new Error(itemResult.error.message);
  if (eventResult.error) throw new Error(eventResult.error.message);

  return {
    order: orderResult.data,
    items: itemResult.data,
    events: eventResult.data,
  };
}
