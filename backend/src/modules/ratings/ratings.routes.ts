import { Router } from "express";
import { z } from "zod";

import { requireAuth } from "../../middleware/auth.js";
import {
  getRideRatings,
  getRideReceipt,
  submitRideRating,
} from "./ratings.service.js";

export const ratingsRouter = Router();

ratingsRouter.use(requireAuth);

ratingsRouter.get("/rides/:rideId/receipt", async (req, res, next) => {
  try {
    const rideId = z.string().uuid().parse(req.params.rideId);
    const receipt = await getRideReceipt(req.authUser!.id, rideId);

    res.json({
      success: true,
      data: { receipt },
    });
  } catch (error) {
    next(error);
  }
});

ratingsRouter.get("/rides/:rideId/ratings", async (req, res, next) => {
  try {
    const rideId = z.string().uuid().parse(req.params.rideId);
    const ratings = await getRideRatings(req.authUser!.id, rideId);

    res.json({
      success: true,
      data: { ratings },
    });
  } catch (error) {
    next(error);
  }
});

ratingsRouter.post("/rides/:rideId/ratings", async (req, res, next) => {
  try {
    const rideId = z.string().uuid().parse(req.params.rideId);

    const input = z
      .object({
        rating: z.number().int().min(1).max(5),
        comment: z.string().trim().max(500).nullable().optional(),
        tags: z.array(z.string().trim().min(1).max(50)).max(8).optional(),
      })
      .parse(req.body);

    const rating = await submitRideRating(
      req.authUser!.id,
      rideId,
      input,
    );

    res.status(201).json({
      success: true,
      data: { rating },
    });
  } catch (error) {
    next(error);
  }
});
