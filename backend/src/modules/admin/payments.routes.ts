import { Router } from "express";
import { z } from "zod";

import { requireAuth } from "../../middleware/auth.js";
import {
  requireAccountTypes,
  requireAdminRoles,
} from "../../middleware/requireRole.js";
import { supabaseAdmin } from "../../lib/supabase.js";

export const adminPaymentsRouter = Router();

adminPaymentsRouter.use(
  requireAuth,
  requireAccountTypes("administration"),
  requireAdminRoles(
    "super_admin",
    "admin",
    "finance_manager",
  ),
);

adminPaymentsRouter.get("/wallets", async (_req, res, next) => {
  try {
    const { data, error } = await supabaseAdmin
      .from("wallet_accounts")
      .select(`
        *,
        profiles!wallet_accounts_user_id_fkey (
          id,
          full_name,
          email,
          phone,
          account_type
        )
      `)
      .order("updated_at", { ascending: false });

    if (error) throw new Error(error.message);

    res.json({
      success: true,
      data: {
        wallets: data,
        total: data.length,
      },
    });
  } catch (error) {
    next(error);
  }
});

adminPaymentsRouter.get("/transactions", async (req, res, next) => {
  try {
    const query = z
      .object({
        userId: z.string().uuid().optional(),
        type: z.string().trim().max(40).optional(),
      })
      .parse(req.query);

    let builder = supabaseAdmin
      .from("wallet_transactions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);

    if (query.userId)
      builder = builder.eq(
        "wallet_user_id",
        query.userId,
      );

    if (query.type)
      builder = builder.eq(
        "transaction_type",
        query.type,
      );

    const { data, error } = await builder;
    if (error) throw new Error(error.message);

    res.json({
      success: true,
      data: {
        transactions: data,
        total: data.length,
      },
    });
  } catch (error) {
    next(error);
  }
});

adminPaymentsRouter.get("/merchant-ledger", async (_req, res, next) => {
  try {
    const { data, error } = await supabaseAdmin
      .from("merchant_ledger_entries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);

    res.json({
      success: true,
      data: {
        entries: data,
        total: data.length,
      },
    });
  } catch (error) {
    next(error);
  }
});
