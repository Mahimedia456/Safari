import { Router } from "express";
import { z } from "zod";

import { requireAuth } from "../../middleware/auth.js";
import {
  requireAccountTypes,
  requireAdminRoles,
} from "../../middleware/requireRole.js";
import { supabaseAdmin } from "../../lib/supabase.js";

export const adminAnalyticsRouter = Router();

adminAnalyticsRouter.use(
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

adminAnalyticsRouter.get("/dashboard", async (_req, res, next) => {
  try {
    const [
      passengerCount,
      driverCount,
      merchantCount,
      activeRides,
      completedRides,
      foodOrders,
      commerceOrders,
      serviceBookings,
      incidents,
    ] = await Promise.all([
      supabaseAdmin
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .eq("account_type", "passenger"),

      supabaseAdmin
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .eq("account_type", "driver"),

      supabaseAdmin
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .eq("account_type", "merchant"),

      supabaseAdmin
        .from("rides")
        .select("*", { count: "exact", head: true })
        .in("ride_status", [
          "searching",
          "driver_assigned",
          "driver_arriving",
          "driver_arrived",
          "in_progress",
        ]),

      supabaseAdmin
        .from("rides")
        .select("final_fare,estimated_fare")
        .eq("ride_status", "completed"),

      supabaseAdmin
        .from("food_orders")
        .select("total,status"),

      supabaseAdmin
        .from("commerce_orders")
        .select("total,status,order_type"),

      supabaseAdmin
        .from("service_bookings")
        .select("estimated_total,final_total,booking_status"),

      supabaseAdmin
        .from("operations_incidents")
        .select("*")
        .in("status", ["open", "investigating"])
        .order("created_at", { ascending: false })
        .limit(10),
    ]);

    const queryResults = [
      passengerCount,
      driverCount,
      merchantCount,
      activeRides,
      completedRides,
      foodOrders,
      commerceOrders,
      serviceBookings,
      incidents,
    ];

    for (const result of queryResults) {
      if (result.error) throw new Error(result.error.message);
    }

    const rideGmv = completedRides.data.reduce(
      (sum, ride) =>
        sum + Number(ride.final_fare ?? ride.estimated_fare ?? 0),
      0,
    );

    const foodGmv = foodOrders.data
      .filter((order) => order.status === "delivered")
      .reduce((sum, order) => sum + Number(order.total ?? 0), 0);

    const commerceGmv = commerceOrders.data
      .filter((order) => order.status === "delivered")
      .reduce((sum, order) => sum + Number(order.total ?? 0), 0);

    const servicesGmv = serviceBookings.data
      .filter((booking) => booking.booking_status === "completed")
      .reduce(
        (sum, booking) =>
          sum +
          Number(
            booking.final_total ??
              booking.estimated_total ??
              0,
          ),
        0,
      );

    res.json({
      success: true,
      data: {
        users: {
          passengers: passengerCount.count ?? 0,
          drivers: driverCount.count ?? 0,
          merchants: merchantCount.count ?? 0,
        },

        operations: {
          activeRides: activeRides.count ?? 0,
          openIncidents: incidents.data.length,
        },

        gmv: {
          rides: rideGmv,
          food: foodGmv,
          commerce: commerceGmv,
          services: servicesGmv,
          total:
            rideGmv +
            foodGmv +
            commerceGmv +
            servicesGmv,
        },

        incidents: incidents.data,
      },
    });
  } catch (error) {
    next(error);
  }
});

adminAnalyticsRouter.get("/daily", async (req, res, next) => {
  try {
    const query = z
      .object({
        days: z.coerce.number().int().min(1).max(365).default(30),
      })
      .parse(req.query);

    const start = new Date(
      Date.now() - query.days * 24 * 60 * 60 * 1000,
    )
      .toISOString()
      .slice(0, 10);

    const { data, error } = await supabaseAdmin
      .from("platform_daily_metrics")
      .select("*")
      .gte("metric_date", start)
      .order("metric_date", { ascending: true });

    if (error) throw new Error(error.message);

    res.json({
      success: true,
      data: {
        metrics: data,
        total: data.length,
      },
    });
  } catch (error) {
    next(error);
  }
});

adminAnalyticsRouter.get("/incidents", async (req, res, next) => {
  try {
    const query = z
      .object({
        status: z
          .enum(["open", "investigating", "resolved", "dismissed"])
          .optional(),
        severity: z
          .enum(["low", "medium", "high", "critical"])
          .optional(),
      })
      .parse(req.query);

    let builder = supabaseAdmin
      .from("operations_incidents")
      .select("*")
      .order("created_at", { ascending: false });

    if (query.status)
      builder = builder.eq("status", query.status);

    if (query.severity)
      builder = builder.eq("severity", query.severity);

    const { data, error } = await builder;
    if (error) throw new Error(error.message);

    res.json({
      success: true,
      data: {
        incidents: data,
        total: data.length,
      },
    });
  } catch (error) {
    next(error);
  }
});

adminAnalyticsRouter.post("/incidents", async (req, res, next) => {
  try {
    const input = z
      .object({
        incidentType: z.enum([
          "ride",
          "driver",
          "passenger",
          "merchant",
          "order",
          "payment",
          "system",
        ]),
        severity: z
          .enum(["low", "medium", "high", "critical"])
          .default("medium"),
        title: z.string().trim().min(3).max(160),
        description: z.string().trim().max(1000).nullable().optional(),
        entityType: z.string().trim().max(80).nullable().optional(),
        entityId: z.string().uuid().nullable().optional(),
      })
      .parse(req.body);

    const { data, error } = await supabaseAdmin
      .from("operations_incidents")
      .insert({
        incident_type: input.incidentType,
        severity: input.severity,
        title: input.title,
        description: input.description ?? null,
        entity_type: input.entityType ?? null,
        entity_id: input.entityId ?? null,
      })
      .select("*")
      .single();

    if (error) throw new Error(error.message);

    res.status(201).json({
      success: true,
      data: {
        incident: data,
      },
    });
  } catch (error) {
    next(error);
  }
});

adminAnalyticsRouter.patch(
  "/incidents/:incidentId",
  async (req, res, next) => {
    try {
      const incidentId = z
        .string()
        .uuid()
        .parse(req.params.incidentId);

      const input = z
        .object({
          status: z
            .enum([
              "open",
              "investigating",
              "resolved",
              "dismissed",
            ])
            .optional(),
          assignedAdminId: z
            .string()
            .uuid()
            .nullable()
            .optional(),
        })
        .parse(req.body);

      const updates: Record<string, unknown> = {
        updated_at: new Date().toISOString(),
      };

      if (input.status !== undefined)
        updates.status = input.status;

      if (input.assignedAdminId !== undefined)
        updates.assigned_admin_id =
          input.assignedAdminId;

      if (
        input.status === "resolved" ||
        input.status === "dismissed"
      ) {
        updates.resolved_at =
          new Date().toISOString();
      }

      const { data, error } = await supabaseAdmin
        .from("operations_incidents")
        .update(updates)
        .eq("id", incidentId)
        .select("*")
        .single();

      if (error) throw new Error(error.message);

      res.json({
        success: true,
        data: {
          incident: data,
        },
      });
    } catch (error) {
      next(error);
    }
  },
);
