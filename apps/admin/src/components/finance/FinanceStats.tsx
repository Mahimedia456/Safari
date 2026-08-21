import {
  BadgePercent,
  CircleDollarSign,
  ReceiptText,
  WalletCards,
} from "lucide-react";

import type {
  CommissionRecord,
  FinancePayout,
  FinanceTransaction,
} from "../../types/finance";

type Props = {
  transactions:
    FinanceTransaction[];

  commissions:
    CommissionRecord[];

  payouts:
    FinancePayout[];
};

export default function FinanceStats({
  transactions,
  commissions,
  payouts,
}: Props) {
  const pkVolume =
    transactions
      .filter(
        (item) =>
          item.region ===
            "Pakistan" &&
          item.status ===
            "completed",
      )
      .reduce(
        (sum, item) =>
          sum +
          item.grossAmount,
        0,
      );

  const deVolume =
    transactions
      .filter(
        (item) =>
          item.region ===
            "Pakistan" &&
          item.status ===
            "completed",
      )
      .reduce(
        (sum, item) =>
          sum +
          item.grossAmount,
        0,
      );

  const pkCommission =
    commissions
      .filter(
        (item) =>
          item.region ===
          "Pakistan",
      )
      .reduce(
        (sum, item) =>
          sum +
          item.commissionAmount,
        0,
      );

  const pendingPayouts =
    payouts.filter(
      (payout) =>
        ![
          "paid",
          "rejected",
        ].includes(
          payout.status,
        ),
    ).length;

  const stats = [
    {
      label:
        "Pakistan Volume",

      value:
        `Rs ${pkVolume.toLocaleString()}`,

      icon:
        CircleDollarSign,
    },

    {
      label:
        "Pakistan Volume",

      value:
        `Rs ${deVolume.toLocaleString()}`,

      icon:
        CircleDollarSign,
    },

    {
      label:
        "PK Commission",

      value:
        `Rs ${pkCommission.toLocaleString()}`,

      icon:
        BadgePercent,
    },

    {
      label:
        "Transactions",

      value:
        transactions.length,

      icon:
        ReceiptText,
    },

    {
      label:
        "Pending Payouts",

      value:
        pendingPayouts,

      icon:
        WalletCards,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {stats.map(
        (stat) => {
          const Icon =
            stat.icon;

          return (
            <div
              key={stat.label}
              className="safari-card p-5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-safari-50 text-safari-600 dark:bg-safari-500/10 dark:text-safari-400">
                <Icon
                  size={19}
                />
              </div>

              <div className="mt-5 text-xl font-bold text-slate-950 dark:text-white">
                {stat.value}
              </div>

              <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {stat.label}
              </div>
            </div>
          );
        },
      )}
    </div>
  );
}