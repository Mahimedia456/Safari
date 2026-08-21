import type {
  AccountRole,
} from "../types/auth";

export interface MarketPermissions {
  view: boolean;

  editMarketStatus: boolean;

  editServices: boolean;

  editRideAvailability: boolean;

  editLocalization: boolean;

  editSupport: boolean;

  editOperations: boolean;
}

export function getMarketPermissions(
  role: AccountRole,
): MarketPermissions {
  switch (role) {
    case "super_admin":
    case "admin":
      return {
        view: true,

        editMarketStatus: true,

        editServices: true,

        editRideAvailability: true,

        editLocalization: true,

        editSupport: true,

        editOperations: true,
      };

    case "operations_manager":
      return {
        view: true,

        editMarketStatus: false,

        editServices: true,

        editRideAvailability: true,

        editLocalization: false,

        editSupport: true,

        editOperations: true,
      };

    case "finance_manager":
      return {
        view: true,

        editMarketStatus: false,

        editServices: false,

        editRideAvailability: false,

        editLocalization: false,

        editSupport: false,

        editOperations: false,
      };

    case "support":
      return {
        view: true,

        editMarketStatus: false,

        editServices: false,

        editRideAvailability: false,

        editLocalization: false,

        editSupport: false,

        editOperations: false,
      };

    default:
      return {
        view: false,

        editMarketStatus: false,

        editServices: false,

        editRideAvailability: false,

        editLocalization: false,

        editSupport: false,

        editOperations: false,
      };
  }
}