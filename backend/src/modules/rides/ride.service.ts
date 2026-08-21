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

function roundMoney(value: number) {
  return Math.round(value * 100) / 100;
}

async function findCityForPickup(
  countryCode: "PK" | "DE",
  latitude: number,
  longitude: number,
) {
  const { data: cities, error: cityError } = await supabaseAdmin
    .from("service_cities")
    .select("*")
    .eq("country_code", countryCode)
    .eq("is_active", true);

  if (cityError) throw new Error(cityError.message);

  for (const city of cities) {
    const { data: zones, error: zoneError } = await supabaseAdmin
      .from("service_zones")
      .select("*")
      .eq("city_id", city.id)
      .eq("is_active", true)
      .eq("pickup_allowed", true);

    if (zoneError) throw new Error(zoneError.message);

    const matchingZone = zones.find((zone) => {
      const insideLatitude =
        zone.min_latitude == null ||
        zone.max_latitude == null ||
        (latitude >= Number(zone.min_latitude) &&
          latitude <= Number(zone.max_latitude));

      const insideLongitude =
        zone.min_longitude == null ||
        zone.max_longitude == null ||
        (longitude >= Number(zone.min_longitude) &&
          longitude <= Number(zone.max_longitude));

      return insideLatitude && insideLongitude;
    });

    if (matchingZone) {
      return { city, zone: matchingZone };
    }
  }

  return null;
}

export async function getRideCatalog(
  countryCode: "PK" | "DE",
  latitude?: number,
  longitude?: number,
) {
  let city: any = null;
  let zone: any = null;

  if (latitude !== undefined && longitude !== undefined) {
    const match = await findCityForPickup(
      countryCode,
      latitude,
      longitude,
    );

    city = match?.city ?? null;
    zone = match?.zone ?? null;
  }

  if (!city) {
    const { data, error } = await supabaseAdmin
      .from("service_cities")
      .select("*")
      .eq("country_code", countryCode)
      .eq("is_active", true)
      .order("name")
      .limit(1)
      .maybeSingle();

    if (error) throw new Error(error.message);
    city = data;
  }

  const { data: categories, error: categoryError } = await supabaseAdmin
    .from("ride_categories")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");

  if (categoryError) throw new Error(categoryError.message);

  if (!city) {
    return {
      city: null,
      zone: null,
      serviceAvailable: false,
      categories: [],
      settings: null,
    };
  }

  const [pricingResult, settingsResult] = await Promise.all([
    supabaseAdmin
      .from("ride_pricing_rules")
      .select("*")
      .eq("city_id", city.id)
      .eq("is_active", true),

    supabaseAdmin
      .from("ride_service_settings")
      .select("*")
      .eq("city_id", city.id)
      .maybeSingle(),
  ]);

  if (pricingResult.error) throw new Error(pricingResult.error.message);
  if (settingsResult.error) throw new Error(settingsResult.error.message);

  const pricingMap = new Map(
    pricingResult.data.map((row) => [row.ride_category_id, row]),
  );

  return {
    city,
    zone,
    serviceAvailable: Boolean(city),
    settings: settingsResult.data,
    categories: categories
      .map((category) => ({
        ...category,
        pricing: pricingMap.get(category.id) ?? null,
      }))
      .filter((category) => category.pricing),
  };
}

export async function createFareQuotes(
  passengerId: string,
  input: {
    countryCode: "PK" | "DE";
    pickupAddress: string;
    pickupLatitude: number;
    pickupLongitude: number;
    dropoffAddress: string;
    dropoffLatitude: number;
    dropoffLongitude: number;
    paymentMethod: "cash" | "wallet" | "card";
  },
) {
  const serviceMatch = await findCityForPickup(
    input.countryCode,
    input.pickupLatitude,
    input.pickupLongitude,
  );

  if (!serviceMatch) {
    throw new Error("Safari Ride is not available at this pickup location yet.");
  }

  const { city } = serviceMatch;

  const catalog = await getRideCatalog(
    input.countryCode,
    input.pickupLatitude,
    input.pickupLongitude,
  );

  const straightLineDistance = haversineKm(
    input.pickupLatitude,
    input.pickupLongitude,
    input.dropoffLatitude,
    input.dropoffLongitude,
  );

  // Phase 06 fallback route estimate.
  // A routing engine / maps API can replace this later without changing quote tables.
  const estimatedDistanceKm = Math.max(1, straightLineDistance * 1.22);
  const estimatedDurationMinutes = Math.max(
    5,
    (estimatedDistanceKm / 28) * 60,
  );

  const maxTripDistance = Number(
    catalog.settings?.max_trip_distance_km ?? 80,
  );

  if (estimatedDistanceKm > maxTripDistance) {
    throw new Error(
      `This trip exceeds the current Safari maximum trip distance of ${maxTripDistance} km.`,
    );
  }

  const quoteAgeSeconds = Number(
    catalog.settings?.max_quote_age_seconds ?? 300,
  );

  const expiresAt = new Date(
    Date.now() + quoteAgeSeconds * 1000,
  ).toISOString();

  const rows = catalog.categories.map((category: any) => {
    const pricing = category.pricing;

    const baseFare = Number(pricing.base_fare);
    const distanceFare =
      estimatedDistanceKm * Number(pricing.per_km_rate);
    const timeFare =
      estimatedDurationMinutes * Number(pricing.per_minute_rate);
    const bookingFee = Number(pricing.booking_fee);
    const surgeMultiplier = Number(
      pricing.default_surge_multiplier ?? 1,
    );

    const subtotal =
      baseFare + distanceFare + timeFare + bookingFee;

    const estimatedTotal = Math.max(
      Number(pricing.minimum_fare),
      subtotal * surgeMultiplier,
    );

    return {
      passenger_id: passengerId,
      city_id: city.id,
      ride_category_id: category.id,

      pickup_address: input.pickupAddress,
      pickup_latitude: input.pickupLatitude,
      pickup_longitude: input.pickupLongitude,

      dropoff_address: input.dropoffAddress,
      dropoff_latitude: input.dropoffLatitude,
      dropoff_longitude: input.dropoffLongitude,

      estimated_distance_km: roundMoney(estimatedDistanceKm),
      estimated_duration_minutes: roundMoney(estimatedDurationMinutes),

      currency_code: pricing.currency_code,

      base_fare: roundMoney(baseFare),
      distance_fare: roundMoney(distanceFare),
      time_fare: roundMoney(timeFare),
      booking_fee: roundMoney(bookingFee),
      surge_multiplier: surgeMultiplier,
      subtotal: roundMoney(subtotal),
      estimated_total: roundMoney(estimatedTotal),

      payment_method: input.paymentMethod,
      quote_status: "active",
      expires_at: expiresAt,
    };
  });

  const { data, error } = await supabaseAdmin
    .from("ride_quotes")
    .insert(rows)
    .select(`
      *,
      ride_categories (
        code,
        name,
        description,
        passenger_capacity,
        vehicle_type,
        icon_key,
        color_key
      )
    `);

  if (error) throw new Error(error.message);

  return {
    city,
    estimatedDistanceKm: roundMoney(estimatedDistanceKm),
    estimatedDurationMinutes: roundMoney(estimatedDurationMinutes),
    expiresAt,
    quotes: data,
  };
}

export async function createRideFromQuote(
  passengerId: string,
  input: {
    quoteId: string;
    bookingType: "now" | "scheduled";
    scheduledFor?: string | null;
    pickupNote?: string | null;
  },
) {
  const { data: quote, error: quoteError } = await supabaseAdmin
    .from("ride_quotes")
    .select("*")
    .eq("id", input.quoteId)
    .eq("passenger_id", passengerId)
    .eq("quote_status", "active")
    .single();

  if (quoteError || !quote) {
    throw new Error("The selected Safari fare quote is no longer available.");
  }

  if (new Date(quote.expires_at).getTime() <= Date.now()) {
    await supabaseAdmin
      .from("ride_quotes")
      .update({ quote_status: "expired" })
      .eq("id", quote.id);

    throw new Error("This Safari fare quote has expired. Request a new quote.");
  }

  if (input.bookingType === "scheduled") {
    if (!input.scheduledFor) {
      throw new Error("Scheduled rides require a pickup time.");
    }

    const { data: settings, error: settingsError } = await supabaseAdmin
      .from("ride_service_settings")
      .select("*")
      .eq("city_id", quote.city_id)
      .single();

    if (settingsError) throw new Error(settingsError.message);

    if (!settings.allow_scheduled_rides) {
      throw new Error("Scheduled rides are not currently available in this city.");
    }

    const scheduledTime = new Date(input.scheduledFor).getTime();
    const minimumTime =
      Date.now() +
      Number(settings.minimum_schedule_lead_minutes) * 60 * 1000;

    const maximumTime =
      Date.now() +
      Number(settings.maximum_schedule_days) * 24 * 60 * 60 * 1000;

    if (scheduledTime < minimumTime || scheduledTime > maximumTime) {
      throw new Error(
        "The requested scheduled pickup time is outside Safari's allowed booking window.",
      );
    }
  }

  const { data: rideNumberResult, error: rideNumberError } =
    await supabaseAdmin.rpc("generate_safari_ride_number");

  if (rideNumberError) throw new Error(rideNumberError.message);

  const initialStatus =
    input.bookingType === "scheduled" ? "requested" : "searching";

  const { data: ride, error: rideError } = await supabaseAdmin
    .from("rides")
    .insert({
      passenger_id: passengerId,
      quote_id: quote.id,
      city_id: quote.city_id,
      ride_category_id: quote.ride_category_id,
      ride_number: rideNumberResult,
      ride_status: initialStatus,
      booking_type: input.bookingType,
      scheduled_for:
        input.bookingType === "scheduled"
          ? input.scheduledFor
          : null,

      pickup_address: quote.pickup_address,
      pickup_latitude: quote.pickup_latitude,
      pickup_longitude: quote.pickup_longitude,

      dropoff_address: quote.dropoff_address,
      dropoff_latitude: quote.dropoff_latitude,
      dropoff_longitude: quote.dropoff_longitude,

      pickup_note: input.pickupNote ?? null,

      estimated_distance_km: quote.estimated_distance_km,
      estimated_duration_minutes: quote.estimated_duration_minutes,

      currency_code: quote.currency_code,
      estimated_fare: quote.estimated_total,

      payment_method: quote.payment_method,
      payment_status:
        quote.payment_method === "cash"
          ? "cash_due"
          : "pending",
    })
    .select(`
      *,
      ride_categories (
        code,
        name,
        passenger_capacity,
        vehicle_type
      ),
      service_cities (
        name,
        city_code,
        currency_code
      )
    `)
    .single();

  if (rideError) throw new Error(rideError.message);

  await Promise.all([
    supabaseAdmin
      .from("ride_quotes")
      .update({ quote_status: "used" })
      .eq("id", quote.id),

    supabaseAdmin
      .from("ride_status_events")
      .insert({
        ride_id: ride.id,
        from_status: null,
        to_status: initialStatus,
        actor_type: "passenger",
        actor_user_id: passengerId,
        note:
          input.bookingType === "scheduled"
            ? "Passenger scheduled a Safari ride."
            : "Passenger requested a Safari ride.",
      }),
  ]);

  return ride;
}

export async function listPassengerRides(
  passengerId: string,
  status?: string,
) {
  let builder = supabaseAdmin
    .from("rides")
    .select(`
      *,
      ride_categories (
        code,
        name,
        passenger_capacity,
        vehicle_type
      ),
      service_cities (
        name,
        city_code
      )
    `)
    .eq("passenger_id", passengerId)
    .order("created_at", { ascending: false });

  if (status) {
    builder = builder.eq("ride_status", status);
  }

  const { data, error } = await builder;

  if (error) throw new Error(error.message);
  return data;
}

export async function getPassengerRide(
  passengerId: string,
  rideId: string,
) {
  const [rideResult, eventsResult] = await Promise.all([
    supabaseAdmin
      .from("rides")
      .select(`
        *,
        ride_categories (
          code,
          name,
          passenger_capacity,
          vehicle_type
        ),
        service_cities (
          name,
          city_code,
          currency_code
        )
      `)
      .eq("id", rideId)
      .eq("passenger_id", passengerId)
      .single(),

    supabaseAdmin
      .from("ride_status_events")
      .select("*")
      .eq("ride_id", rideId)
      .order("created_at", { ascending: true }),
  ]);

  if (rideResult.error) throw new Error(rideResult.error.message);
  if (eventsResult.error) throw new Error(eventsResult.error.message);

  return {
    ride: rideResult.data,
    events: eventsResult.data,
  };
}

export async function cancelPassengerRide(
  passengerId: string,
  rideId: string,
  reason: string,
) {
  const { data: ride, error: fetchError } = await supabaseAdmin
    .from("rides")
    .select("id,ride_status")
    .eq("id", rideId)
    .eq("passenger_id", passengerId)
    .single();

  if (fetchError || !ride) {
    throw new Error("Safari ride not found.");
  }

  const cancellable = new Set([
    "requested",
    "searching",
    "driver_assigned",
    "driver_arriving",
    "driver_arrived",
  ]);

  if (!cancellable.has(ride.ride_status)) {
    throw new Error("This Safari ride can no longer be cancelled.");
  }

  const now = new Date().toISOString();

  const { data, error } = await supabaseAdmin
    .from("rides")
    .update({
      ride_status: "cancelled_by_passenger",
      passenger_cancel_reason: reason,
      cancelled_at: now,
      updated_at: now,
    })
    .eq("id", rideId)
    .eq("passenger_id", passengerId)
    .select("*")
    .single();

  if (error) throw new Error(error.message);

  await supabaseAdmin.from("ride_status_events").insert({
    ride_id: rideId,
    from_status: ride.ride_status,
    to_status: "cancelled_by_passenger",
    actor_type: "passenger",
    actor_user_id: passengerId,
    note: reason,
  });

  return data;
}
