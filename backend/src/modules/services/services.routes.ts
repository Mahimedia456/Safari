import { Router } from "express";
import { z } from "zod";

import { requireAuth } from "../../middleware/auth.js";
import { requireAccountTypes } from "../../middleware/requireRole.js";
import {
  cancelServiceBooking,
  createServiceBooking,
  getProvider,
  getServiceBooking,
  listProviders,
  listServiceBookings,
  listServiceCategories,
} from "./services.service.js";

export const servicesRouter = Router();

servicesRouter.use(
  requireAuth,
  requireAccountTypes("passenger", "driver", "delivery_partner"),
);

servicesRouter.get("/categories", async (_req, res, next) => {
  try {
    const categories = await listServiceCategories();

    res.json({
      success: true,
      data: {
        categories,
        total: categories.length,
      },
    });
  } catch (error) {
    next(error);
  }
});

servicesRouter.get("/providers", async (req, res, next) => {
  try {
    const query = z
      .object({
        cityId: z.string().uuid().optional(),
        categoryId: z.string().uuid().optional(),
        search: z.string().trim().max(120).optional(),
        featured: z
          .enum(["true", "false"])
          .transform((value) => value === "true")
          .optional(),
      })
      .parse(req.query);

    const providers = await listProviders(query);

    res.json({
      success: true,
      data: {
        providers,
        total: providers.length,
      },
    });
  } catch (error) {
    next(error);
  }
});

servicesRouter.get("/providers/:providerId", async (req, res, next) => {
  try {
    const providerId = z.string().uuid().parse(req.params.providerId);
    const data = await getProvider(providerId);

    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

servicesRouter.post("/bookings", async (req, res, next) => {
  try {
    const input = z
      .object({
        providerId: z.string().uuid(),
        serviceId: z.string().uuid(),
        scheduledFor: z.string().datetime().nullable().optional(),
        serviceAddressId: z.string().uuid().nullable().optional(),
        serviceAddress: z.string().trim().min(3).max(300),
        latitude: z.number().nullable().optional(),
        longitude: z.number().nullable().optional(),
        customerNote: z.string().trim().max(500).nullable().optional(),
        paymentMethod: z.enum(["cash", "wallet", "card"]).default("cash"),
      })
      .parse(req.body);

    const data = await createServiceBooking(
      req.authUser!.id,
      input,
    );

    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
});

servicesRouter.get("/bookings", async (req, res, next) => {
  try {
    const bookings = await listServiceBookings(req.authUser!.id);

    res.json({
      success: true,
      data: {
        bookings,
        total: bookings.length,
      },
    });
  } catch (error) {
    next(error);
  }
});

servicesRouter.get("/bookings/:bookingId", async (req, res, next) => {
  try {
    const bookingId = z.string().uuid().parse(req.params.bookingId);

    const data = await getServiceBooking(
      req.authUser!.id,
      bookingId,
    );

    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

servicesRouter.post(
  "/bookings/:bookingId/cancel",
  async (req, res, next) => {
    try {
      const bookingId = z.string().uuid().parse(req.params.bookingId);

      const input = z
        .object({
          reason: z.string().trim().min(2).max(300),
        })
        .parse(req.body);

      const booking = await cancelServiceBooking(
        req.authUser!.id,
        bookingId,
        input.reason,
      );

      res.json({
        success: true,
        data: { booking },
      });
    } catch (error) {
      next(error);
    }
  },
);
