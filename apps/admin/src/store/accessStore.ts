import {
  create,
} from "zustand";

import {
  dummyAccessRoles,
  dummyAdminUsers,
} from "../data/access";

import type {
  AccessRole,
  AccessUserStatus,
  AdminUser,
  PermissionAction,
  PermissionModule,
} from "../types/access";

import type {
  AccountRole,
} from "../types/auth";

type CreateAdminUserInput = {
  fullName: string;

  email: string;

  phone?: string;

  role: AccountRole;

  regionScope:
    | "all"
    | "Pakistan"
    | "Pakistan";
};

interface AccessState {
  roles: AccessRole[];

  users: AdminUser[];

  togglePermission: (
    roleId: string,
    module: PermissionModule,
    action: PermissionAction,
  ) => void;

  createAdminUser: (
    input: CreateAdminUserInput,
  ) => AdminUser;

  updateAdminUserRole: (
    userId: string,
    role: AccountRole,
  ) => void;

  updateAdminUserStatus: (
    userId: string,
    status: AccessUserStatus,
  ) => void;

  updateMarketScope: (
    userId: string,
    scope:
      | "all"
      | "Pakistan"
      | "Pakistan",
  ) => void;
}

export const useAccessStore =
  create<AccessState>(
    (set) => ({
      roles:
        dummyAccessRoles,

      users:
        dummyAdminUsers,

      togglePermission: (
        roleId,
        module,
        action,
      ) => {
        set((state) => ({
          roles:
            state.roles.map(
              (role) => {
                if (
                  role.id !==
                  roleId
                ) {
                  return role;
                }

                const existing =
                  role.permissions.find(
                    (permission) =>
                      permission.module ===
                      module,
                  );

                if (!existing) {
                  return {
                    ...role,

                    permissions: [
                      ...role.permissions,

                      {
                        module,
                        actions: [
                          action,
                        ],
                      },
                    ],

                    updatedAt:
                      new Date().toISOString(),
                  };
                }

                const hasAction =
                  existing.actions.includes(
                    action,
                  );

                return {
                  ...role,

                  permissions:
                    role.permissions.map(
                      (
                        permission,
                      ) =>
                        permission.module ===
                        module
                          ? {
                              ...permission,

                              actions:
                                hasAction
                                  ? permission.actions.filter(
                                      (
                                        item,
                                      ) =>
                                        item !==
                                        action,
                                    )
                                  : [
                                      ...permission.actions,
                                      action,
                                    ],
                            }
                          : permission,
                    ),

                  updatedAt:
                    new Date().toISOString(),
                };
              },
            ),
        }));
      },

      createAdminUser: (
        input,
      ) => {
        const user: AdminUser = {
          id:
            `ADM-${Date.now()}`,

          fullName:
            input.fullName,

          email:
            input.email,

          phone:
            input.phone,

          role:
            input.role,

          status: "active",

          regionScope:
            input.regionScope,

          createdAt:
            new Date().toISOString(),
        };

        set((state) => ({
          users: [
            user,
            ...state.users,
          ],
        }));

        return user;
      },

      updateAdminUserRole: (
        userId,
        role,
      ) => {
        set((state) => ({
          users:
            state.users.map(
              (user) =>
                user.id ===
                userId
                  ? {
                      ...user,
                      role,
                    }
                  : user,
            ),
        }));
      },

      updateAdminUserStatus: (
        userId,
        status,
      ) => {
        set((state) => ({
          users:
            state.users.map(
              (user) =>
                user.id ===
                userId
                  ? {
                      ...user,
                      status,
                    }
                  : user,
            ),
        }));
      },

      updateMarketScope: (
        userId,
        regionScope,
      ) => {
        set((state) => ({
          users:
            state.users.map(
              (user) =>
                user.id ===
                userId
                  ? {
                      ...user,
                      regionScope,
                    }
                  : user,
            ),
        }));
      },
    }),
  );