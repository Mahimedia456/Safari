import { Router } from "express";
import { z } from "zod";

import { requireAuth } from "../../middleware/auth.js";
import {
  getCurrentProfile,
  loginAdmin,
  loginMobile,
  refreshSession,
  registerMerchant,
  registerMobile,
  resendMobileOtp,
  resetMobilePassword,
  sendPasswordResetOtp,
  verifyMobileOtp,
  verifyPasswordResetOtp,
} from "./auth.service.js";

export const authRouter = Router();

const internationalPhone = z
  .string()
  .trim()
  .regex(/^\+[1-9]\d{7,14}$/, "Use an international phone number.");

const password = z
  .string()
  .min(8, "Password must be at least 8 characters.")
  .max(128);

const mobileRegisterSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  phone: internationalPhone,
  email: z.string().email().optional().or(z.literal("")),
  password,
  mode: z.enum(["passenger", "driver"]),
  countryCode: z.literal("PK"),
});

authRouter.post("/mobile/register", async (req, res, next) => {
  try {
    const input = mobileRegisterSchema.parse(req.body);

    const result = await registerMobile({
      ...input,
      email: input.email || undefined,
    });

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

authRouter.post("/mobile/resend-otp", async (req, res, next) => {
  try {
    const input = z
      .object({ phone: internationalPhone })
      .parse(req.body);

    const result = await resendMobileOtp(input.phone);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

authRouter.post("/mobile/verify-otp", async (req, res, next) => {
  try {
    const input = z
      .object({
        phone: internationalPhone,
        token: z.string().trim().min(4).max(10),
      })
      .parse(req.body);

    const result = await verifyMobileOtp(input.phone, input.token);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

authRouter.post("/mobile/login", async (req, res, next) => {
  try {
    const input = z
      .object({
        phone: internationalPhone,
        password,
      })
      .parse(req.body);

    const result = await loginMobile(input.phone, input.password);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

authRouter.post("/mobile/forgot-password", async (req, res, next) => {
  try {
    const input = z
      .object({ phone: internationalPhone })
      .parse(req.body);

    const data = await sendPasswordResetOtp(input.phone);

    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

authRouter.post(
  "/mobile/forgot-password/verify",
  async (req, res, next) => {
    try {
      const input = z
        .object({
          phone: internationalPhone,
          token: z.string().trim().min(4).max(10),
        })
        .parse(req.body);

      const data = await verifyPasswordResetOtp(
        input.phone,
        input.token,
      );

      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },
);

authRouter.post("/mobile/reset-password", async (req, res, next) => {
  try {
    const input = z
      .object({
        resetAccessToken: z.string().min(20),
        newPassword: password,
      })
      .parse(req.body);

    const data = await resetMobilePassword(
      input.resetAccessToken,
      input.newPassword,
    );

    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

authRouter.post("/admin/login", async (req, res, next) => {
  try {
    const input = z
      .object({
        email: z.string().trim().email(),
        password,
      })
      .parse(req.body);

    const result = await loginAdmin(input.email, input.password);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

authRouter.post("/admin/register-merchant", async (req, res, next) => {
  try {
    const input = z
      .object({
        fullName: z.string().trim().min(2).max(120),
        email: z.string().trim().email(),
        password,
        role: z.enum([
          "food_merchant",
          "grocery_merchant",
          "pharmacy_merchant",
          "services_merchant",
        ]),
      })
      .parse(req.body);

    const result = await registerMerchant(input);

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

authRouter.post("/refresh", async (req, res, next) => {
  try {
    const input = z
      .object({ refreshToken: z.string().min(20) })
      .parse(req.body);

    const result = await refreshSession(input.refreshToken);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

authRouter.get("/me", requireAuth, async (req, res, next) => {
  try {
    const profile = await getCurrentProfile(req.authUser!.id);

    res.json({
      success: true,
      data: { profile },
    });
  } catch (error) {
    next(error);
  }
});

authRouter.post("/logout", requireAuth, async (_req, res) => {
  res.json({
    success: true,
    data: {
      message: "Safari local session can be cleared safely.",
    },
  });
});
