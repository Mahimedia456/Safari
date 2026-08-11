import type {
  AccountRole,
} from "../types/auth";

export interface RidePermissions {
  view: boolean;

  dispatch: boolean;

  changeStatus: boolean;

  cancelRide: boolean;

  manageIncidents: boolean;

  viewFinancials: boolean;
}

export function getRidePermissions(
  role: AccountRole,
): RidePermissions {
  switch (role) {
    case "super_admin":
    case "admin":
      return {
        view: true,

        dispatch: true,

        changeStatus: true,

        cancelRide: true,

        manageIncidents: true,

        viewFinancials: true,
      };

    case "operations_manager":
      return {
        view: true,

        dispatch: true,

        changeStatus: true,

        cancelRide: true,

        manageIncidents: true,

        viewFinancials: true,
      };

    case "support":
      return {
        view: true,

        dispatch: false,

        changeStatus: false,

        cancelRide: false,

        manageIncidents: true,

        viewFinancials: false,
      };

    case "finance_manager":
      return {
        view: true,

        dispatch: false,

        changeStatus: false,

        cancelRide: false,

        manageIncidents: false,

        viewFinancials: true,
      };

    default:
      return {
        view: false,

        dispatch: false,

        changeStatus: false,

        cancelRide: false,

        manageIncidents: false,

        viewFinancials: false,
      };
  }
}