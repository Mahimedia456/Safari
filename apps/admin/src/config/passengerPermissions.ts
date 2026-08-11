import type {
  AccountRole,
} from "../types/auth";

export interface PassengerPermissions {
  view: boolean;

  suspend: boolean;

  block: boolean;

  reactivate: boolean;

  viewWallet: boolean;

  adjustWallet: boolean;

  viewSafety: boolean;

  manageSafety: boolean;

  viewSupport: boolean;

  manageSupport: boolean;
}

export function getPassengerPermissions(
  role: AccountRole,
): PassengerPermissions {
  switch (role) {
    case "super_admin":
    case "admin":
      return {
        view: true,

        suspend: true,

        block: true,

        reactivate: true,

        viewWallet: true,

        adjustWallet: true,

        viewSafety: true,

        manageSafety: true,

        viewSupport: true,

        manageSupport: true,
      };

    case "operations_manager":
      return {
        view: true,

        suspend: true,

        block: false,

        reactivate: true,

        viewWallet: true,

        adjustWallet: false,

        viewSafety: true,

        manageSafety: true,

        viewSupport: true,

        manageSupport: true,
      };

    case "finance_manager":
      return {
        view: true,

        suspend: false,

        block: false,

        reactivate: false,

        viewWallet: true,

        adjustWallet: true,

        viewSafety: false,

        manageSafety: false,

        viewSupport: true,

        manageSupport: false,
      };

    case "support":
      return {
        view: true,

        suspend: false,

        block: false,

        reactivate: false,

        viewWallet: false,

        adjustWallet: false,

        viewSafety: true,

        manageSafety: false,

        viewSupport: true,

        manageSupport: true,
      };

    default:
      return {
        view: false,

        suspend: false,

        block: false,

        reactivate: false,

        viewWallet: false,

        adjustWallet: false,

        viewSafety: false,

        manageSafety: false,

        viewSupport: false,

        manageSupport: false,
      };
  }
}