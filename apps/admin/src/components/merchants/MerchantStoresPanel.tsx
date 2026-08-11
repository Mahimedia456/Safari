import type {
  Merchant,
} from "../../types/merchant";

import MerchantTypeBadge from "./MerchantTypeBadge";

export default function MerchantStoresPanel({
  merchant,
}: {
  merchant: Merchant;
}) {
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
        Stores
      </h2>

      <div className="mt-5 space-y-3">
        {merchant.stores.map(
          (store) => (
            <div
              key={store.id}
              className="
                flex flex-col
                gap-4

                rounded-xl

                border
                border-slate-100

                p-4

                sm:flex-row
                sm:items-center
                sm:justify-between

                dark:border-white/[0.06]
              "
            >
              <div>
                <div
                  className="
                    font-semibold

                    text-slate-900

                    dark:text-white
                  "
                >
                  {store.name}
                </div>

                <div
                  className="
                    mt-2
                    flex
                    flex-wrap
                    gap-2
                  "
                >
                  <MerchantTypeBadge
                    type={
                      store.type
                    }
                  />

                  <span
                    className="
                      rounded-lg

                      bg-slate-100

                      px-2 py-1

                      text-[11px]

                      text-slate-600

                      dark:bg-white/[0.06]
                      dark:text-slate-300
                    "
                  >
                    {store.city},{" "}
                    {
                      store.country
                    }
                  </span>
                </div>
              </div>

              <div className="text-right">
                <div
                  className="
                    text-xs
                    text-slate-400
                  "
                >
                  Safari commission
                </div>

                <div
                  className="
                    mt-1

                    text-lg
                    font-bold

                    text-safari-600

                    dark:text-safari-400
                  "
                >
                  {
                    store.commissionPercentage
                  }
                  %
                </div>
              </div>
            </div>
          ),
        )}

        {merchant.stores.length ===
          0 && (
          <div
            className="
              py-10
              text-center

              text-sm
              text-slate-400
            "
          >
            No stores available.
          </div>
        )}
      </div>
    </div>
  );
}