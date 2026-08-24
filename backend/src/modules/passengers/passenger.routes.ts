import { Router } from "express";
import { z } from "zod";

import { requireAuth } from "../../middleware/auth.js";
import { requireAccountTypes } from "../../middleware/requireRole.js";
import {
  createEmergencyContact,
  createSavedAddress,
  deleteEmergencyContact,
  deleteSavedAddress,
  getPassengerOverview,
  getPassengerActivity,
  getPassengerActivityDetail,
  listEmergencyContacts,
  listSavedAddresses,
  updatePassengerProfile,
  updatePreferences,
  updateSavedAddress,
} from "./passenger.service.js";

export const passengerRouter = Router();

passengerRouter.use(
  requireAuth,
  requireAccountTypes("passenger", "driver", "delivery_partner"),
);

passengerRouter.get("/me", async (req, res, next) => {
  try {
    const data = await getPassengerOverview(req.authUser!.id);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

passengerRouter.patch("/me", async (req, res, next) => {
  try {
    const input = z
      .object({
        fullName: z.string().trim().min(2).max(120).optional(),
        avatarUrl: z.string().url().nullable().optional(),
        dateOfBirth: z.string().date().nullable().optional(),
        gender: z
          .enum(["male", "female", "other", "prefer_not_to_say"])
          .nullable()
          .optional(),
        preferredLanguage: z.literal("en").optional(),
        marketingOptIn: z.boolean().optional(),
        isOnboarded: z.boolean().optional(),
      })
      .parse(req.body);

    const data = await updatePassengerProfile(req.authUser!.id, {
      ...(input.fullName !== undefined ? { full_name: input.fullName } : {}),
      ...(input.avatarUrl !== undefined ? { avatar_url: input.avatarUrl } : {}),
      ...(input.dateOfBirth !== undefined
        ? { date_of_birth: input.dateOfBirth }
        : {}),
      ...(input.gender !== undefined ? { gender: input.gender } : {}),
      ...(input.preferredLanguage !== undefined
        ? { preferred_language: input.preferredLanguage }
        : {}),
      ...(input.marketingOptIn !== undefined
        ? { marketing_opt_in: input.marketingOptIn }
        : {}),
      ...(input.isOnboarded !== undefined
        ? { is_onboarded: input.isOnboarded }
        : {}),
    });

    res.json({ success: true, data: { profile: data } });
  } catch (error) {
    next(error);
  }
});


passengerRouter.get("/activity", async (req, res, next) => {
  try {
    const activity = await getPassengerActivity(req.authUser!.id);

    res.json({
      success: true,
      data: { activity },
    });
  } catch (error) {
    next(error);
  }
});

passengerRouter.get(
  "/activity/:type/:activityId",
  async (req, res, next) => {
    try {
      const type = z
        .enum(["ride", "food", "grocery", "pharmacy", "service"])
        .parse(req.params.type);

      const activityId = z
        .string()
        .uuid()
        .parse(req.params.activityId);

      const activity =
        await getPassengerActivityDetail(
          req.authUser!.id,
          type,
          activityId,
        );

      res.json({
        success: true,
        data: { activity },
      });
    } catch (error) {
      next(error);
    }
  },
);

passengerRouter.get("/addresses", async (req, res, next) => {
  try {
    const addresses = await listSavedAddresses(req.authUser!.id);
    res.json({ success: true, data: { addresses } });
  } catch (error) {
    next(error);
  }
});

passengerRouter.post("/addresses", async (req, res, next) => {
  try {
    const input = z
      .object({
        label: z.string().trim().min(1).max(40),
        addressLine: z.string().trim().min(3).max(240),
        city: z.string().trim().min(2).max(100),
        area: z.string().trim().max(120).nullable().optional(),
        postalCode: z.string().trim().max(20).nullable().optional(),
        countryCode: z.literal("PK").default("PK"),
        latitude: z.number().nullable().optional(),
        longitude: z.number().nullable().optional(),
        instructions: z.string().trim().max(300).nullable().optional(),
        isDefault: z.boolean().optional(),
      })
      .parse(req.body);

    const address = await createSavedAddress(req.authUser!.id, input);
    res.status(201).json({ success: true, data: { address } });
  } catch (error) {
    next(error);
  }
});

passengerRouter.patch("/addresses/:addressId", async (req, res, next) => {
  try {
    const addressId = z.string().uuid().parse(req.params.addressId);

    const input = z
      .object({
        label: z.string().trim().min(1).max(40).optional(),
        addressLine: z.string().trim().min(3).max(240).optional(),
        city: z.string().trim().min(2).max(100).optional(),
        area: z.string().trim().max(120).nullable().optional(),
        postalCode: z.string().trim().max(20).nullable().optional(),
        countryCode: z.literal("PK").optional(),
        latitude: z.number().nullable().optional(),
        longitude: z.number().nullable().optional(),
        instructions: z.string().trim().max(300).nullable().optional(),
        isDefault: z.boolean().optional(),
      })
      .parse(req.body);

    const dbInput: Record<string, unknown> = {};

    if (input.label !== undefined) dbInput.label = input.label;
    if (input.addressLine !== undefined) dbInput.address_line = input.addressLine;
    if (input.city !== undefined) dbInput.city = input.city;
    if (input.area !== undefined) dbInput.area = input.area;
    if (input.postalCode !== undefined) dbInput.postal_code = input.postalCode;
    if (input.countryCode !== undefined) dbInput.country_code = input.countryCode;
    if (input.latitude !== undefined) dbInput.latitude = input.latitude;
    if (input.longitude !== undefined) dbInput.longitude = input.longitude;
    if (input.instructions !== undefined) dbInput.instructions = input.instructions;
    if (input.isDefault !== undefined) dbInput.is_default = input.isDefault;

    const address = await updateSavedAddress(
      req.authUser!.id,
      addressId,
      dbInput,
    );

    res.json({ success: true, data: { address } });
  } catch (error) {
    next(error);
  }
});

passengerRouter.delete("/addresses/:addressId", async (req, res, next) => {
  try {
    const addressId = z.string().uuid().parse(req.params.addressId);
    await deleteSavedAddress(req.authUser!.id, addressId);

    res.json({
      success: true,
      data: { message: "Saved address removed." },
    });
  } catch (error) {
    next(error);
  }
});

passengerRouter.patch("/preferences", async (req, res, next) => {
  try {
    const input = z
      .object({
        theme: z.enum(["system", "light", "dark"]).optional(),
        language: z.literal("en").optional(),
        rideUpdates: z.boolean().optional(),
        orderUpdates: z.boolean().optional(),
        promotionNotifications: z.boolean().optional(),
        emailNotifications: z.boolean().optional(),
        smsNotifications: z.boolean().optional(),
        locationPermission: z.enum(["ask", "allowed", "denied"]).optional(),
        analyticsOptIn: z.boolean().optional(),
      })
      .parse(req.body);

    const preferences = await updatePreferences(req.authUser!.id, {
      ...(input.theme !== undefined ? { theme: input.theme } : {}),
      ...(input.language !== undefined ? { language: input.language } : {}),
      ...(input.rideUpdates !== undefined
        ? { ride_updates: input.rideUpdates }
        : {}),
      ...(input.orderUpdates !== undefined
        ? { order_updates: input.orderUpdates }
        : {}),
      ...(input.promotionNotifications !== undefined
        ? { promotion_notifications: input.promotionNotifications }
        : {}),
      ...(input.emailNotifications !== undefined
        ? { email_notifications: input.emailNotifications }
        : {}),
      ...(input.smsNotifications !== undefined
        ? { sms_notifications: input.smsNotifications }
        : {}),
      ...(input.locationPermission !== undefined
        ? { location_permission: input.locationPermission }
        : {}),
      ...(input.analyticsOptIn !== undefined
        ? { analytics_opt_in: input.analyticsOptIn }
        : {}),
    });

    res.json({ success: true, data: { preferences } });
  } catch (error) {
    next(error);
  }
});

passengerRouter.get("/emergency-contacts", async (req, res, next) => {
  try {
    const contacts = await listEmergencyContacts(req.authUser!.id);
    res.json({ success: true, data: { contacts } });
  } catch (error) {
    next(error);
  }
});

passengerRouter.post("/emergency-contacts", async (req, res, next) => {
  try {
    const input = z
      .object({
        name: z.string().trim().min(2).max(120),
        phone: z.string().trim().min(8).max(20),
        relationship: z.string().trim().max(60).nullable().optional(),
        isPrimary: z.boolean().optional(),
      })
      .parse(req.body);

    const contact = await createEmergencyContact(req.authUser!.id, input);

    res.status(201).json({
      success: true,
      data: { contact },
    });
  } catch (error) {
    next(error);
  }
});

passengerRouter.delete(
  "/emergency-contacts/:contactId",
  async (req, res, next) => {
    try {
      const contactId = z.string().uuid().parse(req.params.contactId);

      await deleteEmergencyContact(req.authUser!.id, contactId);

      res.json({
        success: true,
        data: { message: "Emergency contact removed." },
      });
    } catch (error) {
      next(error);
    }
  },
);
