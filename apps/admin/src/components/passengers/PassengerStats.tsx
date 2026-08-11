import {
  CircleDollarSign,
  ShieldAlert,
  UserCheck,
  Users,
  WalletCards,
} from "lucide-react";

import type {
  Passenger,
} from "../../types/passenger";

export default function PassengerStats({
  passengers,
}: {
  passengers: Passenger[];
}) {
  const active =
    passengers.filter(
      (passenger) =>
        passenger.status ===
        "active",
    ).length;

  const restricted =
    passengers.filter(
      (passenger) =>
        [
          "suspended",
          "blocked",
        ].includes(
          passenger.status,
        ),
    ).length;

  const pakistanWallet =
    passengers
      .filter(
        (passenger) =>
          passenger.region ===
          "Pakistan",
      )
      .reduce(
        (sum, passenger) =>
          sum +
          passenger.wallet
            .balance,
        0,
      );

  const pakistanSpend =
    passengers
      .filter(
        (passenger) =>
          passenger.region ===
          "Pakistan",
      )
      .reduce(
        (sum, passenger) =>
          sum +
          passenger.wallet
            .totalSpent,
        0,
      );

  const stats = [
    {
      label:
        "Passengers",

      value:
        passengers.length,

      icon: Users,
    },

    {
      label:
        "Active",

      value: active,

      icon:
        UserCheck,
    },

    {
      label:
        "Restricted",

      value:
        restricted,

      icon:
        ShieldAlert,
    },

    {
      label:
        "PK Wallet Balance",

      value:
        `Rs ${pakistanWallet.toLocaleString()}`,

      icon:
        WalletCards,
    },

    {
      label:
        "PK Total Spend",

      value:
        `Rs ${pakistanSpend.toLocaleString()}`,

      icon:
        CircleDollarSign,
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
              key={
                stat.label
              }
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