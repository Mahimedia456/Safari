import {
  useGroceryStore,
} from "../../store/groceryStore";

import type {
  GroceryBrand,
} from "../../types/grocery";

export default function GroceryBrandTable({
  brands,
  canManage,
}: {
  brands: GroceryBrand[];
  canManage: boolean;
}) {
  const toggleBrand =
    useGroceryStore(
      (state) =>
        state.toggleBrand,
    );

  return (
    <div className="safari-card overflow-hidden">
      <table className="w-full">
        <thead className="border-b border-slate-100 bg-slate-50/70 dark:border-white/[0.06] dark:bg-white/[0.02]">
          <tr>
            <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Brand
            </th>

            <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {brands.map(
            (brand) => (
              <tr
                key={
                  brand.id
                }
                className="border-b border-slate-100 last:border-0 dark:border-white/[0.05]"
              >
                <td className="px-5 py-4 font-semibold text-slate-900 dark:text-white">
                  {brand.name}
                </td>

                <td className="px-5 py-4">
                  <button
                    type="button"
                    disabled={
                      !canManage
                    }
                    onClick={() =>
                      toggleBrand(
                        brand.id,
                      )
                    }
                    className={[
                      "rounded-full px-3 py-1 text-xs font-semibold",

                      brand.active
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                        : "bg-slate-100 text-slate-500 dark:bg-white/[0.06]",
                    ].join(
                      " ",
                    )}
                  >
                    {brand.active
                      ? "Active"
                      : "Inactive"}
                  </button>
                </td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  );
}