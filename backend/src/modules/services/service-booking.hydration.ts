import { supabaseAdmin } from "../../lib/supabase.js";

type ServiceBookingRow = Record<string, any> & {
  provider_id?: string | null;
  service_id?: string | null;
};

export async function hydrateServiceBookings<
  T extends ServiceBookingRow,
>(
  rows: T[],
) {
  if (rows.length === 0) {
    return rows as Array<
      T & {
        service_providers?: Record<string, any> | null;
        provider_services?: Record<string, any> | null;
      }
    >;
  }

  const providerIds =
    Array.from(
      new Set(
        rows
          .map(
            (row) =>
              row.provider_id,
          )
          .filter(
            (
              value,
            ): value is string =>
              typeof value ===
                "string" &&
              value.length > 0,
          ),
      ),
    );

  const serviceIds =
    Array.from(
      new Set(
        rows
          .map(
            (row) =>
              row.service_id,
          )
          .filter(
            (
              value,
            ): value is string =>
              typeof value ===
                "string" &&
              value.length > 0,
          ),
      ),
    );

  const [
    providersResult,
    servicesResult,
  ] =
    await Promise.all([
      providerIds.length > 0
        ? supabaseAdmin
            .from(
              "service_providers",
            )
            .select(
              "id,business_name,logo_url,phone,address,merchant_user_id",
            )
            .in(
              "id",
              providerIds,
            )
        : Promise.resolve({
            data: [],
            error: null,
          }),

      serviceIds.length > 0
        ? supabaseAdmin
            .from(
              "provider_services",
            )
            .select(
              "id,provider_id,category_id,name,description,pricing_type,price,duration_minutes,currency_code,is_available",
            )
            .in(
              "id",
              serviceIds,
            )
        : Promise.resolve({
            data: [],
            error: null,
          }),
    ]);

  if (
    providersResult.error
  ) {
    throw new Error(
      providersResult.error.message,
    );
  }

  if (
    servicesResult.error
  ) {
    throw new Error(
      servicesResult.error.message,
    );
  }

  const providerById =
    new Map(
      (
        providersResult.data ??
        []
      ).map(
        (provider: any) => [
          provider.id,
          provider,
        ],
      ),
    );

  const serviceById =
    new Map(
      (
        servicesResult.data ??
        []
      ).map(
        (service: any) => [
          service.id,
          service,
        ],
      ),
    );

  return rows.map(
    (row) => ({
      ...row,
      service_providers:
        row.provider_id
          ? providerById.get(
              row.provider_id,
            ) ?? null
          : null,
      provider_services:
        row.service_id
          ? serviceById.get(
              row.service_id,
            ) ?? null
          : null,
    }),
  );
}

export async function hydrateServiceBooking<
  T extends ServiceBookingRow,
>(
  row: T,
) {
  const [hydrated] =
    await hydrateServiceBookings(
      [row],
    );

  return hydrated;
}
