import {
  Link,
} from "react-router-dom";

import RideStats from "../../components/rides/RideStats";
import RideTable from "../../components/rides/RideTable";

import { useRideStore } from "../../store/rideStore";

export default function RideDashboardPage() {
  const rides =
    useRideStore(
      (state) =>
        state.rides,
    );

  const activeRides =
    (rides ?? []).filter(
      (ride) =>
        ride.status !== "completed" &&
        !ride.status.startsWith(
          "cancelled",
        ),
    );

  return (
    <div>
      <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-sm font-semibold text-safari-600 dark:text-safari-400">
            Safari Ride
          </div>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
            Ride Operations
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Monitor ride requests,
            dispatch, active trips,
            cancellations and incidents.
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            to="/rides/active"
            className="safari-secondary-button"
          >
            Active Rides
          </Link>

          <Link
            to="/rides/dispatch"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-safari-600 px-4 text-sm font-semibold text-white hover:bg-safari-700"
          >
            Dispatch
          </Link>
        </div>
      </div>

      <RideStats rides={rides} />

      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-950 dark:text-white">
            Live operations
          </h2>

          <Link
            to="/rides"
            className="text-sm font-semibold text-safari-600 dark:text-safari-400"
          >
            View all
          </Link>
        </div>

        <RideTable
          rides={
            activeRides
          }
        />
      </div>
    </div>
  );
}