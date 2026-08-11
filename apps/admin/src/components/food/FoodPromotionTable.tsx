import {
  useFoodStore,
} from "../../store/foodStore";

import type {
  FoodPromotion,
} from "../../types/food";

export default function FoodPromotionTable({
  promotions,
  canManage,
}: {
  promotions: FoodPromotion[];
  canManage: boolean;
}) {
  const togglePromotion =
    useFoodStore(
      (state) =>
        state.togglePromotion,
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
                "Promotion",
                "Code",
                "Discount",
                "Period",
                "Status",
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
            {promotions.map(
              (
                promotion,
              ) => (
                <tr
                  key={
                    promotion.id
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
                    {
                      promotion.title
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
                      promotion.code
                    }
                  </td>

                  <td
                    className="
                      px-5 py-4
                      text-sm
                      font-semibold
                      text-safari-600
                      dark:text-safari-400
                    "
                  >
                    {promotion.discountType ===
                    "percentage"
                      ? `${promotion.discountValue}%`
                      : `Rs ${promotion.discountValue}`}
                  </td>

                  <td
                    className="
                      px-5 py-4
                      text-xs
                      text-slate-400
                    "
                  >
                    {
                      promotion.startDate
                    }{" "}
                    →{" "}
                    {
                      promotion.endDate
                    }
                  </td>

                  <td className="px-5 py-4">
                    <button
                      type="button"
                      disabled={
                        !canManage
                      }
                      onClick={() =>
                        togglePromotion(
                          promotion.id,
                        )
                      }
                      className={[
                        "rounded-full px-3 py-1 text-xs font-semibold",

                        promotion.active
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                          : "bg-slate-100 text-slate-500 dark:bg-white/[0.06]",
                      ].join(
                        " ",
                      )}
                    >
                      {promotion.active
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