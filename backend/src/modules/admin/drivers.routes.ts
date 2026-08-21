import { Router } from "express";
import { z } from "zod";

import { requireAuth } from "../../middleware/auth.js";
import {
  requireAccountTypes,
  requireAdminRoles,
} from "../../middleware/requireRole.js";
import { supabaseAdmin } from "../../lib/supabase.js";

export const adminDriversRouter = Router();

adminDriversRouter.use(
  requireAuth,
  requireAccountTypes("administration"),
  requireAdminRoles(
    "super_admin",
    "admin",
    "operations_manager",
    "support",
  ),
);

adminDriversRouter.get("/", async (req, res, next) => {
  try {
    const query = z
      .object({
        search: z.string().trim().max(120).optional(),
        onboardingStatus: z
          .enum([
            "draft",
            "submitted",
            "under_review",
            "approved",
            "rejected",
            "suspended",
          ])
          .optional(),
        verificationStatus: z
          .enum(["pending", "in_review", "verified", "rejected", "expired"])
          .optional(),
        city: z.string().trim().max(100).optional(),
      })
      .parse(req.query);

    const { data: profiles, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select(
        "id,full_name,email,phone,avatar_url,status,country_code,is_onboarded,created_at",
      )
      .eq("account_type", "driver")
      .order("created_at", { ascending: false });

    if (profileError) throw new Error(profileError.message);

    const ids = profiles.map((item) => item.id);

    if (ids.length === 0) {
      res.json({ success: true, data: { drivers: [], total: 0 } });
      return;
    }

    let driverBuilder = supabaseAdmin
      .from("driver_profiles")
      .select("*")
      .in("user_id", ids);

    if (query.onboardingStatus) {
      driverBuilder = driverBuilder.eq(
        "onboarding_status",
        query.onboardingStatus,
      );
    }

    if (query.verificationStatus) {
      driverBuilder = driverBuilder.eq(
        "verification_status",
        query.verificationStatus,
      );
    }

    if (query.city) {
      driverBuilder = driverBuilder.ilike(
        "operating_city",
        `%${query.city}%`,
      );
    }

    const { data: drivers, error: driverError } = await driverBuilder;

    if (driverError) throw new Error(driverError.message);

    const driverMap = new Map(
      drivers.map((item) => [item.user_id, item]),
    );

    let joined = profiles
      .map((profile) => ({
        ...profile,
        driver_profile: driverMap.get(profile.id) ?? null,
      }))
      .filter((item) => item.driver_profile);

    if (query.search) {
      const search = query.search.toLowerCase();

      joined = joined.filter((item) =>
        [
          item.full_name,
          item.email,
          item.phone,
          item.driver_profile?.driving_license_number,
          item.driver_profile?.operating_city,
        ]
          .filter(Boolean)
          .some((value) =>
            String(value).toLowerCase().includes(search),
          ),
      );
    }

    res.json({
      success: true,
      data: {
        drivers: joined,
        total: joined.length,
      },
    });
  } catch (error) {
    next(error);
  }
});

adminDriversRouter.get("/:driverId", async (req, res, next) => {
  try {
    const driverId = z.string().uuid().parse(req.params.driverId);

    const [profileResult, driverResult, vehiclesResult, documentsResult, eventsResult] =
      await Promise.all([
        supabaseAdmin
          .from("profiles")
          .select("*")
          .eq("id", driverId)
          .eq("account_type", "driver")
          .single(),

        supabaseAdmin
          .from("driver_profiles")
          .select("*")
          .eq("user_id", driverId)
          .single(),

        supabaseAdmin
          .from("driver_vehicles")
          .select("*")
          .eq("driver_id", driverId)
          .order("is_primary", { ascending: false }),

        supabaseAdmin
          .from("driver_documents")
          .select("*")
          .eq("driver_id", driverId)
          .order("created_at", { ascending: false }),

        supabaseAdmin
          .from("driver_verification_events")
          .select("*")
          .eq("driver_id", driverId)
          .order("created_at", { ascending: false }),
      ]);

    if (profileResult.error) throw new Error(profileResult.error.message);
    if (driverResult.error) throw new Error(driverResult.error.message);
    if (vehiclesResult.error) throw new Error(vehiclesResult.error.message);
    if (documentsResult.error) throw new Error(documentsResult.error.message);
    if (eventsResult.error) throw new Error(eventsResult.error.message);

    res.json({
      success: true,
      data: {
        profile: profileResult.data,
        driverProfile: driverResult.data,
        vehicles: vehiclesResult.data,
        documents: documentsResult.data,
        events: eventsResult.data,
      },
    });
  } catch (error) {
    next(error);
  }
});

adminDriversRouter.patch("/:driverId/status", async (req, res, next) => {
  try {
    const driverId = z.string().uuid().parse(req.params.driverId);

    const input = z
      .object({
        action: z.enum([
          "under_review",
          "approve",
          "reject",
          "suspend",
          "reactivate",
        ]),
        note: z.string().trim().max(500).nullable().optional(),
      })
      .parse(req.body);

    const map = {
      under_review: {
        onboarding_status: "under_review",
        verification_status: "in_review",
        event_type: "moved_to_review",
      },
      approve: {
        onboarding_status: "approved",
        verification_status: "verified",
        event_type: "driver_approved",
      },
      reject: {
        onboarding_status: "rejected",
        verification_status: "rejected",
        event_type: "driver_rejected",
      },
      suspend: {
        onboarding_status: "suspended",
        verification_status: "verified",
        event_type: "driver_suspended",
      },
      reactivate: {
        onboarding_status: "approved",
        verification_status: "verified",
        event_type: "driver_reactivated",
      },
    } as const;

    const transition = map[input.action];

    const updates: Record<string, unknown> = {
      onboarding_status: transition.onboarding_status,
      verification_status: transition.verification_status,
      updated_at: new Date().toISOString(),
    };

    if (input.action === "approve" || input.action === "reactivate") {
      updates.approved_at = new Date().toISOString();
      updates.approved_by = req.authUser!.id;
      updates.approval_note = input.note ?? null;
      updates.rejection_reason = null;
    }

    if (input.action === "reject") {
      updates.rejection_reason = input.note ?? "Verification rejected.";
    }

    const { data, error } = await supabaseAdmin
      .from("driver_profiles")
      .update(updates)
      .eq("user_id", driverId)
      .select("*")
      .single();

    if (error) throw new Error(error.message);

    await supabaseAdmin.from("driver_verification_events").insert({
      driver_id: driverId,
      event_type: transition.event_type,
      note: input.note ?? null,
      actor_user_id: req.authUser!.id,
    });

    res.json({
      success: true,
      data: { driverProfile: data },
    });
  } catch (error) {
    next(error);
  }
});

adminDriversRouter.patch(
  "/:driverId/vehicles/:vehicleId/status",
  async (req, res, next) => {
    try {
      const driverId = z.string().uuid().parse(req.params.driverId);
      const vehicleId = z.string().uuid().parse(req.params.vehicleId);

      const input = z
        .object({
          status: z.enum(["verified", "rejected"]),
          note: z.string().trim().max(500).nullable().optional(),
        })
        .parse(req.body);

      const { data, error } = await supabaseAdmin
        .from("driver_vehicles")
        .update({
          verification_status: input.status,
          rejection_reason:
            input.status === "rejected" ? input.note ?? "Vehicle rejected." : null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", vehicleId)
        .eq("driver_id", driverId)
        .select("*")
        .single();

      if (error) throw new Error(error.message);

      await supabaseAdmin.from("driver_verification_events").insert({
        driver_id: driverId,
        vehicle_id: vehicleId,
        event_type:
          input.status === "verified"
            ? "vehicle_verified"
            : "vehicle_rejected",
        note: input.note ?? null,
        actor_user_id: req.authUser!.id,
      });

      res.json({
        success: true,
        data: { vehicle: data },
      });
    } catch (error) {
      next(error);
    }
  },
);

adminDriversRouter.patch(
  "/:driverId/documents/:documentId/status",
  async (req, res, next) => {
    try {
      const driverId = z.string().uuid().parse(req.params.driverId);
      const documentId = z.string().uuid().parse(req.params.documentId);

      const input = z
        .object({
          status: z.enum(["verified", "rejected"]),
          note: z.string().trim().max(500).nullable().optional(),
        })
        .parse(req.body);

      const { data, error } = await supabaseAdmin
        .from("driver_documents")
        .update({
          status: input.status,
          rejection_reason:
            input.status === "rejected"
              ? input.note ?? "Document rejected."
              : null,
          reviewed_at: new Date().toISOString(),
          reviewed_by: req.authUser!.id,
          updated_at: new Date().toISOString(),
        })
        .eq("id", documentId)
        .eq("driver_id", driverId)
        .select("*")
        .single();

      if (error) throw new Error(error.message);

      await supabaseAdmin.from("driver_verification_events").insert({
        driver_id: driverId,
        document_id: documentId,
        event_type:
          input.status === "verified"
            ? "document_verified"
            : "document_rejected",
        note: input.note ?? null,
        actor_user_id: req.authUser!.id,
      });

      res.json({
        success: true,
        data: { document: data },
      });
    } catch (error) {
      next(error);
    }
  },
);
