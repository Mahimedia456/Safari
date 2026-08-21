import { Router } from "express";
import { z } from "zod";

import { requireAuth } from "../../middleware/auth.js";
import { requireAccountTypes } from "../../middleware/requireRole.js";
import { supabaseAdmin } from "../../lib/supabase.js";

export const adminServicesRouter = Router();

adminServicesRouter.use(
  requireAuth,
  requireAccountTypes("administration", "merchant"),
);

async function providerIds(profile: Express.Request["profile"]) {
  if (!profile) return [];

  if (profile.account_type === "administration") {
    const { data, error } = await supabaseAdmin
      .from("service_providers")
      .select("id");

    if (error) throw new Error(error.message);

    return data.map((item) => item.id);
  }

  if (
    profile.account_type === "merchant" &&
    profile.merchant_type === "services"
  ) {
    const { data, error } = await supabaseAdmin
      .from("service_providers")
      .select("id")
      .eq("merchant_user_id", profile.id);

    if (error) throw new Error(error.message);

    return data.map((item) => item.id);
  }

  return [];
}

adminServicesRouter.get("/providers", async (req, res, next) => {
  try {
    let builder = supabaseAdmin
      .from("service_providers")
      .select("*")
      .order("created_at", { ascending: false });

    if (req.profile?.account_type === "merchant") {
      if (req.profile.merchant_type !== "services") {
        res.status(403).json({
          success: false,
          error: {
            code: "SERVICES_MERCHANT_REQUIRED",
            message: "This account is not a Safari Services merchant.",
          },
        });
        return;
      }

      builder = builder.eq("merchant_user_id", req.profile.id);
    }

    const { data, error } = await builder;
    if (error) throw new Error(error.message);

    res.json({
      success: true,
      data: {
        providers: data,
        total: data.length,
      },
    });
  } catch (error) {
    next(error);
  }
});

adminServicesRouter.get("/bookings", async (req, res, next) => {
  try {
    const query = z
      .object({
        status: z.string().trim().max(60).optional(),
      })
      .parse(req.query);

    const ids = await providerIds(req.profile);

    if (ids.length === 0) {
      res.json({
        success: true,
        data: {
          bookings: [],
          total: 0,
        },
      });
      return;
    }

    let builder = supabaseAdmin
      .from("service_bookings")
      .select(`
        *,
        service_providers (
          id,
          business_name
        ),
        provider_services (
          id,
          name,
          pricing_type,
          price
        )
      `)
      .in("provider_id", ids)
      .order("created_at", { ascending: false });

    if (query.status)
      builder = builder.eq("booking_status", query.status);

    const { data, error } = await builder;
    if (error) throw new Error(error.message);

    res.json({
      success: true,
      data: {
        bookings: data,
        total: data.length,
      },
    });
  } catch (error) {
    next(error);
  }
});

adminServicesRouter.patch(
  "/bookings/:bookingId/status",
  async (req, res, next) => {
    try {
      const bookingId = z.string().uuid().parse(req.params.bookingId);

      const input = z
        .object({
          status: z.enum([
            "confirmed",
            "professional_assigned",
            "on_the_way",
            "in_progress",
            "completed",
            "cancelled_by_provider",
            "cancelled_by_admin",
          ]),
          finalTotal: z.number().min(0).nullable().optional(),
          note: z.string().trim().max(300).nullable().optional(),
        })
        .parse(req.body);

      const ids = await providerIds(req.profile);

      const { data: current, error: currentError } = await supabaseAdmin
        .from("service_bookings")
        .select("*")
        .eq("id", bookingId)
        .in("provider_id", ids)
        .single();

      if (currentError || !current)
        throw new Error("Safari service booking not found.");

      const now = new Date().toISOString();

      const updates: Record<string, unknown> = {
        booking_status: input.status,
        updated_at: now,
      };

      if (input.status === "confirmed")
        updates.confirmed_at = now;

      if (input.status === "in_progress")
        updates.started_at = now;

      if (input.status === "completed") {
        updates.completed_at = now;
        updates.final_total =
          input.finalTotal ??
          current.estimated_total ??
          null;

        if (current.payment_method === "cash")
          updates.payment_status = "paid";
      }

      if (
        input.status === "cancelled_by_provider" ||
        input.status === "cancelled_by_admin"
      ) {
        updates.cancelled_at = now;
      }

      const { data, error } = await supabaseAdmin
        .from("service_bookings")
        .update(updates)
        .eq("id", bookingId)
        .select("*")
        .single();

      if (error) throw new Error(error.message);

      await supabaseAdmin
        .from("service_booking_events")
        .insert({
          booking_id: bookingId,
          from_status: current.booking_status,
          to_status: input.status,
          actor_type:
            req.profile?.account_type === "merchant"
              ? "provider"
              : "admin",
          actor_user_id: req.profile?.id ?? null,
          note: input.note ?? null,
        });

      res.json({
        success: true,
        data: { booking: data },
      });
    } catch (error) {
      next(error);
    }
  },
);
