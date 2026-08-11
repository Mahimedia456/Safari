import {
  ChevronRight,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import type {
  GroceryOrder,
} from "../../types/grocery";

import GroceryOrderStatusBadge from "./GroceryOrderStatusBadge";

type Props = {
  orders: GroceryOrder[];
};

export default function GroceryOrderTable({
  orders,
}: Props) {
  return (
    <div className="safari-card overflow-hidden">
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
                "Order",
                "Store",
                "Customer",
                "Items",
                "Total",
                "Payment",
                "Status",
                "",
              ].map(
                (label) => (
                  <th
                    key={label}
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
            {orders.map(
              (order) => (
                <tr
                  key={order.id}
                  className="
                    border-b
                    border-slate-100

                    transition

                    last:border-0

                    hover:bg-slate-50/50

                    dark:border-white/[0.05]
                    dark:hover:bg-white/[0.02]
                  "
                >
                  <td className="px-5 py-4">
                    <div
                      className="
                        text-sm
                        font-semibold
                        text-slate-900

                        dark:text-white
                      "
                    >
                      {order.id}
                    </div>

                    <div
                      className="
                        mt-1
                        text-xs
                        text-slate-400
                      "
                    >
                      {new Date(
                        order.createdAt,
                      ).toLocaleString()}
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
                    {order.storeName}
                  </td>

                  <td className="px-5 py-4">
                    <div
                      className="
                        text-sm
                        font-medium
                        text-slate-800

                        dark:text-slate-200
                      "
                    >
                      {
                        order.customerName
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
                        order.customerPhone
                      }
                    </div>
                  </td>

                  <td
                    className="
                      px-5 py-4
                      text-sm
                      text-slate-500
                    "
                  >
                    {order.items.reduce(
                      (
                        total,
                        item,
                      ) =>
                        total +
                        item.quantity,
                      0,
                    )}
                  </td>

                  <td
                    className="
                      whitespace-nowrap
                      px-5 py-4
                      text-sm
                      font-semibold
                      text-slate-800

                      dark:text-slate-200
                    "
                  >
                    Rs{" "}
                    {order.total.toLocaleString()}
                  </td>

                  <td
                    className="
                      px-5 py-4
                      text-sm
                      capitalize
                      text-slate-500
                    "
                  >
                    {
                      order.paymentMethod
                    }
                  </td>

                  <td className="px-5 py-4">
                    <GroceryOrderStatusBadge
                      status={
                        order.status
                      }
                    />
                  </td>

                  <td className="px-5 py-4">
                    <Link
                      to={`/grocery/orders/${order.id}`}
                      aria-label={`Open ${order.id}`}
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
                        dark:hover:text-safari-400
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

            {orders.length ===
              0 && (
              <tr>
                <td
                  colSpan={8}
                  className="
                    px-5 py-16
                    text-center
                    text-sm
                    text-slate-400
                  "
                >
                  No grocery orders
                  found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}