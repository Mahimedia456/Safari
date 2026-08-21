import type {
  AccountRole,
} from "./auth";

export type AccessUserStatus =
  | "active"
  | "suspended"
  | "disabled";

export type PermissionModule =
  | "dashboard"
  | "rides"
  | "pricing"
  | "drivers"
  | "passengers"
  | "merchants"
  | "stores"
  | "food"
  | "grocery"
  | "pharmacy"
  | "services"
  | "rewards"
  | "finance"
  | "regions"
  | "roles"
  | "settings";

export type PermissionAction =
  | "view"
  | "create"
  | "edit"
  | "delete"
  | "approve"
  | "reject"
  | "suspend"
  | "refund"
  | "payout"
  | "export"
  | "manage";

export interface RolePermission {
  module: PermissionModule;

  actions:
    PermissionAction[];
}

export interface AccessRole {
  id: string;

  role: AccountRole;

  name: string;

  description: string;

  system: boolean;

  permissions:
    RolePermission[];

  createdAt: string;

  updatedAt: string;
}

export interface AdminUser {
  id: string;

  fullName: string;

  email: string;

  phone?: string;

  role: AccountRole;

  status:
    AccessUserStatus;

  regionScope:
    | "all"
    | "Pakistan"
    | "Pakistan";

  lastLoginAt?: string;

  createdAt: string;
}