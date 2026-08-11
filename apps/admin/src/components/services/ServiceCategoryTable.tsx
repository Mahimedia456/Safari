import {
  useServicesStore,
} from "../../store/servicesStore";

import type {
  ServiceCategory,
} from "../../types/services";

type Props = {
  categories:
    ServiceCategory[];

  canManage: boolean;
};

export default function ServiceCategoryTable({
  categories,
  canManage,
}: Props) {
  const toggleCategory =
    useServicesStore(
      (state) =>
        state.toggleCategory,
    );

  return (
    <div className="safari-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-slate-100 bg-slate-50/70 dark:border-white/[0.06] dark:bg-white/[0.02]">
            <tr>
              <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Category
              </th>

              <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Sort Order
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
                  <td className="px-5 py-4">
                    <div className="font-semibold text-slate-900 dark:text-white">
                      {
                        category.name
                      }
                    </div>

                    <div className="mt-1 text-xs text-slate-400">
                      {category.id}
                    </div>
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
                        !canManage
                      }
                      onClick={() =>
                        toggleCategory(
                          category.id,
                        )
                      }
                      className={[
                        "rounded-full px-3 py-1 text-xs font-semibold transition",

                        category.active
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                          : "bg-slate-100 text-slate-500 dark:bg-white/[0.06] dark:text-slate-400",

                        !canManage
                          ? "cursor-default opacity-70"
                          : "",
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

            {categories.length ===
              0 && (
              <tr>
                <td
                  colSpan={3}
                  className="px-5 py-14 text-center text-sm text-slate-400"
                >
                  No service categories
                  found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}