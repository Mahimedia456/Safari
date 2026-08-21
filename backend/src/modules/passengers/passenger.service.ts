import { supabaseAdmin } from "../../lib/supabase.js";

export async function getPassengerOverview(userId: string) {
  const [profileResult, addressesResult, preferencesResult, emergencyResult] =
    await Promise.all([
      supabaseAdmin
        .from("profiles")
        .select(
          "id,full_name,email,phone,avatar_url,account_type,app_mode,status,country_code,is_onboarded,date_of_birth,gender,preferred_language,marketing_opt_in,created_at,updated_at",
        )
        .eq("id", userId)
        .single(),

      supabaseAdmin
        .from("saved_addresses")
        .select("*")
        .eq("user_id", userId)
        .order("is_default", { ascending: false })
        .order("created_at", { ascending: true }),

      supabaseAdmin
        .from("user_preferences")
        .select("*")
        .eq("user_id", userId)
        .single(),

      supabaseAdmin
        .from("emergency_contacts")
        .select("*")
        .eq("user_id", userId)
        .order("is_primary", { ascending: false })
        .order("created_at", { ascending: true }),
    ]);

  if (profileResult.error) throw new Error(profileResult.error.message);
  if (addressesResult.error) throw new Error(addressesResult.error.message);
  if (preferencesResult.error) throw new Error(preferencesResult.error.message);
  if (emergencyResult.error) throw new Error(emergencyResult.error.message);

  return {
    profile: profileResult.data,
    addresses: addressesResult.data,
    preferences: preferencesResult.data,
    emergencyContacts: emergencyResult.data,
  };
}

export async function updatePassengerProfile(
  userId: string,
  updates: Record<string, unknown>,
) {
  const { data, error } = await supabaseAdmin
    .from("profiles")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId)
    .select(
      "id,full_name,email,phone,avatar_url,account_type,app_mode,status,country_code,is_onboarded,date_of_birth,gender,preferred_language,marketing_opt_in,created_at,updated_at",
    )
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function listSavedAddresses(userId: string) {
  const { data, error } = await supabaseAdmin
    .from("saved_addresses")
    .select("*")
    .eq("user_id", userId)
    .order("is_default", { ascending: false })
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);
  return data;
}

export async function createSavedAddress(
  userId: string,
  input: {
    label: string;
    addressLine: string;
    city: string;
    area?: string | null;
    postalCode?: string | null;
    countryCode: "PK" | "DE";
    latitude?: number | null;
    longitude?: number | null;
    instructions?: string | null;
    isDefault?: boolean;
  },
) {
  if (input.isDefault) {
    const { error } = await supabaseAdmin
      .from("saved_addresses")
      .update({ is_default: false, updated_at: new Date().toISOString() })
      .eq("user_id", userId);

    if (error) throw new Error(error.message);
  }

  const { data, error } = await supabaseAdmin
    .from("saved_addresses")
    .insert({
      user_id: userId,
      label: input.label,
      address_line: input.addressLine,
      city: input.city,
      area: input.area ?? null,
      postal_code: input.postalCode ?? null,
      country_code: input.countryCode,
      latitude: input.latitude ?? null,
      longitude: input.longitude ?? null,
      instructions: input.instructions ?? null,
      is_default: input.isDefault ?? false,
    })
    .select("*")
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function updateSavedAddress(
  userId: string,
  addressId: string,
  input: Record<string, unknown>,
) {
  if (input.is_default === true) {
    const { error } = await supabaseAdmin
      .from("saved_addresses")
      .update({ is_default: false, updated_at: new Date().toISOString() })
      .eq("user_id", userId);

    if (error) throw new Error(error.message);
  }

  const { data, error } = await supabaseAdmin
    .from("saved_addresses")
    .update({
      ...input,
      updated_at: new Date().toISOString(),
    })
    .eq("id", addressId)
    .eq("user_id", userId)
    .select("*")
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function deleteSavedAddress(
  userId: string,
  addressId: string,
) {
  const { error } = await supabaseAdmin
    .from("saved_addresses")
    .delete()
    .eq("id", addressId)
    .eq("user_id", userId);

  if (error) throw new Error(error.message);
}

export async function updatePreferences(
  userId: string,
  updates: Record<string, unknown>,
) {
  const { data, error } = await supabaseAdmin
    .from("user_preferences")
    .upsert(
      {
        user_id: userId,
        ...updates,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "user_id",
      },
    )
    .select("*")
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function listEmergencyContacts(userId: string) {
  const { data, error } = await supabaseAdmin
    .from("emergency_contacts")
    .select("*")
    .eq("user_id", userId)
    .order("is_primary", { ascending: false })
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);
  return data;
}

export async function createEmergencyContact(
  userId: string,
  input: {
    name: string;
    phone: string;
    relationship?: string | null;
    isPrimary?: boolean;
  },
) {
  if (input.isPrimary) {
    const { error } = await supabaseAdmin
      .from("emergency_contacts")
      .update({ is_primary: false, updated_at: new Date().toISOString() })
      .eq("user_id", userId);

    if (error) throw new Error(error.message);
  }

  const { data, error } = await supabaseAdmin
    .from("emergency_contacts")
    .insert({
      user_id: userId,
      name: input.name,
      phone: input.phone,
      relationship: input.relationship ?? null,
      is_primary: input.isPrimary ?? false,
    })
    .select("*")
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function deleteEmergencyContact(
  userId: string,
  contactId: string,
) {
  const { error } = await supabaseAdmin
    .from("emergency_contacts")
    .delete()
    .eq("id", contactId)
    .eq("user_id", userId);

  if (error) throw new Error(error.message);
}
