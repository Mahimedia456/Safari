import {
  CheckCircle2,
  Percent,
  Route,
  XCircle,
} from "lucide-react";

import type {
  Driver,
} from "../../types/driver";

export default function DriverRideSummary({
  driver,
}: {
  driver: Driver;
}) {
  const items = [
    {
      label:
        "Total Rides",

      value:
        driver.totalRides,

      icon: Route,
    },

    {
      label:
        "Completed",

      value:
        driver.completedRides,

      icon:
        CheckCircle2,
    },

    {
      label:
        "Cancelled",

      value:
        driver.cancelledRides,

      icon:
        XCircle,
    },

    {
      label:
        "Acceptance",

      value:
        `${driver.acceptanceRate}%`,

      icon: Percent,
    },

    {
      label:
        "Completion",

      value:
        `${driver.completionRate}%`,

      icon: Percent,
    },
  ];

  return (
    <section className="safari-card p-6">
      <h2 className="text-base font-semibold text-slate-950 dark:text-white">
        Ride Performance
      </h2>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {items.map(
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

                <div className="mt-3 text-xl font-bold text-slate-900 dark:text-white">
                  {
                    item.value
                  }
                </div>

                <div className="mt-1 text-xs text-slate-400">
                  {
                    item.label
                  }
                </div>
              </div>
            );
          },
        )}
      </div>
    </section>
  );
}