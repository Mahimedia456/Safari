import { create } from "zustand";

import { adminDriverService } from "../services/driverService";
import { useAuthStore } from "./authStore";

import type {
  AdminDriverListItem,
  Driver,
  DriverApplication,
  DriverRating,
  DriverVehicle,
} from "../types/driver";

type DriverState = {
  loading: boolean;
  loaded: boolean;
  error: string | null;

  drivers: Driver[];
  applications: DriverApplication[];
  vehicles: DriverVehicle[];
  ratings: DriverRating[];

  total: number;

  load: (filters?: {
    search?: string;
    onboardingStatus?: string;
    verificationStatus?: string;
    city?: string;
  }) => Promise<void>;

  setApplicationStatus: (
    applicationId: string,
    status: "under_review" | "approved" | "rejected",
    note?: string,
  ) => Promise<void>;

  setDriverStatus: (
    driverId: string,
    status: string,
  ) => Promise<void>;

  setDriverOnline: (
    driverId: string,
    online: boolean,
  ) => void;

  setVehicleActive: (
    vehicleId: string,
    active: boolean,
  ) => void;

  setVehicleRegistrationStatus: (
    vehicleId: string,
    status: "verified" | "rejected",
  ) => Promise<void>;

  setVehicleInsuranceStatus: (
    vehicleId: string,
    status: "verified" | "rejected",
  ) => Promise<void>;

  setDocumentStatus: (
    driverId: string,
    documentId: string,
    status: "verified" | "rejected",
  ) => Promise<void>;
};

function token() {
  const accessToken =
    useAuthStore.getState().accessToken;

  if (!accessToken) {
    throw new Error(
      "Safari admin session is required.",
    );
  }

  return accessToken;
}

function mapDriver(
  item: AdminDriverListItem,
): Driver {
  const profile =
    item.driver_profile;

  return {
    id: item.id,
    region: "Pakistan",
    city:
      profile?.operating_city ??
      "Pakistan",
    fullName:
      item.full_name ??
      "Safari Driver",
    email: item.email ?? "—",
    phone: item.phone ?? "—",
    status:
      item.status === "active"
        ? "active"
        : item.status,
    applicationStatus:
      profile?.onboarding_status ??
      "draft",
    verificationStatus:
      profile?.verification_status ??
      "pending",
    online:
      Boolean(
        profile?.is_online,
      ),
    rating: 0,
    totalRatings: 0,
    totalRides: 0,
    completedRides: 0,
    cancelledRides: 0,
    acceptanceRate: 0,
    completionRate: 0,
    joinedAt:
      item.created_at,
    lastOnlineAt:
      profile?.updated_at ??
      null,
    documents: [],
    wallet: {
      balance: 0,
      pendingPayout: 0,
      totalEarnings: 0,
      totalCommission: 0,
      currentMonthEarnings: 0,
      freeRideUsed: 0,
      freeRideRemaining: 0,
    },
  };
}

function applicationFromDriver(
  driver: Driver,
): DriverApplication {
  return {
    id: driver.id,
    driverId: driver.id,
    applicantName:
      driver.fullName,
    email: driver.email,
    phone: driver.phone,
    city: driver.city,
    region: "Pakistan",
    vehicleType: "Pending vehicle review",
    submittedAt:
      driver.joinedAt,
    status:
      driver.applicationStatus,
  };
}

export const useDriverStore =
  create<DriverState>((set, get) => ({
    loading: false,
    loaded: false,
    error: null,

    drivers: [],
    applications: [],
    vehicles: [],
    ratings: [],
    total: 0,

    load: async (filters) => {
      set({
        loading: true,
        error: null,
      });

      try {
        const data =
          await adminDriverService.list(
            token(),
            filters,
          );

        const drivers =
          Array.isArray(
            data.drivers,
          )
            ? data.drivers.map(
                mapDriver,
              )
            : [];

        const applications =
          drivers
            .filter(
              (driver) =>
                driver.applicationStatus !==
                "approved",
            )
            .map(
              applicationFromDriver,
            );

        set({
          drivers,
          applications,
          total:
            Number(
              data.total ??
                drivers.length,
            ),
          loaded: true,
        });
      } catch (error) {
        set({
          drivers: [],
          applications: [],
          total: 0,
          loaded: true,
          error:
            error instanceof Error
              ? error.message
              : "Could not load Safari drivers.",
        });
      } finally {
        set({
          loading: false,
        });
      }
    },

    setApplicationStatus:
      async (
        applicationId,
        status,
        note,
      ) => {
        const action =
          status ===
          "approved"
            ? "approve"
            : status ===
                "rejected"
              ? "reject"
              : "under_review";

        await adminDriverService.updateDriverStatus(
          token(),
          applicationId,
          action,
          note ?? null,
        );

        await get().load();
      },

    setDriverStatus:
      async (
        driverId,
        status,
      ) => {
        const action =
          status ===
          "suspended"
            ? "suspend"
            : status ===
                "active"
              ? "reactivate"
              : "under_review";

        await adminDriverService.updateDriverStatus(
          token(),
          driverId,
          action,
        );

        await get().load();
      },

    setDriverOnline: (
      driverId,
      online,
    ) => {
      set({
        drivers:
          get().drivers.map(
            (driver) =>
              driver.id ===
              driverId
                ? {
                    ...driver,
                    online,
                  }
                : driver,
          ),
      });
    },

    setVehicleActive: (
      vehicleId,
      active,
    ) => {
      set({
        vehicles:
          get().vehicles.map(
            (vehicle) =>
              vehicle.id ===
              vehicleId
                ? {
                    ...vehicle,
                    active,
                  }
                : vehicle,
          ),
      });
    },

    setVehicleRegistrationStatus:
      async (
        vehicleId,
        status,
      ) => {
        const vehicle =
          get().vehicles.find(
            (item) =>
              item.id ===
              vehicleId,
          );

        if (!vehicle) {
          return;
        }

        await adminDriverService.updateVehicleStatus(
          token(),
          vehicle.driverId,
          vehicle.id,
          status,
          "Registration verification",
        );

        await get().load();
      },

    setVehicleInsuranceStatus:
      async (
        vehicleId,
        status,
      ) => {
        const vehicle =
          get().vehicles.find(
            (item) =>
              item.id ===
              vehicleId,
          );

        if (!vehicle) {
          return;
        }

        await adminDriverService.updateVehicleStatus(
          token(),
          vehicle.driverId,
          vehicle.id,
          status,
          "Insurance verification",
        );

        await get().load();
      },

    setDocumentStatus:
      async (
        driverId,
        documentId,
        status,
      ) => {
        await adminDriverService.updateDocumentStatus(
          token(),
          driverId,
          documentId,
          status,
        );

        await get().load();
      },
  }));
