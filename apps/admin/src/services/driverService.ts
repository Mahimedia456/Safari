import { apiRequest } from "./apiClient";
import type {
  AdminDriverDetail,
  AdminDriverListItem,
} from "../types/driver";

export const adminDriverService = {
  list(
    accessToken: string,
    filters?: {
      search?: string;
      onboardingStatus?: string;
      verificationStatus?: string;
      city?: string;
    },
  ) {
    const params = new URLSearchParams();

    if (filters?.search) params.set("search", filters.search);
    if (filters?.onboardingStatus)
      params.set("onboardingStatus", filters.onboardingStatus);
    if (filters?.verificationStatus)
      params.set("verificationStatus", filters.verificationStatus);
    if (filters?.city) params.set("city", filters.city);

    const suffix = params.toString() ? `?${params.toString()}` : "";

    return apiRequest<{
      drivers: AdminDriverListItem[];
      total: number;
    }>(`/admin/drivers${suffix}`, {}, accessToken);
  },

  detail(accessToken: string, driverId: string) {
    return apiRequest<AdminDriverDetail>(
      `/admin/drivers/${driverId}`,
      {},
      accessToken,
    );
  },

  updateDriverStatus(
    accessToken: string,
    driverId: string,
    action:
      | "under_review"
      | "approve"
      | "reject"
      | "suspend"
      | "reactivate",
    note?: string | null,
  ) {
    return apiRequest<{ driverProfile: Record<string, unknown> }>(
      `/admin/drivers/${driverId}/status`,
      {
        method: "PATCH",
        body: JSON.stringify({
          action,
          note: note ?? null,
        }),
      },
      accessToken,
    );
  },

  updateVehicleStatus(
    accessToken: string,
    driverId: string,
    vehicleId: string,
    status: "verified" | "rejected",
    note?: string | null,
  ) {
    return apiRequest<{ vehicle: Record<string, unknown> }>(
      `/admin/drivers/${driverId}/vehicles/${vehicleId}/status`,
      {
        method: "PATCH",
        body: JSON.stringify({
          status,
          note: note ?? null,
        }),
      },
      accessToken,
    );
  },

  updateDocumentStatus(
    accessToken: string,
    driverId: string,
    documentId: string,
    status: "verified" | "rejected",
    note?: string | null,
  ) {
    return apiRequest<{ document: Record<string, unknown> }>(
      `/admin/drivers/${driverId}/documents/${documentId}/status`,
      {
        method: "PATCH",
        body: JSON.stringify({
          status,
          note: note ?? null,
        }),
      },
      accessToken,
    );
  },
};
