import { Router } from "express";
import { z } from "zod";

import { requireAuth } from "../../middleware/auth.js";
import {
  listNotifications,
  markAllNotificationsRead,
  markNotificationRead,
  registerDevice,
} from "./notifications.service.js";

export const notificationsRouter = Router();

notificationsRouter.use(requireAuth);

notificationsRouter.get("/", async (req, res, next) => {
  try {
    const notifications =
      await listNotifications(req.authUser!.id);

    res.json({
      success: true,
      data: {
        notifications,
        unread: notifications.filter(
          (item) => !item.is_read,
        ).length,
      },
    });
  } catch (error) {
    next(error);
  }
});

notificationsRouter.patch(
  "/:notificationId/read",
  async (req, res, next) => {
    try {
      const notificationId = z
        .string()
        .uuid()
        .parse(req.params.notificationId);

      const notification =
        await markNotificationRead(
          req.authUser!.id,
          notificationId,
        );

      res.json({
        success: true,
        data: { notification },
      });
    } catch (error) {
      next(error);
    }
  },
);

notificationsRouter.post(
  "/read-all",
  async (req, res, next) => {
    try {
      await markAllNotificationsRead(
        req.authUser!.id,
      );

      res.json({
        success: true,
        data: {
          message: "Safari notifications marked as read.",
        },
      });
    } catch (error) {
      next(error);
    }
  },
);

notificationsRouter.post(
  "/device",
  async (req, res, next) => {
    try {
      const input = z
        .object({
          platform: z.enum(["android", "ios", "web"]),
          pushProvider: z.enum([
            "expo",
            "fcm",
            "apns",
            "web",
          ]),
          token: z.string().trim().min(10),
          deviceName: z
            .string()
            .trim()
            .max(120)
            .nullable()
            .optional(),
          appVersion: z
            .string()
            .trim()
            .max(40)
            .nullable()
            .optional(),
        })
        .parse(req.body);

      const device = await registerDevice(
        req.authUser!.id,
        input,
      );

      res.json({
        success: true,
        data: { device },
      });
    } catch (error) {
      next(error);
    }
  },
);
