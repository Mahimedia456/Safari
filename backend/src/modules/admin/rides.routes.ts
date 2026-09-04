import { Router } from "express";
import { z } from "zod";

import { requireAuth } from "../../middleware/auth.js";
import {
  requireAccountTypes,
  requireAdminRoles,
} from "../../middleware/requireRole.js";
import { supabaseAdmin } from "../../lib/supabase.js";

export const adminRidesRouter = Router();

adminRidesRouter.use(
  requireAuth,
  requireAccountTypes("administration"),
  requireAdminRoles(
    "super_admin",
    "admin",
    "operations_manager",
    "finance_manager",
    "support",
  ),
);

adminRidesRouter.get("/catalog", async (_req, res, next) => {
  try {
    const [cities, zones, categories, pricing, settings] =
      await Promise.all([
        supabaseAdmin
          .from("service_cities")
          .select("*")
          .order("name"),

        supabaseAdmin
          .from("service_zones")
          .select("*")
          .order("name"),

        supabaseAdmin
          .from("ride_categories")
          .select("*")
          .order("sort_order"),

        supabaseAdmin
          .from("ride_pricing_rules")
          .select(`
            *,
            service_cities (
              name,
              city_code
            ),
            ride_categories (
              code,
              name
            )
          `)
          .order("effective_from", { ascending: false }),

        supabaseAdmin
          .from("ride_service_settings")
          .select("*"),
      ]);

    for (const result of [cities, zones, categories, pricing, settings]) {
      if (result.error) throw new Error(result.error.message);
    }

    res.json({
      success: true,
      data: {
        cities: cities.data,
        zones: zones.data,
        categories: categories.data,
        pricing: pricing.data,
        settings: settings.data,
      },
    });
  } catch (error) {
    next(error);
  }
});

adminRidesRouter.patch("/pricing/:pricingId", async (req, res, next) => {
  try {
    const pricingId = z.string().uuid().parse(req.params.pricingId);

    const input = z
      .object({
        baseFare: z.number().min(0).optional(),
        minimumFare: z.number().min(0).optional(),
        perKmRate: z.number().min(0).optional(),
        perMinuteRate: z.number().min(0).optional(),
        bookingFee: z.number().min(0).optional(),
        defaultSurgeMultiplier: z.number().min(1).max(10).optional(),
        cancellationFee: z.number().min(0).optional(),
        waitingPerMinuteRate: z.number().min(0).optional(),
        freeWaitingMinutes: z.number().int().min(0).max(60).optional(),
        isActive: z.boolean().optional(),
      })
      .parse(req.body);

    const updates: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };

    if (input.baseFare !== undefined) updates.base_fare = input.baseFare;
    if (input.minimumFare !== undefined)
      updates.minimum_fare = input.minimumFare;
    if (input.perKmRate !== undefined) updates.per_km_rate = input.perKmRate;
    if (input.perMinuteRate !== undefined)
      updates.per_minute_rate = input.perMinuteRate;
    if (input.bookingFee !== undefined) updates.booking_fee = input.bookingFee;
    if (input.defaultSurgeMultiplier !== undefined)
      updates.default_surge_multiplier = input.defaultSurgeMultiplier;
    if (input.cancellationFee !== undefined)
      updates.cancellation_fee = input.cancellationFee;
    if (input.waitingPerMinuteRate !== undefined)
      updates.waiting_per_minute_rate = input.waitingPerMinuteRate;
    if (input.freeWaitingMinutes !== undefined)
      updates.free_waiting_minutes = input.freeWaitingMinutes;
    if (input.isActive !== undefined) updates.is_active = input.isActive;

    const { data, error } = await supabaseAdmin
      .from("ride_pricing_rules")
      .update(updates)
      .eq("id", pricingId)
      .select("*")
      .single();

    if (error) throw new Error(error.message);

    res.json({
      success: true,
      data: { pricing: data },
    });
  } catch (error) {
    next(error);
  }
});


adminRidesRouter.get("/driver-offers", async (_req, res, next) => {
  try {
    // Avoid PostgREST embedded rides relation here. ride_driver_offers has
    // more than one relationship path to rides in the current Safari schema.
    const { data: offers, error: offersError } = await supabaseAdmin
      .from("ride_driver_offers")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(300);

    if (offersError) throw new Error(offersError.message);

    const rows = offers ?? [];
    const rideIds = [...new Set(rows.map((row) => row.ride_id).filter(Boolean))];
    const driverIds = [...new Set(rows.map((row) => row.driver_id).filter(Boolean))];

    const [ridesResult, profilesResult] = await Promise.all([
      rideIds.length
        ? supabaseAdmin
            .from("rides")
            .select("id,ride_number,pickup_address,dropoff_address,suggested_fare,agreed_fare,ride_status,ride_category_id")
            .in("id", rideIds)
        : Promise.resolve({ data: [], error: null }),
      driverIds.length
        ? supabaseAdmin
            .from("profiles")
            .select("id,full_name,phone")
            .in("id", driverIds)
        : Promise.resolve({ data: [], error: null }),
    ]);

    if (ridesResult.error) throw new Error(ridesResult.error.message);
    if (profilesResult.error) throw new Error(profilesResult.error.message);

    const rides = ridesResult.data ?? [];
    const categoryIds = [...new Set(rides.map((ride) => ride.ride_category_id).filter(Boolean))];
    const categoriesResult = categoryIds.length
      ? await supabaseAdmin
          .from("ride_categories")
          .select("id,code,name")
          .in("id", categoryIds)
      : { data: [], error: null };

    if (categoriesResult.error) throw new Error(categoriesResult.error.message);

    const rideMap = new Map(rides.map((ride) => [ride.id, ride]));
    const profileMap = new Map((profilesResult.data ?? []).map((profile) => [profile.id, profile]));
    const categoryMap = new Map((categoriesResult.data ?? []).map((category) => [category.id, category]));

    const hydrated = rows.map((offer) => {
      const ride = rideMap.get(offer.ride_id) ?? null;
      return {
        ...offer,
        rides: ride
          ? {
              ...ride,
              ride_categories: ride.ride_category_id
                ? categoryMap.get(ride.ride_category_id) ?? null
                : null,
            }
          : null,
        profiles: profileMap.get(offer.driver_id) ?? null,
      };
    });

    res.json({
      success: true,
      data: { offers: hydrated, total: hydrated.length },
    });
  } catch (error) {
    next(error);
  }
});

adminRidesRouter.get("/delivery-jobs", async (_req, res, next) => {
  try {
    const { data, error } = await supabaseAdmin
      .from("delivery_jobs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);

    if (error) throw new Error(error.message);

    res.json({
      success: true,
      data: {
        jobs: data ?? [],
        total: data?.length ?? 0,
      },
    });
  } catch (error) {
    next(error);
  }
});

adminRidesRouter.get("/", async (req, res, next) => {
  try {
    const query = z
      .object({
        status: z.string().trim().max(60).optional(),
        cityId: z.string().uuid().optional(),
        search: z.string().trim().max(120).optional(),
      })
      .parse(req.query);

    let builder = supabaseAdmin
      .from("rides")
      .select(`
        *,
        ride_categories (
          code,
          name
        ),
        service_cities (
          name,
          city_code
        )
      `)
      .order("created_at", { ascending: false });

    if (query.status) builder = builder.eq("ride_status", query.status);
    if (query.cityId) builder = builder.eq("service_city_id", query.cityId);

    const { data, error } = await builder;

    if (error) throw new Error(error.message);

    let rides = data;

    if (query.search) {
      const search = query.search.toLowerCase();

      rides = rides.filter((ride) =>
        [
          ride.ride_number,
          ride.pickup_address,
          ride.dropoff_address,
        ]
          .filter(Boolean)
          .some((value) =>
            String(value).toLowerCase().includes(search),
          ),
      );
    }

    res.json({
      success: true,
      data: {
        rides,
        total: rides.length,
      },
    });
  } catch (error) {
    next(error);
  }
});

adminRidesRouter.get("/:rideId", async (req, res, next) => {
  try {
    const rideId = z.string().uuid().parse(req.params.rideId);

    const [rideResult, eventsResult] = await Promise.all([
      supabaseAdmin
        .from("rides")
        .select(`
          *,
          ride_categories (*),
          service_cities (*)
        `)
        .eq("id", rideId)
        .single(),

      supabaseAdmin
        .from("ride_status_events")
        .select("*")
        .eq("ride_id", rideId)
        .order("created_at", { ascending: true }),
    ]);

    if (rideResult.error) throw new Error(rideResult.error.message);
    if (eventsResult.error) throw new Error(eventsResult.error.message);

    res.json({
      success: true,
      data: {
        ride: rideResult.data,
        events: eventsResult.data,
      },
    });
  } catch (error) {
    next(error);
  }
});
