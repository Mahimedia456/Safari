import type {
  WalletLedgerEntry,
} from "../../types/finance";

export default function WalletLedgerTable({
  entries,
}: {
  entries:
    WalletLedgerEntry[];
}) {
  return (
    <div className="safari-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-slate-100 bg-slate-50/70 dark:border-white/[0.06] dark:bg-white/[0.02]">
            <tr>
              {[
                "Entry",
                "Owner",
                "Type",
                "Description",
                "Direction",
                "Amount",
                "Balance After",
                "Date",
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
            {entries.map(
              (entry) => {
                const symbol =
                  entry.currency ===
                  "EUR"
                    ? "€"
                    : "Rs ";

                return (
                  <tr
                    key={entry.id}
                    className="border-b border-slate-100 last:border-0 dark:border-white/[0.05]"
                  >
                    <td className="px-5 py-4 font-semibold text-slate-900 dark:text-white">
                      {entry.id}
                    </td>

                    <td className="px-5 py-4">
                      <div className="font-semibold text-slate-800 dark:text-slate-200">
                        {
                          entry.ownerName
                        }
                      </div>

                      <div className="mt-1 text-xs text-slate-400">
                        {entry.ownerId}
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm capitalize text-slate-500">
                      {
                        entry.ownerType
                      }
                    </td>

                    <td className="max-w-xs px-5 py-4 text-sm text-slate-500">
                      {
                        entry.description
                      }
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={
                          entry.direction ===
                          "credit"
                            ? "font-semibold text-emerald-600 dark:text-emerald-400"
                            : "font-semibold text-red-600 dark:text-red-400"
                        }
                      >
                        {
                          entry.direction
                        }
                      </span>
                    </td>

                    <td className="px-5 py-4 font-semibold text-slate-800 dark:text-slate-200">
                      {symbol}
                      {entry.amount.toLocaleString()}
                    </td>

                    <td className="px-5 py-4 font-semibold text-slate-800 dark:text-slate-200">
                      {symbol}
                      {entry.balanceAfter.toLocaleString()}
                    </td>

                    <td className="px-5 py-4 text-xs text-slate-400">
                      {new Date(
                        entry.createdAt,
                      ).toLocaleString()}
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