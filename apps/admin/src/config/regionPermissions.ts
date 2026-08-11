import type {
  AccountRole,
} from "../types/auth";

export interface RegionPermissions {
  view: boolean;

  editRegionStatus: boolean;

  editServices: boolean;

  editRideAvailability: boolean;

  editLocalization: boolean;

  editSupport: boolean;

  editOperations: boolean;
}

export function getRegionPermissions(
  role: AccountRole,
): RegionPermissions {
  switch (role) {
    case "super_admin":
    case "admin":
      return {
        view: true,

        editRegionStatus: true,

        editServices: true,

        editRideAvailability: true,

        editLocalization: true,

        editSupport: true,

        editOperations: true,
      };

    case "operations_manager":
      return {
        view: true,

        editRegionStatus: false,

        editServices: true,

        editRideAvailability: true,

        editLocalization: false,

        editSupport: true,

        editOperations: true,
      };

    case "finance_manager":
      return {
        view: true,

        editRegionStatus: false,

        editServices: false,

        editRideAvailability: false,

        editLocalization: false,

        editSupport: false,

        editOperations: false,
      };

    case "support":
      return {
        view: true,

        editRegionStatus: false,

        editServices: false,

        editRideAvailability: false,

        editLocalization: false,

        editSupport: false,

        editOperations: false,
      };

    default:
      return {
        view: false,

        editRegionStatus: false,

        editServices: false,

        editRideAvailability: false,

        editLocalization: false,

        editSupport: false,

        editOperations: false,
      };
  }
}