import {
  useMemo,
  useState,
} from "react";

import PharmacyInventoryTable from "../../components/pharmacy/PharmacyInventoryTable";

import { getPharmacyPermissions } from "../../config/pharmacyPermissions";

import { useAuthStore } from "../../store/authStore";
import { usePharmacyStore } from "../../store/pharmacyStore";

export default function PharmacyInventoryPage() {
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

  const [
    lowStockOnly,
    setLowStockOnly,
  ] = useState(false);

  if (!user) {
    return null;
  }

  const permissions =
    getPharmacyPermissions(
      user.role,
    );

  const filtered =
    useMemo(() => {
      if (!lowStockOnly) {
        return products;
      }

      return (products ?? []).filter(
        (product) =>
          product.stock <=
          product.lowStockThreshold,
      );
    }, [
      products,
      lowStockOnly,
    ]);

  return (
    <div>
      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-sm font-semibold text-safari-600 dark:text-safari-400">
            Safari Pharmacy
          </div>

          <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
            Inventory
          </h1>
        </div>

        <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
          <input
            type="checkbox"
            checked={
              lowStockOnly
            }
            onChange={(
              event,
            ) =>
              setLowStockOnly(
                event.target
                  .checked,
              )
            }
          />

          Low stock only
        </label>
      </div>

      <PharmacyInventoryTable
        products={filtered}
        canManage={
          permissions.manageInventory
        }
      />
    </div>
  );
}