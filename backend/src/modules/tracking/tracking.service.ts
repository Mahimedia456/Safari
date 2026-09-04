import { randomInt } from "node:crypto";
import { supabaseAdmin } from "../../lib/supabase.js";

const ALLOWED_DRIVER_TRANSITIONS: Record<string, string[]> = {
  driver_assigned: ["driver_arriving"],
  driver_arriving: ["driver_arrived"],
  driver_arrived: ["in_progress"],
  in_progress: ["completed"],
};

export async function updateDriverLocation(
  driverId: string,
  input: {
    latitude: number;
    longitude: number;
    heading?: number | null;
    speedKph?: number | null;
    accuracyMeters?: number | null;
  },
) {
  const { data: activeRide, error: rideError } = await supabaseAdmin
    .from("rides")
    .select("id,ride_status")
    .eq("driver_id", driverId)
    .in("ride_status", [
      "driver_assigned",
      "driver_arriving",
      "driver_arrived",
      "in_progress",
    ])
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (rideError) throw new Error(rideError.message);

  const now = new Date().toISOString();

  const { data, error } = await supabaseAdmin
    .from("driver_locations")
    .upsert(
      {
        driver_id: driverId,
        ride_id: activeRide?.id ?? null,
        latitude: input.latitude,
        longitude: input.longitude,
        heading: input.heading ?? null,
        speed_kph: input.speedKph ?? null,
        accuracy_meters: input.accuracyMeters ?? null,
        is_online: true,
        recorded_at: now,
        updated_at: now,
      },
      {
        onConflict: "driver_id",
      },
    )
    .select("*")
    .single();

  if (error) throw new Error(error.message);

  if (activeRide) {
    await Promise.all([
      supabaseAdmin.from("ride_tracking_points").insert({
        ride_id: activeRide.id,
        driver_id: driverId,
        latitude: input.latitude,
        longitude: input.longitude,
        heading: input.heading ?? null,
        speed_kph: input.speedKph ?? null,
        accuracy_meters: input.accuracyMeters ?? null,
        recorded_at: now,
      }),

      supabaseAdmin
        .from("rides")
        .update({
          last_driver_location_at: now,
          updated_at: now,
        })
        .eq("id", activeRide.id),
    ]);
  }

  return data;
}

export async function getActiveRideForDriver(driverId: string) {
  const { data, error } = await supabaseAdmin
    .from("rides")
    .select(`
      id,
      passenger_id,
      driver_id,
      vehicle_id,
      ride_category_id,
      service_city_id,
      ride_number,
      booking_type,
      ride_status,
      pickup_address,
      pickup_latitude,
      pickup_longitude,
      dropoff_address,
      dropoff_latitude,
      dropoff_longitude,
      estimated_distance_km,
      estimated_duration_minutes,
      estimated_fare,
      agreed_fare,
      final_fare,
      currency_code,
      payment_method,
      payment_status,
      created_at,
      driver_arrived_at,
      started_at,
      completed_at,
      profiles!rides_passenger_id_fkey (
        id,
        full_name,
        phone,
        avatar_url,
        average_rating,
        rating_count
      ),
      ride_categories (
        code,
        name,
        vehicle_type,
        service_tier
      ),
      driver_vehicles (
        id,
        make,
        model,
        year,
        color,
        plate_number,
        vehicle_type,
        ride_category,
        verification_status
      )
    `)
    .eq("driver_id", driverId)
    .in("ride_status", [
      "driver_assigned",
      "driver_arriving",
      "driver_arrived",
      "in_progress",
    ])
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw new Error(error.message);

  /*
   * Driver must never receive the passenger start OTP
   * through the active-ride payload.
   * OTP is verified server-side only during the in_progress transition.
   */
  return data;
}

export async function getActiveRideForPassenger(passengerId: string) {
  const { data: ride, error: rideError } = await supabaseAdmin
    .from("rides")
    .select(`
      *,
      ride_categories (
        code,
        name,
        vehicle_type,
        service_tier
      ),
      profiles!rides_driver_id_fkey (
        id,
        full_name,
        phone,
        avatar_url,
        average_rating,
        rating_count
      ),
      driver_vehicles (
        id,
        make,
        model,
        year,
        color,
        plate_number,
        vehicle_type,
        ride_category,
        verification_status
      )
    `)
    .eq("passenger_id", passengerId)
    .in("ride_status", [
      "searching",
      "driver_assigned",
      "driver_arriving",
      "driver_arrived",
      "in_progress",
    ])
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (rideError) {
    throw new Error(rideError.message);
  }

  if (!ride) {
    return {
      ride: null,
      driverLocation: null,
    };
  }

  /*
   * The PIN is passenger-visible only after the driver marks Arrived.
   * Before arrival and after trip start there is no reason to expose it.
   */
  const passengerRide = {
    ...ride,
    start_otp:
      ride.ride_status === "driver_arrived"
        ? ride.start_otp
        : null,
  };

  let driverLocation = null;

  if (ride.driver_id) {
    const { data, error } = await supabaseAdmin
      .from("driver_locations")
      .select(`
        driver_id,
        ride_id,
        latitude,
        longitude,
        heading,
        speed_kph,
        accuracy_meters,
        recorded_at,
        updated_at
      `)
      .eq("driver_id", ride.driver_id)
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    driverLocation = data;
  }

  return {
    ride: passengerRide,
    driverLocation,
  };
}

export async function transitionDriverRide(
  driverId: string,
  rideId: string,
  targetStatus: "driver_arriving" | "driver_arrived" | "in_progress" | "completed",
  input?: {
    startOtp?: string | null;
    latitude?: number | null;
    longitude?: number | null;
  },
) {
  const { data: ride, error: rideError } = await supabaseAdmin
    .from("rides")
    .select("*")
    .eq("id", rideId)
    .eq("driver_id", driverId)
    .single();

  if (rideError || !ride) throw new Error("Safari ride not found.");

  const allowed = ALLOWED_DRIVER_TRANSITIONS[ride.ride_status] ?? [];

  if (!allowed.includes(targetStatus)) {
    throw new Error(
      `Ride cannot move from ${ride.ride_status} to ${targetStatus}.`,
    );
  }

  if (targetStatus === "in_progress") {
    if (!ride.start_otp) {
      throw new Error("Safari start OTP has not been generated.");
    }

    if (input?.startOtp !== ride.start_otp) {
      throw new Error("Incorrect Safari ride start code.");
    }
  }

  const now = new Date().toISOString();

  const updates: Record<string, unknown> = {
    ride_status: targetStatus,
    updated_at: now,
  };

  if (targetStatus === "driver_arriving") {
    updates.start_otp = ride.start_otp ?? String(randomInt(1000, 10000));
  }

  if (targetStatus === "driver_arrived") {
    updates.driver_arrived_at = now;
  }

  if (targetStatus === "in_progress") {
    updates.started_at = now;
    updates.actual_pickup_latitude = input?.latitude ?? null;
    updates.actual_pickup_longitude = input?.longitude ?? null;
  }

  if (targetStatus === "completed") {
    updates.completed_at = now;
    updates.actual_dropoff_latitude = input?.latitude ?? null;
    updates.actual_dropoff_longitude = input?.longitude ?? null;
    updates.final_fare = ride.agreed_fare ?? ride.estimated_fare;
    updates.payment_status =
      ride.payment_method === "cash" ? "paid" : ride.payment_status;
  }

  const { data, error } = await supabaseAdmin
    .from("rides")
    .update(updates)
    .eq("id", rideId)
    .eq("driver_id", driverId)
    .select("*")
    .single();

  if (error) throw new Error(error.message);

  await Promise.all([
    supabaseAdmin.from("ride_status_events").insert({
      ride_id: rideId,
      from_status: ride.ride_status,
      to_status: targetStatus,
      actor_type: "driver",
      actor_user_id: driverId,
      note: `Driver changed ride status to ${targetStatus}.`,
    }),

    supabaseAdmin.from("notifications").insert({
      user_id: ride.passenger_id,
      notification_type: `ride_${targetStatus}`,
      title:
        targetStatus === "driver_arriving"
          ? "Your Safari driver is on the way"
          : targetStatus === "driver_arrived"
            ? "Your Safari driver has arrived"
            : targetStatus === "in_progress"
              ? "Your Safari trip has started"
              : "Your Safari trip is complete",
      body:
        targetStatus === "driver_arriving"
          ? "Track your driver live in Safari."
          : targetStatus === "driver_arrived"
            ? "Meet your driver at the pickup point. Your four-digit start PIN is now available in Safari."
            : targetStatus === "in_progress"
              ? "You are now on the way to your destination."
              : "Thanks for riding with Safari.",
      data: {
        rideId,
        status: targetStatus,
      },
      is_read: false,
    }),
  ]);

  if (targetStatus === "completed") {
    await Promise.all([
      supabaseAdmin
        .from("driver_profiles")
        .update({
          is_available: true,
          updated_at: now,
        })
        .eq("user_id", driverId),

      supabaseAdmin
        .from("driver_locations")
        .update({
          ride_id: null,
          updated_at: now,
        })
        .eq("driver_id", driverId),
    ]);
  }

  return data;
}

export async function cancelDriverRide(
  driverId: string,
  rideId: string,
  reason: string,
) {
  const { data: ride, error: rideError } = await supabaseAdmin
    .from("rides")
    .select("*")
    .eq("id", rideId)
    .eq("driver_id", driverId)
    .single();

  if (rideError || !ride) throw new Error("Safari ride not found.");

  if (
    ![
      "driver_assigned",
      "driver_arriving",
      "driver_arrived",
    ].includes(ride.ride_status)
  ) {
    throw new Error("This Safari ride can no longer be cancelled by the driver.");
  }

  const now = new Date().toISOString();

  const { data, error } = await supabaseAdmin
    .from("rides")
    .update({
      ride_status: "cancelled_by_driver",
      driver_cancel_reason: reason,
      cancelled_at: now,
      updated_at: now,
    })
    .eq("id", rideId)
    .eq("driver_id", driverId)
    .select("*")
    .single();

  if (error) throw new Error(error.message);

  await Promise.all([
    supabaseAdmin.from("ride_status_events").insert({
      ride_id: rideId,
      from_status: ride.ride_status,
      to_status: "cancelled_by_driver",
      actor_type: "driver",
      actor_user_id: driverId,
      note: reason,
    }),

    supabaseAdmin
      .from("driver_profiles")
      .update({
        is_available: true,
        updated_at: now,
      })
      .eq("user_id", driverId),

    supabaseAdmin
      .from("driver_locations")
      .update({
        ride_id: null,
        updated_at: now,
      })
      .eq("driver_id", driverId),
  ]);

  return data;
}
