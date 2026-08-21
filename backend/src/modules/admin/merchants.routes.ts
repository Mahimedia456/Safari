import { Router } from "express";
import { z } from "zod";

import { requireAuth } from "../../middleware/auth.js";
import {
  requireAccountTypes,
  requireAdminRoles,
} from "../../middleware/requireRole.js";
import { supabaseAdmin } from "../../lib/supabase.js";
import { syncUnifiedOrderIndex } from "../merchants/merchant.service.js";

export const adminMerchantsRouter = Router();

adminMerchantsRouter.use(
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

adminMerchantsRouter.get("/", async (req, res, next) => {
  try {
    const query = z
      .object({
        type: z
          .enum(["food", "grocery", "pharmacy", "services"])
          .optional(),
        verificationStatus: z
          .enum([
            "pending",
            "in_review",
            "verified",
            "rejected",
            "suspended",
          ])
          .optional(),
      })
      .parse(req.query);

    let builder = supabaseAdmin
      .from("merchant_profiles")
      .select(`
        *,
        profiles!merchant_profiles_user_id_fkey (
          id,
          full_name,
          email,
          phone,
          status,
          created_at
        )
      `)
      .order("created_at", { ascending: false });

    if (query.type)
      builder = builder.eq("merchant_type", query.type);

    if (query.verificationStatus)
      builder = builder.eq(
        "verification_status",
        query.verificationStatus,
      );

    const { data, error } = await builder;
    if (error) throw new Error(error.message);

    res.json({
      success: true,
      data: {
        merchants: data,
        total: data.length,
      },
    });
  } catch (error) {
    next(error);
  }
});

adminMerchantsRouter.patch(
  "/:merchantId/status",
  async (req, res, next) => {
    try {
      const merchantId = z
        .string()
        .uuid()
        .parse(req.params.merchantId);

      const input = z
        .object({
          verificationStatus: z.enum([
            "in_review",
            "verified",
            "rejected",
            "suspended",
          ]),
          commissionPercent: z.number().min(0).max(100).optional(),
          payoutStatus: z.enum(["enabled", "paused"]).optional(),
          rejectionReason: z
            .string()
            .trim()
            .max(500)
            .nullable()
            .optional(),
        })
        .parse(req.body);

      const updates: Record<string, unknown> = {
        verification_status: input.verificationStatus,
        updated_at: new Date().toISOString(),
      };

      if (input.commissionPercent !== undefined)
        updates.commission_percent =
          input.commissionPercent;

      if (input.payoutStatus !== undefined)
        updates.payout_status = input.payoutStatus;

      if (input.rejectionReason !== undefined)
        updates.rejection_reason =
          input.rejectionReason;

      if (input.verificationStatus === "verified") {
        updates.approved_at = new Date().toISOString();
        updates.approved_by = req.authUser!.id;
        updates.rejection_reason = null;
      }

      const { data, error } = await supabaseAdmin
        .from("merchant_profiles")
        .update(updates)
        .eq("user_id", merchantId)
        .select("*")
        .single();

      if (error) throw new Error(error.message);

      res.json({
        success: true,
        data: {
          merchant: data,
        },
      });
    } catch (error) {
      next(error);
    }
  },
);

adminMerchantsRouter.get("/orders/unified", async (_req, res, next) => {
  try {
    await syncUnifiedOrderIndex();

    const { data, error } = await supabaseAdmin
      .from("order_index")
      .select("*")
      .order("created_at", { ascending: false });

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
