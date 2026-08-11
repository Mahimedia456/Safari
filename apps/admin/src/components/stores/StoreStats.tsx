import {
  CheckCircle2,
  Clock3,
  Store,
  TriangleAlert,
} from "lucide-react";

import type {
  SafariStore,
} from "../../types/store";

export default function StoreStats({
  stores,
}: {
  stores:
    SafariStore[];
}) {
  const stats = [
    {
      label:
        "Total Stores",

      value:
        stores.length,

      icon: Store,
    },

    {
      label:
        "Active",

      value:
        stores.filter(
          (store) =>
            store.status ===
            "active",
        ).length,

      icon:
        CheckCircle2,
    },

    {
      label:
        "Pending",

      value:
        stores.filter(
          (store) =>
            store.status ===
            "pending",
        ).length,

      icon: Clock3,
    },

    {
      label:
        "Restricted",

      value:
        stores.filter(
          (store) =>
            store.status ===
              "suspended" ||
            store.status ===
              "rejected",
        ).length,

      icon:
        TriangleAlert,
    },
  ];

  return (
    <div
      className="
        grid
        grid-cols-1
        gap-4

        sm:grid-cols-2
        xl:grid-cols-4
      "
    >
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
              <div
                className="
                  flex h-10 w-10
                  items-center
                  justify-center

                  rounded-xl

                  bg-safari-50

                  text-safari-600

                  dark:bg-safari-500/10
                  dark:text-safari-400
                "
              >
                <Icon
                  size={19}
                />
              </div>

              <div
                className="
                  mt-5

                  text-2xl
                  font-bold

                  text-slate-950

                  dark:text-white
                "
              >
                {stat.value}
              </div>

              <div
                className="
                  mt-1

                  text-sm

                  text-slate-500

                  dark:text-slate-400
                "
              >
                {stat.label}
              </div>
            </div>
          );
        },
      )}
    </div>
  );
}