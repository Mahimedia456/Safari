import {
  useFinanceStore,
} from "../../store/financeStore";

import type {
  SettlementRecord,
} from "../../types/finance";

export default function SettlementTable({
  settlements,
  canManage,
}: {
  settlements:
    SettlementRecord[];

  canManage: boolean;
}) {
  const toggle =
    useFinanceStore(
      (state) =>
        state.toggleSettlement,
    );

  return (
    <div className="safari-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-slate-100 bg-slate-50/70 dark:border-white/[0.06] dark:bg-white/[0.02]">
            <tr>
              {[
                "Settlement",
                "Period",
                "Region",
                "Partner Type",
                "Gross",
                "Commission",
                "Refunds",
                "Payout",
                "Status",
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
            {settlements.map(
              (settlement) => {
                const symbol =
                  settlement.currency ===
                  "EUR"
                    ? "€"
                    : "Rs ";

                return (
                  <tr
                    key={
                      settlement.id
                    }
                    className="border-b border-slate-100 last:border-0 dark:border-white/[0.05]"
                  >
                    <td className="px-5 py-4 font-semibold text-slate-900 dark:text-white">
                      {
                        settlement.id
                      }
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-500">
                      {
                        settlement.period
                      }
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-500">
                      {
                        settlement.region
                      }
                    </td>

                    <td className="px-5 py-4 text-sm capitalize text-slate-500">
                      {
                        settlement.partnerType
                      }
                    </td>

                    <td className="px-5 py-4 font-semibold text-slate-800 dark:text-slate-200">
                      {symbol}
                      {settlement.grossVolume.toLocaleString()}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-500">
                      {symbol}
                      {settlement.commission.toLocaleString()}
                    </td>

                    <td className="px-5 py-4 text-sm text-red-500">
                      {symbol}
                      {settlement.refunds.toLocaleString()}
                    </td>

                    <td className="px-5 py-4 font-semibold text-emerald-600">
                      {symbol}
                      {settlement.payoutAmount.toLocaleString()}
                    </td>

                    <td className="px-5 py-4">
                      <button
                        type="button"
                        disabled={
                          !canManage
                        }
                        onClick={() =>
                          toggle(
                            settlement.id,
                          )
                        }
                        className={[
                          "rounded-full px-3 py-1 text-xs font-semibold",

                          settlement.status ===
                          "closed"
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                            : "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
                        ].join(" ")}
                      >
                        {
                          settlement.status
                        }
                      </button>
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