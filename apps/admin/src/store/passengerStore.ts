import { create } from "zustand";

import { adminPassengerService } from "../services/passengerService";
import { useAuthStore } from "./authStore";

import type {
  AdminPassenger,
  Passenger,
  PassengerAddress,
  PassengerFlag,
  PassengerFlagStatus,
  PassengerRide,
  PassengerSupportCase,
  PassengerSupportStatus,
} from "../types/passenger";

type PassengerState = {
  loading: boolean;
  loaded: boolean;
  error: string | null;

  passengers: Passenger[];
  total: number;

  rides: PassengerRide[];
  flags: PassengerFlag[];
  supportCases: PassengerSupportCase[];

  load: (filters?: {
    search?: string;
    status?: string;
    country?: string;
  }) => Promise<void>;

  setPassengerStatus: (
    passengerId: string,
    status: "active" | "suspended" | "blocked",
  ) => Promise<void>;

  setStatus: (
    passengerId: string,
    status: "active" | "suspended" | "blocked",
  ) => Promise<void>;

  adjustWalletBalance: (
    passengerId: string,
    amount: number,
  ) => void;

  setDefaultAddress: (
    passengerId: string,
    addressId: string,
  ) => void;

  setFlagStatus: (
    flagId: string,
    status: PassengerFlagStatus,
  ) => void;

  setSupportStatus: (
    caseId: string,
    status: PassengerSupportStatus,
  ) => void;
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

function mapPassenger(
  item: AdminPassenger,
): Passenger {
  return {
    id: item.id,
    fullName:
      item.full_name ??
      "Safari Passenger",
    email: item.email ?? "—",
    phone: item.phone ?? "—",
    avatarUrl: item.avatar_url,
    status: item.status,
    region: "Pakistan",
    city: "Pakistan",
    verificationStatus:
      item.status === "active"
        ? "verified"
        : "pending",
    joinedAt: item.created_at,
    lastActiveAt: item.last_seen_at,
    totalRides: 0,
    completedRides: 0,
    cancelledRides: 0,
    rating: 0,
    totalRatings: 0,
    wallet: {
      balance: 0,
      totalSpent: 0,
      rideSpend: 0,
      foodSpend: 0,
      grocerySpend: 0,
      pharmacySpend: 0,
      servicesSpend: 0,
      refundsReceived: 0,
      pointsBalance: 0,
    },
    addresses: [],
  };
}

export const usePassengerStore =
  create<PassengerState>((set, get) => ({
    loading: false,
    loaded: false,
    error: null,

    passengers: [],
    total: 0,

    rides: [],
    flags: [],
    supportCases: [],

    load: async (filters) => {
      set({
        loading: true,
        error: null,
      });

      try {
        const data =
          await adminPassengerService.list(
            token(),
            {
              ...filters,
              country: "PK",
            },
          );

        const passengers =
          Array.isArray(
            data.passengers,
          )
            ? data.passengers.map(
                mapPassenger,
              )
            : [];

        set({
          passengers,
          total:
            Number(
              data.total ??
                passengers.length,
            ),
          loaded: true,
        });
      } catch (error) {
        set({
          passengers: [],
          total: 0,
          loaded: true,
          error:
            error instanceof Error
              ? error.message
              : "Could not load Safari passengers.",
        });
      } finally {
        set({
          loading: false,
        });
      }
    },

    setPassengerStatus: async (
      passengerId,
      status,
    ) => {
      await adminPassengerService.updateStatus(
        token(),
        passengerId,
        status,
      );

      set({
        passengers:
          get().passengers.map(
            (item) =>
              item.id ===
              passengerId
                ? {
                    ...item,
                    status,
                  }
                : item,
          ),
      });
    },

    setStatus: async (
      passengerId,
      status,
    ) => {
      await get().setPassengerStatus(
        passengerId,
        status,
      );
    },

    adjustWalletBalance: (
      passengerId,
      amount,
    ) => {
      set({
        passengers:
          get().passengers.map(
            (item) =>
              item.id ===
              passengerId
                ? {
                    ...item,
                    wallet: {
                      ...item.wallet,
                      balance:
                        item.wallet
                          .balance +
                        amount,
                    },
                  }
                : item,
          ),
      });
    },

    setDefaultAddress: (
      passengerId,
      addressId,
    ) => {
      set({
        passengers:
          get().passengers.map(
            (item) =>
              item.id ===
              passengerId
                ? {
                    ...item,
                    addresses:
                      item.addresses.map(
                        (
                          address: PassengerAddress,
                        ) => ({
                          ...address,
                          default:
                            address.id ===
                            addressId,
                        }),
                      ),
                  }
                : item,
          ),
      });
    },

    setFlagStatus: (
      flagId,
      status,
    ) => {
      set({
        flags:
          get().flags.map(
            (item) =>
              item.id ===
              flagId
                ? {
                    ...item,
                    status,
                  }
                : item,
          ),
      });
    },

    setSupportStatus: (
      caseId,
      status,
    ) => {
      set({
        supportCases:
          get().supportCases.map(
            (item) =>
              item.id === caseId
                ? {
                    ...item,
                    status,
                  }
                : item,
          ),
      });
    },
  }));
