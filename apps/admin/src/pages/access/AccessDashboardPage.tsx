import {
  Link,
} from "react-router-dom";

import AccessStats from "../../components/access/AccessStats";
import AdminUserTable from "../../components/access/AdminUserTable";
import RoleTable from "../../components/access/RoleTable";

import {
  useAccessStore,
} from "../../store/accessStore";

export default function AccessDashboardPage() {
  const roles =
    useAccessStore(
      (state) =>
        state.roles,
    );

  const users =
    useAccessStore(
      (state) =>
        state.users,
    );

  return (
    <div>
      <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-sm font-semibold text-safari-600 dark:text-safari-400">
            Safari Security
          </div>

          <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
            Roles & Permissions
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Control internal user roles,
            module access and action
            permissions.
          </p>
        </div>

        <Link
          to="/access/users/create"
          className="inline-flex h-11 items-center rounded-xl bg-safari-600 px-4 text-sm font-semibold text-white"
        >
          Add Admin User
        </Link>
      </div>

      <AccessStats
        roles={roles}
        users={users}
      />

      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-semibold text-slate-950 dark:text-white">
            Roles
          </h2>

          <Link
            to="/access/roles"
            className="text-sm font-semibold text-safari-600"
          >
            View all
          </Link>
        </div>

        <RoleTable
          roles={roles}
        />
      </div>

      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-semibold text-slate-950 dark:text-white">
            Admin Users
          </h2>

          <Link
            to="/access/users"
            className="text-sm font-semibold text-safari-600"
          >
            View all
          </Link>
        </div>

        <AdminUserTable
          users={users}
        />
      </div>
    </div>
  );
}