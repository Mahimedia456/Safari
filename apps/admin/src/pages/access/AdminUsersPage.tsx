import {
  Link,
} from "react-router-dom";

import AdminUserTable from "../../components/access/AdminUserTable";

import {
  useAccessStore,
} from "../../store/accessStore";

export default function AdminUsersPage() {
  const users =
    useAccessStore(
      (state) =>
        state.users,
    );

  return (
    <div>
      <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-sm font-semibold text-safari-600">
            Safari Administration
          </div>

          <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
            Admin Users
          </h1>
        </div>

        <Link
          to="/access/users/create"
          className="inline-flex h-11 items-center rounded-xl bg-safari-600 px-4 text-sm font-semibold text-white"
        >
          Create User
        </Link>
      </div>

      <AdminUserTable
        users={users}
      />
    </div>
  );
}