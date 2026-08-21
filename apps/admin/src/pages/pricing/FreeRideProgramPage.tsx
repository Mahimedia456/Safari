import FreeRideProgramPanel from "../../components/pricing/FreeRideProgramPanel";

import {
  getPricingPermissions,
} from "../../config/pricingPermissions";

import {
  useAuthStore,
} from "../../store/authStore";

export default function FreeRideProgramPage() {
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
          Driver Incentives
        </div>

        <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
          Monthly Free Ride Program
        </h1>
      </div>

      <div className="space-y-6">
        <FreeRideProgramPanel
          region="Pakistan"
          canEdit={
            permissions.editFreeRideProgram
          }
        />

        <FreeRideProgramPanel
          region="Pakistan"
          canEdit={
            permissions.editFreeRideProgram
          }
        />
      </div>
    </div>
  );
}