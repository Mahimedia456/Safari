import type {
  RewardLedgerEntry,
} from "../../types/rewards";

type Props = {
  entries:
    RewardLedgerEntry[];
};

export default function RewardLedgerTable({
  entries,
}: Props) {
  return (
    <div className="safari-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-slate-100 bg-slate-50/70 dark:border-white/[0.06] dark:bg-white/[0.02]">
            <tr>
              {[
                "Entry",
                "Passenger",
                "Type",
                "Points",
                "Description",
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
              (entry) => (
                <tr
                  key={entry.id}
                  className="border-b border-slate-100 last:border-0 dark:border-white/[0.05]"
                >
                  <td className="whitespace-nowrap px-5 py-4 font-semibold text-slate-900 dark:text-white">
                    {entry.id}
                  </td>

                  <td className="px-5 py-4">
                    <div className="font-semibold text-slate-800 dark:text-slate-200">
                      {entry.passengerName}
                    </div>

                    <div className="mt-1 text-xs text-slate-400">
                      {entry.passengerId}
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold capitalize text-slate-600 dark:bg-white/[0.06] dark:text-slate-300">
                      {String(
                        entry.type,
                      ).replaceAll(
                        "_",
                        " ",
                      )}
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-5 py-4">
                    <span
                      className={[
                        "font-bold",

                        entry.points >= 0
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-red-600 dark:text-red-400",
                      ].join(" ")}
                    >
                      {entry.points > 0
                        ? "+"
                        : ""}

                      {entry.points.toLocaleString()}
                    </span>
                  </td>

                  <td className="max-w-md px-5 py-4 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {entry.description}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-xs text-slate-400">
                    {new Date(
                      entry.createdAt,
                    ).toLocaleString()}
                  </td>
                </tr>
              ),
            )}

            {entries.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-14 text-center text-sm text-slate-400"
                >
                  No reward ledger entries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}