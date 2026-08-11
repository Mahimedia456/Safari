import {
  ArrowLeft,
  Mail,
  MapPin,
  Phone,
  UserCog,
} from "lucide-react";

import {
  Link,
  Navigate,
  useParams,
} from "react-router-dom";

import RoleBadge from "../../components/access/RoleBadge";
import UserStatusBadge from "../../components/access/UserStatusBadge";

import {
  getAccessPermissions,
} from "../../config/accessPermissions";

import {
  useAccessStore,
} from "../../store/accessStore";

import {
  useAuthStore,
} from "../../store/authStore";

import type {
  AccessUserStatus,
} from "../../types/access";

import type {
  AccountRole,
} from "../../types/auth";

const assignableRoles: AccountRole[] = [
  "admin",
  "operations_manager",
  "finance_manager",
  "support",
];

const statuses: AccessUserStatus[] = [
  "active",
  "suspended",
  "disabled",
];

export default function AdminUserDetailPage() {
  const {
    userId,
  } = useParams();

  const currentUser =
    useAuthStore(
      (state) =>
        state.user,
    );

  const adminUser =
    useAccessStore(
      (state) =>
        state.users.find(
          (item) =>
            item.id === userId,
        ),
    );

  const updateRole =
    useAccessStore(
      (state) =>
        state.updateAdminUserRole,
    );

  const updateStatus =
    useAccessStore(
      (state) =>
        state.updateAdminUserStatus,
    );

  const updateRegion =
    useAccessStore(
      (state) =>
        state.updateRegionScope,
    );

  if (!adminUser) {
    return (
      <Navigate
        to="/access/users"
        replace
      />
    );
  }

  if (!currentUser) {
    return null;
  }

  const permissions =
    getAccessPermissions(
      currentUser.role,
    );

  const protectedSuperAdmin =
    adminUser.role ===
    "super_admin";

  return (
    <div>
      <Link
        to="/access/users"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-safari-600"
      >
        <ArrowLeft size={16} />
        Admin Users
      </Link>

      <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <UserStatusBadge
            status={
              adminUser.status
            }
          />

          <h1 className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">
            {
              adminUser.fullName
            }
          </h1>

          <div className="mt-3">
            <RoleBadge
              role={
                adminUser.role
              }
            />
          </div>
        </div>

        <UserCog
          size={28}
          className="text-safari-600"
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <section className="safari-card p-6">
          <h2 className="font-semibold text-slate-950 dark:text-white">
            User Information
          </h2>

          <div className="mt-5 space-y-4">
            <Info
              icon={Mail}
              label="Email"
              value={
                adminUser.email
              }
            />

            <Info
              icon={Phone}
              label="Phone"
              value={
                adminUser.phone ??
                "-"
              }
            />

            <Info
              icon={MapPin}
              label="Region Scope"
              value={
                adminUser.regionScope
              }
            />

            <Info
              icon={UserCog}
              label="Last Login"
              value={
                adminUser.lastLoginAt
                  ? new Date(
                      adminUser.lastLoginAt,
                    ).toLocaleString()
                  : "Never"
              }
            />
          </div>
        </section>

        <section className="safari-card p-6">
          <h2 className="font-semibold text-slate-950 dark:text-white">
            Access Control
          </h2>

          <div className="mt-5 space-y-5">
            <label>
              <span className="text-xs font-semibold text-slate-500">
                Role
              </span>

              <select
                value={
                  adminUser.role
                }
                disabled={
                  !permissions.assignRoles ||
                  protectedSuperAdmin
                }
                onChange={(event) =>
                  updateRole(
                    adminUser.id,
                    event.target
                      .value as AccountRole,
                  )
                }
                className="safari-input mt-2"
              >
                {protectedSuperAdmin && (
                  <option value="super_admin">
                    Super Admin
                  </option>
                )}

                {assignableRoles.map(
                  (role) => (
                    <option
                      key={role}
                      value={role}
                    >
                      {role.replaceAll(
                        "_",
                        " ",
                      )}
                    </option>
                  ),
                )}
              </select>
            </label>

            <label>
              <span className="text-xs font-semibold text-slate-500">
                Region Scope
              </span>

              <select
                value={
                  adminUser.regionScope
                }
                disabled={
                  !permissions.editAdminUsers ||
                  protectedSuperAdmin
                }
                onChange={(event) =>
                  updateRegion(
                    adminUser.id,

                    event.target
                      .value as
                      | "all"
                      | "Pakistan"
                      | "Germany",
                  )
                }
                className="safari-input mt-2"
              >
                <option value="all">
                  All Regions
                </option>

                <option value="Pakistan">
                  Pakistan
                </option>

                <option value="Germany">
                  Germany
                </option>
              </select>
            </label>

            <label>
              <span className="text-xs font-semibold text-slate-500">
                Account Status
              </span>

              <select
                value={
                  adminUser.status
                }
                disabled={
                  !permissions.disableAdminUsers ||
                  protectedSuperAdmin
                }
                onChange={(event) =>
                  updateStatus(
                    adminUser.id,
                    event.target
                      .value as AccessUserStatus,
                  )
                }
                className="safari-input mt-2"
              >
                {statuses.map(
                  (status) => (
                    <option
                      key={status}
                      value={status}
                    >
                      {status}
                    </option>
                  ),
                )}
              </select>
            </label>
          </div>
        </section>
      </div>
    </div>
  );
}

function Info({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Mail;

  label: string;

  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-100 p-4 dark:border-white/[0.06]">
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Icon size={14} />

        {label}
      </div>

      <div className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">
        {value}
      </div>
    </div>
  );
}