import { Router } from "express";
import { z } from "zod";

import { requireAuth } from "../../middleware/auth.js";
import { requireAccountTypes } from "../../middleware/requireRole.js";
import { supabaseAdmin } from "../../lib/supabase.js";

export const adminFoodRouter = Router();

adminFoodRouter.use(
  requireAuth,
  requireAccountTypes("administration", "merchant"),
);

async function allowedRestaurantIds(profile: Express.Request["profile"]) {
  if (!profile) return [];

  if (profile.account_type === "administration") {
    const { data, error } = await supabaseAdmin
      .from("food_restaurants")
      .select("id");

    if (error) throw new Error(error.message);
    return data.map((item) => item.id);
  }

  if (profile.account_type === "merchant" && profile.merchant_type === "food") {
    const { data, error } = await supabaseAdmin
      .from("food_restaurants")
      .select("id")
      .eq("merchant_user_id", profile.id);

    if (error) throw new Error(error.message);
    return data.map((item) => item.id);
  }

  return [];
}

adminFoodRouter.get("/restaurants", async (req, res, next) => {
  try {
    let builder = supabaseAdmin
      .from("food_restaurants")
      .select(`
        *,
        service_cities (
          name,
          city_code
        )
      `)
      .order("created_at", { ascending: false });

    if (req.profile?.account_type === "merchant") {
      if (req.profile.merchant_type !== "food") {
        res.status(403).json({
          success: false,
          error: {
            code: "FOOD_MERCHANT_REQUIRED",
            message: "This merchant account is not a Safari Food merchant.",
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
        restaurants: data,
        total: data.length,
      },
    });
  } catch (error) {
    next(error);
  }
});

adminFoodRouter.get("/orders", async (req, res, next) => {
  try {
    const query = z
      .object({
        status: z.string().trim().max(60).optional(),
      })
      .parse(req.query);

    const restaurantIds = await allowedRestaurantIds(req.profile);

    if (restaurantIds.length === 0) {
      res.json({
        success: true,
        data: {
          orders: [],
          total: 0,
        },
      });
      return;
    }

    let builder = supabaseAdmin
      .from("food_orders")
      .select(`
        *,
        food_restaurants (
          id,
          name
        )
      `)
      .in("restaurant_id", restaurantIds)
      .order("created_at", { ascending: false });

    if (query.status) builder = builder.eq("status", query.status);

    const { data, error } = await builder;

    if (error) throw new Error(error.message);

    res.json({
      success: true,
      data: {
        orders: data,
        total: data.length,
      },
    });
  } catch (error) {
    next(error);
  }
});

adminFoodRouter.patch("/orders/:orderId/status", async (req, res, next) => {
  try {
    const orderId = z.string().uuid().parse(req.params.orderId);

    const input = z
      .object({
        status: z.enum([
          "confirmed",
          "preparing",
          "ready_for_pickup",
          "picked_up",
          "on_the_way",
          "delivered",
          "cancelled_by_merchant",
          "cancelled_by_admin",
        ]),
        note: z.string().trim().max(300).nullable().optional(),
      })
      .parse(req.body);

    const restaurantIds = await allowedRestaurantIds(req.profile);

    const { data: current, error: currentError } = await supabaseAdmin
      .from("food_orders")
      .select("*")
      .eq("id", orderId)
      .in("restaurant_id", restaurantIds)
      .single();

    if (currentError || !current) {
      throw new Error("Safari Food order not found.");
    }

    const now = new Date().toISOString();

    const updates: Record<string, unknown> = {
      status: input.status,
      updated_at: now,
    };

    if (input.status === "confirmed") updates.confirmed_at = now;
    if (input.status === "delivered") {
      updates.delivered_at = now;
      updates.payment_status =
        current.payment_method === "cash"
          ? "paid"
          : current.payment_status;
    }

    if (
      input.status === "cancelled_by_merchant" ||
      input.status === "cancelled_by_admin"
    ) {
      updates.cancelled_at = now;
    }

    const { data, error } = await supabaseAdmin
      .from("food_orders")
      .update(updates)
      .eq("id", orderId)
      .select("*")
      .single();

    if (error) throw new Error(error.message);

    await supabaseAdmin.from("food_order_status_events").insert({
      order_id: orderId,
      from_status: current.status,
      to_status: input.status,
      actor_type:
        req.profile?.account_type === "merchant"
          ? "merchant"
          : "admin",
      actor_user_id: req.profile?.id ?? null,
      note: input.note ?? null,
    });

    res.json({
      success: true,
      data: { order: data },
    });
  } catch (error) {
    next(error);
  }
});
