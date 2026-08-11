import {
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  Users,
} from "lucide-react";

import type {
  ServiceBooking,
  ServiceStaff,
} from "../../types/services";

export default function ServicesStats({
  bookings,
  staff,
}: {
  bookings: ServiceBooking[];
  staff: ServiceStaff[];
}) {
  const revenue =
    bookings
      .filter(
        (item) =>
          item.status !==
          "cancelled",
      )
      .reduce(
        (total, item) =>
          total + item.total,
        0,
      );

  const stats = [
    {
      label:
        "Bookings",

      value:
        bookings.length,

      icon:
        CalendarDays,
    },

    {
      label:
        "Active",

      value:
        bookings.filter(
          (item) =>
            ![
              "completed",
              "cancelled",
            ].includes(
              item.status,
            ),
        ).length,

      icon:
        Clock3,
    },

    {
      label:
        "Completed",

      value:
        bookings.filter(
          (item) =>
            item.status ===
            "completed",
        ).length,

      icon:
        CheckCircle2,
    },

    {
      label:
        "Active Staff",

      value:
        staff.filter(
          (item) =>
            item.active,
        ).length,

      icon:
        Users,
    },

    {
      label:
        "Revenue",

      value:
        `Rs ${revenue.toLocaleString()}`,

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