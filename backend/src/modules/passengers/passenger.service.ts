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
    countryCode: "PK";
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


type PassengerActivityType =
  | "ride"
  | "food"
  | "grocery"
  | "pharmacy"
  | "service";

function toNumber(value: unknown) {
  const number = Number(value ?? 0);
  return Number.isFinite(number) ? number : 0;
}

function firstText(
  ...values: unknown[]
) {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return "";
}

export async function getPassengerActivity(
  userId: string,
) {
  const [
    ridesResult,
    foodResult,
    commerceResult,
    servicesResult,
  ] = await Promise.all([
    supabaseAdmin
      .from("rides")
      .select("*")
      .eq("passenger_id", userId)
      .order("created_at", { ascending: false })
      .limit(100),

    supabaseAdmin
      .from("food_orders")
      .select("*")
      .eq("passenger_id", userId)
      .order("created_at", { ascending: false })
      .limit(100),

    supabaseAdmin
      .from("commerce_orders")
      .select("*")
      .eq("passenger_id", userId)
      .order("created_at", { ascending: false })
      .limit(100),

    supabaseAdmin
      .from("service_bookings")
      .select(`
        *,
        service_providers (
          business_name
        ),
        provider_services (
          name
        )
      `)
      .eq("customer_id", userId)
      .order("created_at", { ascending: false })
      .limit(100),
  ]);

  for (const result of [
    ridesResult,
    foodResult,
    commerceResult,
    servicesResult,
  ]) {
    if (result.error) {
      throw new Error(result.error.message);
    }
  }

  const activity = [
    ...(ridesResult.data ?? []).map((row: any) => ({
      id: row.id,
      type: "ride" as const,
      reference: row.ride_number ?? row.id,
      title: "Safari Ride",
      subtitle:
        firstText(row.dropoff_address, row.pickup_address) ||
        "Safari ride",
      status: row.ride_status ?? "requested",
      amount: toNumber(
        row.agreed_fare ??
        row.final_fare ??
        row.estimated_fare,
      ),
      currencyCode: row.currency_code ?? "PKR",
      createdAt: row.created_at,
      completedAt: row.completed_at ?? null,
    })),

    ...(foodResult.data ?? []).map((row: any) => ({
      id: row.id,
      type: "food" as const,
      reference: row.order_number ?? row.id,
      title: "Safari Food",
      subtitle: firstText(row.delivery_address) || "Food order",
      status: row.status ?? "placed",
      amount: toNumber(row.total),
      currencyCode: row.currency_code ?? "PKR",
      createdAt: row.created_at,
      completedAt: row.delivered_at ?? null,
    })),

    ...(commerceResult.data ?? []).map((row: any) => ({
      id: row.id,
      type:
        row.order_type === "pharmacy"
          ? ("pharmacy" as const)
          : ("grocery" as const),
      reference: row.order_number ?? row.id,
      title:
        row.order_type === "pharmacy"
          ? "Safari Pharmacy"
          : "Safari Grocery",
      subtitle:
        firstText(row.delivery_address) ||
        "Safari order",
      status: row.status ?? "placed",
      amount: toNumber(row.total),
      currencyCode: row.currency_code ?? "PKR",
      createdAt: row.created_at,
      completedAt: row.delivered_at ?? null,
    })),

    ...(servicesResult.data ?? []).map((row: any) => ({
      id: row.id,
      type: "service" as const,
      reference: row.booking_number ?? row.id,
      title:
        row.provider_services?.name ??
        "Safari Service",
      subtitle:
        firstText(
          row.service_providers?.business_name,
          row.service_address,
        ) || "Service booking",
      status: row.booking_status ?? "requested",
      amount: toNumber(row.total_amount),
      currencyCode: row.currency_code ?? "PKR",
      createdAt: row.created_at,
      completedAt: row.completed_at ?? null,
    })),
  ].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime(),
  );

  return activity;
}

export async function getPassengerActivityDetail(
  userId: string,
  type: PassengerActivityType,
  id: string,
) {
  if (type === "ride") {
    const { data, error } = await supabaseAdmin
      .from("rides")
      .select("*")
      .eq("id", id)
      .eq("passenger_id", userId)
      .single();

    if (error || !data) {
      throw new Error("Safari ride activity was not found.");
    }

    return {
      id: data.id,
      type,
      reference: data.ride_number ?? data.id,
      title: "Safari Ride",
      status: data.ride_status ?? "requested",
      amount: toNumber(
        data.agreed_fare ??
        data.final_fare ??
        data.estimated_fare,
      ),
      currencyCode: data.currency_code ?? "PKR",
      createdAt: data.created_at,
      completedAt: data.completed_at ?? null,
      pickup: data.pickup_address ?? null,
      destination: data.dropoff_address ?? null,
      paymentMethod: data.payment_method ?? null,
      raw: data,
    };
  }

  if (type === "food") {
    const { data, error } = await supabaseAdmin
      .from("food_orders")
      .select(`
        *,
        food_restaurants (
          name
        )
      `)
      .eq("id", id)
      .eq("passenger_id", userId)
      .single();

    if (error || !data) {
      throw new Error("Safari Food activity was not found.");
    }

    return {
      id: data.id,
      type,
      reference: data.order_number ?? data.id,
      title: "Safari Food",
      status: data.status ?? "placed",
      amount: toNumber(data.total),
      currencyCode: data.currency_code ?? "PKR",
      createdAt: data.created_at,
      completedAt: data.delivered_at ?? null,
      merchantName: data.food_restaurants?.name ?? null,
      deliveryAddress: data.delivery_address ?? null,
      paymentMethod: data.payment_method ?? null,
      raw: data,
    };
  }

  if (
    type === "grocery" ||
    type === "pharmacy"
  ) {
    const { data, error } = await supabaseAdmin
      .from("commerce_orders")
      .select(`
        *,
        commerce_stores (
          name
        )
      `)
      .eq("id", id)
      .eq("passenger_id", userId)
      .eq("order_type", type)
      .single();

    if (error || !data) {
      throw new Error("Safari order activity was not found.");
    }

    return {
      id: data.id,
      type,
      reference: data.order_number ?? data.id,
      title:
        type === "pharmacy"
          ? "Safari Pharmacy"
          : "Safari Grocery",
      status: data.status ?? "placed",
      amount: toNumber(data.total),
      currencyCode: data.currency_code ?? "PKR",
      createdAt: data.created_at,
      completedAt: data.delivered_at ?? null,
      merchantName: data.commerce_stores?.name ?? null,
      deliveryAddress: data.delivery_address ?? null,
      paymentMethod: data.payment_method ?? null,
      raw: data,
    };
  }

  const { data, error } = await supabaseAdmin
    .from("service_bookings")
    .select(`
      *,
      service_providers (
        business_name
      ),
      provider_services (
        name
      )
    `)
    .eq("id", id)
    .eq("customer_id", userId)
    .single();

  if (error || !data) {
    throw new Error("Safari service activity was not found.");
  }

  return {
    id: data.id,
    type: "service" as const,
    reference: data.booking_number ?? data.id,
    title:
      data.provider_services?.name ??
      "Safari Service",
    status: data.booking_status ?? "requested",
    amount: toNumber(data.total_amount),
    currencyCode: data.currency_code ?? "PKR",
    createdAt: data.created_at,
    completedAt: data.completed_at ?? null,
    providerName:
      data.service_providers?.business_name ?? null,
    serviceAddress: data.service_address ?? null,
    paymentMethod: data.payment_method ?? null,
    raw: data,
  };
}
