import { supabaseAdmin } from "../../lib/supabase.js";

const EARTH_RADIUS_KM = 6371;

function toRadians(value: number) {
  return (value * Math.PI) / 180;
}

function haversineKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) {
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) ** 2;

  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(a));
}

function estimatedPickupMinutes(distanceKm: number) {
  return Math.max(2, Math.round((distanceKm / 24) * 60));
}

export async function startRideMatching(rideId: string) {
  const { data: ride, error: rideError } = await supabaseAdmin
    .from("rides")
    .select(`
      *,
      ride_categories (
        code,
        vehicle_type
      )
    `)
    .eq("id", rideId)
    .single();

  if (rideError || !ride) {
    throw new Error("Safari ride not found.");
  }

  if (!["requested", "searching"].includes(ride.ride_status)) {
    throw new Error("This ride is not eligible for driver matching.");
  }

  const categoryCode = ride.ride_categories?.code;

  const { data: drivers, error: driverError } = await supabaseAdmin
    .from("driver_profiles")
    .select(`
      *,
      profiles!driver_profiles_user_id_fkey (
        id,
        full_name,
        phone,
        status,
        account_type
      )
    `)
    .eq("onboarding_status", "approved")
    .eq("verification_status", "verified")
    .eq("is_online", true)
    .eq("is_available", true);

  if (driverError) throw new Error(driverError.message);

  const candidates: Array<{
    driverId: string;
    vehicleId: string;
    distanceKm: number;
    etaMinutes: number;
  }> = [];

  for (const driver of drivers) {
    const { data: preference, error: preferenceError } = await supabaseAdmin
      .from("driver_match_preferences")
      .select("*")
      .eq("driver_id", driver.user_id)
      .maybeSingle();

    if (preferenceError) throw new Error(preferenceError.message);

    const categoryAccepted =
      categoryCode === "economy"
        ? preference?.accepts_economy !== false
        : categoryCode === "comfort"
          ? preference?.accepts_comfort !== false
          : categoryCode === "premium"
            ? preference?.accepts_premium !== false
            : categoryCode === "bike"
              ? preference?.accepts_bike !== false
              : categoryCode === "rickshaw"
                ? preference?.accepts_rickshaw !== false
                : preference?.accepts_xl !== false;

    if (!categoryAccepted) continue;

    const { data: vehicle, error: vehicleError } = await supabaseAdmin
      .from("driver_vehicles")
      .select("*")
      .eq("driver_id", driver.user_id)
      .eq("is_primary", true)
      .eq("is_active", true)
      .eq("verification_status", "verified")
      .eq("ride_category", categoryCode)
      .maybeSingle();

    if (vehicleError) throw new Error(vehicleError.message);
    if (!vehicle) continue;

    const { data: location, error: locationError } = await supabaseAdmin
      .from("driver_locations")
      .select("*")
      .eq("driver_id", driver.user_id)
      .maybeSingle();

    if (locationError) throw new Error(locationError.message);
    if (!location) continue;

    const distanceKm = haversineKm(
      Number(location.latitude),
      Number(location.longitude),
      Number(ride.pickup_latitude),
      Number(ride.pickup_longitude),
    );

    const maxDistance = Number(
      preference?.max_pickup_distance_km ?? 8,
    );

    if (distanceKm > maxDistance) continue;

    candidates.push({
      driverId: driver.user_id,
      vehicleId: vehicle.id,
      distanceKm,
      etaMinutes: estimatedPickupMinutes(distanceKm),
    });
  }

  candidates.sort((a, b) => a.distanceKm - b.distanceKm);

  const now = new Date();
  const expiry = new Date(now.getTime() + 25 * 1000).toISOString();

  const topCandidates = candidates.slice(0, 5);

  if (topCandidates.length === 0) {
    await supabaseAdmin
      .from("rides")
      .update({
        ride_status: "searching",
        matching_started_at: ride.matching_started_at ?? now.toISOString(),
        matching_attempts: Number(ride.matching_attempts ?? 0) + 1,
        updated_at: now.toISOString(),
      })
      .eq("id", rideId);

    return {
      rideId,
      candidates: [],
      offersCreated: 0,
      message: "No eligible Safari driver is currently nearby.",
    };
  }

  const rows = topCandidates.map((candidate) => ({
    ride_id: rideId,
    driver_id: candidate.driverId,
    vehicle_id: candidate.vehicleId,
    match_status: "offered",
    distance_to_pickup_km: Math.round(candidate.distanceKm * 100) / 100,
    estimated_pickup_minutes: candidate.etaMinutes,
    expires_at: expiry,
  }));

  const { data: offers, error: offerError } = await supabaseAdmin
    .from("ride_match_requests")
    .upsert(rows, {
      onConflict: "ride_id,driver_id",
    })
    .select("*");

  if (offerError) throw new Error(offerError.message);

  await supabaseAdmin
    .from("rides")
    .update({
      ride_status: "searching",
      matching_started_at: ride.matching_started_at ?? now.toISOString(),
      matching_attempts: Number(ride.matching_attempts ?? 0) + 1,
      updated_at: now.toISOString(),
    })
    .eq("id", rideId);

  return {
    rideId,
    candidates: topCandidates,
    offersCreated: offers.length,
    offers,
  };
}

export async function listDriverOffers(driverId: string) {
  await supabaseAdmin
    .from("ride_match_requests")
    .update({
      match_status: "expired",
      responded_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("driver_id", driverId)
    .eq("match_status", "offered")
    .lt("expires_at", new Date().toISOString());

  const { data, error } = await supabaseAdmin
    .from("ride_match_requests")
    .select(`
      *,
      rides (
        id,
        ride_number,
        ride_status,
        booking_type,
        pickup_address,
        pickup_latitude,
        pickup_longitude,
        dropoff_address,
        dropoff_latitude,
        dropoff_longitude,
        estimated_distance_km,
        estimated_duration_minutes,
        estimated_fare,
        currency_code,
        payment_method,
        ride_categories (
          code,
          name
        )
      ),
      driver_vehicles (
        id,
        make,
        model,
        color,
        plate_number
      )
    `)
    .eq("driver_id", driverId)
    .eq("match_status", "offered")
    .gt("expires_at", new Date().toISOString())
    .order("offered_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

export async function acceptDriverOffer(
  driverId: string,
  offerId: string,
) {
  const { data: offer, error: offerError } = await supabaseAdmin
    .from("ride_match_requests")
    .select("*")
    .eq("id", offerId)
    .eq("driver_id", driverId)
    .eq("match_status", "offered")
    .single();

  if (offerError || !offer) {
    throw new Error("Safari ride offer is no longer available.");
  }

  if (new Date(offer.expires_at).getTime() <= Date.now()) {
    throw new Error("Safari ride offer has expired.");
  }

  const { data: ride, error: rideError } = await supabaseAdmin
    .from("rides")
    .select("*")
    .eq("id", offer.ride_id)
    .single();

  if (rideError || !ride) throw new Error("Safari ride not found.");

  if (!["requested", "searching"].includes(ride.ride_status)) {
    throw new Error("Another driver has already accepted this Safari ride.");
  }

  const now = new Date().toISOString();

  const { data: updatedRide, error: updateError } = await supabaseAdmin
    .from("rides")
    .update({
      driver_id: driverId,
      vehicle_id: offer.vehicle_id,
      ride_status: "driver_assigned",
      accepted_at: now,
      matched_at: now,
      driver_arrival_eta_minutes: offer.estimated_pickup_minutes,
      driver_distance_to_pickup_km: offer.distance_to_pickup_km,
      updated_at: now,
    })
    .eq("id", ride.id)
    .in("ride_status", ["requested", "searching"])
    .select("*")
    .single();

  if (updateError) {
    throw new Error("Another driver has already accepted this Safari ride.");
  }

  await Promise.all([
    supabaseAdmin
      .from("ride_match_requests")
      .update({
        match_status: "accepted",
        responded_at: now,
        updated_at: now,
      })
      .eq("id", offerId),

    supabaseAdmin
      .from("ride_match_requests")
      .update({
        match_status: "cancelled",
        responded_at: now,
        updated_at: now,
      })
      .eq("ride_id", ride.id)
      .neq("id", offerId)
      .eq("match_status", "offered"),

    supabaseAdmin
      .from("driver_profiles")
      .update({
        is_available: false,
        updated_at: now,
      })
      .eq("user_id", driverId),

    supabaseAdmin
      .from("driver_locations")
      .update({
        ride_id: ride.id,
        updated_at: now,
      })
      .eq("driver_id", driverId),

    supabaseAdmin
      .from("ride_status_events")
      .insert({
        ride_id: ride.id,
        from_status: ride.ride_status,
        to_status: "driver_assigned",
        actor_type: "driver",
        actor_user_id: driverId,
        note: "Driver accepted the Safari ride.",
      }),
  ]);

  return updatedRide;
}

export async function rejectDriverOffer(
  driverId: string,
  offerId: string,
  reason?: string | null,
) {
  const now = new Date().toISOString();

  const { data, error } = await supabaseAdmin
    .from("ride_match_requests")
    .update({
      match_status: "rejected",
      rejection_reason: reason ?? null,
      responded_at: now,
      updated_at: now,
    })
    .eq("id", offerId)
    .eq("driver_id", driverId)
    .eq("match_status", "offered")
    .select("*")
    .single();

  if (error) throw new Error(error.message);
  return data;
}
