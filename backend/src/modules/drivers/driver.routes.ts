import { Router } from "express";
import { z } from "zod";

import { requireAuth } from "../../middleware/auth.js";
import { requireAccountTypes } from "../../middleware/requireRole.js";
import {
  addDocument,
  createVehicle,
  deleteVehicle,
  getDriverOverview,
  setDriverAvailability,
  submitDriverApplication,
  updateDriverProfile,
  updateVehicle,
} from "./driver.service.js";

export const driverRouter = Router();

driverRouter.use(requireAuth, requireAccountTypes("driver"));

driverRouter.get("/me", async (req, res, next) => {
  try {
    const data = await getDriverOverview(req.authUser!.id);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

driverRouter.patch("/me", async (req, res, next) => {
  try {
    const input = z
      .object({
        drivingExperienceYears: z.number().int().min(0).max(70).optional(),
        cnicNumber: z.string().trim().max(30).nullable().optional(),
        nationalIdNumber: z.string().trim().max(40).nullable().optional(),
        drivingLicenseNumber: z.string().trim().max(60).nullable().optional(),
        drivingLicenseExpiry: z.string().date().nullable().optional(),
        homeCity: z.string().trim().max(100).nullable().optional(),
        operatingCity: z.string().trim().max(100).nullable().optional(),
        serviceRegion: z.string().trim().max(120).nullable().optional(),
        emergencyContactName: z.string().trim().max(120).nullable().optional(),
        emergencyContactPhone: z.string().trim().max(30).nullable().optional(),
      })
      .parse(req.body);

    const updates: Record<string, unknown> = {};

    if (input.drivingExperienceYears !== undefined)
      updates.driving_experience_years = input.drivingExperienceYears;
    if (input.cnicNumber !== undefined) updates.cnic_number = input.cnicNumber;
    if (input.nationalIdNumber !== undefined)
      updates.national_id_number = input.nationalIdNumber;
    if (input.drivingLicenseNumber !== undefined)
      updates.driving_license_number = input.drivingLicenseNumber;
    if (input.drivingLicenseExpiry !== undefined)
      updates.driving_license_expiry = input.drivingLicenseExpiry;
    if (input.homeCity !== undefined) updates.home_city = input.homeCity;
    if (input.operatingCity !== undefined)
      updates.operating_city = input.operatingCity;
    if (input.serviceRegion !== undefined)
      updates.service_region = input.serviceRegion;
    if (input.emergencyContactName !== undefined)
      updates.emergency_contact_name = input.emergencyContactName;
    if (input.emergencyContactPhone !== undefined)
      updates.emergency_contact_phone = input.emergencyContactPhone;

    const driverProfile = await updateDriverProfile(
      req.authUser!.id,
      updates,
    );

    res.json({ success: true, data: { driverProfile } });
  } catch (error) {
    next(error);
  }
});

driverRouter.post("/submit", async (req, res, next) => {
  try {
    const driverProfile = await submitDriverApplication(req.authUser!.id);

    res.json({
      success: true,
      data: { driverProfile },
    });
  } catch (error) {
    next(error);
  }
});

driverRouter.post("/vehicles", async (req, res, next) => {
  try {
    const input = z
      .object({
        make: z.string().trim().min(2).max(80),
        model: z.string().trim().min(1).max(80),
        year: z.number().int().min(1990).max(2100),
        color: z.string().trim().min(2).max(40),
        plateNumber: z.string().trim().min(3).max(30),
        vehicleType: z.enum(["car", "bike", "rickshaw", "van"]),
        rideCategory: z.enum([
          "economy",
          "comfort",
          "premium",
          "bike",
          "rickshaw",
          "xl",
        ]),
        seats: z.number().int().min(1).max(12),
        registrationNumber: z.string().trim().max(60).nullable().optional(),
        registrationExpiry: z.string().date().nullable().optional(),
        insuranceNumber: z.string().trim().max(60).nullable().optional(),
        insuranceExpiry: z.string().date().nullable().optional(),
        isPrimary: z.boolean().optional(),
      })
      .parse(req.body);

    const vehicle = await createVehicle(req.authUser!.id, input);

    res.status(201).json({
      success: true,
      data: { vehicle },
    });
  } catch (error) {
    next(error);
  }
});

driverRouter.patch("/vehicles/:vehicleId", async (req, res, next) => {
  try {
    const vehicleId = z.string().uuid().parse(req.params.vehicleId);

    const input = z
      .object({
        make: z.string().trim().min(2).max(80).optional(),
        model: z.string().trim().min(1).max(80).optional(),
        year: z.number().int().min(1990).max(2100).optional(),
        color: z.string().trim().min(2).max(40).optional(),
        plateNumber: z.string().trim().min(3).max(30).optional(),
        vehicleType: z.enum(["car", "bike", "rickshaw", "van"]).optional(),
        rideCategory: z
          .enum(["economy", "comfort", "premium", "bike", "rickshaw", "xl"])
          .optional(),
        seats: z.number().int().min(1).max(12).optional(),
        registrationNumber: z.string().trim().max(60).nullable().optional(),
        registrationExpiry: z.string().date().nullable().optional(),
        insuranceNumber: z.string().trim().max(60).nullable().optional(),
        insuranceExpiry: z.string().date().nullable().optional(),
        isPrimary: z.boolean().optional(),
      })
      .parse(req.body);

    const updates: Record<string, unknown> = {};

    if (input.make !== undefined) updates.make = input.make;
    if (input.model !== undefined) updates.model = input.model;
    if (input.year !== undefined) updates.year = input.year;
    if (input.color !== undefined) updates.color = input.color;
    if (input.plateNumber !== undefined) updates.plate_number = input.plateNumber;
    if (input.vehicleType !== undefined)
      updates.vehicle_type = input.vehicleType;
    if (input.rideCategory !== undefined)
      updates.ride_category = input.rideCategory;
    if (input.seats !== undefined) updates.seats = input.seats;
    if (input.registrationNumber !== undefined)
      updates.registration_number = input.registrationNumber;
    if (input.registrationExpiry !== undefined)
      updates.registration_expiry = input.registrationExpiry;
    if (input.insuranceNumber !== undefined)
      updates.insurance_number = input.insuranceNumber;
    if (input.insuranceExpiry !== undefined)
      updates.insurance_expiry = input.insuranceExpiry;
    if (input.isPrimary !== undefined) updates.is_primary = input.isPrimary;

    const vehicle = await updateVehicle(
      req.authUser!.id,
      vehicleId,
      updates,
    );

    res.json({
      success: true,
      data: { vehicle },
    });
  } catch (error) {
    next(error);
  }
});

driverRouter.delete("/vehicles/:vehicleId", async (req, res, next) => {
  try {
    const vehicleId = z.string().uuid().parse(req.params.vehicleId);

    await deleteVehicle(req.authUser!.id, vehicleId);

    res.json({
      success: true,
      data: { message: "Vehicle removed." },
    });
  } catch (error) {
    next(error);
  }
});

driverRouter.post("/documents", async (req, res, next) => {
  try {
    const input = z
      .object({
        vehicleId: z.string().uuid().nullable().optional(),
        documentType: z.enum([
          "profile_photo",
          "cnic_front",
          "cnic_back",
          "national_id_front",
          "national_id_back",
          "driving_license_front",
          "driving_license_back",
          "vehicle_registration_front",
          "vehicle_registration_back",
          "vehicle_insurance",
          "vehicle_photo_front",
          "vehicle_photo_back",
          "vehicle_photo_left",
          "vehicle_photo_right",
          "police_clearance",
          "other",
        ]),
        storageBucket: z.string().trim().max(100).optional(),
        storagePath: z.string().trim().min(3).max(500),
        expiryDate: z.string().date().nullable().optional(),
      })
      .parse(req.body);

    const document = await addDocument(req.authUser!.id, input);

    res.status(201).json({
      success: true,
      data: { document },
    });
  } catch (error) {
    next(error);
  }
});

driverRouter.patch("/availability", async (req, res, next) => {
  try {
    const input = z
      .object({
        isOnline: z.boolean(),
        isAvailable: z.boolean(),
      })
      .parse(req.body);

    const driverProfile = await setDriverAvailability(
      req.authUser!.id,
      input,
    );

    res.json({
      success: true,
      data: { driverProfile },
    });
  } catch (error) {
    next(error);
  }
});
