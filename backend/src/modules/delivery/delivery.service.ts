import { supabaseAdmin } from "../../lib/supabase.js";
import { ensureDeliveryJob } from "./delivery-job.service.js";

export type DeliveryJobType =
  | "food"
  | "grocery"
  | "pharmacy";

export async function listAvailableDeliveryJobs(
  driverId: string,
  type?: DeliveryJobType,
) {
  let builder = supabaseAdmin
    .from("delivery_jobs")
    .select("*")
    .eq("status", "available")
    .is("driver_id", null)
    .order("created_at", { ascending: false })
    .limit(100);

  if (type) builder = builder.eq("job_type", type);

  const { data, error } = await builder;

  if (error) throw new Error(error.message);

  return data ?? [];
}

export async function listDriverDeliveryJobs(
  driverId: string,
) {
  const { data, error } = await supabaseAdmin
    .from("delivery_jobs")
    .select("*")
    .eq("driver_id", driverId)
    .in("status", [
      "accepted",
      "at_pickup",
      "picked_up",
      "on_the_way",
    ])
    .order("accepted_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data ?? [];
}

export async function acceptDeliveryJob(
  driverId: string,
  jobId: string,
) {
  const [activeRideResult, activeDeliveryResult] =
    await Promise.all([
      supabaseAdmin
        .from("rides")
        .select("id")
        .eq("driver_id", driverId)
        .in("ride_status", [
          "driver_assigned",
          "driver_arriving",
          "driver_arrived",
          "in_progress",
        ])
        .limit(1)
        .maybeSingle(),

      supabaseAdmin
        .from("delivery_jobs")
        .select("id")
        .eq("driver_id", driverId)
        .in("status", [
          "accepted",
          "at_pickup",
          "picked_up",
          "on_the_way",
        ])
        .limit(1)
        .maybeSingle(),
    ]);

  if (activeRideResult.error) {
    throw new Error(activeRideResult.error.message);
  }

  if (activeDeliveryResult.error) {
    throw new Error(activeDeliveryResult.error.message);
  }

  if (activeRideResult.data) {
    throw new Error(
      "Complete or cancel your active Safari ride before accepting a delivery.",
    );
  }

  if (activeDeliveryResult.data) {
    throw new Error(
      "Complete your active Safari delivery before accepting another one.",
    );
  }

  const now =
    new Date().toISOString();

  /*
   * Conditional UPDATE is atomic: only one driver can change an available,
   * unassigned job into an accepted job. This removes the runtime dependency
   * on an old database RPC while keeping first-driver-wins semantics.
   */
  const { data: job, error } =
    await supabaseAdmin
      .from("delivery_jobs")
      .update({
        driver_id: driverId,
        status: "accepted",
        accepted_at: now,
        updated_at: now,
      })
      .eq("id", jobId)
      .eq("status", "available")
      .is("driver_id", null)
      .select("*")
      .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!job) {
    throw new Error(
      "This Safari delivery was already accepted by another driver.",
    );
  }

  if (job.job_type === "food") {
    const source =
      await supabaseAdmin
        .from("food_orders")
        .select("id,status")
        .eq("id", job.source_id)
        .maybeSingle();

    if (
      !source.error &&
      source.data &&
      source.data.status === "placed"
    ) {
      await Promise.all([
        supabaseAdmin
          .from("food_orders")
          .update({
            status: "confirmed",
            confirmed_at: now,
            updated_at: now,
          })
          .eq("id", job.source_id),

        supabaseAdmin
          .from("food_order_status_events")
          .insert({
            order_id: job.source_id,
            from_status: "placed",
            to_status: "confirmed",
            actor_type: "driver",
            actor_user_id: driverId,
            note: "Safari delivery driver accepted the order.",
          }),
      ]);
    }
  } else {
    const source =
      await supabaseAdmin
        .from("commerce_orders")
        .select("id,status")
        .eq("id", job.source_id)
        .maybeSingle();

    if (
      !source.error &&
      source.data &&
      source.data.status === "placed"
    ) {
      await Promise.all([
        supabaseAdmin
          .from("commerce_orders")
          .update({
            status: "confirmed",
            confirmed_at: now,
            updated_at: now,
          })
          .eq("id", job.source_id),

        supabaseAdmin
          .from("commerce_order_status_events")
          .insert({
            order_id: job.source_id,
            from_status: "placed",
            to_status: "confirmed",
            actor_type: "driver",
            actor_user_id: driverId,
            note: "Safari delivery driver accepted the order.",
          }),
      ]);
    }
  }

  await Promise.all([
    supabaseAdmin
      .from("driver_profiles")
      .update({
        is_available: false,
        updated_at: now,
      })
      .eq("user_id", driverId),

    supabaseAdmin
      .from("notifications")
      .insert({
        user_id: job.customer_id,
        notification_type: `${job.job_type}_delivery_accepted`,
        title: "Safari driver assigned",
        body: "A Safari driver accepted your delivery and is heading to the pickup.",
        data: {
          deliveryJobId: job.id,
          sourceId: job.source_id,
          type: job.job_type,
          driverId,
        },
        is_read: false,
      }),
  ]);

  return job;
}

export async function getDriverDeliveryJob(
  driverId: string,
  jobId: string,
) {
  const { data, error } = await supabaseAdmin
    .from("delivery_jobs")
    .select("*")
    .eq("id", jobId)
    .eq("driver_id", driverId)
    .single();

  if (error || !data) throw new Error("Safari delivery job not found.");

  return data;
}

export async function updateDeliveryJobStatus(
  driverId: string,
  jobId: string,
  status:
    | "at_pickup"
    | "picked_up"
    | "on_the_way"
    | "delivered",
) {
  const current = await getDriverDeliveryJob(driverId, jobId);

  const allowed: Record<string, string[]> = {
    accepted: ["at_pickup"],
    at_pickup: ["picked_up"],
    picked_up: ["on_the_way"],
    on_the_way: ["delivered"],
  };

  if (!(allowed[current.status] ?? []).includes(status)) {
    throw new Error(
      `Safari delivery cannot move from ${current.status} to ${status}.`,
    );
  }

  const now = new Date().toISOString();
  const updates: Record<string, unknown> = {
    status,
    updated_at: now,
  };

  if (status === "picked_up") updates.picked_up_at = now;
  if (status === "delivered") updates.delivered_at = now;

  const { data: job, error } = await supabaseAdmin
    .from("delivery_jobs")
    .update(updates)
    .eq("id", jobId)
    .eq("driver_id", driverId)
    .select("*")
    .single();

  if (error) throw new Error(error.message);

  const orderStatus =
    status === "at_pickup"
      ? null
      : status === "picked_up"
        ? "picked_up"
        : status === "on_the_way"
          ? "on_the_way"
          : "delivered";

  if (
    orderStatus &&
    job.job_type === "food"
  ) {
    const source = await supabaseAdmin
      .from("food_orders")
      .select("id,status,payment_method,payment_status")
      .eq("id", job.source_id)
      .single();

    if (!source.error && source.data) {
      const orderUpdate: Record<string, unknown> = {
        status: orderStatus,
        updated_at: now,
      };

      if (status === "delivered") {
        orderUpdate.delivered_at = now;
        if (source.data.payment_method === "cash") {
          orderUpdate.payment_status = "paid";
        }
      }

      await supabaseAdmin
        .from("food_orders")
        .update(orderUpdate)
        .eq("id", job.source_id);

      await supabaseAdmin.from("food_order_status_events").insert({
        order_id: job.source_id,
        from_status: source.data.status,
        to_status: orderStatus,
        actor_type: "driver",
        actor_user_id: driverId,
        note: "Safari delivery driver updated delivery status.",
      });
    }
  } else if (orderStatus) {
    const source = await supabaseAdmin
      .from("commerce_orders")
      .select("id,status,payment_method,payment_status")
      .eq("id", job.source_id)
      .single();

    if (!source.error && source.data) {
      const orderUpdate: Record<string, unknown> = {
        status: orderStatus,
        updated_at: now,
      };

      if (status === "delivered") {
        orderUpdate.delivered_at = now;
        if (source.data.payment_method === "cash") {
          orderUpdate.payment_status = "paid";
        }
      }

      await supabaseAdmin
        .from("commerce_orders")
        .update(orderUpdate)
        .eq("id", job.source_id);

      await supabaseAdmin.from("commerce_order_status_events").insert({
        order_id: job.source_id,
        from_status: source.data.status,
        to_status: orderStatus,
        actor_type: "driver",
        actor_user_id: driverId,
        note: "Safari delivery driver updated delivery status.",
      });
    }
  }

  await supabaseAdmin.from("notifications").insert({
    user_id: job.customer_id,
    notification_type: `${job.job_type}_delivery_${status}`,
    title:
      status === "at_pickup"
        ? "Driver reached the pickup"
        : status === "picked_up"
          ? "Your order was picked up"
          : status === "on_the_way"
            ? "Your order is on the way"
            : "Your order was delivered",
    body:
      status === "delivered"
        ? "Thanks for ordering with Safari."
        : "Track the latest status in Safari.",
    data: {
      deliveryJobId: job.id,
      sourceId: job.source_id,
      type: job.job_type,
      status,
    },
    is_read: false,
  });

  if (status === "delivered") {
    await supabaseAdmin
      .from("driver_profiles")
      .update({
        is_available: true,
        updated_at: now,
      })
      .eq("user_id", driverId);
  }

  return job;
}

async function ensureCustomerDeliveryJobFromSource(
  customerId: string,
  type: DeliveryJobType,
  sourceId: string,
) {
  if (type === "food") {
    const orderResult =
      await supabaseAdmin
        .from("food_orders")
        .select("*")
        .eq("id", sourceId)
        .eq("passenger_id", customerId)
        .maybeSingle();

    if (
      orderResult.error ||
      !orderResult.data ||
      [
        "delivered",
        "cancelled_by_customer",
        "cancelled_by_merchant",
        "cancelled_by_admin",
      ].includes(
        orderResult.data.status,
      )
    ) {
      return null;
    }

    const restaurantResult =
      await supabaseAdmin
        .from("food_restaurants")
        .select(
          "id,name,address,latitude,longitude",
        )
        .eq(
          "id",
          orderResult.data.restaurant_id,
        )
        .maybeSingle();

    if (
      restaurantResult.error ||
      !restaurantResult.data
    ) {
      return null;
    }

    return ensureDeliveryJob({
      type: "food",
      sourceId:
        orderResult.data.id,
      customerId,
      pickupName:
        restaurantResult.data.name,
      pickupAddress:
        restaurantResult.data.address,
      pickupLatitude:
        restaurantResult.data.latitude ==
        null
          ? null
          : Number(
              restaurantResult.data.latitude,
            ),
      pickupLongitude:
        restaurantResult.data.longitude ==
        null
          ? null
          : Number(
              restaurantResult.data.longitude,
            ),
      dropoffAddress:
        orderResult.data.delivery_address,
      dropoffLatitude:
        orderResult.data.delivery_latitude ==
        null
          ? null
          : Number(
              orderResult.data.delivery_latitude,
            ),
      dropoffLongitude:
        orderResult.data.delivery_longitude ==
        null
          ? null
          : Number(
              orderResult.data.delivery_longitude,
            ),
      deliveryFee: Number(
        orderResult.data.delivery_fee ??
          0,
      ),
      estimatedTotal: Number(
        orderResult.data.total ?? 0,
      ),
      currencyCode:
        orderResult.data.currency_code ??
        "PKR",
    });
  }

  const orderResult =
    await supabaseAdmin
      .from("commerce_orders")
      .select("*")
      .eq("id", sourceId)
      .eq("passenger_id", customerId)
      .eq("order_type", type)
      .maybeSingle();

  if (
    orderResult.error ||
    !orderResult.data ||
    [
      "delivered",
      "cancelled_by_customer",
      "cancelled_by_merchant",
      "cancelled_by_admin",
    ].includes(
      orderResult.data.status,
    )
  ) {
    return null;
  }

  const storeResult =
    await supabaseAdmin
      .from("commerce_stores")
      .select(
        "id,name,address,latitude,longitude",
      )
      .eq(
        "id",
        orderResult.data.store_id,
      )
      .maybeSingle();

  if (
    storeResult.error ||
    !storeResult.data
  ) {
    return null;
  }

  return ensureDeliveryJob({
    type,
    sourceId:
      orderResult.data.id,
    customerId,
    pickupName:
      storeResult.data.name,
    pickupAddress:
      storeResult.data.address,
    pickupLatitude:
      storeResult.data.latitude == null
        ? null
        : Number(
            storeResult.data.latitude,
          ),
    pickupLongitude:
      storeResult.data.longitude == null
        ? null
        : Number(
            storeResult.data.longitude,
          ),
    dropoffAddress:
      orderResult.data.delivery_address,
    dropoffLatitude:
      orderResult.data.delivery_latitude ==
      null
        ? null
        : Number(
            orderResult.data.delivery_latitude,
          ),
    dropoffLongitude:
      orderResult.data.delivery_longitude ==
      null
        ? null
        : Number(
            orderResult.data.delivery_longitude,
          ),
    deliveryFee: Number(
      orderResult.data.delivery_fee ??
        0,
    ),
    estimatedTotal: Number(
      orderResult.data.total ?? 0,
    ),
    currencyCode:
      orderResult.data.currency_code ??
      "PKR",
  });
}

export async function getCustomerActiveDelivery(
  customerId: string,
) {
  const { data, error } =
    await supabaseAdmin
      .from("delivery_jobs")
      .select("*")
      .eq("customer_id", customerId)
      .in("status", [
        "available",
        "accepted",
        "at_pickup",
        "picked_up",
        "on_the_way",
      ])
      .order("created_at", {
        ascending: false,
      })
      .limit(1)
      .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (data) {
    return data;
  }

  /*
   * Self-heal orders created before V11, when order placement did not create
   * a delivery_jobs row. This makes app reopen resume old active orders too.
   */
  const [foodResult, commerceResult] =
    await Promise.all([
      supabaseAdmin
        .from("food_orders")
        .select("id,status,created_at")
        .eq("passenger_id", customerId)
        .in("status", [
          "placed",
          "confirmed",
          "preparing",
          "ready_for_pickup",
        ])
        .order("created_at", {
          ascending: false,
        })
        .limit(1)
        .maybeSingle(),

      supabaseAdmin
        .from("commerce_orders")
        .select("id,status,order_type,created_at")
        .eq("passenger_id", customerId)
        .in("status", [
          "placed",
          "confirmed",
          "preparing",
          "ready_for_pickup",
        ])
        .order("created_at", {
          ascending: false,
        })
        .limit(1)
        .maybeSingle(),
    ]);

  if (foodResult.error) {
    throw new Error(foodResult.error.message);
  }

  if (commerceResult.error) {
    throw new Error(commerceResult.error.message);
  }

  const candidates: Array<{
    type: DeliveryJobType;
    id: string;
    createdAt: number;
  }> = [];

  if (foodResult.data) {
    candidates.push({
      type: "food",
      id: foodResult.data.id,
      createdAt: new Date(
        foodResult.data.created_at,
      ).getTime(),
    });
  }

  if (commerceResult.data) {
    candidates.push({
      type:
        commerceResult.data.order_type ===
        "pharmacy"
          ? "pharmacy"
          : "grocery",
      id: commerceResult.data.id,
      createdAt: new Date(
        commerceResult.data.created_at,
      ).getTime(),
    });
  }

  candidates.sort(
    (a, b) =>
      b.createdAt - a.createdAt,
  );

  const latest =
    candidates[0] ?? null;

  if (!latest) {
    return null;
  }

  return ensureCustomerDeliveryJobFromSource(
    customerId,
    latest.type,
    latest.id,
  );
}

export async function getCustomerDeliveryTracking(
  customerId: string,
  type: DeliveryJobType,
  sourceId: string,
) {
  const { data, error } = await supabaseAdmin
    .from("delivery_jobs")
    .select("*")
    .eq("customer_id", customerId)
    .eq("job_type", type)
    .eq("source_id", sourceId)
    .order("created_at", {
      ascending: false,
    })
    .limit(1)
    .maybeSingle();

  if (error) throw new Error(error.message);

  const job =
    data ??
    (await ensureCustomerDeliveryJobFromSource(
      customerId,
      type,
      sourceId,
    ));

  let driverLocation = null;

  if (job?.driver_id) {
    const locationResult = await supabaseAdmin
      .from("driver_locations")
      .select("*")
      .eq("driver_id", job.driver_id)
      .maybeSingle();

    if (locationResult.error) {
      throw new Error(locationResult.error.message);
    }

    driverLocation = locationResult.data ?? null;
  }

  return {
    job: job ?? null,
    driverLocation,
  };
}
