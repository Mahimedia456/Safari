import {
  BadgePercent,
  CircleDollarSign,
  ReceiptText,
  WalletCards,
} from "lucide-react";

import type {
  MerchantEarningEntry,
  MerchantPayoutEntry,
} from "../../types/merchantPortal";

type Props = {
  earnings:
    MerchantEarningEntry[];

  payouts:
    MerchantPayoutEntry[];
};

export default function MerchantFinanceStats({
  earnings,
  payouts,
}: Props) {
  const gross =
    earnings.reduce(
      (total, item) =>
        total +
        item.grossAmount,
      0,
    );

  const commission =
    earnings.reduce(
      (total, item) =>
        total +
        item.commissionAmount,
      0,
    );

  const net =
    earnings.reduce(
      (total, item) =>
        total +
        item.netAmount,
      0,
    );

  const pendingPayout =
    payouts
      .filter(
        (item) =>
          item.status ===
            "pending" ||
          item.status ===
            "processing",
      )
      .reduce(
        (total, item) =>
          total +
          item.amount,
        0,
      );

  const currency =
    earnings[0]?.currency ??
    payouts[0]?.currency ??
    "PKR";

  const symbol =
    currency === "EUR"
      ? "€"
      : "Rs ";

  const cards = [
    {
      label: "Gross Sales",

      value:
        `${symbol}${gross.toLocaleString()}`,

      icon:
        CircleDollarSign,
    },

    {
      label:
        "Safari Commission",

      value:
        `${symbol}${commission.toLocaleString()}`,

      icon:
        BadgePercent,
    },

    {
      label:
        "Net Earnings",

      value:
        `${symbol}${net.toLocaleString()}`,

      icon:
        ReceiptText,
    },

    {
      label:
        "Pending Payout",

      value:
        `${symbol}${pendingPayout.toLocaleString()}`,

      icon:
        WalletCards,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map(
        (card) => {
          const Icon =
            card.icon;

          return (
            <div
              key={card.label}
              className="safari-card p-5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-safari-50 text-safari-600 dark:bg-safari-500/10 dark:text-safari-400">
                <Icon
                  size={19}
                />
              </div>

              <div className="mt-5 text-2xl font-bold text-slate-950 dark:text-white">
                {card.value}
              </div>

              <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {card.label}
              </div>
            </div>
          );
        },
      )}
    </div>
  );
}