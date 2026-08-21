import { supabaseAdmin } from "../../lib/supabase.js";

export async function listServiceCategories() {
  const { data, error } = await supabaseAdmin
    .from("service_categories")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");

  if (error) throw new Error(error.message);
  return data;
}

export async function listProviders(input: {
  cityId?: string;
  categoryId?: string;
  search?: string;
  featured?: boolean;
}) {
  let builder = supabaseAdmin
    .from("service_providers")
    .select(`
      *,
      service_cities (
        id,
        name,
        city_code
      )
    `)
    .eq("is_active", true)
    .eq("verification_status", "verified")
    .order("is_featured", { ascending: false })
    .order("rating", { ascending: false });

  if (input.cityId) builder = builder.eq("city_id", input.cityId);
  if (input.featured !== undefined)
    builder = builder.eq("is_featured", input.featured);

  const { data, error } = await builder;
  if (error) throw new Error(error.message);

  let providers = data;

  if (input.categoryId) {
    const providerIds = providers.map((item) => item.id);

    if (providerIds.length === 0) return [];

    const { data: services, error: serviceError } = await supabaseAdmin
      .from("provider_services")
      .select("provider_id")
      .eq("category_id", input.categoryId)
      .eq("is_available", true)
      .in("provider_id", providerIds);

    if (serviceError) throw new Error(serviceError.message);

    const allowed = new Set(services.map((item) => item.provider_id));
    providers = providers.filter((item) => allowed.has(item.id));
  }

  if (input.search) {
    const search = input.search.toLowerCase();

    providers = providers.filter((provider) =>
      [provider.business_name, provider.description, provider.address]
        .filter(Boolean)
        .some((value) =>
          String(value).toLowerCase().includes(search),
        ),
    );
  }

  return providers;
}

export async function getProvider(providerId: string) {
  const [providerResult, servicesResult] = await Promise.all([
    supabaseAdmin
      .from("service_providers")
      .select(`
        *,
        service_cities (
          id,
          name,
          city_code,
          currency_code
        )
      `)
      .eq("id", providerId)
      .eq("is_active", true)
      .eq("verification_status", "verified")
      .single(),

    supabaseAdmin
      .from("provider_services")
      .select(`
        *,
        service_categories (
          id,
          name,
          slug,
          icon_key
        )
      `)
      .eq("provider_id", providerId)
      .eq("is_available", true)
      .order("is_featured", { ascending: false })
      .order("name"),
  ]);

  if (providerResult.error)
    throw new Error(providerResult.error.message);

  if (servicesResult.error)
    throw new Error(servicesResult.error.message);

  return {
    provider: providerResult.data,
    services: servicesResult.data,
  };
}

export async function createServiceBooking(
  customerId: string,
  input: {
    providerId: string;
    serviceId: string;
    scheduledFor?: string | null;
    serviceAddressId?: string | null;
    serviceAddress: string;
    latitude?: number | null;
    longitude?: number | null;
    customerNote?: string | null;
    paymentMethod: "cash" | "wallet" | "card";
  },
) {
  const { data: service, error: serviceError } = await supabaseAdmin
    .from("provider_services")
    .select(`
      *,
      service_providers (
        id,
        verification_status,
        is_active
      )
    `)
    .eq("id", input.serviceId)
    .eq("provider_id", input.providerId)
    .eq("is_available", true)
    .single();

  if (serviceError || !service)
    throw new Error("Safari service is unavailable.");

  if (
    service.service_providers?.verification_status !== "verified" ||
    service.service_providers?.is_active !== true
  ) {
    throw new Error("Safari service provider is unavailable.");
  }

  const { data: bookingNumber, error: numberError } =
    await supabaseAdmin.rpc("generate_safari_service_booking_number");

  if (numberError) throw new Error(numberError.message);

  const estimatedTotal =
    service.pricing_type === "quote"
      ? null
      : Number(service.price ?? 0);

  const { data: booking, error: bookingError } = await supabaseAdmin
    .from("service_bookings")
    .insert({
      booking_number: bookingNumber,
      customer_id: customerId,
      provider_id: input.providerId,
      service_id: input.serviceId,

      booking_status: "requested",
      scheduled_for: input.scheduledFor ?? null,

      service_address_id: input.serviceAddressId ?? null,
      service_address: input.serviceAddress,
      latitude: input.latitude ?? null,
      longitude: input.longitude ?? null,

      customer_note: input.customerNote ?? null,

      currency_code: service.currency_code,
      estimated_total: estimatedTotal,

      payment_method: input.paymentMethod,
      payment_status:
        input.paymentMethod === "cash"
          ? "cash_due"
          : "pending",
    })
    .select("*")
    .single();

  if (bookingError) throw new Error(bookingError.message);

  await supabaseAdmin
    .from("service_booking_events")
    .insert({
      booking_id: booking.id,
      from_status: null,
      to_status: "requested",
      actor_type: "customer",
      actor_user_id: customerId,
      note: "Safari service booking requested.",
    });

  return getServiceBooking(customerId, booking.id);
}

export async function listServiceBookings(customerId: string) {
  const { data, error } = await supabaseAdmin
    .from("service_bookings")
    .select(`
      *,
      service_providers (
        id,
        business_name,
        logo_url
      ),
      provider_services (
        id,
        name,
        pricing_type
      )
    `)
    .eq("customer_id", customerId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

export async function getServiceBooking(
  customerId: string,
  bookingId: string,
) {
  const [bookingResult, eventsResult] = await Promise.all([
    supabaseAdmin
      .from("service_bookings")
      .select(`
        *,
        service_providers (
          id,
          business_name,
          logo_url,
          phone,
          address
        ),
        provider_services (
          id,
          name,
          description,
          pricing_type,
          price,
          duration_minutes
        )
      `)
      .eq("id", bookingId)
      .eq("customer_id", customerId)
      .single(),

    supabaseAdmin
      .from("service_booking_events")
      .select("*")
      .eq("booking_id", bookingId)
      .order("created_at"),
  ]);

  if (bookingResult.error)
    throw new Error(bookingResult.error.message);

  if (eventsResult.error)
    throw new Error(eventsResult.error.message);

  return {
    booking: bookingResult.data,
    events: eventsResult.data,
  };
}

export async function cancelServiceBooking(
  customerId: string,
  bookingId: string,
  reason: string,
) {
  const { data: current, error: currentError } = await supabaseAdmin
    .from("service_bookings")
    .select("*")
    .eq("id", bookingId)
    .eq("customer_id", customerId)
    .single();

  if (currentError || !current)
    throw new Error("Safari service booking not found.");

  if (
    !["requested", "confirmed", "professional_assigned"].includes(
      current.booking_status,
    )
  ) {
    throw new Error("This service booking can no longer be cancelled.");
  }

  const now = new Date().toISOString();

  const { data, error } = await supabaseAdmin
    .from("service_bookings")
    .update({
      booking_status: "cancelled_by_customer",
      cancelled_at: now,
      updated_at: now,
    })
    .eq("id", bookingId)
    .eq("customer_id", customerId)
    .select("*")
    .single();

  if (error) throw new Error(error.message);

  await supabaseAdmin
    .from("service_booking_events")
    .insert({
      booking_id: bookingId,
      from_status: current.booking_status,
      to_status: "cancelled_by_customer",
      actor_type: "customer",
      actor_user_id: customerId,
      note: reason,
    });

  return data;
}
