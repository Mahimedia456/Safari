import {
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";

import {
  Link,
  Navigate,
  useParams,
} from "react-router-dom";

import PermissionMatrix from "../../components/access/PermissionMatrix";
import RoleBadge from "../../components/access/RoleBadge";

import {
  getAccessPermissions,
} from "../../config/accessPermissions";

import {
  useAccessStore,
} from "../../store/accessStore";

import {
  useAuthStore,
} from "../../store/authStore";

export default function RoleDetailPage() {
  const {
    roleId,
  } = useParams();

  const user =
    useAuthStore(
      (state) =>
        state.user,
    );

  const role =
    useAccessStore(
      (state) =>
        state.roles.find(
          (item) =>
            item.id === roleId,
        ),
    );

  if (!role) {
    return (
      <Navigate
        to="/access/roles"
        replace
      />
    );
  }

  if (!user) {
    return null;
  }

  const permissions =
    getAccessPermissions(
      user.role,
    );

  return (
    <div>
      <Link
        to="/access/roles"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-safari-600"
      >
        <ArrowLeft size={16} />
        Roles
      </Link>

      <div className="mt-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-safari-50 text-safari-600 dark:bg-safari-500/10">
          <ShieldCheck
            size={20}
          />
        </div>

        <h1 className="mt-4 text-3xl font-bold text-slate-950 dark:text-white">
          {role.name}
        </h1>

        <div className="mt-3">
          <RoleBadge
            role={role.role}
          />
        </div>

        <p className="mt-4 max-w-2xl text-sm text-slate-500">
          {role.description}
        </p>
      </div>

      <div className="mt-6">
        <PermissionMatrix
          role={role}
          canEdit={
            permissions.editPermissions &&
            role.role !==
              "super_admin"
          }
        />
      </div>
    </div>
  );
}