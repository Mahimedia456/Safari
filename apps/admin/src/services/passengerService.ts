import { apiRequest } from "./apiClient";
import type {
  AdminPassenger,
  AdminPassengerDetail,
} from "../types/passenger";

export const adminPassengerService = {
  list(
    accessToken: string,
    filters?: {
      search?: string;
      status?: string;
      country?: string;
    },
  ) {
    const params = new URLSearchParams();

    if (filters?.search) params.set("search", filters.search);
    if (filters?.status) params.set("status", filters.status);
    if (filters?.country) params.set("country", filters.country);

    const suffix = params.toString() ? `?${params.toString()}` : "";

    return apiRequest<{
      passengers: AdminPassenger[];
      total: number;
    }>(`/admin/passengers${suffix}`, {}, accessToken);
  },

  detail(accessToken: string, passengerId: string) {
    return apiRequest<AdminPassengerDetail>(
      `/admin/passengers/${passengerId}`,
      {},
      accessToken,
    );
  },

  updateStatus(
    accessToken: string,
    passengerId: string,
    status: "active" | "suspended" | "blocked",
  ) {
    return apiRequest<{ passenger: AdminPassenger }>(
      `/admin/passengers/${passengerId}/status`,
      {
        method: "PATCH",
        body: JSON.stringify({ status }),
      },
      accessToken,
    );
  },
};
