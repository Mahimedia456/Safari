import {
  ClipboardCheck,
  Clock3,
  PackageSearch,
  Pill,
  ShoppingBag,
} from "lucide-react";

import type {
  PharmacyOrder,
  PharmacyPrescription,
  PharmacyProduct,
} from "../../types/pharmacy";

export default function PharmacyStats({
  orders,
  products,
  prescriptions,
}: {
  orders: PharmacyOrder[];
  products: PharmacyProduct[];
  prescriptions: PharmacyPrescription[];
}) {
  const lowStock =
    (products ?? []).filter(
      (product) =>
        product.stock <=
        product.lowStockThreshold,
    ).length;

  const pendingPrescriptions =
    (prescriptions ?? []).filter(
      (item) =>
        item.status ===
        "pending",
    ).length;

  const stats = [
    {
      label: "Orders",
      value: orders.length,
      icon: ShoppingBag,
    },

    {
      label: "Active Orders",
      value: (orders ?? []).filter(
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
      label: "Medicines",
      value: products.length,
      icon: Pill,
    },

    {
      label: "Low Stock",
      value: lowStock,
      icon: PackageSearch,
    },

    {
      label: "Prescriptions",
      value:
        pendingPrescriptions,
      icon: ClipboardCheck,
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