import { Router } from "express";
import { z } from "zod";

import { requireAuth } from "../../middleware/auth.js";
import {
  requireAccountTypes,
  requireAdminRoles,
} from "../../middleware/requireRole.js";
import { supabaseAdmin } from "../../lib/supabase.js";

export const adminPassengersRouter = Router();

adminPassengersRouter.use(
  requireAuth,
  requireAccountTypes("administration"),
  requireAdminRoles(
    "super_admin",
    "admin",
    "operations_manager",
    "support",
  ),
);

adminPassengersRouter.get("/", async (req, res, next) => {
  try {
    const query = z
      .object({
        search: z.string().trim().max(120).optional(),
        status: z
          .enum(["pending", "active", "suspended", "blocked"])
          .optional(),
        country: z.enum(["PK", "DE"]).optional(),
      })
      .parse(req.query);

    let builder = supabaseAdmin
      .from("profiles")
      .select(
        "id,full_name,email,phone,avatar_url,status,country_code,is_onboarded,created_at,last_seen_at",
      )
      .eq("account_type", "passenger")
      .order("created_at", { ascending: false });

    if (query.status) builder = builder.eq("status", query.status);
    if (query.country) builder = builder.eq("country_code", query.country);

    if (query.search) {
      builder = builder.or(
        `full_name.ilike.%${query.search}%,email.ilike.%${query.search}%,phone.ilike.%${query.search}%`,
      );
    }

    const { data, error } = await builder;

    if (error) throw new Error(error.message);

    res.json({
      success: true,
      data: {
        passengers: data,
        total: data.length,
      },
    });
  } catch (error) {
    next(error);
  }
});

adminPassengersRouter.get("/:passengerId", async (req, res, next) => {
  try {
    const passengerId = z.string().uuid().parse(req.params.passengerId);

    const [profileResult, addressesResult, preferencesResult, emergencyResult] =
      await Promise.all([
        supabaseAdmin
          .from("profiles")
          .select("*")
          .eq("id", passengerId)
          .eq("account_type", "passenger")
          .single(),

        supabaseAdmin
          .from("saved_addresses")
          .select("*")
          .eq("user_id", passengerId),

        supabaseAdmin
          .from("user_preferences")
          .select("*")
          .eq("user_id", passengerId)
          .maybeSingle(),

        supabaseAdmin
          .from("emergency_contacts")
          .select("*")
          .eq("user_id", passengerId),
      ]);

    if (profileResult.error) throw new Error(profileResult.error.message);
    if (addressesResult.error) throw new Error(addressesResult.error.message);
    if (preferencesResult.error) throw new Error(preferencesResult.error.message);
    if (emergencyResult.error) throw new Error(emergencyResult.error.message);

    res.json({
      success: true,
      data: {
        passenger: profileResult.data,
        addresses: addressesResult.data,
        preferences: preferencesResult.data,
        emergencyContacts: emergencyResult.data,
      },
    });
  } catch (error) {
    next(error);
  }
});

adminPassengersRouter.patch("/:passengerId/status", async (req, res, next) => {
  try {
    const passengerId = z.string().uuid().parse(req.params.passengerId);
    const input = z
      .object({
        status: z.enum(["active", "suspended", "blocked"]),
      })
      .parse(req.body);

    const { data, error } = await supabaseAdmin
      .from("profiles")
      .update({
        status: input.status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", passengerId)
      .eq("account_type", "passenger")
      .select(
        "id,full_name,email,phone,status,country_code,is_onboarded,created_at",
      )
      .single();

    if (error) throw new Error(error.message);

    res.json({
      success: true,
      data: { passenger: data },
    });
  } catch (error) {
    next(error);
  }
});
