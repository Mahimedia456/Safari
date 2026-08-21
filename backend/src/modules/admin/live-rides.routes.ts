import { Router } from "express";
import { z } from "zod";

import { requireAuth } from "../../middleware/auth.js";
import {
  requireAccountTypes,
  requireAdminRoles,
} from "../../middleware/requireRole.js";
import { supabaseAdmin } from "../../lib/supabase.js";

export const adminLiveRidesRouter = Router();

adminLiveRidesRouter.use(
  requireAuth,
  requireAccountTypes("administration"),
  requireAdminRoles(
    "super_admin",
    "admin",
    "operations_manager",
    "support",
  ),
);

adminLiveRidesRouter.get("/", async (_req, res, next) => {
  try {
    const { data: rides, error: rideError } = await supabaseAdmin
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
        ),
        profiles!rides_passenger_id_fkey (
          id,
          full_name,
          phone
        ),
        driver:profiles!rides_driver_id_fkey (
          id,
          full_name,
          phone
        ),
        driver_vehicles (
          id,
          make,
          model,
          plate_number,
          color
        )
      `)
      .in("ride_status", [
        "searching",
        "driver_assigned",
        "driver_arriving",
        "driver_arrived",
        "in_progress",
      ])
      .order("created_at", { ascending: false });

    if (rideError) throw new Error(rideError.message);

    const driverIds = rides
      .map((ride) => ride.driver_id)
      .filter(Boolean);

    let locations: any[] = [];

    if (driverIds.length > 0) {
      const { data, error } = await supabaseAdmin
        .from("driver_locations")
        .select("*")
        .in("driver_id", driverIds);

      if (error) throw new Error(error.message);
      locations = data;
    }

    const locationMap = new Map(
      locations.map((item) => [item.driver_id, item]),
    );

    res.json({
      success: true,
      data: {
        rides: rides.map((ride) => ({
          ...ride,
          driver_location: ride.driver_id
            ? locationMap.get(ride.driver_id) ?? null
            : null,
        })),
        total: rides.length,
      },
    });
  } catch (error) {
    next(error);
  }
});

adminLiveRidesRouter.get("/:rideId/tracking", async (req, res, next) => {
  try {
    const rideId = z.string().uuid().parse(req.params.rideId);

    const [rideResult, pointsResult, matchResult, eventsResult] =
      await Promise.all([
        supabaseAdmin
          .from("rides")
          .select("*")
          .eq("id", rideId)
          .single(),

        supabaseAdmin
          .from("ride_tracking_points")
          .select("*")
          .eq("ride_id", rideId)
          .order("recorded_at", { ascending: true }),

        supabaseAdmin
          .from("ride_match_requests")
          .select("*")
          .eq("ride_id", rideId)
          .order("offered_at", { ascending: true }),

        supabaseAdmin
          .from("ride_status_events")
          .select("*")
          .eq("ride_id", rideId)
          .order("created_at", { ascending: true }),
      ]);

    if (rideResult.error) throw new Error(rideResult.error.message);
    if (pointsResult.error) throw new Error(pointsResult.error.message);
    if (matchResult.error) throw new Error(matchResult.error.message);
    if (eventsResult.error) throw new Error(eventsResult.error.message);

    res.json({
      success: true,
      data: {
        ride: rideResult.data,
        trackingPoints: pointsResult.data,
        matchRequests: matchResult.data,
        events: eventsResult.data,
      },
    });
  } catch (error) {
    next(error);
  }
});
