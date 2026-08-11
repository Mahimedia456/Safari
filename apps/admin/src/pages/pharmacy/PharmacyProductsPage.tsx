import PharmacyProductTable from "../../components/pharmacy/PharmacyProductTable";

import { getPharmacyPermissions } from "../../config/pharmacyPermissions";

import { useAuthStore } from "../../store/authStore";
import { usePharmacyStore } from "../../store/pharmacyStore";

export default function PharmacyProductsPage() {
  const user =
    useAuthStore(
      (state) =>
        state.user,
    );

  const products =
    usePharmacyStore(
      (state) =>
        state.products,
    );

  if (!user) {
    return null;
  }

  const permissions =
    getPharmacyPermissions(
      user.role,
    );

  return (
    <div>
      <div className="mb-7">
        <div className="text-sm font-semibold text-safari-600 dark:text-safari-400">
          Safari Pharmacy
        </div>

        <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
          Medicines & Products
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Manage medicine catalogue,
          dosage, prescription rules,
          pricing and availability.
        </p>
      </div>

      <PharmacyProductTable
        products={products}
        canManage={
          permissions.manageProducts
        }
      />
    </div>
  );
}