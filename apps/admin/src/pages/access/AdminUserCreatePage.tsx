import {
  Navigate,
  useNavigate,
} from "react-router-dom";

import AdminUserForm from "../../components/access/AdminUserForm";

import {
  getAccessPermissions,
} from "../../config/accessPermissions";

import {
  useAccessStore,
} from "../../store/accessStore";

import {
  useAuthStore,
} from "../../store/authStore";

export default function AdminUserCreatePage() {
  const navigate =
    useNavigate();

  const user =
    useAuthStore(
      (state) =>
        state.user,
    );

  const createUser =
    useAccessStore(
      (state) =>
        state.createAdminUser,
    );

  if (!user) {
    return null;
  }

  const permissions =
    getAccessPermissions(
      user.role,
    );

  if (
    !permissions.createAdminUsers
  ) {
    return (
      <Navigate
        to="/access-denied"
        replace
      />
    );
  }

  return (
    <div>
      <div className="mb-7">
        <div className="text-sm font-semibold text-safari-600">
          Safari Administration
        </div>

        <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
          Create Admin User
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Create an internal Safari
          operator account and assign
          its role and region scope.
        </p>
      </div>

      <AdminUserForm
        onSubmit={(
          values,
        ) => {
          const created =
            createUser(
              values,
            );

          navigate(
            `/access/users/${created.id}`,
          );
        }}
      />
    </div>
  );
}