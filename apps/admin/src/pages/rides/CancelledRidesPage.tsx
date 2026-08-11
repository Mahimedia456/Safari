import RideTable from "../../components/rides/RideTable";

import { useRideStore } from "../../store/rideStore";

export default function ScheduledRidesPage() {
  const rides =
    useRideStore(
      (state) =>
        state.rides,
    );

  const scheduled =
    rides.filter(
      (ride) =>
        ride.scheduled &&
        ride.status !==
          "cancelled",
    );

  return (
    <div>
      <div className="mb-7">
        <div className="text-sm font-semibold text-safari-600 dark:text-safari-400">
          Safari Ride
        </div>

        <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
          Scheduled Rides
        </h1>
      </div>

      <RideTable
        rides={scheduled}
      />
    </div>
  );
}