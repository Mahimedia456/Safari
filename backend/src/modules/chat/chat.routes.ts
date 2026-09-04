import { Router } from "express";
import { z } from "zod";

import { requireAuth } from "../../middleware/auth.js";
import {
  getRideChat,
  sendRideChatMessage,
} from "./chat.service.js";

export const chatRouter = Router();

chatRouter.get(
  "/rides/:rideId",
  requireAuth,
  async (req, res, next) => {
    try {
      const rideId =
        z.string().uuid().parse(
          req.params.rideId,
        );

      const data =
        await getRideChat(
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
  },
);

chatRouter.post(
  "/rides/:rideId/messages",
  requireAuth,
  async (req, res, next) => {
    try {
      const rideId =
        z.string().uuid().parse(
          req.params.rideId,
        );

      const input =
        z.object({
          message:
            z.string()
              .trim()
              .min(1)
              .max(1000),
        }).parse(req.body);

      const message =
        await sendRideChatMessage(
          req.authUser!.id,
          rideId,
          input.message,
        );

      res.status(201).json({
        success: true,
        data: {
          message,
        },
      });
    } catch (error) {
      next(error);
    }
  },
);
