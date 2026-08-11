import {
  useFoodStore,
} from "../../store/foodStore";

import type {
  FoodMenuItem,
} from "../../types/food";

export default function FoodMenuTable({
  items,
  canManage,
}: {
  items: FoodMenuItem[];
  canManage: boolean;
}) {
  const toggleAvailability =
    useFoodStore(
      (state) =>
        state.toggleMenuAvailability,
    );

  return (
    <div className="safari-card overflow-hidden">
      <div className="overflow-x-auto">
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
              {[
                "Item",
                "Price",
                "Preparation",
                "Add-ons",
                "Variants",
                "Available",
              ].map(
                (label) => (
                  <th
                    key={
                      label
                    }
                    className="
                      px-5 py-4
                      text-left
                      text-[11px]
                      font-bold
                      uppercase
                      tracking-wider
                      text-slate-400
                    "
                  >
                    {label}
                  </th>
                ),
              )}
            </tr>
          </thead>

          <tbody>
            {items.map(
              (item) => (
                <tr
                  key={
                    item.id
                  }
                  className="
                    border-b
                    border-slate-100
                    last:border-0
                    dark:border-white/[0.05]
                  "
                >
                  <td className="px-5 py-4">
                    <div
                      className="
                        font-semibold
                        text-slate-900
                        dark:text-white
                      "
                    >
                      {item.name}
                    </div>

                    <div
                      className="
                        mt-1
                        max-w-md
                        text-xs
                        text-slate-400
                      "
                    >
                      {
                        item.description
                      }
                    </div>
                  </td>

                  <td
                    className="
                      px-5 py-4
                      font-semibold
                      text-slate-800
                      dark:text-slate-200
                    "
                  >
                    Rs{" "}
                    {item.price}
                  </td>

                  <td
                    className="
                      px-5 py-4
                      text-sm
                      text-slate-500
                    "
                  >
                    {
                      item.preparationMinutes
                    }{" "}
                    min
                  </td>

                  <td
                    className="
                      px-5 py-4
                      text-sm
                      text-slate-500
                    "
                  >
                    {
                      item.addons.length
                    }
                  </td>

                  <td
                    className="
                      px-5 py-4
                      text-sm
                      text-slate-500
                    "
                  >
                    {
                      item.variants.length
                    }
                  </td>

                  <td className="px-5 py-4">
                    <button
                      type="button"
                      disabled={
                        !canManage
                      }
                      onClick={() =>
                        toggleAvailability(
                          item.id,
                        )
                      }
                      className={[
                        "rounded-full px-3 py-1 text-xs font-semibold transition",

                        item.available
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                          : "bg-slate-100 text-slate-500 dark:bg-white/[0.06]",

                        !canManage
                          ? "cursor-default"
                          : "",
                      ].join(
                        " ",
                      )}
                    >
                      {item.available
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