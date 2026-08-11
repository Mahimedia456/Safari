import type {
  AccountRole,
} from "../types/auth";

export interface PricingPermissions {
  view: boolean;

  editFare: boolean;

  editSurge: boolean;

  editCommission: boolean;

  editFreeRideProgram: boolean;

  useCalculator: boolean;
}

export function getPricingPermissions(
  role: AccountRole,
): PricingPermissions {
  switch (role) {
    case "super_admin":
    case "admin":
      return {
        view: true,
        editFare: true,
        editSurge: true,
        editCommission: true,
        editFreeRideProgram: true,
        useCalculator: true,
      };

    case "operations_manager":
      return {
        view: true,
        editFare: false,
        editSurge: true,
        editCommission: false,
        editFreeRideProgram: false,
        useCalculator: true,
      };

    case "finance_manager":
      return {
        view: true,
        editFare: true,
        editSurge: false,
        editCommission: true,
        editFreeRideProgram: true,
        useCalculator: true,
      };

    case "support":
      return {
        view: true,
        editFare: false,
        editSurge: false,
        editCommission: false,
        editFreeRideProgram: false,
        useCalculator: true,
      };

    default:
      return {
        view: false,
        editFare: false,
        editSurge: false,
        editCommission: false,
        editFreeRideProgram: false,
        useCalculator: false,
      };
  }
}