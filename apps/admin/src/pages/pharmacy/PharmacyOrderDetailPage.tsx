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

import PharmacyOrderStatusBadge from "../../components/pharmacy/PharmacyOrderStatusBadge";

import { getPharmacyPermissions } from "../../config/pharmacyPermissions";

import { useAuthStore } from "../../store/authStore";
import { usePharmacyStore } from "../../store/pharmacyStore";

import type {
  PharmacyOrderStatus,
} from "../../types/pharmacy";

export default function PharmacyOrderDetailPage() {
  const {
    orderId,
  } = useParams();

  const user =
    useAuthStore(
      (state) =>
        state.user,
    );

  const order =
    usePharmacyStore(
      (state) =>
        state.orders.find(
          (item) =>
            item.id ===
            orderId,
        ),
    );

  const setOrderStatus =
    usePharmacyStore(
      (state) =>
        state.setOrderStatus,
    );

  if (!order) {
    return (
      <Navigate
        to="/pharmacy/orders"
        replace
      />
    );
  }

  if (!user) {
    return null;
  }

  const permissions =
    getPharmacyPermissions(
      user.role,
    );

  const statuses: PharmacyOrderStatus[] =
    [
      "pending",
      "confirmed",
      "processing",
      "ready",
      "picked_up",
      "delivered",
      "cancelled",
    ];

  return (
    <div>
      <Link
        to="/pharmacy/orders"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-safari-600"
      >
        <ArrowLeft
          size={16}
        />

        Pharmacy Orders
      </Link>

      <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <PharmacyOrderStatusBadge
            status={
              order.status
            }
          />

          <h1 className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">
            {order.id}
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {
              order.pharmacyName
            }
          </p>
        </div>

        {permissions.manageOrders && (
          <select
            value={
              order.status
            }
            onChange={(
              event,
            ) =>
              setOrderStatus(
                order.id,
                event.target
                  .value as PharmacyOrderStatus,
              )
            }
            className="safari-select"
          >
            {statuses.map(
              (status) => (
                <option
                  key={status}
                  value={status}
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
            Medicines
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

                    {item.prescriptionRequired && (
                      <div className="mt-1 text-xs font-semibold text-purple-600 dark:text-purple-400">
                        Prescription required
                      </div>
                    )}
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

          {order.prescriptionId && (
            <Link
              to={`/pharmacy/prescriptions/${order.prescriptionId}`}
              className="mt-5 inline-flex text-sm font-semibold text-safari-600 dark:text-safari-400"
            >
              Review linked prescription
            </Link>
          )}
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
            <Row
              label="Subtotal"
              value={
                order.subtotal
              }
            />

            <Row
              label="Delivery"
              value={
                order.deliveryFee
              }
            />

            <Row
              label="Service Fee"
              value={
                order.serviceFee
              }
            />

            <Row
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

function Row({
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