import { apiRequest } from "./apiClient";
import type { AdminLiveRide } from "../types/liveRide";

export const adminLiveRideService = {
  list(accessToken: string) {
    return apiRequest<{
      rides: AdminLiveRide[];
      total: number;
    }>(
      "/admin/live-rides",
      {},
      accessToken,
    );
  },

  tracking(accessToken: string, rideId: string) {
    return apiRequest<{
      ride: Record<string, unknown>;
      trackingPoints: Record<string, unknown>[];
      matchRequests: Record<string, unknown>[];
      events: Record<string, unknown>[];
    }>(
      `/admin/live-rides/${rideId}/tracking`,
      {},
      accessToken,
    );
  },
};
