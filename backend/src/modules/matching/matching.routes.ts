import { Router } from "express";
import { z } from "zod";

import { requireAuth } from "../../middleware/auth.js";
import { requireAccountTypes } from "../../middleware/requireRole.js";

import {
  acceptPassengerDriverOffer,
  listDriverRideRequests,
  listPassengerDriverOffers,
  rejectRideRequest,
  startRideMatching,
  submitDriverFareOffer,
} from "./matching.service.js";

export const matchingRouter = Router();

matchingRouter.post(
  "/rides/:rideId/start",
  requireAuth,
  requireAccountTypes("passenger"),
  async (req, res, next) => {
    try {
      const rideId = z.string().uuid().parse(req.params.rideId);
      const data = await startRideMatching(req.authUser!.id, rideId);
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },
);

matchingRouter.get(
  "/rides/:rideId/offers",
  requireAuth,
  requireAccountTypes("passenger"),
  async (req, res, next) => {
    try {
      const rideId = z.string().uuid().parse(req.params.rideId);
      const data = await listPassengerDriverOffers(
        req.authUser!.id,
        rideId,
      );
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },
);

matchingRouter.post(
  "/rides/:rideId/offers/:offerId/accept",
  requireAuth,
  requireAccountTypes("passenger"),
  async (req, res, next) => {
    try {
      z.string().uuid().parse(req.params.rideId);
      const offerId = z.string().uuid().parse(req.params.offerId);
      const ride = await acceptPassengerDriverOffer(
        req.authUser!.id,
        offerId,
      );
      res.json({ success: true, data: { ride } });
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
      const offers = await listDriverRideRequests(req.authUser!.id);
      res.json({ success: true, data: { offers } });
    } catch (error) {
      next(error);
    }
  },
);

matchingRouter.post(
  "/driver/offers/:offerId/submit",
  requireAuth,
  requireAccountTypes("driver"),
  async (req, res, next) => {
    try {
      const invitationId = z.string().uuid().parse(req.params.offerId);
      const input = z
        .object({
          offeredFare: z.number().positive().max(100000),
        })
        .parse(req.body);

      const offer = await submitDriverFareOffer(
        req.authUser!.id,
        invitationId,
        input.offeredFare,
      );

      res.status(201).json({
        success: true,
        data: { offer },
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
      const invitationId = z.string().uuid().parse(req.params.offerId);
      const input = z
        .object({
          reason: z.string().trim().max(300).nullable().optional(),
        })
        .parse(req.body);

      const offer = await rejectRideRequest(
        req.authUser!.id,
        invitationId,
        input.reason,
      );

      res.json({ success: true, data: { offer } });
    } catch (error) {
      next(error);
    }
  },
);
