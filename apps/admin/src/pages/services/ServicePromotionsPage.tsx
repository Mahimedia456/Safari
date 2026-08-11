import ServicePromotionTable from "../../components/services/ServicePromotionTable";

import { getServicesPermissions } from "../../config/servicesPermissions";

import { useAuthStore } from "../../store/authStore";
import { useServicesStore } from "../../store/servicesStore";

export default function ServicePromotionsPage() {
  const user = useAuthStore(
    (state) => state.user,
  );

  const promotions =
    useServicesStore(
      (state) =>
        state.promotions,
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

        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
          Promotions
        </h1>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Control promotional offers for
          service businesses.
        </p>
      </div>

      <ServicePromotionTable
        promotions={
          promotions
        }
        canManage={
          permissions.managePromotions
        }
      />
    </div>
  );
}