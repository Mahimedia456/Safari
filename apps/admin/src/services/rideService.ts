import { apiRequest } from "./apiClient";
import type {
  AdminRide,
  RideCatalogAdminData,
} from "../types/ride";

export const adminRideService = {
  catalog(accessToken: string) {
    return apiRequest<RideCatalogAdminData>(
      "/admin/rides/catalog",
      {},
      accessToken,
    );
  },

  list(
    accessToken: string,
    filters?: {
      status?: string;
      cityId?: string;
      search?: string;
    },
  ) {
    const params = new URLSearchParams();

    if (filters?.status) params.set("status", filters.status);
    if (filters?.cityId) params.set("cityId", filters.cityId);
    if (filters?.search) params.set("search", filters.search);

    const suffix = params.toString()
      ? `?${params.toString()}`
      : "";

    return apiRequest<{
      rides: AdminRide[];
      total: number;
    }>(
      `/admin/rides${suffix}`,
      {},
      accessToken,
    );
  },

  detail(accessToken: string, rideId: string) {
    return apiRequest<{
      ride: AdminRide;
      events: Record<string, unknown>[];
    }>(
      `/admin/rides/${rideId}`,
      {},
      accessToken,
    );
  },

  updatePricing(
    accessToken: string,
    pricingId: string,
    input: Partial<{
      baseFare: number;
      minimumFare: number;
      perKmRate: number;
      perMinuteRate: number;
      bookingFee: number;
      defaultSurgeMultiplier: number;
      cancellationFee: number;
      waitingPerMinuteRate: number;
      freeWaitingMinutes: number;
      isActive: boolean;
    }>,
  ) {
    return apiRequest<{
      pricing: Record<string, unknown>;
    }>(
      `/admin/rides/pricing/${pricingId}`,
      {
        method: "PATCH",
        body: JSON.stringify(input),
      },
      accessToken,
    );
  },
};
