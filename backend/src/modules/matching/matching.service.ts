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

async function offerSettings(cityId: string) {
  const { data, error } = await supabaseAdmin
    .from("ride_service_settings")
    .select(
      "driver_offer_min_factor,driver_offer_max_factor,driver_offer_expiry_seconds,max_driver_offers",
    )
    .eq("city_id", cityId)
    .maybeSingle();

  if (error) throw new Error(error.message);

  return {
    minFactor: Number(data?.driver_offer_min_factor ?? 0.7),
    maxFactor: Number(data?.driver_offer_max_factor ?? 1.5),
    expirySeconds: Number(data?.driver_offer_expiry_seconds ?? 90),
    maxOffers: Number(data?.max_driver_offers ?? 8),
  };
}

export async function startRideMatching(
  passengerId: string,
  rideId: string,
) {
  const { data: ride, error: rideError } = await supabaseAdmin
    .from("rides")
    .select(`
      *,
      ride_categories (
        code,
        name,
        vehicle_type,
        service_tier
      )
    `)
    .eq("id", rideId)
    .eq("passenger_id", passengerId)
    .single();

  if (rideError || !ride) throw new Error("Safari ride not found.");

  if (!["requested", "searching"].includes(ride.ride_status)) {
    throw new Error("This Safari ride is not accepting driver offers.");
  }

  const rideCategory = Array.isArray(ride.ride_categories)
    ? ride.ride_categories[0] ?? null
    : ride.ride_categories ?? null;

  const categoryCode = rideCategory?.code;
  if (!categoryCode) throw new Error("Safari ride category is unavailable.");

  const settings = await offerSettings(ride.city_id);

  const { data: drivers, error: driversError } = await supabaseAdmin
    .from("driver_profiles")
    .select("user_id,is_online,is_available,onboarding_status,verification_status")
    .eq("onboarding_status", "approved")
    .eq("verification_status", "verified")
    .eq("is_online", true)
    .eq("is_available", true);

  if (driversError) throw new Error(driversError.message);

  const candidates: Array<{
    driverId: string;
    vehicleId: string;
    distanceKm: number;
    etaMinutes: number;
  }> = [];

  for (const driver of drivers ?? []) {
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

    if (distanceKm > 12) continue;

    candidates.push({
      driverId: driver.user_id,
      vehicleId: vehicle.id,
      distanceKm,
      etaMinutes: Math.max(2, Math.round((distanceKm / 24) * 60)),
    });
  }

  candidates.sort((a, b) => a.distanceKm - b.distanceKm);

  const selected = candidates.slice(0, settings.maxOffers);
  const expiresAt = new Date(
    Date.now() + Math.max(settings.expirySeconds, 180) * 1000,
  ).toISOString();

  const rows = selected.map((candidate) => ({
    ride_id: ride.id,
    driver_id: candidate.driverId,
    vehicle_id: candidate.vehicleId,
    match_status: "offered",
    distance_to_pickup_km:
      Math.round(candidate.distanceKm * 100) / 100,
    estimated_pickup_minutes: candidate.etaMinutes,
    expires_at: expiresAt,
  }));

  let invitations: any[] = [];

  if (rows.length > 0) {
    const result = await supabaseAdmin
      .from("ride_match_requests")
      .upsert(rows, {
        onConflict: "ride_id,driver_id",
      })
      .select("*");

    if (result.error) throw new Error(result.error.message);
    invitations = result.data ?? [];

    await supabaseAdmin.from("notifications").insert(
      invitations.map((invitation) => ({
        user_id: invitation.driver_id,
        notification_type: "ride_request",
        title: "New Safari ride request",
        body: `Send your fare offer for ${ride.ride_categories?.name ?? "this ride"}.`,
        data: {
          rideId: ride.id,
          invitationId: invitation.id,
          suggestedFare: ride.suggested_fare ?? ride.estimated_fare,
          expiresAt: invitation.expires_at,
        },
        is_read: false,
      })),
    );
  }

  await supabaseAdmin
    .from("rides")
    .update({
      ride_status: "searching",
      matching_started_at: ride.matching_started_at ?? new Date().toISOString(),
      matching_attempts: Number(ride.matching_attempts ?? 0) + 1,
      updated_at: new Date().toISOString(),
    })
    .eq("id", ride.id);

  return {
    rideId: ride.id,
    invitationsCreated: invitations.length,
    invitations,
  };
}

export async function listDriverRideRequests(driverId: string) {
  const now = new Date().toISOString();

  const { data, error } = await supabaseAdmin
    .from("ride_match_requests")
    .select(`
      *,
      rides (
        id,
        ride_number,
        ride_status,
        pickup_address,
        pickup_latitude,
        pickup_longitude,
        dropoff_address,
        dropoff_latitude,
        dropoff_longitude,
        estimated_distance_km,
        estimated_duration_minutes,
        currency_code,
        suggested_fare,
        estimated_fare,
        requested_vehicle_type,
        service_tier,
        ride_categories (
          code,
          name,
          vehicle_type,
          service_tier
        )
      ),
      driver_vehicles (
        id,
        make,
        model,
        year,
        color,
        plate_number,
        ride_category
      )
    `)
    .eq("driver_id", driverId)
    .eq("match_status", "offered")
    .gt("expires_at", now)
    .order("offered_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function submitDriverFareOffer(
  driverId: string,
  invitationId: string,
  offeredFare: number,
) {
  const { data: invitation, error: invitationError } = await supabaseAdmin
    .from("ride_match_requests")
    .select(`
      *,
      rides (
        id,
        passenger_id,
        city_id,
        ride_status,
        currency_code,
        suggested_fare,
        estimated_fare
      )
    `)
    .eq("id", invitationId)
    .eq("driver_id", driverId)
    .eq("match_status", "offered")
    .single();

  if (invitationError || !invitation) {
    throw new Error("Safari ride request is no longer available.");
  }

  if (new Date(invitation.expires_at).getTime() <= Date.now()) {
    throw new Error("Safari ride request has expired.");
  }

  const ride = invitation.rides;
  if (!ride || !["requested", "searching"].includes(ride.ride_status)) {
    throw new Error("This Safari ride is no longer accepting offers.");
  }

  const settings = await offerSettings(ride.city_id);
  const suggestedFare = Number(ride.suggested_fare ?? ride.estimated_fare ?? 0);

  const minFare = Math.floor(suggestedFare * settings.minFactor);
  const maxFare = Math.ceil(suggestedFare * settings.maxFactor);

  if (offeredFare < minFare || offeredFare > maxFare) {
    throw new Error(
      `Offer must be between PKR ${minFare.toLocaleString("en-PK")} and PKR ${maxFare.toLocaleString("en-PK")}.`,
    );
  }

  const expiresAt = new Date(
    Date.now() + Math.max(settings.expirySeconds, 180) * 1000,
  ).toISOString();

  const { data: offer, error: offerError } = await supabaseAdmin
    .from("ride_driver_offers")
    .upsert(
      {
        ride_id: ride.id,
        driver_id: driverId,
        vehicle_id: invitation.vehicle_id,
        invitation_id: invitation.id,
        offered_fare: offeredFare,
        currency_code: ride.currency_code ?? "PKR",
        distance_to_pickup_km: invitation.distance_to_pickup_km,
        estimated_pickup_minutes: invitation.estimated_pickup_minutes,
        offer_status: "pending",
        expires_at: expiresAt,
        responded_at: null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "ride_id,driver_id" },
    )
    .select("*")
    .single();

  if (offerError) throw new Error(offerError.message);

  await Promise.all([
    supabaseAdmin
      .from("ride_match_requests")
      .update({
        match_status: "accepted",
        responded_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", invitation.id),

    supabaseAdmin.from("notifications").insert({
      user_id: ride.passenger_id,
      notification_type: "driver_fare_offer",
      title: "New driver offer",
      body: `A Safari driver offered PKR ${Math.round(offeredFare).toLocaleString("en-PK")}.`,
      data: {
        rideId: ride.id,
        driverOfferId: offer.id,
        offeredFare,
      },
      is_read: false,
    }),
  ]);

  return offer;
}

export async function listPassengerDriverOffers(
  passengerId: string,
  rideId: string,
) {
  const { data: ride, error: rideError } = await supabaseAdmin
    .from("rides")
    .select("id,passenger_id,ride_status,suggested_fare,estimated_fare,currency_code")
    .eq("id", rideId)
    .eq("passenger_id", passengerId)
    .single();

  if (rideError || !ride) throw new Error("Safari ride not found.");

  if (!["requested", "searching", "driver_assigned"].includes(ride.ride_status)) {
    return { ride, offers: [] };
  }

  const now = new Date().toISOString();

  const expireResult = await supabaseAdmin
    .from("ride_driver_offers")
    .update({
      offer_status: "expired",
      responded_at: now,
      updated_at: now,
    })
    .eq("ride_id", rideId)
    .eq("offer_status", "pending")
    .lt("expires_at", now);

  if (expireResult.error) throw new Error(expireResult.error.message);

  // Do not rely on PostgREST relationship names here. Some Safari DB
  // revisions do not expose ride_driver_offers -> profiles as an embedded
  // relationship, which made this endpoint fail while the driver offer row
  // itself existed. Fetch the offer rows first, then hydrate them explicitly.
  const { data: offerRows, error: offersError } = await supabaseAdmin
    .from("ride_driver_offers")
    .select("*")
    .eq("ride_id", rideId)
    .eq("offer_status", "pending")
    .gt("expires_at", now)
    .order("offered_fare", { ascending: true });

  if (offersError) throw new Error(offersError.message);

  const offers = await Promise.all(
    (offerRows ?? []).map(async (offer) => {
      const [profileResult, vehicleResult] = await Promise.all([
        supabaseAdmin
          .from("profiles")
          .select("id,full_name,avatar_url,average_rating,rating_count,phone")
          .eq("id", offer.driver_id)
          .maybeSingle(),
        offer.vehicle_id
          ? supabaseAdmin
              .from("driver_vehicles")
              .select("id,make,model,year,color,plate_number,ride_category,vehicle_type")
              .eq("id", offer.vehicle_id)
              .maybeSingle()
          : Promise.resolve({ data: null, error: null }),
      ]);

      if (profileResult.error) throw new Error(profileResult.error.message);
      if (vehicleResult.error) throw new Error(vehicleResult.error.message);

      return {
        ...offer,
        profiles: profileResult.data ?? null,
        driver_vehicles: vehicleResult.data ?? null,
      };
    }),
  );

  return { ride, offers };
}

export async function acceptPassengerDriverOffer(
  passengerId: string,
  rideId: string,
  offerId: string,
) {
  // Validate all three identities before the atomic DB operation. This blocks
  // stale offer IDs and offers belonging to another passenger/ride.
  const { data: rideBefore, error: rideBeforeError } = await supabaseAdmin
    .from("rides")
    .select("id,passenger_id,ride_status,driver_id")
    .eq("id", rideId)
    .eq("passenger_id", passengerId)
    .single();

  if (rideBeforeError || !rideBefore) throw new Error("Safari ride not found.");

  if (!["requested", "searching"].includes(rideBefore.ride_status)) {
    if (rideBefore.ride_status === "driver_assigned" && rideBefore.driver_id) {
      const { data: alreadyAssigned, error: assignedError } = await supabaseAdmin
        .from("rides")
        .select(`*, ride_categories (code,name,vehicle_type,service_tier)`)
        .eq("id", rideId)
        .single();
      if (assignedError || !alreadyAssigned) throw new Error("Safari ride could not be loaded.");
      return alreadyAssigned;
    }
    throw new Error("This Safari ride is no longer accepting driver offers.");
  }

  const { data: offerBefore, error: offerBeforeError } = await supabaseAdmin
    .from("ride_driver_offers")
    .select("id,ride_id,driver_id,vehicle_id,offered_fare,offer_status,expires_at")
    .eq("id", offerId)
    .eq("ride_id", rideId)
    .single();

  if (offerBeforeError || !offerBefore) {
    throw new Error("This driver offer does not belong to this Safari ride.");
  }
  if (offerBefore.offer_status !== "pending") {
    throw new Error("This Safari driver offer is no longer pending.");
  }
  if (new Date(offerBefore.expires_at).getTime() <= Date.now()) {
    throw new Error("This Safari driver offer has expired.");
  }

  const { data: acceptedRideId, error: rpcError } = await supabaseAdmin.rpc(
    "accept_safari_driver_offer",
    {
      p_offer_id: offerId,
      p_passenger_id: passengerId,
      p_ride_id: rideId,
    },
  );

  if (rpcError || !acceptedRideId) {
    throw new Error(
      rpcError?.message ?? "Safari could not accept the driver offer.",
    );
  }

  const { data: ride, error: rideError } = await supabaseAdmin
    .from("rides")
    .select(`
      *,
      ride_categories (
        code,
        name,
        vehicle_type,
        service_tier
      )
    `)
    .eq("id", acceptedRideId)
    .eq("passenger_id", passengerId)
    .single();

  if (rideError || !ride) throw new Error("Safari ride could not be loaded.");

  // Notifications are deliberately outside the transaction: notification
  // failure must never roll back or make a successfully accepted ride look
  // failed to the passenger.
  if (ride.driver_id) {
    const notificationResult = await supabaseAdmin.from("notifications").insert({
      user_id: ride.driver_id,
      notification_type: "driver_offer_accepted",
      title: "Passenger accepted your offer",
      body: `Your PKR ${Number(ride.agreed_fare ?? 0).toLocaleString("en-PK")} offer was accepted.`,
      data: { rideId: ride.id, offerId },
      is_read: false,
    });
    if (notificationResult.error) {
      console.error("[Safari Matching] accepted-offer notification failed", notificationResult.error.message);
    }
  }

  return ride;
}

export async function rejectRideRequest(
  driverId: string,
  invitationId: string,
  reason?: string | null,
) {
  const { data, error } = await supabaseAdmin
    .from("ride_match_requests")
    .update({
      match_status: "rejected",
      rejection_reason: reason ?? null,
      responded_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", invitationId)
    .eq("driver_id", driverId)
    .eq("match_status", "offered")
    .select("*")
    .single();

  if (error) throw new Error(error.message);
  return data;
}


export async function listNearbyDriversForRide(
  passengerId: string,
  rideId: string,
) {
  const { data: ride, error: rideError } = await supabaseAdmin
    .from("rides")
    .select(`
      id,
      passenger_id,
      pickup_latitude,
      pickup_longitude,
      ride_status,
      ride_categories (
        code,
        name,
        vehicle_type,
        service_tier
      )
    `)
    .eq("id", rideId)
    .eq("passenger_id", passengerId)
    .single();

  if (rideError || !ride) {
    throw new Error("Safari ride was not found.");
  }

  const categoryCode = ride.ride_categories?.[0]?.code ?? null;

  if (!categoryCode) {
    throw new Error("Safari ride category is unavailable.");
  }

  const { data: drivers, error: driversError } = await supabaseAdmin
    .from("driver_profiles")
    .select("user_id")
    .eq("onboarding_status", "approved")
    .eq("verification_status", "verified")
    .eq("is_online", true)
    .eq("is_available", true);

  if (driversError) {
    throw new Error(driversError.message);
  }

  const nearby: any[] = [];

  for (const driver of drivers ?? []) {
    const [
      vehicleResult,
      locationResult,
      profileResult,
    ] = await Promise.all([
      supabaseAdmin
        .from("driver_vehicles")
        .select(
          "id,make,model,color,plate_number,vehicle_type,ride_category,verification_status",
        )
        .eq("driver_id", driver.user_id)
        .eq("is_primary", true)
        .eq("is_active", true)
        .eq("verification_status", "verified")
        .eq("ride_category", categoryCode)
        .maybeSingle(),

      supabaseAdmin
        .from("driver_locations")
        .select(
          "driver_id,latitude,longitude,heading,updated_at,is_online",
        )
        .eq("driver_id", driver.user_id)
        .eq("is_online", true)
        .maybeSingle(),

      supabaseAdmin
        .from("profiles")
        .select(
          "id,full_name,average_rating,rating_count",
        )
        .eq("id", driver.user_id)
        .maybeSingle(),
    ]);

    if (vehicleResult.error) {
      throw new Error(vehicleResult.error.message);
    }

    if (locationResult.error) {
      throw new Error(locationResult.error.message);
    }

    if (profileResult.error) {
      throw new Error(profileResult.error.message);
    }

    const vehicle = vehicleResult.data;
    const location = locationResult.data;

    if (!vehicle || !location) continue;

    const distanceKm = haversineKm(
      Number(location.latitude),
      Number(location.longitude),
      Number(ride.pickup_latitude),
      Number(ride.pickup_longitude),
    );

    if (distanceKm > 15) continue;

    nearby.push({
      driverId: driver.user_id,
      latitude: Number(location.latitude),
      longitude: Number(location.longitude),
      heading: Number(location.heading ?? 0),
      distanceKm:
        Math.round(distanceKm * 100) / 100,
      estimatedPickupMinutes:
        Math.max(
          1,
          Math.round((distanceKm / 24) * 60),
        ),
      vehicleType:
        vehicle.vehicle_type ??
        ride.ride_categories?.[0]?.vehicle_type ??
        "car",
      rideCategory: vehicle.ride_category,
      vehicle,
      profile: profileResult.data ?? null,
    });
  }

  nearby.sort(
    (a, b) =>
      a.distanceKm - b.distanceKm,
  );

  return nearby.slice(0, 30);
}

