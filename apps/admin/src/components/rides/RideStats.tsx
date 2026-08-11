import {
  Bike,
  CalendarClock,
  CheckCircle2,
  CircleDollarSign,
  Route,
} from "lucide-react";

import type {
  Ride,
} from "../../types/ride";

type Props = {
  rides: Ride[];
};

export default function RideStats({
  rides,
}: Props) {
  const active =
    rides.filter(
      (ride) =>
        ![
          "completed",
          "cancelled",
        ].includes(ride.status) &&
        !ride.scheduled,
    ).length;

  const completed =
    rides.filter(
      (ride) =>
        ride.status ===
        "completed",
    ).length;

  const scheduled =
    rides.filter(
      (ride) =>
        ride.scheduled &&
        ride.status !==
          "cancelled",
    ).length;

  const pakistanRevenue =
    rides
      .filter(
        (ride) =>
          ride.region ===
            "Pakistan" &&
          ride.status ===
            "completed",
      )
      .reduce(
        (sum, ride) =>
          sum +
          (ride.finalFare ??
            ride.estimatedFare),
        0,
      );

  const germanyRevenue =
    rides
      .filter(
        (ride) =>
          ride.region ===
            "Germany" &&
          ride.status ===
            "completed",
      )
      .reduce(
        (sum, ride) =>
          sum +
          (ride.finalFare ??
            ride.estimatedFare),
        0,
      );

  const stats = [
    {
      label: "Total Rides",
      value: rides.length,
      icon: Route,
    },
    {
      label: "Active",
      value: active,
      icon: Bike,
    },
    {
      label: "Completed",
      value: completed,
      icon: CheckCircle2,
    },
    {
      label: "Scheduled",
      value: scheduled,
      icon: CalendarClock,
    },
    {
      label: "Revenue",
      value:
        germanyRevenue > 0
          ? `Rs ${pakistanRevenue.toLocaleString()} · €${germanyRevenue.toLocaleString()}`
          : `Rs ${pakistanRevenue.toLocaleString()}`,
      icon: CircleDollarSign,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {stats.map((stat) => {
        const Icon =
          stat.icon;

        return (
          <div
            key={stat.label}
            className="safari-card p-5"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-safari-50 text-safari-600 dark:bg-safari-500/10 dark:text-safari-400">
              <Icon size={19} />
            </div>

            <div className="mt-5 text-xl font-bold text-slate-950 dark:text-white">
              {stat.value}
            </div>

            <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {stat.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}