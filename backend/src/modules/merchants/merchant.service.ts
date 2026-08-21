import { supabaseAdmin } from "../../lib/supabase.js";

export async function syncUnifiedOrderIndex() {
  const [
    foodResult,
    commerceResult,
    servicesResult,
  ] = await Promise.all([
    supabaseAdmin
      .from("food_orders")
      .select(`
        id,
        order_number,
        passenger_id,
        restaurant_id,
        status,
        currency_code,
        total,
        payment_method,
        payment_status,
        placed_at,
        delivered_at,
        cancelled_at,
        created_at,
        updated_at,
        food_restaurants (
          merchant_user_id
        )
      `),

    supabaseAdmin
      .from("commerce_orders")
      .select(`
        id,
        order_number,
        passenger_id,
        store_id,
        order_type,
        status,
        currency_code,
        total,
        payment_method,
        payment_status,
        placed_at,
        delivered_at,
        cancelled_at,
        created_at,
        updated_at,
        commerce_stores (
          merchant_user_id
        )
      `),

    supabaseAdmin
      .from("service_bookings")
      .select(`
        id,
        booking_number,
        customer_id,
        provider_id,
        booking_status,
        currency_code,
        estimated_total,
        final_total,
        payment_method,
        payment_status,
        requested_at,
        completed_at,
        cancelled_at,
        created_at,
        updated_at,
        service_providers (
          merchant_user_id
        )
      `),
  ]);

  if (foodResult.error) throw new Error(foodResult.error.message);
  if (commerceResult.error) throw new Error(commerceResult.error.message);
  if (servicesResult.error) throw new Error(servicesResult.error.message);

  const rows: Record<string, unknown>[] = [];

  for (const order of foodResult.data) {
    rows.push({
      source_type: "food",
      source_id: order.id,
      order_number: order.order_number,
      customer_id: order.passenger_id,
      merchant_user_id:
        order.food_restaurants?.merchant_user_id ?? null,
      status: order.status,
      currency_code: order.currency_code,
      total: order.total,
      payment_method: order.payment_method,
      payment_status: order.payment_status,
      placed_at: order.placed_at,
      completed_at: order.delivered_at,
      cancelled_at: order.cancelled_at,
      created_at: order.created_at,
      updated_at: order.updated_at,
    });
  }

  for (const order of commerceResult.data) {
    rows.push({
      source_type: order.order_type,
      source_id: order.id,
      order_number: order.order_number,
      customer_id: order.passenger_id,
      merchant_user_id:
        order.commerce_stores?.merchant_user_id ?? null,
      status: order.status,
      currency_code: order.currency_code,
      total: order.total,
      payment_method: order.payment_method,
      payment_status: order.payment_status,
      placed_at: order.placed_at,
      completed_at: order.delivered_at,
      cancelled_at: order.cancelled_at,
      created_at: order.created_at,
      updated_at: order.updated_at,
    });
  }

  for (const booking of servicesResult.data) {
    rows.push({
      source_type: "services",
      source_id: booking.id,
      order_number: booking.booking_number,
      customer_id: booking.customer_id,
      merchant_user_id:
        booking.service_providers?.merchant_user_id ?? null,
      status: booking.booking_status,
      currency_code: booking.currency_code,
      total:
        booking.final_total ??
        booking.estimated_total ??
        null,
      payment_method: booking.payment_method,
      payment_status: booking.payment_status,
      placed_at: booking.requested_at,
      completed_at: booking.completed_at,
      cancelled_at: booking.cancelled_at,
      created_at: booking.created_at,
      updated_at: booking.updated_at,
    });
  }

  if (rows.length > 0) {
    const { error } = await supabaseAdmin
      .from("order_index")
      .upsert(rows, {
        onConflict: "source_type,source_id",
      });

    if (error) throw new Error(error.message);
  }

  return rows.length;
}

export async function getMerchantOverview(userId: string) {
  await syncUnifiedOrderIndex();

  const [merchantResult, ordersResult] = await Promise.all([
    supabaseAdmin
      .from("merchant_profiles")
      .select("*")
      .eq("user_id", userId)
      .single(),

    supabaseAdmin
      .from("order_index")
      .select("*")
      .eq("merchant_user_id", userId)
      .order("created_at", { ascending: false })
      .limit(100),
  ]);

  if (merchantResult.error)
    throw new Error(merchantResult.error.message);

  if (ordersResult.error)
    throw new Error(ordersResult.error.message);

  const totalOrders = ordersResult.data.length;

  const completedOrders = ordersResult.data.filter((item) =>
    ["delivered", "completed"].includes(item.status),
  );

  const grossSales = completedOrders.reduce(
    (sum, item) => sum + Number(item.total ?? 0),
    0,
  );

  return {
    merchant: merchantResult.data,
    orders: ordersResult.data,
    summary: {
      totalOrders,
      completedOrders: completedOrders.length,
      grossSales,
    },
  };
}
