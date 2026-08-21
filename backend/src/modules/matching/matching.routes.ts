import { Router } from "express";
import { z } from "zod";

import { requireAuth } from "../../middleware/auth.js";
import { requireAccountTypes } from "../../middleware/requireRole.js";
import {
  acceptDriverOffer,
  listDriverOffers,
  rejectDriverOffer,
  startRideMatching,
} from "./matching.service.js";

export const matchingRouter = Router();

matchingRouter.post(
  "/rides/:rideId/start",
  requireAuth,
  requireAccountTypes("passenger"),
  async (req, res, next) => {
    try {
      const rideId = z.string().uuid().parse(req.params.rideId);
      const data = await startRideMatching(rideId);

      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },
);

matchingRouter.get(
  "/driver/offers",
  requireAuth,
  requireAccountTypes("driver"),
  async (req, res, next) => {
    try {
      const offers = await listDriverOffers(req.authUser!.id);

      res.json({
        success: true,
        data: { offers },
      });
    } catch (error) {
      next(error);
    }
  },
);

matchingRouter.post(
  "/driver/offers/:offerId/accept",
  requireAuth,
  requireAccountTypes("driver"),
  async (req, res, next) => {
    try {
      const offerId = z.string().uuid().parse(req.params.offerId);
      const ride = await acceptDriverOffer(req.authUser!.id, offerId);

      res.json({
        success: true,
        data: { ride },
      });
    } catch (error) {
      next(error);
    }
  },
);

matchingRouter.post(
  "/driver/offers/:offerId/reject",
  requireAuth,
  requireAccountTypes("driver"),
  async (req, res, next) => {
    try {
      const offerId = z.string().uuid().parse(req.params.offerId);
      const input = z
        .object({
          reason: z.string().trim().max(300).nullable().optional(),
        })
        .parse(req.body);

      const offer = await rejectDriverOffer(
        req.authUser!.id,
        offerId,
        input.reason,
      );

      res.json({
        success: true,
        data: { offer },
      });
    } catch (error) {
      next(error);
    }
  },
);
