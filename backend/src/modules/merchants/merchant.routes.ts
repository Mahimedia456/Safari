import { Router } from "express";

import { requireAuth } from "../../middleware/auth.js";
import { requireAccountTypes } from "../../middleware/requireRole.js";
import { getMerchantOverview } from "./merchant.service.js";

export const merchantRouter = Router();

merchantRouter.use(
  requireAuth,
  requireAccountTypes("merchant"),
);

merchantRouter.get("/me", async (req, res, next) => {
  try {
    const data = await getMerchantOverview(req.authUser!.id);

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
});
