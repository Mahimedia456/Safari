import { Router } from "express";
import { z } from "zod";

import { requireAuth } from "../../middleware/auth.js";
import { requireAccountTypes } from "../../middleware/requireRole.js";
import { supabaseAdmin } from "../../lib/supabase.js";

export const adminCommerceRouter = Router();

adminCommerceRouter.use(
  requireAuth,
  requireAccountTypes("administration", "merchant"),
);

function merchantCanAccess(
  merchantType: string | null | undefined,
  storeType: string,
) {
  return merchantType === storeType;
}

adminCommerceRouter.get("/:type/stores", async (req, res, next) => {
  try {
    const storeType = z
      .enum(["grocery", "pharmacy"])
      .parse(req.params.type);

    let builder = supabaseAdmin
      .from("commerce_stores")
      .select("*")
      .eq("store_type", storeType)
      .order("created_at", { ascending: false });

    if (req.profile?.account_type === "merchant") {
      if (!merchantCanAccess(req.profile.merchant_type, storeType)) {
        res.status(403).json({
          success: false,
          error: {
            code: "MERCHANT_ACCESS_DENIED",
            message: `This account is not a Safari ${storeType} merchant.`,
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
        stores: data,
        total: data.length,
      },
    });
  } catch (error) {
    next(error);
  }
});

adminCommerceRouter.get("/:type/orders", async (req, res, next) => {
  try {
    const storeType = z
      .enum(["grocery", "pharmacy"])
      .parse(req.params.type);

    const query = z
      .object({
        status: z.string().trim().max(60).optional(),
      })
      .parse(req.query);

    let storeIds: string[] = [];

    if (req.profile?.account_type === "administration") {
      const { data, error } = await supabaseAdmin
        .from("commerce_stores")
        .select("id")
        .eq("store_type", storeType);

      if (error) throw new Error(error.message);
      storeIds = data.map((item) => item.id);
    } else {
      if (!merchantCanAccess(req.profile?.merchant_type, storeType)) {
        res.status(403).json({
          success: false,
          error: {
            code: "MERCHANT_ACCESS_DENIED",
            message: `This account is not a Safari ${storeType} merchant.`,
          },
        });
        return;
      }

      const { data, error } = await supabaseAdmin
        .from("commerce_stores")
        .select("id")
        .eq("store_type", storeType)
        .eq("merchant_user_id", req.profile!.id);

      if (error) throw new Error(error.message);
      storeIds = data.map((item) => item.id);
    }

    if (storeIds.length === 0) {
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
      .from("commerce_orders")
      .select(`
        *,
        commerce_stores (
          id,
          name,
          store_type
        )
      `)
      .eq("order_type", storeType)
      .in("store_id", storeIds)
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

adminCommerceRouter.patch(
  "/:type/orders/:orderId/status",
  async (req, res, next) => {
    try {
      const storeType = z
        .enum(["grocery", "pharmacy"])
        .parse(req.params.type);

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
          prescriptionStatus: z
            .enum([
              "not_required",
              "required",
              "uploaded",
              "under_review",
              "approved",
              "rejected",
            ])
            .optional(),
          note: z.string().trim().max(300).nullable().optional(),
        })
        .parse(req.body);

      const { data: current, error: currentError } = await supabaseAdmin
        .from("commerce_orders")
        .select(`
          *,
          commerce_stores (
            merchant_user_id,
            store_type
          )
        `)
        .eq("id", orderId)
        .eq("order_type", storeType)
        .single();

      if (currentError || !current)
        throw new Error("Safari order not found.");

      if (
        req.profile?.account_type === "merchant" &&
        (
          current.commerce_stores?.merchant_user_id !== req.profile.id ||
          current.commerce_stores?.store_type !== req.profile.merchant_type
        )
      ) {
        res.status(403).json({
          success: false,
          error: {
            code: "MERCHANT_ACCESS_DENIED",
            message: "This order does not belong to your Safari store.",
          },
        });
        return;
      }

      const now = new Date().toISOString();

      const updates: Record<string, unknown> = {
        status: input.status,
        updated_at: now,
      };

      if (input.prescriptionStatus !== undefined) {
        updates.prescription_status = input.prescriptionStatus;
      }

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
        .from("commerce_orders")
        .update(updates)
        .eq("id", orderId)
        .select("*")
        .single();

      if (error) throw new Error(error.message);

      await supabaseAdmin
        .from("commerce_order_status_events")
        .insert({
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
  },
);
