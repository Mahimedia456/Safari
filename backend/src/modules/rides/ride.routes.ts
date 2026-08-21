import { Router } from "express";
import { z } from "zod";

import { requireAuth } from "../../middleware/auth.js";
import { requireAccountTypes } from "../../middleware/requireRole.js";
import {
  cancelPassengerRide,
  createFareQuotes,
  createRideFromQuote,
  getPassengerRide,
  getRideCatalog,
  listPassengerRides,
} from "./ride.service.js";

export const rideRouter = Router();

rideRouter.use(
  requireAuth,
  requireAccountTypes("passenger", "driver", "delivery_partner"),
);

rideRouter.get("/catalog", async (req, res, next) => {
  try {
    const query = z
      .object({
        countryCode: z.enum(["PK", "DE"]).default("PK"),
        latitude: z.coerce.number().optional(),
        longitude: z.coerce.number().optional(),
      })
      .parse(req.query);

    const data = await getRideCatalog(
      query.countryCode,
      query.latitude,
      query.longitude,
    );

    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

rideRouter.post("/quotes", async (req, res, next) => {
  try {
    const input = z
      .object({
        countryCode: z.enum(["PK", "DE"]).default("PK"),
        pickupAddress: z.string().trim().min(3).max(240),
        pickupLatitude: z.number(),
        pickupLongitude: z.number(),
        dropoffAddress: z.string().trim().min(3).max(240),
        dropoffLatitude: z.number(),
        dropoffLongitude: z.number(),
        paymentMethod: z.enum(["cash", "wallet", "card"]).default("cash"),
      })
      .parse(req.body);

    const data = await createFareQuotes(
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

rideRouter.post("/", async (req, res, next) => {
  try {
    const input = z
      .object({
        quoteId: z.string().uuid(),
        bookingType: z.enum(["now", "scheduled"]).default("now"),
        scheduledFor: z.string().datetime().nullable().optional(),
        pickupNote: z.string().trim().max(300).nullable().optional(),
      })
      .parse(req.body);

    const ride = await createRideFromQuote(
      req.authUser!.id,
      input,
    );

    res.status(201).json({
      success: true,
      data: { ride },
    });
  } catch (error) {
    next(error);
  }
});

rideRouter.get("/", async (req, res, next) => {
  try {
    const query = z
      .object({
        status: z.string().trim().max(60).optional(),
      })
      .parse(req.query);

    const rides = await listPassengerRides(
      req.authUser!.id,
      query.status,
    );

    res.json({
      success: true,
      data: { rides },
    });
  } catch (error) {
    next(error);
  }
});

rideRouter.get("/:rideId", async (req, res, next) => {
  try {
    const rideId = z.string().uuid().parse(req.params.rideId);

    const data = await getPassengerRide(
      req.authUser!.id,
      rideId,
    );

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
});

rideRouter.post("/:rideId/cancel", async (req, res, next) => {
  try {
    const rideId = z.string().uuid().parse(req.params.rideId);

    const input = z
      .object({
        reason: z.string().trim().min(2).max(300),
      })
      .parse(req.body);

    const ride = await cancelPassengerRide(
      req.authUser!.id,
      rideId,
      input.reason,
    );

    res.json({
      success: true,
      data: { ride },
    });
  } catch (error) {
    next(error);
  }
});
