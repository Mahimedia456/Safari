import type {
  AccountRole,
} from "../types/auth";

export interface DriverPermissions {
  view: boolean;

  reviewApplications: boolean;

  reviewDocuments: boolean;

  manageVehicles: boolean;

  suspendDriver: boolean;

  reactivateDriver: boolean;

  blockDriver: boolean;

  manageWallet: boolean;

  viewWallet: boolean;

  viewRatings: boolean;
}

export function getDriverPermissions(
  role: AccountRole,
): DriverPermissions {
  switch (role) {
    case "super_admin":
    case "admin":
      return {
        view: true,

        reviewApplications: true,

        reviewDocuments: true,

        manageVehicles: true,

        suspendDriver: true,

        reactivateDriver: true,

        blockDriver: true,

        manageWallet: true,

        viewWallet: true,

        viewRatings: true,
      };

    case "operations_manager":
      return {
        view: true,

        reviewApplications: true,

        reviewDocuments: true,

        manageVehicles: true,

        suspendDriver: true,

        reactivateDriver: true,

        blockDriver: false,

        manageWallet: false,

        viewWallet: true,

        viewRatings: true,
      };

    case "finance_manager":
      return {
        view: true,

        reviewApplications: false,

        reviewDocuments: false,

        manageVehicles: false,

        suspendDriver: false,

        reactivateDriver: false,

        blockDriver: false,

        manageWallet: true,

        viewWallet: true,

        viewRatings: false,
      };

    case "support":
      return {
        view: true,

        reviewApplications: false,

        reviewDocuments: false,

        manageVehicles: false,

        suspendDriver: false,

        reactivateDriver: false,

        blockDriver: false,

        manageWallet: false,

        viewWallet: false,

        viewRatings: true,
      };

    default:
      return {
        view: false,

        reviewApplications: false,

        reviewDocuments: false,

        manageVehicles: false,

        suspendDriver: false,

        reactivateDriver: false,

        blockDriver: false,

        manageWallet: false,

        viewWallet: false,

        viewRatings: false,
      };
  }
}