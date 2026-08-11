import type {
  AccountRole,
} from "../types/auth";

export interface StorePermissions {
  view: boolean;
  create: boolean;
  edit: boolean;
  editCommission: boolean;
  approve: boolean;
  reject: boolean;
  suspend: boolean;
  reactivate: boolean;
}

export function getStorePermissions(
  role: AccountRole,
): StorePermissions {
  switch (role) {
    case "super_admin":
    case "admin":
      return {
        view: true,
        create: true,
        edit: true,
        editCommission: true,
        approve: true,
        reject: true,
        suspend: true,
        reactivate: true,
      };

    case "operations_manager":
      return {
        view: true,
        create: true,
        edit: true,
        editCommission: false,
        approve: true,
        reject: true,
        suspend: true,
        reactivate: true,
      };

    case "support":
      return {
        view: true,
        create: false,
        edit: false,
        editCommission: false,
        approve: false,
        reject: false,
        suspend: false,
        reactivate: false,
      };

    default:
      return {
        view: false,
        create: false,
        edit: false,
        editCommission: false,
        approve: false,
        reject: false,
        suspend: false,
        reactivate: false,
      };
  }
}