import { supabaseAdmin } from "../../lib/supabase.js";

async function ensureDriverProfile(userId: string) {
  const { data: existing, error: findError } = await supabaseAdmin
    .from("driver_profiles")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (findError) throw new Error(findError.message);
  if (existing) return existing;

  const { data, error } = await supabaseAdmin
    .from("driver_profiles")
    .insert({
      user_id: userId,
      onboarding_status: "draft",
      verification_status: "not_submitted",
      is_online: false,
      is_available: false,
      driving_experience_years: 0,
    })
    .select("*")
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function getDriverOverview(userId: string) {
  await ensureDriverProfile(userId);

  const [
    profileResult,
    driverResult,
    vehiclesResult,
    documentsResult,
    eventsResult,
  ] = await Promise.all([
    supabaseAdmin
      .from("profiles")
      .select(
        "id,full_name,email,phone,avatar_url,average_rating,rating_count,account_type,app_mode,status,country_code,is_onboarded,created_at,updated_at",
      )
      .eq("id", userId)
      .single(),

    supabaseAdmin
      .from("driver_profiles")
      .select("*")
      .eq("user_id", userId)
      .single(),

    supabaseAdmin
      .from("driver_vehicles")
      .select("*")
      .eq("driver_id", userId)
      .order("is_primary", { ascending: false })
      .order("created_at", { ascending: true }),

    supabaseAdmin
      .from("driver_documents")
      .select("*")
      .eq("driver_id", userId)
      .order("created_at", { ascending: false }),

    supabaseAdmin
      .from("driver_verification_events")
      .select("*")
      .eq("driver_id", userId)
      .order("created_at", { ascending: false })
      .limit(50),
  ]);

  if (profileResult.error) throw new Error(profileResult.error.message);
  if (driverResult.error) throw new Error(driverResult.error.message);
  if (vehiclesResult.error) throw new Error(vehiclesResult.error.message);
  if (documentsResult.error) throw new Error(documentsResult.error.message);
  if (eventsResult.error) throw new Error(eventsResult.error.message);

  return {
    profile: profileResult.data,
    driverProfile: driverResult.data,
    vehicles: vehiclesResult.data ?? [],
    documents: documentsResult.data ?? [],
    verificationEvents: eventsResult.data ?? [],
  };
}

export async function updateDriverProfile(
  userId: string,
  updates: Record<string, unknown>,
) {
  await ensureDriverProfile(userId);

  const { data, error } = await supabaseAdmin
    .from("driver_profiles")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", userId)
    .select("*")
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function submitDriverApplication(userId: string) {
  const overview = await getDriverOverview(userId);

  if ((overview.vehicles ?? []).length === 0) {
    throw new Error(
      "Add at least one vehicle before submitting your Safari driver application.",
    );
  }

  const primaryVehicle =
    overview.vehicles.find((vehicle: any) => vehicle.is_primary) ??
    overview.vehicles[0];

  if (!primaryVehicle) {
    throw new Error("Safari could not find your driver vehicle.");
  }

  const { data, error } = await supabaseAdmin
    .from("driver_profiles")
    .update({
      onboarding_status: "submitted",
      verification_status: "in_review",
      is_online: false,
      is_available: false,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", userId)
    .select("*")
    .single();

  if (error) throw new Error(error.message);

  await supabaseAdmin.from("driver_verification_events").insert({
    driver_id: userId,
    event_type: "submitted",
    note: "Driver submitted onboarding for verification.",
    actor_user_id: userId,
  });

  return data;
}

function assertVehicleCategory(
  vehicleType: string,
  rideCategory: string,
) {
  if (
    vehicleType === "car" &&
    !["economy", "premium"].includes(rideCategory)
  ) {
    throw new Error(
      "Cars can only be registered for Safari Go or Safari Premium.",
    );
  }

  if (
    vehicleType === "bike" &&
    rideCategory !== "bike"
  ) {
    throw new Error(
      "Bike vehicles must use the Safari Bike category.",
    );
  }

  if (
    vehicleType === "rickshaw" &&
    rideCategory !== "rickshaw"
  ) {
    throw new Error(
      "Rickshaw vehicles must use the Safari Rickshaw category.",
    );
  }
}

export async function createVehicle(
  userId: string,
  input: {
    make: string;
    model: string;
    year: number;
    color: string;
    plateNumber: string;
    vehicleType: string;
    rideCategory: string;
    seats: number;
    registrationNumber?: string | null;
    registrationExpiry?: string | null;
    insuranceNumber?: string | null;
    insuranceExpiry?: string | null;
    isPrimary?: boolean;
  },
) {
  await ensureDriverProfile(userId);

  assertVehicleCategory(
    input.vehicleType,
    input.rideCategory,
  );

  const normalizedPlate = input.plateNumber
    .trim()
    .toUpperCase();

  const { data: duplicate, error: duplicateError } =
    await supabaseAdmin
      .from("driver_vehicles")
      .select("id,driver_id")
      .eq("plate_number", normalizedPlate)
      .maybeSingle();

  if (duplicateError) throw new Error(duplicateError.message);

  if (duplicate && duplicate.driver_id !== userId) {
    throw new Error(
      "This vehicle registration plate is already linked to another Safari driver.",
    );
  }

  if (duplicate?.driver_id === userId) {
    throw new Error(
      "This vehicle is already added to your Safari driver account.",
    );
  }

  const { data: currentVehicles, error: currentVehiclesError } =
    await supabaseAdmin
      .from("driver_vehicles")
      .select("id")
      .eq("driver_id", userId);

  if (currentVehiclesError) {
    throw new Error(currentVehiclesError.message);
  }

  const shouldBePrimary =
    input.isPrimary === true ||
    (currentVehicles?.length ?? 0) === 0;

  if (shouldBePrimary) {
    const { error } = await supabaseAdmin
      .from("driver_vehicles")
      .update({
        is_primary: false,
        updated_at: new Date().toISOString(),
      })
      .eq("driver_id", userId);

    if (error) throw new Error(error.message);
  }

  const { data, error } = await supabaseAdmin
    .from("driver_vehicles")
    .insert({
      driver_id: userId,
      make: input.make.trim(),
      model: input.model.trim(),
      year: input.year,
      color: input.color.trim(),
      plate_number: normalizedPlate,
      vehicle_type: input.vehicleType,
      ride_category: input.rideCategory,
      seats: input.seats,
      registration_number: input.registrationNumber ?? null,
      registration_expiry: input.registrationExpiry ?? null,
      insurance_number: input.insuranceNumber ?? null,
      insurance_expiry: input.insuranceExpiry ?? null,
      is_primary: shouldBePrimary,
      is_active: true,
      verification_status: "pending",
    })
    .select("*")
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function updateVehicle(
  userId: string,
  vehicleId: string,
  updates: Record<string, unknown>,
) {
  const { data: current, error: currentError } = await supabaseAdmin
    .from("driver_vehicles")
    .select("*")
    .eq("id", vehicleId)
    .eq("driver_id", userId)
    .single();

  if (currentError || !current) {
    throw new Error("Safari driver vehicle was not found.");
  }

  const nextType =
    String(updates.vehicle_type ?? current.vehicle_type);

  const nextCategory =
    String(updates.ride_category ?? current.ride_category);

  assertVehicleCategory(
    nextType,
    nextCategory,
  );

  if (updates.plate_number) {
    updates.plate_number =
      String(updates.plate_number)
        .trim()
        .toUpperCase();
  }

  if (updates.is_primary === true) {
    const { error } = await supabaseAdmin
      .from("driver_vehicles")
      .update({
        is_primary: false,
        updated_at: new Date().toISOString(),
      })
      .eq("driver_id", userId);

    if (error) throw new Error(error.message);
  }

  const { data, error } = await supabaseAdmin
    .from("driver_vehicles")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", vehicleId)
    .eq("driver_id", userId)
    .select("*")
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function deleteVehicle(
  userId: string,
  vehicleId: string,
) {
  const { data: vehicle, error: findError } = await supabaseAdmin
    .from("driver_vehicles")
    .select("id,is_primary")
    .eq("id", vehicleId)
    .eq("driver_id", userId)
    .single();

  if (findError || !vehicle) {
    throw new Error("Safari driver vehicle was not found.");
  }

  const { error } = await supabaseAdmin
    .from("driver_vehicles")
    .delete()
    .eq("id", vehicleId)
    .eq("driver_id", userId);

  if (error) throw new Error(error.message);

  if (vehicle.is_primary) {
    const { data: next } = await supabaseAdmin
      .from("driver_vehicles")
      .select("id")
      .eq("driver_id", userId)
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();

    if (next?.id) {
      await supabaseAdmin
        .from("driver_vehicles")
        .update({
          is_primary: true,
          updated_at: new Date().toISOString(),
        })
        .eq("id", next.id);
    }
  }
}

export async function addDocument(
  userId: string,
  input: {
    vehicleId?: string | null;
    documentType: string;
    storageBucket?: string;
    storagePath: string;
    expiryDate?: string | null;
  },
) {
  await ensureDriverProfile(userId);

  const { data, error } = await supabaseAdmin
    .from("driver_documents")
    .insert({
      driver_id: userId,
      vehicle_id: input.vehicleId ?? null,
      document_type: input.documentType,
      storage_bucket: input.storageBucket ?? "driver-documents",
      storage_path: input.storagePath,
      expiry_date: input.expiryDate ?? null,
      status: "pending",
    })
    .select("*")
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function setDriverAvailability(
  userId: string,
  input: {
    isOnline: boolean;
    isAvailable: boolean;
  },
) {
  const driver = await ensureDriverProfile(userId);

  if (
    input.isOnline &&
    (
      driver.onboarding_status !== "approved" ||
      driver.verification_status !== "verified"
    )
  ) {
    throw new Error(
      "Safari driver verification must be approved before going online.",
    );
  }

  const { data: verifiedVehicle, error: vehicleError } =
    await supabaseAdmin
      .from("driver_vehicles")
      .select("id")
      .eq("driver_id", userId)
      .eq("is_active", true)
      .eq("verification_status", "verified")
      .limit(1)
      .maybeSingle();

  if (vehicleError) throw new Error(vehicleError.message);

  if (input.isOnline && !verifiedVehicle) {
    throw new Error(
      "A verified Safari vehicle is required before going online.",
    );
  }

  const { data, error } = await supabaseAdmin
    .from("driver_profiles")
    .update({
      is_online: input.isOnline,
      is_available: input.isOnline
        ? input.isAvailable
        : false,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", userId)
    .select("*")
    .single();

  if (error) throw new Error(error.message);
  return data;
}
