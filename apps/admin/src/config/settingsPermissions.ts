import type {
  AccountRole,
} from "../types/auth";

export interface SettingsPermissions {
  view: boolean;

  editGeneral: boolean;

  editMobileApps: boolean;

  editMaintenance: boolean;

  editAuthentication: boolean;

  editPayments: boolean;

  editRideDefaults: boolean;

  editMarketplace: boolean;

  editNotifications: boolean;

  editUploads: boolean;

  editLegal: boolean;

  editFeatures: boolean;

  editSecurity: boolean;

  viewAuditLogs: boolean;
}

export function getSettingsPermissions(
  role: AccountRole,
): SettingsPermissions {
  switch (role) {
    case "super_admin":
      return {
        view: true,

        editGeneral: true,

        editMobileApps: true,

        editMaintenance: true,

        editAuthentication: true,

        editPayments: true,

        editRideDefaults: true,

        editMarketplace: true,

        editNotifications: true,

        editUploads: true,

        editLegal: true,

        editFeatures: true,

        editSecurity: true,

        viewAuditLogs: true,
      };

    case "admin":
      return {
        view: true,

        editGeneral: true,

        editMobileApps: true,

        editMaintenance: true,

        editAuthentication: false,

        editPayments: false,

        editRideDefaults: true,

        editMarketplace: true,

        editNotifications: true,

        editUploads: true,

        editLegal: true,

        editFeatures: true,

        editSecurity: false,

        viewAuditLogs: true,
      };

    case "operations_manager":
      return {
        view: true,

        editGeneral: false,

        editMobileApps: false,

        editMaintenance: false,

        editAuthentication: false,

        editPayments: false,

        editRideDefaults: true,

        editMarketplace: true,

        editNotifications: false,

        editUploads: false,

        editLegal: false,

        editFeatures: false,

        editSecurity: false,

        viewAuditLogs: false,
      };

    case "finance_manager":
      return {
        view: true,

        editGeneral: false,

        editMobileApps: false,

        editMaintenance: false,

        editAuthentication: false,

        editPayments: true,

        editRideDefaults: false,

        editMarketplace: false,

        editNotifications: false,

        editUploads: false,

        editLegal: false,

        editFeatures: false,

        editSecurity: false,

        viewAuditLogs: true,
      };

    default:
      return {
        view: false,

        editGeneral: false,

        editMobileApps: false,

        editMaintenance: false,

        editAuthentication: false,

        editPayments: false,

        editRideDefaults: false,

        editMarketplace: false,

        editNotifications: false,

        editUploads: false,

        editLegal: false,

        editFeatures: false,

        editSecurity: false,

        viewAuditLogs: false,
      };
  }
}