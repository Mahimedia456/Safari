import type {
  FinanceModule,
  FinanceTransaction,
} from "../../types/finance";

const modules: FinanceModule[] = [
  "ride",
  "food",
  "grocery",
  "pharmacy",
  "services",
  "wallet",
];

export default function RevenueBreakdown({
  transactions,
}: {
  transactions:
    FinanceTransaction[];
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Market
        title="Pakistan"
        symbol="Rs "
        transactions={(transactions ?? []).filter(
          (item) =>
            item.region ===
            "Pakistan",
        )}
      />

      <Market
        title="Pakistan"
        symbol="Rs "
        transactions={(transactions ?? []).filter(
          (item) =>
            item.region ===
            "Pakistan",
        )}
      />
    </div>
  );
}

function Market({
  title,
  symbol,
  transactions,
}: {
  title: string;

  symbol: string;

  transactions:
    FinanceTransaction[];
}) {
  return (
    <section className="safari-card p-6">
      <h2 className="text-lg font-bold text-slate-950 dark:text-white">
        {title}
      </h2>

      <div className="mt-5 space-y-3">
        {modules.map(
          (module) => {
            const rows =
              (transactions ?? []).filter(
                (item) =>
                  item.module ===
                    module &&
                  item.status ===
                    "completed",
              );

            const volume =
              rows.reduce(
                (sum, item) =>
                  sum +
                  item.grossAmount,
                0,
              );

            const commission =
              rows.reduce(
                (sum, item) =>
                  sum +
                  item.commissionAmount,
                0,
              );

            return (
              <div
                key={module}
                className="rounded-xl border border-slate-100 p-4 dark:border-white/[0.06]"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold capitalize text-slate-800 dark:text-slate-200">
                    {module}
                  </span>

                  <span className="font-bold text-slate-950 dark:text-white">
                    {symbol}
                    {volume.toLocaleString()}
                  </span>
                </div>

                <div className="mt-2 text-xs text-slate-400">
                  Safari commission:{" "}
                  {symbol}
                  {commission.toLocaleString()}
                </div>
              </div>
            );
          },
        )}
      </div>
    </section>
  );
}