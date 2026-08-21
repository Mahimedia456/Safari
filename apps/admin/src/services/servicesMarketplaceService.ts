import { apiRequest } from "./apiClient";
import type {
  AdminServiceBooking,
  AdminServiceProvider,
} from "../types/servicesMarketplace";

export const adminServicesMarketplaceService = {
  providers(accessToken: string) {
    return apiRequest<{
      providers: AdminServiceProvider[];
      total: number;
    }>(
      "/admin/services/providers",
      {},
      accessToken,
    );
  },

  bookings(
    accessToken: string,
    status?: string,
  ) {
    const suffix = status
      ? `?status=${encodeURIComponent(status)}`
      : "";

    return apiRequest<{
      bookings: AdminServiceBooking[];
      total: number;
    }>(
      `/admin/services/bookings${suffix}`,
      {},
      accessToken,
    );
  },

  updateBookingStatus(
    accessToken: string,
    bookingId: string,
    input: {
      status:
        | "confirmed"
        | "professional_assigned"
        | "on_the_way"
        | "in_progress"
        | "completed"
        | "cancelled_by_provider"
        | "cancelled_by_admin";
      finalTotal?: number | null;
      note?: string | null;
    },
  ) {
    return apiRequest<{
      booking: AdminServiceBooking;
    }>(
      `/admin/services/bookings/${bookingId}/status`,
      {
        method: "PATCH",
        body: JSON.stringify(input),
      },
      accessToken,
    );
  },
};
