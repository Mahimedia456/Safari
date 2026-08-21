import { Router } from "express";
import { z } from "zod";

import { requireAuth } from "../../middleware/auth.js";
import {
  requireAccountTypes,
  requireAdminRoles,
} from "../../middleware/requireRole.js";
import { supabaseAdmin } from "../../lib/supabase.js";

export const adminNotificationsRouter = Router();

adminNotificationsRouter.use(
  requireAuth,
  requireAccountTypes("administration"),
  requireAdminRoles(
    "super_admin",
    "admin",
    "operations_manager",
    "support",
  ),
);

adminNotificationsRouter.post("/send", async (req, res, next) => {
  try {
    const input = z
      .object({
        userId: z.string().uuid(),
        notificationType: z.enum([
          "ride",
          "food",
          "grocery",
          "pharmacy",
          "services",
          "payment",
          "wallet",
          "account",
          "promotion",
          "system",
        ]),
        title: z.string().trim().min(2).max(120),
        body: z.string().trim().min(2).max(500),
        priority: z
          .enum(["low", "normal", "high"])
          .default("normal"),
        data: z.record(z.string(), z.unknown()).optional(),
      })
      .parse(req.body);

    const { data, error } = await supabaseAdmin
      .from("notifications")
      .insert({
        user_id: input.userId,
        notification_type:
          input.notificationType,
        title: input.title,
        body: input.body,
        priority: input.priority,
        data: input.data ?? {},
      })
      .select("*")
      .single();

    if (error) throw new Error(error.message);

    await supabaseAdmin
      .from("realtime_events")
      .insert({
        channel: `user:${input.userId}`,
        event_type: "notification.created",
        user_id: input.userId,
        entity_type: "notification",
        entity_id: data.id,
        payload: {
          title: input.title,
          body: input.body,
        },
      });

    res.status(201).json({
      success: true,
      data: {
        notification: data,
      },
    });
  } catch (error) {
    next(error);
  }
});
