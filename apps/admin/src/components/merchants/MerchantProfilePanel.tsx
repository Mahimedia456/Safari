import {
  Calendar,
  Mail,
  MapPin,
  Phone,
  UserRound,
} from "lucide-react";

import type {
  Merchant,
} from "../../types/merchant";

export default function MerchantProfilePanel({
  merchant,
}: {
  merchant: Merchant;
}) {
  const items = [
    {
      label:
        "Business Owner",

      value:
        merchant.ownerName,

      icon:
        UserRound,
    },

    {
      label: "Email",

      value:
        merchant.email,

      icon: Mail,
    },

    {
      label: "Phone",

      value:
        merchant.phone,

      icon: Phone,
    },

    {
      label:
        "Registered",

      value:
        new Date(
          merchant.registeredAt,
        ).toLocaleDateString(),

      icon: Calendar,
    },

    {
      label: "Address",

      value:
        merchant.address,

      icon: MapPin,
    },
  ];

  return (
    <div className="safari-card p-6">
      <h2
        className="
          text-base
          font-semibold

          text-slate-950

          dark:text-white
        "
      >
        Merchant profile
      </h2>

      <div
        className="
          mt-5

          grid
          gap-4

          md:grid-cols-2
        "
      >
        {items.map(
          (item) => {
            const Icon =
              item.icon;

            return (
              <div
                key={
                  item.label
                }
                className="
                  rounded-xl

                  border
                  border-slate-100

                  p-4

                  dark:border-white/[0.06]
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-2

                    text-xs

                    text-slate-400
                  "
                >
                  <Icon
                    size={14}
                  />

                  {item.label}
                </div>

                <div
                  className="
                    mt-2

                    text-sm
                    font-medium

                    text-slate-800

                    dark:text-slate-200
                  "
                >
                  {item.value}
                </div>
              </div>
            );
          },
        )}
      </div>
    </div>
  );
}