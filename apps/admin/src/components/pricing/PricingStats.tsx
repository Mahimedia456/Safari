import {
  BadgePercent,
  Calculator,
  Car,
  Gift,
} from "lucide-react";

import type {
  DriverCommissionSettings,
  RidePricingRule,
} from "../../types/pricing";

export default function PricingStats({
  pricing,
  commission,
}: {
  pricing:
    RidePricingRule[];

  commission:
    DriverCommissionSettings[];
}) {
  const enabled =
    pricing.filter(
      (item) =>
        item.enabled,
    ).length;

  const pakistan =
    commission.find(
      (item) =>
        item.region ===
        "Pakistan",
    );

  const stats = [
    {
      label:
        "Active Ride Prices",

      value: enabled,

      icon: Car,
    },

    {
      label:
        "PK Driver Commission",

      value:
        `${pakistan?.standardCommissionPercent ?? 0}%`,

      icon:
        BadgePercent,
    },

    {
      label:
        "Pakistan Driver Commission",

      value:
        `${pakistan?.standardCommissionPercent ?? 0}%`,

      icon:
        BadgePercent,
    },

    {
      label:
        "Monthly Free Rides",

      value:
        pakistan?.monthlyFreeRideCount ??
        0,

      icon: Gift,
    },

    {
      label:
        "Fare Engine",

      value: "Active",

      icon:
        Calculator,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
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

              <div className="mt-5 text-2xl font-bold text-slate-950 dark:text-white">
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