import {
  ArrowLeft,
  Car,
  MapPin,
  Phone,
  Route,
  UserRound,
} from "lucide-react";

import {
  useState,
} from "react";

import {
  Link,
  Navigate,
  useParams,
} from "react-router-dom";

import RideDispatchPanel from "../../components/rides/RideDispatchPanel";
import RideStatusBadge from "../../components/rides/RideStatusBadge";
import RideTimeline from "../../components/rides/RideTimeline";

import { getRidePermissions } from "../../config/ridePermissions";

import { useAuthStore } from "../../store/authStore";
import { useRideStore } from "../../store/rideStore";

import type {
  RideStatus,
} from "../../types/ride";

export default function RideDetailPage() {
  const {
    rideId,
  } = useParams();

  const user =
    useAuthStore(
      (state) =>
        state.user,
    );

  const ride =
    useRideStore(
      (state) =>
        state.rides.find(
          (item) =>
            item.id ===
            rideId,
        ),
    );

  const setRideStatus =
    useRideStore(
      (state) =>
        state.setRideStatus,
    );

  const cancelRide =
    useRideStore(
      (state) =>
        state.cancelRide,
    );

  const [
    cancellationReason,
    setCancellationReason,
  ] = useState("");

  if (!ride) {
    return (
      <Navigate
        to="/rides"
        replace
      />
    );
  }

  if (!user) {
    return null;
  }

  const permissions =
    getRidePermissions(
      user.role,
    );

  const statuses: RideStatus[] =
    [
      "requested",
      "searching",
      "driver_assigned",
      "driver_arriving",
      "waiting",
      "in_progress",
      "completed",
      "cancelled",
    ];

  return (
    <div>
      <Link
        to="/rides"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-safari-600"
      >
        <ArrowLeft
          size={16}
        />

        Rides
      </Link>

      <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <RideStatusBadge
            status={
              ride.status
            }
          />

          <h1 className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">
            {ride.id}
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {ride.city},{" "}
            {ride.region} ·{" "}
            {ride.rideType}
          </p>
        </div>

        {permissions.changeStatus &&
          !ride.status.startsWith(
            "cancelled",
          ) && (
            <select
              value={
                ride.status
              }
              onChange={(
                event,
              ) =>
                setRideStatus(
                  ride.id,

                  event.target
                    .value as RideStatus,
                )
              }
              className="safari-select"
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
                    {status.replaceAll(
                      "_",
                      " ",
                    )}
                  </option>
                ),
              )}
            </select>
          )}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <section className="safari-card p-6">
          <h2 className="text-base font-semibold text-slate-950 dark:text-white">
            Trip
          </h2>

          <div className="mt-5 space-y-4">
            <Info
              icon={MapPin}
              label="Pickup"
              value={
                ride.pickup
              }
            />

            <Info
              icon={MapPin}
              label="Destination"
              value={
                ride.destination
              }
            />

            <Info
              icon={Route}
              label="Distance"
              value={`${ride.distanceKm} km · ${ride.estimatedDurationMinutes} min estimated`}
            />
          </div>
        </section>

        <section className="safari-card p-6">
          <h2 className="text-base font-semibold text-slate-950 dark:text-white">
            Passenger & Driver
          </h2>

          <div className="mt-5 space-y-4">
            <Info
              icon={
                UserRound
              }
              label="Passenger"
              value={`${ride.passengerName} · ${ride.passengerPhone}`}
            />

            <Info
              icon={Car}
              label="Driver"
              value={
                ride.driverName
                  ? `${ride.driverName} · ${ride.vehicleName ?? ""} ${ride.vehiclePlate ?? ""}`
                  : "Not assigned"
              }
            />

            {ride.driverPhone && (
              <Info
                icon={Phone}
                label="Driver phone"
                value={
                  ride.driverPhone
                }
              />
            )}
          </div>
        </section>

        <section className="safari-card p-6">
          <h2 className="text-base font-semibold text-slate-950 dark:text-white">
            Fare
          </h2>

          <div className="mt-5 flex items-end justify-between">
            <div>
              <div className="text-xs text-slate-400">
                Estimated
              </div>

              <div className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
                {ride.region ===
                "Pakistan"
                  ? "Rs "
                  : "Rs "}
                {Number(ride.estimatedFare ?? 0).toLocaleString()}
              </div>
            </div>

            {ride.finalFare !==
              undefined && (
              <div className="text-right">
                <div className="text-xs text-slate-400">
                  Final
                </div>

                <div className="mt-1 text-2xl font-bold text-safari-600 dark:text-safari-400">
                  {ride.region ===
                  "Pakistan"
                    ? "Rs "
                    : "Rs "}
                  {Number(ride.finalFare ?? 0).toLocaleString()}
                </div>
              </div>
            )}
          </div>

          <div className="mt-5 text-sm capitalize text-slate-500">
            Payment:{" "}
            {ride.paymentMethod}
          </div>
        </section>

        {permissions.cancelRide &&
          ![
            "cancelled",
            "completed",
          ].includes(
            ride.status,
          ) && (
            <section className="safari-card p-6">
              <h2 className="text-base font-semibold text-slate-950 dark:text-white">
                Cancel Ride
              </h2>

              <textarea
                rows={3}
                value={
                  cancellationReason
                }
                onChange={(
                  event,
                ) =>
                  setCancellationReason(
                    event.target.value,
                  )
                }
                className="mt-4 w-full resize-none rounded-xl border border-slate-200 bg-white p-4 text-sm outline-none focus:border-safari-500 dark:border-white/10 dark:bg-[#151719] dark:text-white"
                placeholder="Cancellation reason..."
              />

              <button
                type="button"
                disabled={
                  !cancellationReason.trim()
                }
                onClick={() => {
                  cancelRide(ride.id);

                  setCancellationReason(
                    "",
                  );
                }}
                className="mt-3 h-10 rounded-xl bg-red-600 px-4 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel Ride
              </button>
            </section>
          )}
      </div>

      {!ride.driverId &&
        ![
          "completed",
          "cancelled",
        ].includes(
          ride.status,
        ) && (
          <div className="mt-6">
            <RideDispatchPanel
              ride={ride}
              canDispatch={
                permissions.dispatch
              }
            />
          </div>
        )}

      <div className="mt-6">
        <RideTimeline
          ride={ride}
        />
      </div>
    </div>
  );
}

function Info({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MapPin;

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