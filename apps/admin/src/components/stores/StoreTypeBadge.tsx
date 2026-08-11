import {
  Pill,
  ShoppingBasket,
  UtensilsCrossed,
  Wrench,
} from "lucide-react";

import type {
  StoreType,
} from "../../types/store";

export default function StoreTypeBadge({
  type,
}: {
  type: StoreType;
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
          : Wrench;

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