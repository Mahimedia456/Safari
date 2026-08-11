import SurgeSettingsPanel from "../../components/pricing/SurgeSettingsPanel";

import {
  getPricingPermissions,
} from "../../config/pricingPermissions";

import {
  useAuthStore,
} from "../../store/authStore";

export default function SurgePricingPage() {
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
          Dynamic Pricing
        </div>

        <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
          Surge Pricing
        </h1>
      </div>

      <div className="space-y-6">
        <SurgeSettingsPanel
          region="Pakistan"
          canEdit={
            permissions.editSurge
          }
        />

        <SurgeSettingsPanel
          region="Germany"
          canEdit={
            permissions.editSurge
          }
        />
      </div>
    </div>
  );
}