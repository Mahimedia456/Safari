import type {
  CommissionRecord,
} from "../../types/finance";

export default function CommissionTable({
  commissions,
}: {
  commissions:
    CommissionRecord[];
}) {
  return (
    <div className="safari-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-slate-100 bg-slate-50/70 dark:border-white/[0.06] dark:bg-white/[0.02]">
            <tr>
              {[
                "Partner",
                "Type",
                "Reference",
                "Gross",
                "Rate",
                "Safari",
                "Partner Net",
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
            {commissions.map(
              (record) => {
                const symbol =
                  record.currency ===
                  "EUR"
                    ? "€"
                    : "Rs ";

                return (
                  <tr
                    key={record.id}
                    className="border-b border-slate-100 last:border-0 dark:border-white/[0.05]"
                  >
                    <td className="px-5 py-4">
                      <div className="font-semibold text-slate-900 dark:text-white">
                        {
                          record.partnerName
                        }
                      </div>

                      <div className="mt-1 text-xs text-slate-400">
                        {
                          record.partnerId
                        }
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm capitalize text-slate-500">
                      {record.partnerType.replaceAll(
                        "_",
                        " ",
                      )}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-500">
                      {
                        record.referenceId
                      }
                    </td>

                    <td className="px-5 py-4 font-semibold text-slate-800 dark:text-slate-200">
                      {symbol}
                      {record.grossAmount.toLocaleString()}
                    </td>

                    <td className="px-5 py-4 font-semibold text-safari-600">
                      {
                        record.commissionPercent
                      }
                      %
                    </td>

                    <td className="px-5 py-4 font-semibold text-slate-800 dark:text-slate-200">
                      {symbol}
                      {record.commissionAmount.toLocaleString()}
                    </td>

                    <td className="px-5 py-4 font-semibold text-emerald-600 dark:text-emerald-400">
                      {symbol}
                      {record.partnerNetAmount.toLocaleString()}
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