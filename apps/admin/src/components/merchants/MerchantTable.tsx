import {
  ChevronRight,
  MapPin,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import type {
  Merchant,
} from "../../types/merchant";

import MerchantStatusBadge from "./MerchantStatusBadge";
import MerchantTypeBadge from "./MerchantTypeBadge";

export default function MerchantTable({
  merchants,
}: {
  merchants: Merchant[];
}) {
  return (
    <div
      className="
        safari-card

        mt-5

        overflow-hidden
      "
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead
            className="
              border-b
              border-slate-100

              bg-slate-50/70

              dark:border-white/[0.06]
              dark:bg-white/[0.02]
            "
          >
            <tr>
              {[
                "Merchant",
                "Business Type",
                "Location",
                "Stores",
                "Orders",
                "Status",
                "",
              ].map(
                (label) => (
                  <th
                    key={
                      label
                    }
                    className="
                      whitespace-nowrap

                      px-5 py-4

                      text-left

                      text-[11px]
                      font-bold
                      uppercase
                      tracking-wider

                      text-slate-400
                    "
                  >
                    {label}
                  </th>
                ),
              )}
            </tr>
          </thead>

          <tbody>
            {merchants.map(
              (merchant) => (
                <tr
                  key={
                    merchant.id
                  }
                  className="
                    border-b
                    border-slate-100

                    last:border-0

                    hover:bg-slate-50/50

                    dark:border-white/[0.05]
                    dark:hover:bg-white/[0.02]
                  "
                >
                  <td className="px-5 py-4">
                    <div
                      className="
                        font-semibold

                        text-slate-900

                        dark:text-white
                      "
                    >
                      {
                        merchant.businessName
                      }
                    </div>

                    <div
                      className="
                        mt-1

                        text-xs

                        text-slate-400
                      "
                    >
                      {
                        merchant.ownerName
                      }{" "}
                      ·{" "}
                      {
                        merchant.id
                      }
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <MerchantTypeBadge
                      type={
                        merchant.type
                      }
                    />
                  </td>

                  <td className="px-5 py-4">
                    <div
                      className="
                        flex items-center
                        gap-1.5

                        whitespace-nowrap

                        text-sm

                        text-slate-600

                        dark:text-slate-300
                      "
                    >
                      <MapPin
                        size={14}
                      />

                      {
                        merchant.city
                      }
                      ,{" "}
                      {
                        merchant.country
                      }
                    </div>
                  </td>

                  <td
                    className="
                      px-5 py-4

                      text-sm

                      text-slate-600

                      dark:text-slate-300
                    "
                  >
                    {
                      merchant.totalStores
                    }
                  </td>

                  <td
                    className="
                      px-5 py-4

                      text-sm

                      text-slate-600

                      dark:text-slate-300
                    "
                  >
                    {
                      merchant.totalOrders
                    }
                  </td>

                  <td className="px-5 py-4">
                    <MerchantStatusBadge
                      status={
                        merchant.status
                      }
                    />
                  </td>

                  <td className="px-5 py-4">
                    <Link
                      to={`/merchants/${merchant.id}`}
                      className="
                        flex h-9 w-9
                        items-center
                        justify-center

                        rounded-lg

                        text-slate-400

                        transition

                        hover:bg-safari-50
                        hover:text-safari-600

                        dark:hover:bg-safari-500/10
                      "
                    >
                      <ChevronRight
                        size={17}
                      />
                    </Link>
                  </td>
                </tr>
              ),
            )}

            {merchants.length ===
              0 && (
              <tr>
                <td
                  colSpan={7}
                  className="
                    px-5 py-16

                    text-center

                    text-sm

                    text-slate-400
                  "
                >
                  No merchants match
                  these filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}