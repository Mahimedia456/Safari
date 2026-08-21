import DriverCommissionPanel from "../../components/pricing/DriverCommissionPanel";

import {
  getPricingPermissions,
} from "../../config/pricingPermissions";

import {
  useAuthStore,
} from "../../store/authStore";

export default function DriverCommissionPage() {
  const user =
    useAuthStore(
      (state) =>
        state.user,
    );

  if (!user) {
    return null;
  }

  const permissions =
    getPricingPermissions(
      user.role,
    );

  return (
    <div>
      <div className="mb-7">
        <div className="text-sm font-semibold text-safari-600">
          Safari Drivers
        </div>

        <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
          Driver Commission
        </h1>
      </div>

      <div className="space-y-6">
        <DriverCommissionPanel
          region="Pakistan"
          canEdit={
            permissions.editCommission
          }
        />

        <DriverCommissionPanel
          region="Pakistan"
          canEdit={
            permissions.editCommission
          }
        />
      </div>
    </div>
  );
}