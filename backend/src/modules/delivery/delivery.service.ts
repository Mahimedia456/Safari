import { supabaseAdmin } from "../../lib/supabase.js";

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
  const { data, error } = await supabaseAdmin.rpc(
    "accept_safari_delivery_job",
    {
      p_job_id: jobId,
      p_driver_id: driverId,
    },
  );

  if (error || !data) {
    throw new Error(
      error?.message ?? "Safari delivery job could not be accepted.",
    );
  }

  return getDriverDeliveryJob(driverId, jobId);
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
      ? "ready_for_pickup"
      : status === "picked_up"
        ? "picked_up"
        : status === "on_the_way"
          ? "on_the_way"
          : "delivered";

  if (job.job_type === "food") {
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
  } else {
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

  return job;
}


export async function getCustomerDeliveryTracking(
  customerId: string,
  type: DeliveryJobType,
  sourceId: string,
) {
  const { data: job, error } = await supabaseAdmin
    .from("delivery_jobs")
    .select("*")
    .eq("customer_id", customerId)
    .eq("job_type", type)
    .eq("source_id", sourceId)
    .maybeSingle();

  if (error) throw new Error(error.message);

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
