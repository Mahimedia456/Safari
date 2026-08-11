import RoleTable from "../../components/access/RoleTable";

import {
  useAccessStore,
} from "../../store/accessStore";

export default function RolesPage() {
  const roles =
    useAccessStore(
      (state) =>
        state.roles,
    );

  return (
    <div>
      <div className="mb-7">
        <div className="text-sm font-semibold text-safari-600">
          Safari Access
        </div>

        <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
          Roles
        </h1>
      </div>

      <RoleTable roles={roles} />
    </div>
  );
}