import {
  ChevronRight,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import type {
  FinanceTransaction,
} from "../../types/finance";

import TransactionStatusBadge from "./TransactionStatusBadge";

export default function TransactionTable({
  transactions,
}: {
  transactions:
    FinanceTransaction[];
}) {
  return (
    <div className="safari-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-slate-100 bg-slate-50/70 dark:border-white/[0.06] dark:bg-white/[0.02]">
            <tr>
              {[
                "Transaction",
                "Module",
                "Reference",
                "Customer",
                "Partner",
                "Gross",
                "Commission",
                "Status",
                "",
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
            {(transactions ?? []).map(
              (transaction) => {
                const symbol =
                  transaction.currency ===
                  "PKR"
                    ? "Rs "
                    : "Rs ";

                return (
                  <tr
                    key={
                      transaction.id
                    }
                    className="border-b border-slate-100 last:border-0 dark:border-white/[0.05]"
                  >
                    <td className="px-5 py-4">
                      <div className="font-semibold text-slate-900 dark:text-white">
                        {
                          transaction.id
                        }
                      </div>

                      <div className="mt-1 text-xs text-slate-400">
                        {new Date(
                          transaction.createdAt,
                        ).toLocaleString()}
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm font-semibold capitalize text-safari-600 dark:text-safari-400">
                      {
                        transaction.module
                      }
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-500">
                      {
                        transaction.referenceId
                      }
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-500">
                      {transaction.customerName ??
                        "-"}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-500">
                      {transaction.partnerName ??
                        "-"}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 font-semibold text-slate-900 dark:text-white">
                      {symbol}
                      {transaction.grossAmount.toLocaleString()}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">
                      {symbol}
                      {transaction.commissionAmount.toLocaleString()}
                    </td>

                    <td className="px-5 py-4">
                      <TransactionStatusBadge
                        status={
                          transaction.status
                        }
                      />
                    </td>

                    <td className="px-5 py-4">
                      <Link
                        to={`/finance/transactions/${transaction.id}`}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-safari-50 hover:text-safari-600 dark:hover:bg-safari-500/10"
                      >
                        <ChevronRight
                          size={17}
                        />
                      </Link>
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