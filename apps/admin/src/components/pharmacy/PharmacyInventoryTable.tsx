import {
  Minus,
  Plus,
} from "lucide-react";

import {
  usePharmacyStore,
} from "../../store/pharmacyStore";

import type {
  PharmacyProduct,
} from "../../types/pharmacy";

export default function PharmacyInventoryTable({
  products,
  canManage,
}: {
  products: PharmacyProduct[];
  canManage: boolean;
}) {
  const updateStock =
    usePharmacyStore(
      (state) =>
        state.updateStock,
    );

  return (
    <div className="safari-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-slate-100 bg-slate-50/70 dark:border-white/[0.06] dark:bg-white/[0.02]">
            <tr>
              {[
                "Medicine",
                "SKU",
                "Stock",
                "Low Stock At",
                "Status",
                "Adjust",
              ].map(
                (label) => (
                  <th
                    key={label}
                    className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400"
                  >
                    {label}
                  </th>
                ),
              )}
            </tr>
          </thead>

          <tbody>
            {products.map(
              (product) => {
                const low =
                  product.stock <=
                  product.lowStockThreshold;

                return (
                  <tr
                    key={
                      product.id
                    }
                    className="border-b border-slate-100 last:border-0 dark:border-white/[0.05]"
                  >
                    <td className="px-5 py-4 font-semibold text-slate-900 dark:text-white">
                      {
                        product.name
                      }
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-500">
                      {product.sku}
                    </td>

                    <td
                      className={[
                        "px-5 py-4 font-semibold",

                        low
                          ? "text-red-600 dark:text-red-400"
                          : "text-slate-800 dark:text-slate-200",
                      ].join(" ")}
                    >
                      {product.stock}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-500">
                      {
                        product.lowStockThreshold
                      }
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={
                          low
                            ? "rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700 dark:bg-red-500/10 dark:text-red-400"
                            : "rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                        }
                      >
                        {low
                          ? "Low Stock"
                          : "Healthy"}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      {canManage && (
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              updateStock(
                                product.id,
                                product.stock -
                                  1,
                              )
                            }
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 dark:border-white/10"
                          >
                            <Minus
                              size={14}
                            />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              updateStock(
                                product.id,
                                product.stock +
                                  1,
                              )
                            }
                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-safari-600 text-white"
                          >
                            <Plus
                              size={14}
                            />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}