import { Router } from "express";
import { z } from "zod";

import { requireAuth } from "../../middleware/auth.js";
import {
  completeUpload,
  createAssetReadUrl,
  createUploadPlan,
  deleteAsset,
} from "./storage.service.js";

export const storageRouter = Router();

storageRouter.use(requireAuth);

storageRouter.post("/upload-plan", async (req, res, next) => {
  try {
    const input = z
      .object({
        bucket: z.enum([
          "avatars",
          "driver-documents",
          "prescriptions",
          "merchant-media",
          "service-media",
        ]),
        entityType: z.enum([
          "profile",
          "driver_document",
          "prescription",
          "restaurant",
          "commerce_store",
          "commerce_product",
          "service_provider",
          "provider_service",
        ]),
        entityId: z.string().uuid().nullable().optional(),
        filename: z.string().trim().min(1).max(200),
        mimeType: z.string().trim().max(100).nullable().optional(),
        sizeBytes: z.number().int().min(1).max(15 * 1024 * 1024).nullable().optional(),
      })
      .parse(req.body);

    const data = await createUploadPlan(
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

storageRouter.post("/:assetId/complete", async (req, res, next) => {
  try {
    const assetId = z.string().uuid().parse(req.params.assetId);

    const asset = await completeUpload(
      req.authUser!.id,
      assetId,
    );

    res.json({
      success: true,
      data: { asset },
    });
  } catch (error) {
    next(error);
  }
});

storageRouter.get("/:assetId/url", async (req, res, next) => {
  try {
    const assetId = z.string().uuid().parse(req.params.assetId);

    const query = z
      .object({
        expiresIn: z.coerce.number().int().min(60).max(3600).default(900),
      })
      .parse(req.query);

    const data = await createAssetReadUrl(
      req.authUser!.id,
      assetId,
      query.expiresIn,
    );

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
});

storageRouter.delete("/:assetId", async (req, res, next) => {
  try {
    const assetId = z.string().uuid().parse(req.params.assetId);

    await deleteAsset(req.authUser!.id, assetId);

    res.json({
      success: true,
      data: {
        message: "Safari media asset deleted.",
      },
    });
  } catch (error) {
    next(error);
  }
});
