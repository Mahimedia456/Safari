import {
  ArrowLeft,
  MapPin,
  Phone,
} from "lucide-react";

import {
  Link,
  Navigate,
  useParams,
} from "react-router-dom";

import GroceryOrderStatusBadge from "../../components/grocery/GroceryOrderStatusBadge";

import { getGroceryPermissions } from "../../config/groceryPermissions";

import { useAuthStore } from "../../store/authStore";
import { useGroceryStore } from "../../store/groceryStore";

import type {
  GroceryOrderStatus,
} from "../../types/grocery";

export default function GroceryOrderDetailPage() {
  const {
    orderId,
  } = useParams();

  const user =
    useAuthStore(
      (state) =>
        state.user,
    );

  const order =
    useGroceryStore(
      (state) =>
        state.orders.find(
          (item) =>
            item.id ===
            orderId,
        ),
    );

  const setOrderStatus =
    useGroceryStore(
      (state) =>
        state.setOrderStatus,
    );

  if (!order) {
    return (
      <Navigate
        to="/grocery/orders"
        replace
      />
    );
  }

  if (!user) {
    return null;
  }

  const permissions =
    getGroceryPermissions(
      user.role,
    );

  const statuses: GroceryOrderStatus[] =
    [
      "pending",
      "confirmed",
      "picking",
      "packed",
      "picked_up",
      "delivered",
      "cancelled",
    ];

  return (
    <div>
      <Link
        to="/grocery/orders"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-safari-600"
      >
        <ArrowLeft
          size={16}
        />

        Grocery Orders
      </Link>

      <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <GroceryOrderStatusBadge
            status={
              order.status
            }
          />

          <h1 className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">
            {order.id}
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {order.storeName}
          </p>
        </div>

        {permissions.manageOrders && (
          <select
            className="safari-select"
            value={
              order.status
            }
            onChange={(
              event,
            ) =>
              setOrderStatus(
                order.id,

                event.target
                  .value as GroceryOrderStatus,
              )
            }
          >
            {statuses.map(
              (status) => (
                <option
                  key={
                    status
                  }
                  value={
                    status
                  }
                >
                  {status.replace(
                    "_",
                    " ",
                  )}
                </option>
              ),
            )}
          </select>
        )}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <section className="safari-card p-6">
          <h2 className="text-base font-semibold text-slate-950 dark:text-white">
            Order items
          </h2>

          <div className="mt-5 space-y-4">
            {order.items.map(
              (item) => (
                <div
                  key={
                    item.id
                  }
                  className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4 last:border-0 dark:border-white/[0.06]"
                >
                  <div>
                    <div className="font-medium text-slate-900 dark:text-white">
                      {item.quantity} ×{" "}
                      {item.name}
                    </div>

                    <div className="mt-1 text-xs text-slate-400">
                      {item.unit}
                    </div>
                  </div>

                  <div className="font-semibold text-slate-800 dark:text-slate-200">
                    Rs{" "}
                    {(
                      item.quantity *
                      item.unitPrice
                    ).toLocaleString()}
                  </div>
                </div>
              ),
            )}
          </div>
        </section>

        <section className="safari-card p-6">
          <h2 className="text-base font-semibold text-slate-950 dark:text-white">
            Customer
          </h2>

          <div className="mt-5">
            <div className="font-semibold text-slate-900 dark:text-white">
              {
                order.customerName
              }
            </div>

            <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
              <Phone
                size={15}
              />

              {
                order.customerPhone
              }
            </div>

            <div className="mt-3 flex items-start gap-2 text-sm text-slate-500">
              <MapPin
                size={15}
                className="mt-0.5"
              />

              {
                order.deliveryAddress
              }
            </div>
          </div>

          <div className="mt-6 border-t border-slate-100 pt-5 dark:border-white/[0.06]">
            <PriceRow
              label="Subtotal"
              value={
                order.subtotal
              }
            />

            <PriceRow
              label="Delivery"
              value={
                order.deliveryFee
              }
            />

            <PriceRow
              label="Service Fee"
              value={
                order.serviceFee
              }
            />

            <PriceRow
              label="Discount"
              value={
                -order.discount
              }
            />

            <div className="mt-4 flex justify-between border-t border-slate-100 pt-4 dark:border-white/[0.06]">
              <span className="font-semibold text-slate-900 dark:text-white">
                Total
              </span>

              <span className="text-lg font-bold text-safari-600 dark:text-safari-400">
                Rs{" "}
                {order.total.toLocaleString()}
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function PriceRow({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="mb-2 flex justify-between text-sm">
      <span className="text-slate-500">
        {label}
      </span>

      <span className="text-slate-700 dark:text-slate-300">
        {value < 0
          ? "-"
          : ""}
        Rs{" "}
        {Math.abs(
          value,
        ).toLocaleString()}
      </span>
    </div>
  );
}