import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Phone,
  UserRound,
} from "lucide-react";

import {
  Link,
  Navigate,
  useParams,
} from "react-router-dom";

import ServiceBookingStatusBadge from "../../components/services/ServiceBookingStatusBadge";

import { getServicesPermissions } from "../../config/servicesPermissions";

import { useAuthStore } from "../../store/authStore";
import { useServicesStore } from "../../store/servicesStore";

import type {
  ServiceBookingStatus,
} from "../../types/services";

export default function ServiceBookingDetailPage() {
  const {
    bookingId,
  } = useParams();

  const user =
    useAuthStore(
      (state) =>
        state.user,
    );

  const booking =
    useServicesStore(
      (state) =>
        state.bookings.find(
          (item) =>
            item.id ===
            bookingId,
        ),
    );

  const staff =
    useServicesStore(
      (state) =>
        state.staff,
    );

  const setBookingStatus =
    useServicesStore(
      (state) =>
        state.setBookingStatus,
    );

  const assignStaff =
    useServicesStore(
      (state) =>
        state.assignStaff,
    );

  if (!booking) {
    return (
      <Navigate
        to="/services/bookings"
        replace
      />
    );
  }

  if (!user) {
    return null;
  }

  const permissions =
    getServicesPermissions(
      user.role,
    );

  const statuses: ServiceBookingStatus[] =
    [
      "pending",
      "confirmed",
      "assigned",
      "in_progress",
      "completed",
      "cancelled",
    ];

  return (
    <div>
      <Link
        to="/services/bookings"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-safari-600"
      >
        <ArrowLeft
          size={16}
        />

        Bookings
      </Link>

      <div className="mt-5 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <ServiceBookingStatusBadge
            status={
              booking.status
            }
          />

          <h1 className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">
            {booking.id}
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {
              booking.serviceName
            }{" "}
            ·{" "}
            {
              booking.businessName
            }
          </p>
        </div>

        {permissions.manageBookings && (
          <div className="flex flex-wrap gap-2">
            <select
              className="safari-select"
              value={
                booking.staffId ??
                ""
              }
              onChange={(
                event,
              ) => {
                if (
                  event.target.value
                ) {
                  assignStaff(
                    booking.id,
                    event.target
                      .value,
                  );
                }
              }}
            >
              <option value="">
                Assign staff
              </option>

              {staff
                .filter(
                  (item) =>
                    item.active,
                )
                .map(
                  (item) => (
                    <option
                      key={
                        item.id
                      }
                      value={
                        item.id
                      }
                    >
                      {item.name} -{" "}
                      {item.role}
                    </option>
                  ),
                )}
            </select>

            <select
              className="safari-select"
              value={
                booking.status
              }
              onChange={(
                event,
              ) =>
                setBookingStatus(
                  booking.id,

                  event.target
                    .value as ServiceBookingStatus,
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
          </div>
        )}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="safari-card p-6">
          <h2 className="text-base font-semibold text-slate-950 dark:text-white">
            Booking details
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Info
              icon={
                CalendarDays
              }
              label="Schedule"
              value={`${booking.scheduledDate} at ${booking.scheduledTime}`}
            />

            <Info
              icon={
                UserRound
              }
              label="Assigned staff"
              value={
                booking.staffName ??
                "Not assigned"
              }
            />

            <Info
              icon={Phone}
              label="Customer"
              value={`${booking.customerName} · ${booking.customerPhone}`}
            />

            <Info
              icon={
                MapPin
              }
              label="Address"
              value={
                booking.address
              }
            />
          </div>

          {booking.notes && (
            <div className="mt-5 rounded-xl bg-slate-50 p-4 text-sm text-slate-600 dark:bg-white/[0.03] dark:text-slate-300">
              {booking.notes}
            </div>
          )}
        </section>

        <section className="safari-card p-6">
          <h2 className="text-base font-semibold text-slate-950 dark:text-white">
            Payment
          </h2>

          <div className="mt-5 space-y-3">
            <PriceRow
              label="Service"
              value={
                booking.price
              }
            />

            <PriceRow
              label="Service fee"
              value={
                booking.serviceFee
              }
            />

            <PriceRow
              label="Discount"
              value={
                -booking.discount
              }
            />

            <div className="flex justify-between border-t border-slate-100 pt-4 dark:border-white/[0.06]">
              <span className="font-semibold text-slate-900 dark:text-white">
                Total
              </span>

              <span className="text-xl font-bold text-safari-600 dark:text-safari-400">
                Rs{" "}
                {booking.total.toLocaleString()}
              </span>
            </div>

            <div className="pt-3 text-xs capitalize text-slate-400">
              Payment:{" "}
              {
                booking.paymentMethod
              }
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function Info({
  icon: Icon,
  label,
  value,
}: {
  icon:
    typeof MapPin;

  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-100 p-4 dark:border-white/[0.06]">
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Icon size={14} />
        {label}
      </div>

      <div className="mt-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
        {value}
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
    <div className="flex justify-between text-sm">
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