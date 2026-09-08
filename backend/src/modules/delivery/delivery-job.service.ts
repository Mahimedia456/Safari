import { supabaseAdmin } from "../../lib/supabase.js";
import { searchRidePlaces } from "../rides/places.service.js";

export type DeliveryJobKind =
  | "food"
  | "grocery"
  | "pharmacy";

export type EnsureDeliveryJobInput = {
  type: DeliveryJobKind;
  sourceId: string;
  customerId: string;
  pickupName: string;
  pickupAddress: string;
  pickupLatitude?: number | null;
  pickupLongitude?: number | null;
  dropoffAddress: string;
  dropoffLatitude?: number | null;
  dropoffLongitude?: number | null;
  deliveryFee?: number | null;
  estimatedTotal?: number | null;
  currencyCode?: string | null;
};

async function resolveCoordinates(
  address: string,
  latitude?: number | null,
  longitude?: number | null,
) {
  const lat = Number(latitude);
  const lng = Number(longitude);

  if (
    Number.isFinite(lat) &&
    Number.isFinite(lng) &&
    lat >= -90 &&
    lat <= 90 &&
    lng >= -180 &&
    lng <= 180
  ) {
    return {
      latitude: lat,
      longitude: lng,
    };
  }

  if (address.trim().length < 3) {
    return {
      latitude: null,
      longitude: null,
    };
  }

  try {
    const places =
      await searchRidePlaces(
        address,
      );

    const first =
      places[0] ?? null;

    return {
      latitude:
        first?.latitude ?? null,
      longitude:
        first?.longitude ?? null,
    };
  } catch {
    return {
      latitude: null,
      longitude: null,
    };
  }
}

async function notifyAvailableDrivers(
  job: Record<string, any>,
) {
  const { data: drivers, error } =
    await supabaseAdmin
      .from("driver_profiles")
      .select(
        "user_id,is_online,is_available,onboarding_status,verification_status",
      )
      .eq("is_online", true)
      .eq("is_available", true)
      .eq("onboarding_status", "approved")
      .eq("verification_status", "verified");

  if (error) {
    /*
     * Delivery creation must not fail because notification fan-out failed.
     * Drivers also poll /delivery/jobs, so the job remains discoverable.
     */
    return;
  }

  const rows =
    (drivers ?? []).map((driver) => ({
      user_id: driver.user_id,
      notification_type: `${job.job_type}_delivery_available`,
      title: `New Safari ${job.job_type} delivery`,
      body: `${job.pickup_name ?? "Pickup"} → ${job.dropoff_address ?? "customer"}`,
      data: {
        deliveryJobId: job.id,
        sourceId: job.source_id,
        type: job.job_type,
        deliveryFee: job.delivery_fee ?? null,
      },
      is_read: false,
    }));

  if (rows.length > 0) {
    await supabaseAdmin
      .from("notifications")
      .insert(rows);
  }
}

export async function ensureDeliveryJob(
  input: EnsureDeliveryJobInput,
) {
  const existingResult =
    await supabaseAdmin
      .from("delivery_jobs")
      .select("*")
      .eq("job_type", input.type)
      .eq("source_id", input.sourceId)
      .order("created_at", {
        ascending: false,
      })
      .limit(1)
      .maybeSingle();

  if (existingResult.error) {
    throw new Error(
      existingResult.error.message,
    );
  }

  if (existingResult.data) {
    return existingResult.data;
  }

  const [pickup, dropoff] =
    await Promise.all([
      resolveCoordinates(
        input.pickupAddress,
        input.pickupLatitude,
        input.pickupLongitude,
      ),
      resolveCoordinates(
        input.dropoffAddress,
        input.dropoffLatitude,
        input.dropoffLongitude,
      ),
    ]);

  const now =
    new Date().toISOString();

  const { data: job, error } =
    await supabaseAdmin
      .from("delivery_jobs")
      .insert({
        job_type: input.type,
        source_id: input.sourceId,
        customer_id: input.customerId,
        driver_id: null,
        status: "available",
        pickup_name: input.pickupName,
        pickup_address: input.pickupAddress,
        pickup_latitude:
          pickup.latitude,
        pickup_longitude:
          pickup.longitude,
        dropoff_address: input.dropoffAddress,
        dropoff_latitude:
          dropoff.latitude,
        dropoff_longitude:
          dropoff.longitude,
        delivery_fee:
          input.deliveryFee ?? 0,

        /*
         * Safari's deployed delivery_jobs schema does not require
         * estimated_total. Order totals live on food_orders.total or
         * commerce_orders.total. Keeping delivery_jobs limited to the
         * courier fee avoids PostgREST schema-cache failures.
         */
        currency_code:
          input.currencyCode ?? "PKR",
        updated_at: now,
      })
      .select("*")
      .single();

  if (error || !job) {
    /*
     * If an older database trigger created the row at the same time,
     * recover that row instead of turning a successful customer order
     * into a false failure.
     */
    const raced =
      await supabaseAdmin
        .from("delivery_jobs")
        .select("*")
        .eq("job_type", input.type)
        .eq("source_id", input.sourceId)
        .order("created_at", {
          ascending: false,
        })
        .limit(1)
        .maybeSingle();

    if (
      !raced.error &&
      raced.data
    ) {
      return raced.data;
    }

    throw new Error(
      error?.message ??
        "Safari delivery job could not be created.",
    );
  }

  void notifyAvailableDrivers(job);

  return job;
}
