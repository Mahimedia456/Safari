import RidePricingTable from "../../components/pricing/RidePricingTable";

import {
  getPricingPermissions,
} from "../../config/pricingPermissions";

import {
  useAuthStore,
} from "../../store/authStore";

export default function GermanyPricingPage() {
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
          Safari Germany
        </div>

        <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
          Germany Ride Pricing
        </h1>
      </div>

      <RidePricingTable
        region="Germany"
        canEdit={
          permissions.editFare
        }
      />
    </div>
  );
}