import {
  CircleDollarSign,
  Gift,
  WalletCards,
} from "lucide-react";

import type {
  Passenger,
} from "../../types/passenger";

export default function PassengerWalletPanel({
  passenger,
}: {
  passenger: Passenger;
}) {
  const symbol =
    passenger.region ===
    "Germany"
      ? "€"
      : "Rs ";

  const wallet =
    passenger.wallet;

  const rows = [
    {
      label:
        "Wallet Balance",
      value:
        wallet.balance,
      icon:
        WalletCards,
    },

    {
      label:
        "Total Spend",
      value:
        wallet.totalSpent,
      icon:
        CircleDollarSign,
    },

    {
      label:
        "Ride Spend",
      value:
        wallet.rideSpend,
      icon:
        CircleDollarSign,
    },

    {
      label:
        "Food Spend",
      value:
        wallet.foodSpend,
      icon:
        CircleDollarSign,
    },

    {
      label:
        "Grocery Spend",
      value:
        wallet.grocerySpend,
      icon:
        CircleDollarSign,
    },

    {
      label:
        "Pharmacy Spend",
      value:
        wallet.pharmacySpend,
      icon:
        CircleDollarSign,
    },

    {
      label:
        "Services Spend",
      value:
        wallet.servicesSpend,
      icon:
        CircleDollarSign,
    },

    {
      label:
        "Refunds Received",
      value:
        wallet.refundsReceived,
      icon:
        CircleDollarSign,
    },
  ];

  return (
    <section className="safari-card p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-safari-600 dark:text-safari-400">
            Passenger Finance
          </div>

          <h2 className="mt-1 text-xl font-bold text-slate-950 dark:text-white">
            Wallet & Spend
          </h2>
        </div>

        <WalletCards className="text-safari-600" />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {rows.map(
          (item) => {
            const Icon =
              item.icon;

            return (
              <div
                key={
                  item.label
                }
                className="rounded-xl border border-slate-100 p-4 dark:border-white/[0.06]"
              >
                <Icon
                  size={16}
                  className="text-safari-600"
                />

                <div className="mt-3 text-xs text-slate-400">
                  {item.label}
                </div>

                <div className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                  {symbol}
                  {item.value.toLocaleString()}
                </div>
              </div>
            );
          },
        )}

        <div className="rounded-xl border border-slate-100 p-4 dark:border-white/[0.06]">
          <Gift
            size={16}
            className="text-safari-600"
          />

          <div className="mt-3 text-xs text-slate-400">
            Reward Points
          </div>

          <div className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
            {wallet.pointsBalance.toLocaleString()}
          </div>
        </div>
      </div>
    </section>
  );
}