import {
  create,
} from "zustand";

import {
  dummyAuditLogs,
  initialSystemSettings,
} from "../data/settings";

import type {
  AuditLog,
  AuthSettings,
  FeatureFlags,
  GeneralSettings,
  MaintenanceSettings,
  MarketplaceDefaultSettings,
  MobileAppSettings,
  NotificationSettings,
  PaymentSettings,
  RideDefaultSettings,
  SecuritySettings,
  SupportLegalSettings,
  SystemSettings,
  UploadSettings,
} from "../types/settings";

interface SettingsState {
  settings:
    SystemSettings;

  auditLogs:
    AuditLog[];

  updateGeneral: (
    changes:
      Partial<GeneralSettings>,
  ) => void;

  updateMobileApps: (
    changes:
      Partial<MobileAppSettings>,
  ) => void;

  updateMaintenance: (
    changes:
      Partial<MaintenanceSettings>,
  ) => void;

  updateAuth: (
    changes:
      Partial<AuthSettings>,
  ) => void;

  updatePayments: (
    changes:
      Partial<PaymentSettings>,
  ) => void;

  updateRides: (
    changes:
      Partial<RideDefaultSettings>,
  ) => void;

  updateMarketplace: (
    changes:
      Partial<MarketplaceDefaultSettings>,
  ) => void;

  updateNotifications: (
    changes:
      Partial<NotificationSettings>,
  ) => void;

  updateUploads: (
    changes:
      Partial<UploadSettings>,
  ) => void;

  updateSupportLegal: (
    changes:
      Partial<SupportLegalSettings>,
  ) => void;

  updateFeatures: (
    changes:
      Partial<FeatureFlags>,
  ) => void;

  updateSecurity: (
    changes:
      Partial<SecuritySettings>,
  ) => void;
}

export const useSettingsStore =
  create<SettingsState>(
    (set) => ({
      settings:
        initialSystemSettings,

      auditLogs:
        dummyAuditLogs,

      updateGeneral: (
        changes,
      ) => {
        set((state) => ({
          settings: {
            ...state.settings,

            general: {
              ...state.settings.general,
              ...changes,
            },
          },
        }));
      },

      updateMobileApps: (
        changes,
      ) => {
        set((state) => ({
          settings: {
            ...state.settings,

            mobileApps: {
              ...state.settings.mobileApps,
              ...changes,
            },
          },
        }));
      },

      updateMaintenance: (
        changes,
      ) => {
        set((state) => ({
          settings: {
            ...state.settings,

            maintenance: {
              ...state.settings.maintenance,
              ...changes,
            },
          },
        }));
      },

      updateAuth: (
        changes,
      ) => {
        set((state) => ({
          settings: {
            ...state.settings,

            auth: {
              ...state.settings.auth,
              ...changes,
            },
          },
        }));
      },

      updatePayments: (
        changes,
      ) => {
        set((state) => ({
          settings: {
            ...state.settings,

            payments: {
              ...state.settings.payments,
              ...changes,
            },
          },
        }));
      },

      updateRides: (
        changes,
      ) => {
        set((state) => ({
          settings: {
            ...state.settings,

            rides: {
              ...state.settings.rides,
              ...changes,
            },
          },
        }));
      },

      updateMarketplace: (
        changes,
      ) => {
        set((state) => ({
          settings: {
            ...state.settings,

            marketplace: {
              ...state.settings.marketplace,
              ...changes,
            },
          },
        }));
      },

      updateNotifications: (
        changes,
      ) => {
        set((state) => ({
          settings: {
            ...state.settings,

            notifications: {
              ...state.settings.notifications,
              ...changes,
            },
          },
        }));
      },

      updateUploads: (
        changes,
      ) => {
        set((state) => ({
          settings: {
            ...state.settings,

            uploads: {
              ...state.settings.uploads,
              ...changes,
            },
          },
        }));
      },

      updateSupportLegal: (
        changes,
      ) => {
        set((state) => ({
          settings: {
            ...state.settings,

            supportLegal: {
              ...state.settings.supportLegal,
              ...changes,
            },
          },
        }));
      },

      updateFeatures: (
        changes,
      ) => {
        set((state) => ({
          settings: {
            ...state.settings,

            features: {
              ...state.settings.features,
              ...changes,
            },
          },
        }));
      },

      updateSecurity: (
        changes,
      ) => {
        set((state) => ({
          settings: {
            ...state.settings,

            security: {
              ...state.settings.security,
              ...changes,
            },
          },
        }));
      },
    }),
  );