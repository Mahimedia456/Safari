import {
  CheckCircle2,
  Clock3,
  Store,
  UserRoundX,
} from "lucide-react";

import type {
  Merchant,
} from "../../types/merchant";

export default function MerchantStats({
  merchants,
}: {
  merchants: Merchant[];
}) {
  const stats = [
    {
      label:
        "Total Merchants",

      value:
        merchants.length,

      icon: Store,
    },

    {
      label: "Approved",

      value:
        (merchants ?? []).filter(
          (merchant) =>
            merchant.status ===
            "approved",
        ).length,

      icon:
        CheckCircle2,
    },

    {
      label: "Pending",

      value:
        (merchants ?? []).filter(
          (merchant) =>
            merchant.status ===
            "pending",
        ).length,

      icon: Clock3,
    },

    {
      label:
        "Suspended / Rejected",

      value:
        (merchants ?? []).filter(
          (merchant) =>
            merchant.status ===
              "suspended" ||
            merchant.status ===
              "rejected",
        ).length,

      icon:
        UserRoundX,
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
        (item) => {
          const Icon =
            item.icon;

          return (
            <div
              key={
                item.label
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
                {item.value}
              </div>

              <div
                className="
                  mt-1

                  text-sm

                  text-slate-500

                  dark:text-slate-400
                "
              >
                {item.label}
              </div>
            </div>
          );
        },
      )}
    </div>
  );
}