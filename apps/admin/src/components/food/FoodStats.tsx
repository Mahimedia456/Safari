import {
  CircleDollarSign,
  Clock3,
  PackageCheck,
  ShoppingBag,
} from "lucide-react";

import type {
  FoodOrder,
} from "../../types/food";

export default function FoodStats({
  orders,
}: {
  orders: FoodOrder[];
}) {
  const revenue =
    orders
      .filter(
        (order) =>
          order.status !==
          "cancelled",
      )
      .reduce(
        (total, order) =>
          total + order.total,
        0,
      );

  const stats = [
    {
      label:
        "Total Orders",

      value:
        orders.length,

      icon:
        ShoppingBag,
    },

    {
      label:
        "Active Orders",

      value:
        (orders ?? []).filter(
          (order) =>
            ![
              "delivered",
              "cancelled",
            ].includes(
              order.status,
            ),
        ).length,

      icon: Clock3,
    },

    {
      label:
        "Delivered",

      value:
        (orders ?? []).filter(
          (order) =>
            order.status ===
            "delivered",
        ).length,

      icon:
        PackageCheck,
    },

    {
      label:
        "Gross Revenue",

      value:
        `Rs ${revenue.toLocaleString()}`,

      icon:
        CircleDollarSign,
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
                <Icon size={19} />
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