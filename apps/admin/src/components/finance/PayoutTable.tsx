import {
  useFinanceStore,
} from "../../store/financeStore";

import type {
  FinancePayout,
  PayoutStatus,
} from "../../types/finance";

import PayoutStatusBadge from "./PayoutStatusBadge";

type Props = {
  payouts: FinancePayout[];

  canManage: boolean;
};

const statuses: PayoutStatus[] = [
  "pending",
  "approved",
  "processing",
  "paid",
  "rejected",
];

export default function PayoutTable({
  payouts,
  canManage,
}: Props) {
  const setStatus =
    useFinanceStore(
      (state) =>
        state.setPayoutStatus,
    );

  return (
    <div className="safari-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-slate-100 bg-slate-50/70 dark:border-white/[0.06] dark:bg-white/[0.02]">
            <tr>
              {[
                "Payout",
                "Recipient",
                "Region",
                "Amount",
                "Bank",
                "Requested",
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
            {payouts.map(
              (payout) => {
                const symbol =
                  payout.currency ===
                  "EUR"
                    ? "€"
                    : "Rs ";

                return (
                  <tr
                    key={payout.id}
                    className="border-b border-slate-100 last:border-0 dark:border-white/[0.05]"
                  >
                    <td className="px-5 py-4 font-semibold text-slate-900 dark:text-white">
                      {payout.id}
                    </td>

                    <td className="px-5 py-4">
                      <div className="font-semibold text-slate-800 dark:text-slate-200">
                        {
                          payout.recipientName
                        }
                      </div>

                      <div className="mt-1 text-xs capitalize text-slate-400">
                        {
                          payout.recipientType
                        }
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-500">
                      {payout.region}
                    </td>

                    <td className="px-5 py-4 font-bold text-slate-900 dark:text-white">
                      {symbol}
                      {payout.amount.toLocaleString()}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-500">
                      {payout.bankName}
                      <br />
                      {
                        payout.accountMasked
                      }
                    </td>

                    <td className="px-5 py-4 text-xs text-slate-400">
                      {new Date(
                        payout.requestedAt,
                      ).toLocaleString()}
                    </td>

                    <td className="px-5 py-4">
                      {canManage ? (
                        <select
                          value={
                            payout.status
                          }
                          onChange={(
                            event,
                          ) =>
                            setStatus(
                              payout.id,
                              event.target
                                .value as PayoutStatus,
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
                        <PayoutStatusBadge
                          status={
                            payout.status
                          }
                        />
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