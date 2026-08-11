import {
  useFinanceStore,
} from "../../store/financeStore";

import type {
  FinanceRefund,
  FinanceRefundStatus,
} from "../../types/finance";

const statuses: FinanceRefundStatus[] =
  [
    "pending",
    "approved",
    "rejected",
    "processed",
  ];

export default function FinanceRefundTable({
  refunds,
  canManage,
}: {
  refunds: FinanceRefund[];

  canManage: boolean;
}) {
  const setStatus =
    useFinanceStore(
      (state) =>
        state.setRefundStatus,
    );

  return (
    <div className="safari-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-slate-100 bg-slate-50/70 dark:border-white/[0.06] dark:bg-white/[0.02]">
            <tr>
              {[
                "Refund",
                "Module",
                "Reference",
                "Customer",
                "Amount",
                "Reason",
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
            {refunds.map(
              (refund) => {
                const symbol =
                  refund.currency ===
                  "EUR"
                    ? "€"
                    : "Rs ";

                return (
                  <tr
                    key={refund.id}
                    className="border-b border-slate-100 last:border-0 dark:border-white/[0.05]"
                  >
                    <td className="px-5 py-4 font-semibold text-slate-900 dark:text-white">
                      {refund.id}
                    </td>

                    <td className="px-5 py-4 text-sm font-semibold capitalize text-safari-600">
                      {refund.module}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-500">
                      {
                        refund.referenceId
                      }
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-500">
                      {
                        refund.customerName
                      }
                    </td>

                    <td className="px-5 py-4 font-bold text-slate-900 dark:text-white">
                      {symbol}
                      {refund.amount.toLocaleString()}
                    </td>

                    <td className="max-w-sm px-5 py-4 text-sm text-slate-500">
                      {refund.reason}
                    </td>

                    <td className="px-5 py-4">
                      {canManage ? (
                        <select
                          value={
                            refund.status
                          }
                          onChange={(
                            event,
                          ) =>
                            setStatus(
                              refund.id,
                              event.target
                                .value as FinanceRefundStatus,
                            )
                          }
                          className="safari-select"
                        >
                          {statuses.map(
                            (status) => (
                              <option
                                key={status}
                                value={status}
                              >
                                {status}
                              </option>
                            ),
                          )}
                        </select>
                      ) : (
                        <span className="text-sm capitalize text-slate-500">
                          {refund.status}
                        </span>
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