import { Router } from "express";
import { z } from "zod";

import { requireAuth } from "../../middleware/auth.js";
import { requireAccountTypes } from "../../middleware/requireRole.js";
import {
  cancelDriverRide,
  getActiveRideForDriver,
  getActiveRideForPassenger,
  transitionDriverRide,
  updateDriverLocation,
} from "./tracking.service.js";

export const trackingRouter = Router();

trackingRouter.get(
  "/passenger/active",
  requireAuth,
  requireAccountTypes("passenger"),
  async (req, res, next) => {
    try {
      const data = await getActiveRideForPassenger(req.authUser!.id);
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },
);

trackingRouter.get(
  "/driver/active",
  requireAuth,
  requireAccountTypes("driver"),
  async (req, res, next) => {
    try {
      const ride = await getActiveRideForDriver(req.authUser!.id);
      res.json({ success: true, data: { ride } });
    } catch (error) {
      next(error);
    }
  },
);

trackingRouter.post(
  "/driver/location",
  requireAuth,
  requireAccountTypes("driver"),
  async (req, res, next) => {
    try {
      const input = z
        .object({
          latitude: z.number(),
          longitude: z.number(),
          heading: z.number().nullable().optional(),
          speedKph: z.number().min(0).nullable().optional(),
          accuracyMeters: z.number().min(0).nullable().optional(),
        })
        .parse(req.body);

      const location = await updateDriverLocation(
        req.authUser!.id,
        input,
      );

      res.json({
        success: true,
        data: { location },
      });
    } catch (error) {
      next(error);
    }
  },
);

trackingRouter.post(
  "/driver/rides/:rideId/status",
  requireAuth,
  requireAccountTypes("driver"),
  async (req, res, next) => {
    try {
      const rideId = z.string().uuid().parse(req.params.rideId);

      const input = z
        .object({
          status: z.enum([
            "driver_arriving",
            "driver_arrived",
            "in_progress",
            "completed",
          ]),
          startOtp: z.string().trim().regex(/^\d{4}$/).nullable().optional(),
          latitude: z.number().nullable().optional(),
          longitude: z.number().nullable().optional(),
        })
        .parse(req.body);

      const ride = await transitionDriverRide(
        req.authUser!.id,
        rideId,
        input.status,
        input,
      );

      res.json({
        success: true,
        data: { ride },
      });
    } catch (error) {
      next(error);
    }
  },
);

trackingRouter.post(
  "/driver/rides/:rideId/cancel",
  requireAuth,
  requireAccountTypes("driver"),
  async (req, res, next) => {
    try {
      const rideId = z.string().uuid().parse(req.params.rideId);
      const input = z
        .object({
          reason: z.string().trim().min(2).max(300),
        })
        .parse(req.body);

      const ride = await cancelDriverRide(
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
  },
);
