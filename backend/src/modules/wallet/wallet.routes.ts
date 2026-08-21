import { Router } from "express";
import { z } from "zod";

import { requireAuth } from "../../middleware/auth.js";
import { getWallet, topupDemoWallet } from "./wallet.service.js";

export const walletRouter = Router();

walletRouter.use(requireAuth);

walletRouter.get("/", async (req, res, next) => {
  try {
    const data = await getWallet(req.authUser!.id);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

walletRouter.post("/demo-topup", async (req, res, next) => {
  try {
    const input = z
      .object({
        amount: z.number().min(100).max(100000),
      })
      .parse(req.body);

    const data = await topupDemoWallet(
      req.authUser!.id,
      input.amount,
    );

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
});
