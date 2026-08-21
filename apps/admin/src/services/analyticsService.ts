import { apiRequest } from "./apiClient";
import type {
  DailyMetric,
  DashboardAnalytics,
  OperationsIncident,
} from "../types/analytics";

export const analyticsService = {
  dashboard(accessToken: string) {
    return apiRequest<DashboardAnalytics>(
      "/admin/analytics/dashboard",
      {},
      accessToken,
    );
  },

  daily(accessToken: string, days = 30) {
    return apiRequest<{
      metrics: DailyMetric[];
      total: number;
    }>(
      `/admin/analytics/daily?days=${days}`,
      {},
      accessToken,
    );
  },

  incidents(
    accessToken: string,
    filters?: {
      status?: string;
      severity?: string;
    },
  ) {
    const params = new URLSearchParams();

    if (filters?.status)
      params.set("status", filters.status);

    if (filters?.severity)
      params.set("severity", filters.severity);

    const suffix = params.toString()
      ? `?${params.toString()}`
      : "";

    return apiRequest<{
      incidents: OperationsIncident[];
      total: number;
    }>(
      `/admin/analytics/incidents${suffix}`,
      {},
      accessToken,
    );
  },

  createIncident(
    accessToken: string,
    input: {
      incidentType:
        | "ride"
        | "driver"
        | "passenger"
        | "merchant"
        | "order"
        | "payment"
        | "system";
      severity?: "low" | "medium" | "high" | "critical";
      title: string;
      description?: string | null;
      entityType?: string | null;
      entityId?: string | null;
    },
  ) {
    return apiRequest<{
      incident: OperationsIncident;
    }>(
      "/admin/analytics/incidents",
      {
        method: "POST",
        body: JSON.stringify(input),
      },
      accessToken,
    );
  },

  updateIncident(
    accessToken: string,
    incidentId: string,
    input: {
      status?: "open" | "investigating" | "resolved" | "dismissed";
      assignedAdminId?: string | null;
    },
  ) {
    return apiRequest<{
      incident: OperationsIncident;
    }>(
      `/admin/analytics/incidents/${incidentId}`,
      {
        method: "PATCH",
        body: JSON.stringify(input),
      },
      accessToken,
    );
  },
};
