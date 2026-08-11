import RideTable from "../../components/rides/RideTable";

import { useRideStore } from "../../store/rideStore";

export default function ActiveRidesPage() {
  const rides =
    useRideStore(
      (state) =>
        state.rides,
    );

  const active =
    rides.filter(
      (ride) =>
        ![
          "completed",
          "cancelled",
        ].includes(
          ride.status,
        ) &&
        !ride.scheduled,
    );

  return (
    <div>
      <div className="mb-7">
        <div className="text-sm font-semibold text-safari-600 dark:text-safari-400">
          Safari Ride
        </div>

        <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
          Active Rides
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Current ride requests and
          trips in progress.
        </p>
      </div>

      <RideTable rides={active} />
    </div>
  );
}