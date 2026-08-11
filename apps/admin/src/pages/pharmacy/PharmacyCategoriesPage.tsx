import { usePharmacyStore } from "../../store/pharmacyStore";
import { useAuthStore } from "../../store/authStore";

import { getPharmacyPermissions } from "../../config/pharmacyPermissions";

export default function PharmacyCategoriesPage() {
  const user =
    useAuthStore(
      (state) =>
        state.user,
    );

  const categories =
    usePharmacyStore(
      (state) =>
        state.categories,
    );

  const toggleCategory =
    usePharmacyStore(
      (state) =>
        state.toggleCategory,
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
          Categories
        </h1>
      </div>

      <div className="safari-card overflow-hidden">
        <table className="w-full">
          <thead className="border-b border-slate-100 bg-slate-50/70 dark:border-white/[0.06] dark:bg-white/[0.02]">
            <tr>
              <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Category
              </th>

              <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Sort
              </th>

              <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {categories.map(
              (category) => (
                <tr
                  key={
                    category.id
                  }
                  className="border-b border-slate-100 last:border-0 dark:border-white/[0.05]"
                >
                  <td className="px-5 py-4 font-semibold text-slate-900 dark:text-white">
                    {
                      category.name
                    }
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {
                      category.sortOrder
                    }
                  </td>

                  <td className="px-5 py-4">
                    <button
                      type="button"
                      disabled={
                        !permissions.manageCategories
                      }
                      onClick={() =>
                        toggleCategory(
                          category.id,
                        )
                      }
                      className={[
                        "rounded-full px-3 py-1 text-xs font-semibold",

                        category.active
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                          : "bg-slate-100 text-slate-500 dark:bg-white/[0.06]",
                      ].join(" ")}
                    >
                      {category.active
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
    </div>
  );
}