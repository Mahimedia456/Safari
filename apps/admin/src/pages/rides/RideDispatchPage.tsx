import RideDispatchPanel from "../../components/rides/RideDispatchPanel";
import RideTable from "../../components/rides/RideTable";

import { getRidePermissions } from "../../config/ridePermissions";

import { useAuthStore } from "../../store/authStore";
import { useRideStore } from "../../store/rideStore";

export default function RideDispatchPage() {
  const user =
    useAuthStore(
      (state) =>
        state.user,
    );

  const rides =
    useRideStore(
      (state) =>
        state.rides,
    );

  if (!user) {
    return null;
  }

  const permissions =
    getRidePermissions(
      user.role,
    );

  const unassigned =
    rides.filter(
      (ride) =>
        !ride.driverId &&
        [
          "requested",
          "searching",
        ].includes(
          ride.status,
        ),
    );

  const selectedRide =
    unassigned[0];

  return (
    <div>
      <div className="mb-7">
        <div className="text-sm font-semibold text-safari-600 dark:text-safari-400">
          Safari Ride
        </div>

        <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
          Dispatch
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Manually assign available
          drivers to unassigned rides.
        </p>
      </div>

      <RideTable
        rides={unassigned}
      />

      {selectedRide && (
        <div className="mt-6">
          <RideDispatchPanel
            ride={selectedRide}
            canDispatch={
              permissions.dispatch
            }
          />
        </div>
      )}
    </div>
  );
}