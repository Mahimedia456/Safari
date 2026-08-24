import { Router } from "express";
import { z } from "zod";

import { requireAuth } from "../../middleware/auth.js";
import { requireAccountTypes } from "../../middleware/requireRole.js";

import {
  acceptDeliveryJob,
  listAvailableDeliveryJobs,
  listDriverDeliveryJobs,
  updateDeliveryJobStatus,
  getCustomerDeliveryTracking,
} from "./delivery.service.js";

export const deliveryRouter = Router();

deliveryRouter.use(requireAuth);


deliveryRouter.get(
  "/customer/:type/:sourceId/tracking",
  requireAccountTypes("passenger"),
  async (req, res, next) => {
    try {
      const type = z
        .enum(["food", "grocery", "pharmacy"])
        .parse(req.params.type);

      const sourceId = z.string().uuid().parse(req.params.sourceId);

      const data = await getCustomerDeliveryTracking(
        req.authUser!.id,
        type,
        sourceId,
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

deliveryRouter.get("/jobs", requireAccountTypes("driver", "delivery_partner"), async (req, res, next) => {
  try {
    const query = z
      .object({
        type: z.enum(["food", "grocery", "pharmacy"]).optional(),
      })
      .parse(req.query);

    const jobs = await listAvailableDeliveryJobs(
      req.authUser!.id,
      query.type,
    );

    res.json({
      success: true,
      data: { jobs, total: jobs.length },
    });
  } catch (error) {
    next(error);
  }
});

deliveryRouter.get("/me/jobs", requireAccountTypes("driver", "delivery_partner"), async (req, res, next) => {
  try {
    const jobs = await listDriverDeliveryJobs(req.authUser!.id);

    res.json({
      success: true,
      data: { jobs, total: jobs.length },
    });
  } catch (error) {
    next(error);
  }
});

deliveryRouter.post("/jobs/:jobId/accept", requireAccountTypes("driver", "delivery_partner"), async (req, res, next) => {
  try {
    const jobId = z.string().uuid().parse(req.params.jobId);
    const job = await acceptDeliveryJob(req.authUser!.id, jobId);

    res.json({
      success: true,
      data: { job },
    });
  } catch (error) {
    next(error);
  }
});

deliveryRouter.post("/jobs/:jobId/status", requireAccountTypes("driver", "delivery_partner"), async (req, res, next) => {
  try {
    const jobId = z.string().uuid().parse(req.params.jobId);

    const input = z
      .object({
        status: z.enum([
          "at_pickup",
          "picked_up",
          "on_the_way",
          "delivered",
        ]),
      })
      .parse(req.body);

    const job = await updateDeliveryJobStatus(
      req.authUser!.id,
      jobId,
      input.status,
    );

    res.json({
      success: true,
      data: { job },
    });
  } catch (error) {
    next(error);
  }
});
