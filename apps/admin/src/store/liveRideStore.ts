import { create } from "zustand";

import { adminLiveRideService } from "../services/liveRideService";
import type { AdminLiveRide } from "../types/liveRide";
import { useAuthStore } from "./authStore";

type LiveRideState = {
  loading: boolean;
  error: string | null;
  rides: AdminLiveRide[];
  total: number;

  tracking: {
    ride: Record<string, unknown>;
    trackingPoints: Record<string, unknown>[];
    matchRequests: Record<string, unknown>[];
    events: Record<string, unknown>[];
  } | null;

  load: () => Promise<void>;
  loadTracking: (rideId: string) => Promise<void>;
};

function token() {
  const accessToken = useAuthStore.getState().accessToken;

  if (!accessToken) {
    throw new Error("Safari admin session is required.");
  }

  return accessToken;
}

export const useLiveRideStore = create<LiveRideState>((set) => ({
  loading: false,
  error: null,
  rides: [],
  total: 0,
  tracking: null,

  load: async () => {
    set({ loading: true, error: null });

    try {
      const data = await adminLiveRideService.list(token());

      set({
        rides: data.rides,
        total: data.total,
      });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Could not load active Safari rides.",
      });
    } finally {
      set({ loading: false });
    }
  },

  loadTracking: async (rideId) => {
    set({ loading: true, error: null });

    try {
      const tracking = await adminLiveRideService.tracking(
        token(),
        rideId,
      );

      set({ tracking });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Could not load Safari ride tracking.",
      });
    } finally {
      set({ loading: false });
    }
  },
}));
