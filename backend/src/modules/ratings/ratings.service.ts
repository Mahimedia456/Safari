import { supabaseAdmin } from "../../lib/supabase.js";

export async function ensureRideReceipt(rideId: string) {
  const { data: existing, error: existingError } = await supabaseAdmin
    .from("ride_receipts")
    .select("*")
    .eq("ride_id", rideId)
    .maybeSingle();

  if (existingError) throw new Error(existingError.message);
  if (existing) return existing;

  const { data: ride, error: rideError } = await supabaseAdmin
    .from("rides")
    .select(`
      *,
      ride_quotes (*)
    `)
    .eq("id", rideId)
    .eq("ride_status", "completed")
    .single();

  if (rideError || !ride) {
    throw new Error("A receipt is available only for a completed Safari ride.");
  }

  const quote = ride.ride_quotes;

  const baseFare = Number(quote?.base_fare ?? 0);
  const distanceFare = Number(quote?.distance_fare ?? 0);
  const timeFare = Number(quote?.time_fare ?? 0);
  const bookingFee = Number(quote?.booking_fee ?? 0);

  const subtotal =
    baseFare + distanceFare + timeFare + bookingFee;

  const finalTotal = Number(
    ride.final_fare ?? ride.estimated_fare ?? subtotal,
  );

  const surgeAmount = Math.max(0, finalTotal - subtotal);

  const { data, error } = await supabaseAdmin
    .from("ride_receipts")
    .insert({
      ride_id: ride.id,
      passenger_id: ride.passenger_id,
      driver_id: ride.driver_id,
      currency_code: ride.currency_code,

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

      payment_method: ride.payment_method,
      payment_status: ride.payment_status,
    })
    .select("*")
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function getRideReceipt(
  userId: string,
  rideId: string,
) {
  const { data: ride, error: rideError } = await supabaseAdmin
    .from("rides")
    .select("id,passenger_id,driver_id,ride_status")
    .eq("id", rideId)
    .single();

  if (rideError || !ride) throw new Error("Safari ride not found.");

  if (ride.passenger_id !== userId && ride.driver_id !== userId) {
    throw new Error("You do not have access to this Safari receipt.");
  }

  return ensureRideReceipt(rideId);
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

export async function getRideRatings(
  userId: string,
  rideId: string,
) {
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
