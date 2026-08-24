import { apiRequest } from "./apiClient";

export type AdminRideDriverOffer = {
  id: string;
  ride_id: string;
  driver_id: string;
  offered_fare: number | string;
  currency_code: string;
  offer_status: string;
  distance_to_pickup_km: number | string | null;
  estimated_pickup_minutes: number | null;
  created_at: string;
  rides?: {
    ride_number?: string;
    pickup_address?: string;
    dropoff_address?: string;
    suggested_fare?: number | string | null;
    ride_categories?: {
      name?: string;
      code?: string;
    };
  };
  profiles?: {
    full_name?: string;
    phone?: string | null;
  };
};

export type AdminDeliveryJob = {
  id: string;
  job_type: "food" | "grocery" | "pharmacy";
  source_id: string;
  driver_id: string | null;
  pickup_name: string;
  pickup_address: string | null;
  dropoff_address: string;
  currency_code: string;
  delivery_fee: number | string;
  status: string;
  created_at: string;
};

export const adminDispatchService = {
  rideOffers(accessToken: string) {
    return apiRequest<{
      offers: AdminRideDriverOffer[];
      total: number;
    }>(
      "/admin/rides/driver-offers",
      {},
      accessToken,
    );
  },

  deliveryJobs(accessToken: string) {
    return apiRequest<{
      jobs: AdminDeliveryJob[];
      total: number;
    }>(
      "/admin/rides/delivery-jobs",
      {},
      accessToken,
    );
  },
};
