import type {
  AccountRole,
} from "../types/auth";

export interface AccessPermissions {
  viewRoles: boolean;

  editPermissions: boolean;

  viewAdminUsers: boolean;

  createAdminUsers: boolean;

  editAdminUsers: boolean;

  disableAdminUsers: boolean;

  assignRoles: boolean;
}

export function getAccessPermissions(
  role: AccountRole,
): AccessPermissions {
  switch (role) {
    case "super_admin":
      return {
        viewRoles: true,

        editPermissions: true,

        viewAdminUsers: true,

        createAdminUsers: true,

        editAdminUsers: true,

        disableAdminUsers: true,

        assignRoles: true,
      };

    case "admin":
      return {
        viewRoles: true,

        editPermissions: false,

        viewAdminUsers: true,

        createAdminUsers: true,

        editAdminUsers: true,

        disableAdminUsers: true,

        assignRoles: true,
      };

    default:
      return {
        viewRoles: false,

        editPermissions: false,

        viewAdminUsers: false,

        createAdminUsers: false,

        editAdminUsers: false,

        disableAdminUsers: false,

        assignRoles: false,
      };
  }
}