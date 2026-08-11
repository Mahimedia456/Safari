import {
  useState,
} from "react";

import PermissionMatrix from "../../components/access/PermissionMatrix";

import {
  getAccessPermissions,
} from "../../config/accessPermissions";

import {
  useAccessStore,
} from "../../store/accessStore";

import {
  useAuthStore,
} from "../../store/authStore";

export default function PermissionMatrixPage() {
  const user =
    useAuthStore(
      (state) =>
        state.user,
    );

  const roles =
    useAccessStore(
      (state) =>
        state.roles,
    );

  const [
    selectedRoleId,
    setSelectedRoleId,
  ] = useState(
    roles.find(
      (role) =>
        role.role === "admin",
    )?.id ??
      roles[0]?.id ??
      "",
  );

  const role =
    roles.find(
      (item) =>
        item.id ===
        selectedRoleId,
    );

  if (!user || !role) {
    return null;
  }

  const permissions =
    getAccessPermissions(
      user.role,
    );

  return (
    <div>
      <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-sm font-semibold text-safari-600">
            RBAC
          </div>

          <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
            Permission Matrix
          </h1>
        </div>

        <select
          value={
            selectedRoleId
          }
          onChange={(event) =>
            setSelectedRoleId(
              event.target.value,
            )
          }
          className="safari-select"
        >
          {roles.map(
            (item) => (
              <option
                key={item.id}
                value={item.id}
              >
                {item.name}
              </option>
            ),
          )}
        </select>
      </div>

      <PermissionMatrix
        role={role}
        canEdit={
          permissions.editPermissions &&
          role.role !==
            "super_admin"
        }
      />
    </div>
  );
}