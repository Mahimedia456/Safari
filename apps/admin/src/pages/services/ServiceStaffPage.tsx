import ServiceStaffTable from "../../components/services/ServiceStaffTable";

import { getServicesPermissions } from "../../config/servicesPermissions";

import { useAuthStore } from "../../store/authStore";
import { useServicesStore } from "../../store/servicesStore";

export default function ServiceStaffPage() {
  const user =
    useAuthStore(
      (state) =>
        state.user,
    );

  const staff =
    useServicesStore(
      (state) =>
        state.staff,
    );

  if (!user) {
    return null;
  }

  const permissions =
    getServicesPermissions(
      user.role,
    );

  return (
    <div>
      <div className="mb-7">
        <div className="text-sm font-semibold text-safari-600 dark:text-safari-400">
          Safari Services
        </div>

        <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
          Staff
        </h1>
      </div>

      <ServiceStaffTable
        staff={staff}
        canManage={
          permissions.manageStaff
        }
      />
    </div>
  );
}