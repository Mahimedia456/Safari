import { create } from "zustand";

import {
  adminRideService,
} from "../services/rideService";

import type {
  AdminRide,
  Ride,
  RideCatalogAdminData,
} from "../types/ride";

import {
  useAuthStore,
} from "./authStore";

import {
  usePassengerStore,
} from "./passengerStore";

import {
  useDriverStore,
} from "./driverStore";

type RideState = {
  loading: boolean;
  loaded: boolean;
  error: string | null;

  catalog: RideCatalogAdminData | null;
  rides: Ride[];
  total: number;
  incidents: Array<Record<string, unknown>>;

  loadCatalog: () => Promise<void>;

  loadRides: (filters?: {
    status?: string;
    cityId?: string;
    search?: string;
  }) => Promise<void>;

  setRideStatus: (
    rideId: string,
    status: string,
  ) => void;

  cancelRide: (
    rideId: string,
  ) => void;

  setIncidentStatus: (
    incidentId: string,
    status: string,
  ) => void;

  updatePricing: (
    pricingId: string,
    input: Record<string, unknown>,
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

function numberValue(
  value:
    | number
    | string
    | null
    | undefined,
) {
  const parsed =
    Number(value ?? 0);

  return Number.isFinite(
    parsed,
  )
    ? parsed
    : 0;
}

function mapRide(
  item: AdminRide,
): Ride {
  const passengers =
    usePassengerStore.getState()
      .passengers ?? [];

  const drivers =
    useDriverStore.getState()
      .drivers ?? [];

  const passenger =
    passengers.find(
      (value) =>
        value.id ===
        item.passenger_id,
    );

  const driver =
    item.driver_id
      ? drivers.find(
          (value) =>
            value.id ===
            item.driver_id,
        )
      : null;

  return {
    id: item.id,

    passengerId:
      item.passenger_id,

    passengerName:
      passenger?.fullName ??
      "Safari Passenger",

    passengerPhone:
      passenger?.phone ??
      "—",

    driverId:
      item.driver_id,

    driverName:
      driver?.fullName ??
      null,

    driverPhone:
      driver?.phone ??
      null,

    vehicleName:
      item.vehicle_id
        ? "Assigned vehicle"
        : null,

    vehiclePlate: null,

    region:
      "Pakistan",

    city:
      item.service_cities
        ?.name ??
      "Pakistan",

    status:
      item.ride_status,

    rideType:
      item.ride_categories
        ?.name ??
      item.ride_categories
        ?.code ??
      "Safari Ride",

    pickup:
      item.pickup_address ??
      "Pickup unavailable",

    destination:
      item.dropoff_address ??
      "Destination unavailable",

    distanceKm:
      numberValue(
        item.estimated_distance_km,
      ),

    estimatedDurationMinutes:
      numberValue(
        item.estimated_duration_minutes,
      ),

    estimatedFare:
      numberValue(
        item.estimated_fare,
      ),

    finalFare:
      item.final_fare ===
      null
        ? null
        : numberValue(
            item.final_fare,
          ),

    paymentMethod:
      item.payment_method ??
      "cash",

    scheduled:
      item.booking_type ===
      "scheduled",

    timeline: [],

    createdAt:
      item.created_at,
  };
}

export const useRideStore =
  create<RideState>((set, get) => ({
    loading: false,
    loaded: false,
    error: null,

    catalog: null,
    rides: [],
    total: 0,
    incidents: [],

    loadCatalog:
      async () => {
        try {
          const catalog =
            await adminRideService.catalog(
              token(),
            );

          set({
            catalog,
          });
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : "Could not load Safari ride catalog.",
          });
        }
      },

    loadRides:
      async (
        filters,
      ) => {
        set({
          loading: true,
          error: null,
        });

        try {
          const [
            data,
          ] =
            await Promise.all([
              adminRideService.list(
                token(),
                filters,
              ),
              usePassengerStore
                .getState()
                .loaded
                ? Promise.resolve()
                : usePassengerStore
                    .getState()
                    .load(),
              useDriverStore
                .getState()
                .loaded
                ? Promise.resolve()
                : useDriverStore
                    .getState()
                    .load(),
            ]);

          const rides =
            Array.isArray(
              data.rides,
            )
              ? data.rides.map(
                  mapRide,
                )
              : [];

          set({
            rides,
            total:
              Number(
                data.total ??
                  rides.length,
              ),
            loaded: true,
          });
        } catch (error) {
          set({
            rides: [],
            total: 0,
            loaded: true,
            error:
              error instanceof Error
                ? error.message
                : "Could not load Safari rides.",
          });
        } finally {
          set({
            loading: false,
          });
        }
      },

    setRideStatus: (
      rideId,
      status,
    ) => {
      set({
        rides:
          get().rides.map(
            (ride) =>
              ride.id ===
              rideId
                ? {
                    ...ride,
                    status,
                  }
                : ride,
          ),
      });
    },

    cancelRide: (
      rideId,
    ) => {
      get().setRideStatus(
        rideId,
        "cancelled_by_admin",
      );
    },

    setIncidentStatus: (
      incidentId,
      status,
    ) => {
      set({
        incidents:
          get().incidents.map(
            (incident) =>
              incident.id ===
              incidentId
                ? {
                    ...incident,
                    status,
                  }
                : incident,
          ),
      });
    },

    updatePricing:
      async (
        pricingId,
        input,
      ) => {
        await adminRideService.updatePricing(
          token(),
          pricingId,
          input,
        );

        await get().loadCatalog();
      },
  }));
