import {
  Bike,
  Globe2,
  ShoppingBag,
  Users,
} from "lucide-react";

import type {
  SafariRegion,
} from "../../types/region";

export default function RegionStats({
  regions,
}: {
  regions: SafariRegion[];
}) {
  const active =
    regions.filter(
      (region) =>
        region.status ===
        "active",
    ).length;

  const services =
    regions.reduce(
      (count, region) =>
        count +
        region.services.filter(
          (item) =>
            item.enabled,
        ).length,
      0,
    );

  const rides =
    regions.reduce(
      (count, region) =>
        count +
        region.rides.filter(
          (item) =>
            item.enabled,
        ).length,
      0,
    );

  const cities =
    regions.reduce(
      (count, region) =>
        count +
        region.activeCities.length,
      0,
    );

  const stats = [
    {
      label: "Regions",
      value: regions.length,
      icon: Globe2,
    },

    {
      label: "Active",
      value: active,
      icon: Globe2,
    },

    {
      label: "Active Services",
      value: services,
      icon: ShoppingBag,
    },

    {
      label: "Ride Types",
      value: rides,
      icon: Bike,
    },

    {
      label: "Active Cities",
      value: cities,
      icon: Users,
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
                <Icon size={19} />
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