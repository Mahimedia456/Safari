import type {
  AccountRole,
} from "../types/auth";

export interface MerchantPermissions {
  view: boolean;

  approve: boolean;

  reject: boolean;

  suspend: boolean;

  reactivate: boolean;

  addNote: boolean;

  viewBank:
    boolean;
}

export function getMerchantPermissions(
  role: AccountRole,
): MerchantPermissions {
  switch (role) {
    case "super_admin":
    case "admin":
      return {
        view: true,

        approve: true,

        reject: true,

        suspend: true,

        reactivate: true,

        addNote: true,

        viewBank: true,
      };

    case "operations_manager":
      return {
        view: true,

        approve: true,

        reject: true,

        suspend: true,

        reactivate: true,

        addNote: true,

        viewBank: true,
      };

    case "support":
      return {
        view: true,

        approve: false,

        reject: false,

        suspend: false,

        reactivate: false,

        addNote: true,

        viewBank: false,
      };

    default:
      return {
        view: false,

        approve: false,

        reject: false,

        suspend: false,

        reactivate: false,

        addNote: false,

        viewBank: false,
      };
  }
}