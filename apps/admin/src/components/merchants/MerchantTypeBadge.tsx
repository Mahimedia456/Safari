import {
  Pill,
  ShoppingBasket,
  Store,
  UtensilsCrossed,
  Wrench,
} from "lucide-react";

import type {
  MerchantType,
} from "../../types/merchant";

export default function MerchantTypeBadge({
  type,
}: {
  type: MerchantType;
}) {
  const Icon =
    type === "food"
      ? UtensilsCrossed
      : type ===
          "grocery"
        ? ShoppingBasket
        : type ===
            "pharmacy"
          ? Pill
          : type ===
              "services"
            ? Wrench
            : Store;

  return (
    <span
      className="
        inline-flex
        items-center
        gap-1.5

        rounded-lg

        bg-slate-100

        px-2 py-1

        text-[11px]
        font-medium
        capitalize

        text-slate-600

        dark:bg-white/[0.06]
        dark:text-slate-300
      "
    >
      <Icon size={12} />

      {type}
    </span>
  );
}