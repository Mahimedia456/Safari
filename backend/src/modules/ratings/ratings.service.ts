import { supabaseAdmin } from "../../lib/supabase.js";

type RideParticipantSnapshot = {
  id: string;
  full_name?: string | null;
  phone?: string | null;
  avatar_url?: string | null;
  average_rating?: number | string | null;
  rating_count?: number | null;
};

async function getRideSnapshot(rideId: string) {
  /*
   * Do not use PostgREST relationship embeds from rides here. Safari has had
   * legacy city and profile foreign keys in production; explicit hydration
   * keeps receipt/rating APIs stable even while old data is being migrated.
   */
  const { data: ride, error: rideError } = await supabaseAdmin
    .from("rides")
    .select("*")
    .eq("id", rideId)
    .single();

  if (rideError || !ride) throw new Error("Safari ride not found.");

  const [
    categoryResult,
    driverResult,
    passengerResult,
    vehicleResult,
    cityResult,
  ] = await Promise.all([
    ride.ride_category_id
      ? supabaseAdmin
          .from("ride_categories")
          .select("id,code,name,vehicle_type,passenger_capacity,service_tier")
          .eq("id", ride.ride_category_id)
          .maybeSingle()
      : Promise.resolve({ data: null, error: null }),

    ride.driver_id
      ? supabaseAdmin
          .from("profiles")
          .select("id,full_name,phone,avatar_url,average_rating,rating_count")
          .eq("id", ride.driver_id)
          .maybeSingle()
      : Promise.resolve({ data: null, error: null }),

    ride.passenger_id
      ? supabaseAdmin
          .from("profiles")
          .select("id,full_name,phone,avatar_url,average_rating,rating_count")
          .eq("id", ride.passenger_id)
          .maybeSingle()
      : Promise.resolve({ data: null, error: null }),

    ride.vehicle_id
      ? supabaseAdmin
          .from("driver_vehicles")
          .select("id,make,model,year,color,plate_number,vehicle_type,ride_category")
          .eq("id", ride.vehicle_id)
          .maybeSingle()
      : Promise.resolve({ data: null, error: null }),

    ride.city_id
      ? supabaseAdmin
          .from("service_cities")
          .select("id,name,city_code,country_code,currency_code")
          .eq("id", ride.city_id)
          .maybeSingle()
      : Promise.resolve({ data: null, error: null }),
  ]);

  for (const result of [
    categoryResult,
    driverResult,
    passengerResult,
    vehicleResult,
    cityResult,
  ]) {
    if (result.error) throw new Error(result.error.message);
  }

  return {
    ...ride,
    ride_categories: categoryResult.data ?? null,
    driver_profile: (driverResult.data ?? null) as RideParticipantSnapshot | null,
    passenger_profile: (passengerResult.data ?? null) as RideParticipantSnapshot | null,
    driver_vehicles: vehicleResult.data ?? null,
    service_cities: cityResult.data ?? null,
  };
}

export async function ensureRideReceipt(rideId: string) {
  const { data: existing, error: existingError } = await supabaseAdmin
    .from("ride_receipts")
    .select("*")
    .eq("ride_id", rideId)
    .maybeSingle();

  if (existingError) throw new Error(existingError.message);
  if (existing) return existing;

  const ride = await getRideSnapshot(rideId);

  if (ride.ride_status !== "completed") {
    throw new Error("A receipt is available only for a completed Safari ride.");
  }

  let quote: Record<string, any> | null = null;

  if (ride.quote_id) {
    const { data, error } = await supabaseAdmin
      .from("ride_quotes")
      .select("base_fare,distance_fare,time_fare,booking_fee,subtotal,estimated_total")
      .eq("id", ride.quote_id)
      .maybeSingle();

    if (error) throw new Error(error.message);
    quote = data;
  }

  const baseFare = Number(quote?.base_fare ?? 0);
  const distanceFare = Number(quote?.distance_fare ?? 0);
  const timeFare = Number(quote?.time_fare ?? 0);
  const bookingFee = Number(quote?.booking_fee ?? 0);
  const subtotal = Number(
    quote?.subtotal ?? baseFare + distanceFare + timeFare + bookingFee,
  );

  const finalTotal = Number(
    ride.final_fare ?? ride.agreed_fare ?? ride.estimated_fare ?? quote?.estimated_total ?? subtotal,
  );

  const surgeAmount = Math.max(0, finalTotal - subtotal);

  const { data, error } = await supabaseAdmin
    .from("ride_receipts")
    .insert({
      ride_id: ride.id,
      passenger_id: ride.passenger_id,
      driver_id: ride.driver_id,
      currency_code: ride.currency_code ?? "PKR",
      base_fare: baseFare,
      distance_fare: distanceFare,
      time_fare: timeFare,
      booking_fee: bookingFee,
      waiting_fee: 0,
      surge_amount: surgeAmount,
      discount_amount: 0,
      tip_amount: 0,
      subtotal,
      total: finalTotal,
      payment_method: ride.payment_method ?? "cash",
      payment_status: ride.payment_status ?? "pending",
    })
    .select("*")
    .single();

  if (error) {
    /* A concurrent passenger/driver request may have created the same receipt. */
    const { data: raced, error: racedError } = await supabaseAdmin
      .from("ride_receipts")
      .select("*")
      .eq("ride_id", rideId)
      .maybeSingle();

    if (racedError || !raced) throw new Error(error.message);
    return raced;
  }

  return data;
}

export async function getRideReceipt(userId: string, rideId: string) {
  const ride = await getRideSnapshot(rideId);

  if (ride.passenger_id !== userId && ride.driver_id !== userId) {
    throw new Error("You do not have access to this Safari receipt.");
  }

  const receipt = await ensureRideReceipt(rideId);

  return {
    ...receipt,
    ride,
  };
}

export async function submitRideRating(
  reviewerId: string,
  rideId: string,
  input: {
    rating: number;
    comment?: string | null;
    tags?: string[];
  },
) {
  const { data: ride, error: rideError } = await supabaseAdmin
    .from("rides")
    .select("id,passenger_id,driver_id,ride_status")
    .eq("id", rideId)
    .single();

  if (rideError || !ride) throw new Error("Safari ride not found.");

  if (ride.ride_status !== "completed") {
    throw new Error("Safari ratings can be submitted after trip completion.");
  }

  let revieweeId: string;
  let reviewerType: "passenger" | "driver";

  if (ride.passenger_id === reviewerId) {
    if (!ride.driver_id) throw new Error("This Safari ride has no assigned driver.");
    revieweeId = ride.driver_id;
    reviewerType = "passenger";
  } else if (ride.driver_id === reviewerId) {
    revieweeId = ride.passenger_id;
    reviewerType = "driver";
  } else {
    throw new Error("You did not participate in this Safari ride.");
  }

  const { data, error } = await supabaseAdmin
    .from("ride_ratings")
    .upsert(
      {
        ride_id: rideId,
        reviewer_id: reviewerId,
        reviewee_id: revieweeId,
        reviewer_type: reviewerType,
        rating: input.rating,
        comment: input.comment ?? null,
        tags: input.tags ?? [],
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "ride_id,reviewer_id",
      },
    )
    .select("*")
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function getRideRatings(userId: string, rideId: string) {
  const { data: ride, error: rideError } = await supabaseAdmin
    .from("rides")
    .select("passenger_id,driver_id")
    .eq("id", rideId)
    .single();

  if (rideError || !ride) throw new Error("Safari ride not found.");

  if (ride.passenger_id !== userId && ride.driver_id !== userId) {
    throw new Error("You do not have access to these Safari ratings.");
  }

  const { data, error } = await supabaseAdmin
    .from("ride_ratings")
    .select("*")
    .eq("ride_id", rideId)
    .order("created_at");

  if (error) throw new Error(error.message);
  return data;
}

export async function getRideRatingStatus(
  reviewerId: string,
  rideId: string,
) {
  const { data: ride, error: rideError } =
    await supabaseAdmin
      .from("rides")
      .select("id,passenger_id,driver_id")
      .eq("id", rideId)
      .single();

  if (rideError || !ride) {
    throw new Error("Safari ride not found.");
  }

  if (
    ride.passenger_id !== reviewerId &&
    ride.driver_id !== reviewerId
  ) {
    throw new Error(
      "You did not participate in this Safari ride.",
    );
  }

  const { data: rating, error } =
    await supabaseAdmin
      .from("ride_ratings")
      .select("*")
      .eq("ride_id", rideId)
      .eq("reviewer_id", reviewerId)
      .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return {
    rated: Boolean(rating),
    rating: rating ?? null,
  };
}

async function assertExperienceOwnership(
  customerId: string,
  type: "food" | "grocery" | "pharmacy" | "service",
  sourceId: string,
) {
  if (type === "food") {
    const result = await supabaseAdmin
      .from("food_orders")
      .select("id,status")
      .eq("id", sourceId)
      .eq("passenger_id", customerId)
      .single();

    if (result.error || !result.data) {
      throw new Error("Safari Food order not found.");
    }

    return result.data.status;
  }

  if (
    type === "grocery" ||
    type === "pharmacy"
  ) {
    const result = await supabaseAdmin
      .from("commerce_orders")
      .select("id,status,order_type")
      .eq("id", sourceId)
      .eq("passenger_id", customerId)
      .eq("order_type", type)
      .single();

    if (result.error || !result.data) {
      throw new Error("Safari order not found.");
    }

    return result.data.status;
  }

  const result = await supabaseAdmin
    .from("service_bookings")
    .select("id,booking_status")
    .eq("id", sourceId)
    .eq("customer_id", customerId)
    .single();

  if (result.error || !result.data) {
    throw new Error("Safari service booking not found.");
  }

  return result.data.booking_status;
}

export async function getExperienceRatingStatus(
  customerId: string,
  type: "food" | "grocery" | "pharmacy" | "service",
  sourceId: string,
) {
  await assertExperienceOwnership(
    customerId,
    type,
    sourceId,
  );

  const { data: rating, error } =
    await supabaseAdmin
      .from("experience_ratings")
      .select("*")
      .eq("customer_id", customerId)
      .eq("experience_type", type)
      .eq("source_id", sourceId)
      .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return {
    rated: Boolean(rating),
    rating: rating ?? null,
  };
}

export async function submitExperienceRating(
  customerId: string,
  type: "food" | "grocery" | "pharmacy" | "service",
  sourceId: string,
  input: {
    rating: number;
    comment?: string | null;
    tags?: string[];
  },
) {
  if (type === "food") {
    const result = await supabaseAdmin
      .from("food_orders")
      .select("id,status")
      .eq("id", sourceId)
      .eq("passenger_id", customerId)
      .single();

    if (result.error || result.data?.status !== "delivered") {
      throw new Error("Only delivered Safari Food orders can be rated.");
    }
  } else if (type === "grocery" || type === "pharmacy") {
    const result = await supabaseAdmin
      .from("commerce_orders")
      .select("id,status,order_type")
      .eq("id", sourceId)
      .eq("passenger_id", customerId)
      .eq("order_type", type)
      .single();

    if (result.error || result.data?.status !== "delivered") {
      throw new Error("Only delivered Safari orders can be rated.");
    }
  } else {
    const result = await supabaseAdmin
      .from("service_bookings")
      .select("id,booking_status")
      .eq("id", sourceId)
      .eq("customer_id", customerId)
      .single();

    if (result.error || result.data?.booking_status !== "completed") {
      throw new Error("Only completed Safari services can be rated.");
    }
  }

  const { data, error } = await supabaseAdmin
    .from("experience_ratings")
    .upsert(
      {
        customer_id: customerId,
        experience_type: type,
        source_id: sourceId,
        rating: input.rating,
        comment: input.comment ?? null,
        tags: input.tags ?? [],
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "customer_id,experience_type,source_id",
      },
    )
    .select("*")
    .single();

  if (error) throw new Error(error.message);
  return data;
}
