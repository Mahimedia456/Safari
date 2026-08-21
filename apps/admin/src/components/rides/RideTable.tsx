import {
  ArrowUpRight,
  CalendarClock,
  Car,
  MapPin,
  UserRound,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import RideStatusBadge from "./RideStatusBadge";

import type {
  Ride,
} from "../../types/ride";

type Props = {
  rides?: Ride[];
};

function money(value?: number | null) {
  return `Rs ${Number(value ?? 0).toLocaleString()}`;
}

function shortId(value: string) {
  return value.length > 14
    ? `${value.slice(0, 8)}…${value.slice(-4)}`
    : value;
}

export default function RideTable({
  rides = [],
}: Props) {
  const safeRides =
    Array.isArray(rides)
      ? rides
      : [];

  return (
    <section className="overflow-hidden rounded-2xl border border-[var(--safari-border)] bg-[var(--safari-surface)] shadow-sm">
      <div className="flex items-center justify-between border-b border-[var(--safari-border)] px-5 py-4">
        <div>
          <h2 className="text-sm font-extrabold text-[var(--safari-text-strong)]">
            Ride records
          </h2>

          <p className="mt-1 text-xs text-[var(--safari-muted)]">
            {safeRides.length.toLocaleString()} rides in the current view
          </p>
        </div>
      </div>

      {safeRides.length === 0 ? (
        <div className="px-6 py-16 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-safari-500/10 text-safari-600 dark:text-safari-400">
            <Car size={21} />
          </div>

          <h3 className="mt-4 text-sm font-bold text-[var(--safari-text-strong)]">
            No rides found
          </h3>

          <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-[var(--safari-muted)]">
            There are no Safari rides matching the current filters.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-[1120px] w-full">
            <thead>
              <tr className="border-b border-[var(--safari-border)] bg-[var(--safari-page)]/60 text-left">
                <Th>Ride</Th>
                <Th>Passenger</Th>
                <Th>Driver</Th>
                <Th>Route</Th>
                <Th>Type</Th>
                <Th>Status</Th>
                <Th>Fare</Th>
                <Th>Created</Th>
                <Th className="text-right">Action</Th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[var(--safari-border-soft)]">
              {safeRides.map((ride) => (
                <tr
                  key={ride.id}
                  className="transition hover:bg-safari-500/[0.025] dark:hover:bg-white/[0.025]"
                >
                  <Td>
                    <div className="font-bold text-[var(--safari-text-strong)]">
                      {shortId(ride.id)}
                    </div>

                    <div className="mt-1 flex items-center gap-1.5 text-[11px] text-[var(--safari-muted)]">
                      {ride.scheduled ? (
                        <CalendarClock size={12} />
                      ) : (
                        <Car size={12} />
                      )}

                      {ride.scheduled
                        ? "Scheduled"
                        : "On demand"}
                    </div>
                  </Td>

                  <Td>
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-safari-500/10 text-safari-700 dark:text-safari-300">
                        <UserRound size={15} />
                      </div>

                      <div className="min-w-0">
                        <div className="max-w-[150px] truncate text-sm font-semibold text-[var(--safari-text-strong)]">
                          {ride.passengerName || "Safari Passenger"}
                        </div>

                        <div className="mt-0.5 max-w-[150px] truncate text-[11px] text-[var(--safari-muted)]">
                          {ride.passengerPhone || "—"}
                        </div>
                      </div>
                    </div>
                  </Td>

                  <Td>
                    {ride.driverName ? (
                      <div>
                        <div className="max-w-[150px] truncate text-sm font-semibold text-[var(--safari-text-strong)]">
                          {ride.driverName}
                        </div>

                        <div className="mt-0.5 max-w-[150px] truncate text-[11px] text-[var(--safari-muted)]">
                          {ride.vehicleName ?? "Assigned"}
                        </div>
                      </div>
                    ) : (
                      <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                        Not assigned
                      </span>
                    )}
                  </Td>

                  <Td>
                    <div className="max-w-[230px]">
                      <div className="flex items-start gap-2 text-xs text-[var(--safari-text-secondary)]">
                        <MapPin
                          size={13}
                          className="mt-0.5 shrink-0 text-safari-600"
                        />

                        <span className="line-clamp-1">
                          {ride.pickup || "Pickup unavailable"}
                        </span>
                      </div>

                      <div className="mt-1.5 pl-5 text-[11px] text-[var(--safari-muted)]">
                        → {ride.destination || "Destination unavailable"}
                      </div>
                    </div>
                  </Td>

                  <Td>
                    <div className="text-sm font-semibold text-[var(--safari-text-strong)]">
                      {ride.rideType || "Safari Ride"}
                    </div>

                    <div className="mt-0.5 text-[11px] text-[var(--safari-muted)]">
                      {ride.city || "Pakistan"}
                    </div>
                  </Td>

                  <Td>
                    <RideStatusBadge status={ride.status} />
                  </Td>

                  <Td>
                    <div className="text-sm font-bold text-[var(--safari-text-strong)]">
                      {money(
                        ride.finalFare ??
                          ride.estimatedFare,
                      )}
                    </div>

                    <div className="mt-0.5 text-[11px] capitalize text-[var(--safari-muted)]">
                      {ride.paymentMethod || "cash"}
                    </div>
                  </Td>

                  <Td>
                    <div className="text-xs font-medium text-[var(--safari-text-secondary)]">
                      {formatDate(ride.createdAt)}
                    </div>
                  </Td>

                  <Td className="text-right">
                    <Link
                      to={`/rides/${ride.id}`}
                      className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-[var(--safari-border)] px-3 text-xs font-bold text-[var(--safari-text-secondary)] transition hover:border-safari-500/30 hover:bg-safari-500/5 hover:text-safari-700 dark:hover:text-safari-300"
                    >
                      View
                      <ArrowUpRight size={13} />
                    </Link>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function Th({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      className={`whitespace-nowrap px-5 py-3 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[var(--safari-muted)] ${className}`}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <td className={`px-5 py-4 align-middle ${className}`}>
      {children}
    </td>
  );
}

function formatDate(value?: string | null) {
  if (!value) {
    return "—";
  }
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat(
    "en-PK",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    },
  ).format(date);
}
