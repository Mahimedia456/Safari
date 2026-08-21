import { supabaseAdmin } from "../../lib/supabase.js";

export async function getDriverOverview(userId: string) {
  const [profileResult, driverResult, vehiclesResult, documentsResult, eventsResult] =
    await Promise.all([
      supabaseAdmin
        .from("profiles")
        .select(
          "id,full_name,email,phone,avatar_url,account_type,app_mode,status,country_code,is_onboarded,created_at,updated_at",
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
    vehicles: vehiclesResult.data,
    documents: documentsResult.data,
    verificationEvents: eventsResult.data,
  };
}

export async function updateDriverProfile(
  userId: string,
  updates: Record<string, unknown>,
) {
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
  const { data, error } = await supabaseAdmin
    .from("driver_profiles")
    .update({
      onboarding_status: "submitted",
      verification_status: "in_review",
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
  if (input.isPrimary) {
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
      make: input.make,
      model: input.model,
      year: input.year,
      color: input.color,
      plate_number: input.plateNumber,
      vehicle_type: input.vehicleType,
      ride_category: input.rideCategory,
      seats: input.seats,
      registration_number: input.registrationNumber ?? null,
      registration_expiry: input.registrationExpiry ?? null,
      insurance_number: input.insuranceNumber ?? null,
      insurance_expiry: input.insuranceExpiry ?? null,
      is_primary: input.isPrimary ?? false,
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

export async function deleteVehicle(userId: string, vehicleId: string) {
  const { error } = await supabaseAdmin
    .from("driver_vehicles")
    .delete()
    .eq("id", vehicleId)
    .eq("driver_id", userId);

  if (error) throw new Error(error.message);
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
  const { data, error } = await supabaseAdmin
    .from("driver_profiles")
    .update({
      is_online: input.isOnline,
      is_available: input.isAvailable,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", userId)
    .select("*")
    .single();

  if (error) throw new Error(error.message);
  return data;
}
