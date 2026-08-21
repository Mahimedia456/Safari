import { create } from "zustand";

import { analyticsService } from "../services/analyticsService";
import type {
  DailyMetric,
  DashboardAnalytics,
  OperationsIncident,
} from "../types/analytics";
import { useAuthStore } from "./authStore";

type AnalyticsState = {
  loading: boolean;
  error: string | null;

  dashboard: DashboardAnalytics | null;
  daily: DailyMetric[];
  incidents: OperationsIncident[];

  loadDashboard: () => Promise<void>;
  loadDaily: (days?: number) => Promise<void>;
  loadIncidents: (filters?: {
    status?: string;
    severity?: string;
  }) => Promise<void>;
};

function token() {
  const accessToken =
    useAuthStore.getState().accessToken;

  if (!accessToken)
    throw new Error("Safari admin session is required.");

  return accessToken;
}

export const useAnalyticsStore =
  create<AnalyticsState>((set) => ({
    loading: false,
    error: null,

    dashboard: null,
    daily: [],
    incidents: [],

    loadDashboard: async () => {
      set({ loading: true, error: null });

      try {
        const dashboard =
          await analyticsService.dashboard(token());

        set({ dashboard });
      } catch (error) {
        set({
          error:
            error instanceof Error
              ? error.message
              : "Could not load Safari analytics.",
        });
      } finally {
        set({ loading: false });
      }
    },

    loadDaily: async (days = 30) => {
      set({ loading: true, error: null });

      try {
        const data =
          await analyticsService.daily(
            token(),
            days,
          );

        set({ daily: data.metrics });
      } catch (error) {
        set({
          error:
            error instanceof Error
              ? error.message
              : "Could not load Safari daily metrics.",
        });
      } finally {
        set({ loading: false });
      }
    },

    loadIncidents: async (filters) => {
      set({ loading: true, error: null });

      try {
        const data =
          await analyticsService.incidents(
            token(),
            filters,
          );

        set({ incidents: data.incidents });
      } catch (error) {
        set({
          error:
            error instanceof Error
              ? error.message
              : "Could not load Safari incidents.",
        });
      } finally {
        set({ loading: false });
      }
    },
  }));
