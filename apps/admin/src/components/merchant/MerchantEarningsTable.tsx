import type {
  MerchantEarningEntry,
} from "../../types/merchantPortal";

export default function MerchantEarningsTable({
  entries,
}: {
  entries:
    MerchantEarningEntry[];
}) {
  return (
    <div className="safari-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-slate-100 bg-slate-50/70 dark:border-white/[0.06] dark:bg-white/[0.02]">
            <tr>
              {[
                "Reference",
                "Gross",
                "Commission",
                "Refund",
                "Net Earnings",
                "Status",
                "Date",
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
            {entries.map(
              (entry) => {
                const symbol =
                  entry.currency ===
                  "PKR"
                    ? "Rs "
                    : "Rs ";

                return (
                  <tr
                    key={entry.id}
                    className="border-b border-slate-100 last:border-0 dark:border-white/[0.05]"
                  >
                    <td className="px-5 py-4">
                      <div className="font-semibold text-slate-900 dark:text-white">
                        {
                          entry.referenceId
                        }
                      </div>

                      <div className="mt-1 text-xs text-slate-400">
                        {entry.id}
                      </div>
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 font-semibold text-slate-900 dark:text-white">
                      {symbol}
                      {entry.grossAmount.toLocaleString()}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-slate-500">
                      {entry.commissionPercent}%
                      <div className="mt-1 text-xs text-slate-400">
                        {symbol}
                        {entry.commissionAmount.toLocaleString()}
                      </div>
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-red-500">
                      {symbol}
                      {entry.refundAmount.toLocaleString()}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 font-bold text-emerald-600 dark:text-emerald-400">
                      {symbol}
                      {entry.netAmount.toLocaleString()}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={[
                          "rounded-full px-2.5 py-1 text-xs font-semibold capitalize",

                          entry.status ===
                          "settled"
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                            : "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
                        ].join(" ")}
                      >
                        {entry.status}
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-xs text-slate-400">
                      {new Date(
                        entry.createdAt,
                      ).toLocaleString()}
                    </td>
                  </tr>
                );
              },
            )}

            {entries.length ===
              0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-5 py-14 text-center text-sm text-slate-400"
                >
                  No earnings
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