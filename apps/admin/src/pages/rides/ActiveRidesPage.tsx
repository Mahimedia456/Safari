import {
  useEffect,
  useMemo,
} from "react";

import RideTable from "../../components/rides/RideTable";
import RideStats from "../../components/rides/RideStats";

import {
  useRideStore,
} from "../../store/rideStore";

export default function ActiveRidesPage() {
  const rides =
    useRideStore(
      (state) =>
        state.rides ?? [],
    );

  const loaded =
    useRideStore(
      (state) =>
        state.loaded,
    );

  const loadRides =
    useRideStore(
      (state) =>
        state.loadRides,
    );

  useEffect(() => {
    if (!loaded) {
      void loadRides();
    }
  }, [
    loaded,
    loadRides,
  ]);

  const filtered =
    useMemo(
      () =>
        rides.filter(
          (ride) =>
            ride.status !== "completed" && !ride.status.startsWith("cancelled"),
        ),
      [rides],
    );

  return (
    <div>
      <div className="mb-7">
        <div className="text-sm font-semibold text-safari-600 dark:text-safari-400">
          Safari Pakistan · Ride
        </div>

        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
          Active Rides
        </h1>
      </div>

      <RideStats rides={filtered} />

      <div className="mt-5">
        <RideTable rides={filtered} />
      </div>
    </div>
  );
}
