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
    if (query.cityId) builder = builder.eq("city_id", query.cityId);

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
