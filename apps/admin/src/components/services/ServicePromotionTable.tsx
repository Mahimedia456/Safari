import {
  BadgePercent,
} from "lucide-react";

import { useServicesStore } from "../../store/servicesStore";

import type {
  ServicePromotion,
} from "../../types/services";

type Props = {
  promotions:
    ServicePromotion[];

  canManage: boolean;
};

export default function ServicePromotionTable({
  promotions,
  canManage,
}: Props) {
  const togglePromotion =
    useServicesStore(
      (state) =>
        state.togglePromotion,
    );

  return (
    <div className="safari-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-slate-100 bg-slate-50/70 dark:border-white/[0.06] dark:bg-white/[0.02]">
            <tr>
              {[
                "Promotion",
                "Code",
                "Discount",
                "Start",
                "End",
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
            {(promotions ?? []).map(
              (promotion) => (
                <tr
                  key={
                    promotion.id
                  }
                  className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 dark:border-white/[0.05] dark:hover:bg-white/[0.02]"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-safari-50 text-safari-600 dark:bg-safari-500/10 dark:text-safari-400">
                        <BadgePercent
                          size={16}
                        />
                      </div>

                      <div className="font-semibold text-slate-900 dark:text-white">
                        {
                          promotion.title
                        }
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <span className="rounded-lg bg-slate-100 px-2.5 py-1 font-mono text-xs font-semibold text-slate-600 dark:bg-white/[0.06] dark:text-slate-300">
                      {
                        promotion.code
                      }
                    </span>
                  </td>

                  <td className="px-5 py-4 font-semibold text-safari-600 dark:text-safari-400">
                    {promotion.discountType ===
                    "percentage"
                      ? `${promotion.discountValue}%`
                      : `Rs ${promotion.discountValue.toLocaleString()}`}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {
                      promotion.startDate
                    }
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
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
                        "rounded-full px-3 py-1 text-xs font-semibold transition",

                        promotion.active
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                          : "bg-slate-100 text-slate-500 dark:bg-white/[0.06] dark:text-slate-400",

                        !canManage
                          ? "cursor-default opacity-70"
                          : "",
                      ].join(" ")}
                    >
                      {promotion.active
                        ? "Active"
                        : "Inactive"}
                    </button>
                  </td>
                </tr>
              ),
            )}

            {promotions.length ===
              0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-14 text-center text-sm text-slate-400"
                >
                  No promotions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}