import type {
  MerchantPayoutEntry,
} from "../../types/merchantPortal";

export default function MerchantPayoutTable({
  payouts,
}: {
  payouts:
    MerchantPayoutEntry[];
}) {
  return (
    <div className="safari-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-slate-100 bg-slate-50/70 dark:border-white/[0.06] dark:bg-white/[0.02]">
            <tr>
              {[
                "Payout",
                "Amount",
                "Bank",
                "Account",
                "Requested",
                "Processed",
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

                    <td className="whitespace-nowrap px-5 py-4 font-bold text-slate-900 dark:text-white">
                      {symbol}
                      {payout.amount.toLocaleString()}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-500">
                      {payout.bankName}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">
                      {
                        payout.accountMasked
                      }
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-xs text-slate-400">
                      {new Date(
                        payout.requestedAt,
                      ).toLocaleString()}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-xs text-slate-400">
                      {payout.processedAt
                        ? new Date(
                            payout.processedAt,
                          ).toLocaleString()
                        : "-"}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={[
                          "rounded-full px-2.5 py-1 text-xs font-semibold capitalize",

                          payout.status ===
                          "paid"
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                            : payout.status ===
                                "rejected"
                              ? "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                              : "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
                        ].join(" ")}
                      >
                        {
                          payout.status
                        }
                      </span>
                    </td>
                  </tr>
                );
              },
            )}

            {payouts.length ===
              0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-5 py-14 text-center text-sm text-slate-400"
                >
                  No payout history
                  available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}