import RidePricingTable from "../../components/pricing/RidePricingTable";

import {
  getPricingPermissions,
} from "../../config/pricingPermissions";

import {
  useAuthStore,
} from "../../store/authStore";

export default function PakistanPricingPage() {
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
          Safari Pakistan
        </div>

        <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
          Pakistan Ride Pricing
        </h1>
      </div>

      <RidePricingTable
        region="Pakistan"
        canEdit={
          permissions.editFare
        }
      />
    </div>
  );
}