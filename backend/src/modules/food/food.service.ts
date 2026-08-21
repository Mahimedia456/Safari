import { supabaseAdmin } from "../../lib/supabase.js";

export async function listRestaurants(input: {
  cityId?: string;
  search?: string;
  featured?: boolean;
}) {
  let builder = supabaseAdmin
    .from("food_restaurants")
    .select(`
      *,
      service_cities (
        id,
        name,
        city_code,
        currency_code
      )
    `)
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

  return data.filter((restaurant) =>
    [restaurant.name, restaurant.cuisine, restaurant.description]
      .filter(Boolean)
      .some((value) =>
        String(value).toLowerCase().includes(search),
      ),
  );
}

export async function getRestaurant(restaurantId: string) {
  const [restaurantResult, sectionsResult, itemsResult] = await Promise.all([
    supabaseAdmin
      .from("food_restaurants")
      .select(`
        *,
        service_cities (
          id,
          name,
          city_code,
          currency_code
        )
      `)
      .eq("id", restaurantId)
      .eq("is_active", true)
      .single(),

    supabaseAdmin
      .from("food_menu_sections")
      .select("*")
      .eq("restaurant_id", restaurantId)
      .eq("is_active", true)
      .order("sort_order"),

    supabaseAdmin
      .from("food_menu_items")
      .select("*")
      .eq("restaurant_id", restaurantId)
      .eq("is_available", true)
      .order("is_popular", { ascending: false })
      .order("name"),
  ]);

  if (restaurantResult.error)
    throw new Error(restaurantResult.error.message);
  if (sectionsResult.error)
    throw new Error(sectionsResult.error.message);
  if (itemsResult.error)
    throw new Error(itemsResult.error.message);

  return {
    restaurant: restaurantResult.data,
    sections: sectionsResult.data,
    items: itemsResult.data,
  };
}

export async function createFoodOrder(
  passengerId: string,
  input: {
    restaurantId: string;
    deliveryAddressId?: string | null;
    deliveryAddress: string;
    deliveryLatitude?: number | null;
    deliveryLongitude?: number | null;
    paymentMethod: "cash" | "wallet" | "card";
    customerNote?: string | null;
    items: Array<{
      menuItemId: string;
      quantity: number;
      note?: string | null;
    }>;
  },
) {
  const { data: restaurant, error: restaurantError } = await supabaseAdmin
    .from("food_restaurants")
    .select("*")
    .eq("id", input.restaurantId)
    .eq("is_active", true)
    .single();

  if (restaurantError || !restaurant)
    throw new Error("Safari Food restaurant is unavailable.");

  if (!restaurant.is_open)
    throw new Error("This restaurant is currently closed.");

  const itemIds = input.items.map((item) => item.menuItemId);

  const { data: menuItems, error: menuError } = await supabaseAdmin
    .from("food_menu_items")
    .select("*")
    .in("id", itemIds)
    .eq("restaurant_id", input.restaurantId)
    .eq("is_available", true);

  if (menuError) throw new Error(menuError.message);

  const menuMap = new Map(menuItems.map((item) => [item.id, item]));

  const orderItems = input.items.map((requested) => {
    const menuItem = menuMap.get(requested.menuItemId);

    if (!menuItem) {
      throw new Error("One or more Safari Food items are no longer available.");
    }

    const unitPrice = Number(menuItem.price);
    const lineTotal = unitPrice * requested.quantity;

    return {
      menu_item_id: menuItem.id,
      item_name: menuItem.name,
      unit_price: unitPrice,
      quantity: requested.quantity,
      line_total: lineTotal,
      note: requested.note ?? null,
    };
  });

  const itemsSubtotal = orderItems.reduce(
    (total, item) => total + item.line_total,
    0,
  );

  if (itemsSubtotal < Number(restaurant.minimum_order)) {
    throw new Error(
      `Minimum order is PKR ${Number(restaurant.minimum_order).toFixed(0)}.`,
    );
  }

  const deliveryFee = Number(restaurant.delivery_fee);
  const serviceFee = Math.round(itemsSubtotal * 0.03 * 100) / 100;
  const total = itemsSubtotal + deliveryFee + serviceFee;

  const { data: orderNumber, error: numberError } =
    await supabaseAdmin.rpc("generate_safari_food_order_number");

  if (numberError) throw new Error(numberError.message);

  const { data: order, error: orderError } = await supabaseAdmin
    .from("food_orders")
    .insert({
      order_number: orderNumber,
      passenger_id: passengerId,
      restaurant_id: input.restaurantId,
      delivery_address_id: input.deliveryAddressId ?? null,
      delivery_address: input.deliveryAddress,
      delivery_latitude: input.deliveryLatitude ?? null,
      delivery_longitude: input.deliveryLongitude ?? null,
      status: "placed",
      currency_code: "PKR",
      items_subtotal: itemsSubtotal,
      delivery_fee: deliveryFee,
      service_fee: serviceFee,
      discount_amount: 0,
      total,
      payment_method: input.paymentMethod,
      payment_status:
        input.paymentMethod === "cash" ? "cash_due" : "pending",
      customer_note: input.customerNote ?? null,
    })
    .select("*")
    .single();

  if (orderError) throw new Error(orderError.message);

  const { error: itemInsertError } = await supabaseAdmin
    .from("food_order_items")
    .insert(
      orderItems.map((item) => ({
        order_id: order.id,
        ...item,
      })),
    );

  if (itemInsertError) throw new Error(itemInsertError.message);

  await supabaseAdmin.from("food_order_status_events").insert({
    order_id: order.id,
    from_status: null,
    to_status: "placed",
    actor_type: "customer",
    actor_user_id: passengerId,
    note: "Safari Food order placed.",
  });

  return getFoodOrder(passengerId, order.id);
}

export async function listFoodOrders(passengerId: string) {
  const { data, error } = await supabaseAdmin
    .from("food_orders")
    .select(`
      *,
      food_restaurants (
        id,
        name,
        cuisine,
        logo_url
      )
    `)
    .eq("passenger_id", passengerId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

export async function getFoodOrder(
  passengerId: string,
  orderId: string,
) {
  const [orderResult, itemResult, eventResult] = await Promise.all([
    supabaseAdmin
      .from("food_orders")
      .select(`
        *,
        food_restaurants (
          id,
          name,
          cuisine,
          logo_url,
          address,
          phone
        )
      `)
      .eq("id", orderId)
      .eq("passenger_id", passengerId)
      .single(),

    supabaseAdmin
      .from("food_order_items")
      .select("*")
      .eq("order_id", orderId)
      .order("created_at"),

    supabaseAdmin
      .from("food_order_status_events")
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

export async function cancelFoodOrder(
  passengerId: string,
  orderId: string,
  reason: string,
) {
  const { data: current, error: currentError } = await supabaseAdmin
    .from("food_orders")
    .select("*")
    .eq("id", orderId)
    .eq("passenger_id", passengerId)
    .single();

  if (currentError || !current)
    throw new Error("Safari Food order not found.");

  if (!["placed", "confirmed"].includes(current.status)) {
    throw new Error("This Safari Food order can no longer be cancelled.");
  }

  const now = new Date().toISOString();

  const { data, error } = await supabaseAdmin
    .from("food_orders")
    .update({
      status: "cancelled_by_customer",
      cancelled_at: now,
      customer_note:
        current.customer_note
          ? `${current.customer_note}\nCancellation: ${reason}`
          : `Cancellation: ${reason}`,
      updated_at: now,
    })
    .eq("id", orderId)
    .eq("passenger_id", passengerId)
    .select("*")
    .single();

  if (error) throw new Error(error.message);

  await supabaseAdmin.from("food_order_status_events").insert({
    order_id: orderId,
    from_status: current.status,
    to_status: "cancelled_by_customer",
    actor_type: "customer",
    actor_user_id: passengerId,
    note: reason,
  });

  return data;
}
