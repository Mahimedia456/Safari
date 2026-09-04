import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../../middleware/auth.js";
import { supabaseAdmin } from "../../lib/supabase.js";

export const profileRouter = Router();

profileRouter.get("/me", requireAuth, async (req, res) => {
  res.json({ success: true, data: { profile: req.profile } });
});

profileRouter.patch("/me", requireAuth, async (req, res, next) => {
  try {
    const input = z
      .object({
        fullName: z.string().trim().min(2).max(120).optional(),
        avatarUrl: z.string().url().nullable().optional(),
        appMode: z.enum(["passenger", "driver"]).optional(),
        isOnboarded: z.boolean().optional(),
        dateOfBirth: z.string().date().nullable().optional(),
        gender: z
          .enum(["male", "female", "other", "prefer_not_to_say"])
          .nullable()
          .optional(),
        marketingOptIn: z.boolean().optional(),
      })
      .parse(req.body);

    const updates: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };

    if (input.fullName !== undefined) updates.full_name = input.fullName;
    if (input.avatarUrl !== undefined) updates.avatar_url = input.avatarUrl;
    if (input.appMode !== undefined) updates.app_mode = input.appMode;
    if (input.isOnboarded !== undefined) updates.is_onboarded = input.isOnboarded;
    if (input.dateOfBirth !== undefined) updates.date_of_birth = input.dateOfBirth;
    if (input.gender !== undefined) updates.gender = input.gender;
    if (input.marketingOptIn !== undefined) updates.marketing_opt_in = input.marketingOptIn;

    const { data, error } = await supabaseAdmin
      .from("profiles")
      .update(updates)
      .eq("id", req.authUser!.id)
      .select(
        "id,full_name,email,phone,account_type,app_mode,admin_role,merchant_type,status,country_code,is_onboarded,avatar_url,date_of_birth,gender,marketing_opt_in,average_rating,rating_count",
      )
      .single();

    if (error) {
      throw new Error(error.message);
    }

    res.json({ success: true, data: { profile: data } });
  } catch (error) {
    next(error);
  }
});
