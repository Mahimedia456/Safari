import {
  useFoodStore,
} from "../../store/foodStore";

import type {
  FoodCategory,
} from "../../types/food";

export default function FoodCategoryTable({
  categories,
  canManage,
}: {
  categories: FoodCategory[];
  canManage: boolean;
}) {
  const toggleCategory =
    useFoodStore(
      (state) =>
        state.toggleCategory,
    );

  return (
    <div className="safari-card overflow-hidden">
      <table className="w-full">
        <thead
          className="
            border-b
            border-slate-100
            bg-slate-50/70
            dark:border-white/[0.06]
            dark:bg-white/[0.02]
          "
        >
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
          {(categories ?? []).map(
            (category) => (
              <tr
                key={
                  category.id
                }
                className="
                  border-b
                  border-slate-100
                  last:border-0
                  dark:border-white/[0.05]
                "
              >
                <td
                  className="
                    px-5 py-4
                    font-semibold
                    text-slate-900
                    dark:text-white
                  "
                >
                  {category.name}
                </td>

                <td
                  className="
                    px-5 py-4
                    text-sm
                    text-slate-500
                  "
                >
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
                      "rounded-full px-3 py-1 text-xs font-semibold",

                      category.active
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                        : "bg-slate-100 text-slate-500 dark:bg-white/[0.06]",
                    ].join(
                      " ",
                    )}
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
  );
}