import {
  usePharmacyStore,
} from "../../store/pharmacyStore";

import type {
  PharmacyProduct,
} from "../../types/pharmacy";

export default function PharmacyProductTable({
  products,
  canManage,
}: {
  products: PharmacyProduct[];
  canManage: boolean;
}) {
  const toggleAvailability =
    usePharmacyStore(
      (state) =>
        state.toggleProductAvailability,
    );

  return (
    <div className="safari-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-slate-100 bg-slate-50/70 dark:border-white/[0.06] dark:bg-white/[0.02]">
            <tr>
              {[
                "Medicine",
                "Generic",
                "Dosage",
                "Pack",
                "Price",
                "Stock",
                "Prescription",
                "Status",
              ].map(
                (label) => (
                  <th
                    key={label}
                    className="whitespace-nowrap px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400"
                  >
                    {label}
                  </th>
                ),
              )}
            </tr>
          </thead>

          <tbody>
            {(products ?? []).map(
              (product) => (
                <tr
                  key={
                    product.id
                  }
                  className="border-b border-slate-100 last:border-0 dark:border-white/[0.05]"
                >
                  <td className="px-5 py-4">
                    <div className="font-semibold text-slate-900 dark:text-white">
                      {
                        product.name
                      }
                    </div>

                    <div className="mt-1 text-xs text-slate-400">
                      {product.sku}
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {product.genericName ??
                      "-"}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {product.dosage ??
                      "-"}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {
                      product.packSize
                    }
                  </td>

                  <td className="px-5 py-4 font-semibold text-slate-800 dark:text-slate-200">
                    Rs{" "}
                    {product.price.toLocaleString()}
                  </td>

                  <td
                    className={[
                      "px-5 py-4 font-semibold",

                      product.stock <=
                      product.lowStockThreshold
                        ? "text-red-600 dark:text-red-400"
                        : "text-slate-700 dark:text-slate-300",
                    ].join(" ")}
                  >
                    {product.stock}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={[
                        "rounded-full px-2.5 py-1 text-xs font-semibold",

                        product.prescriptionRequired
                          ? "bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400"
                          : "bg-slate-100 text-slate-500 dark:bg-white/[0.06]",
                      ].join(" ")}
                    >
                      {product.prescriptionRequired
                        ? "Required"
                        : "No"}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <button
                      type="button"
                      disabled={
                        !canManage
                      }
                      onClick={() =>
                        toggleAvailability(
                          product.id,
                        )
                      }
                      className={[
                        "rounded-full px-3 py-1 text-xs font-semibold",

                        product.available
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                          : "bg-slate-100 text-slate-500 dark:bg-white/[0.06]",
                      ].join(" ")}
                    >
                      {product.available
                        ? "Available"
                        : "Unavailable"}
                    </button>
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}