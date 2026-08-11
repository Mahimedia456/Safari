import RideIncidentTable from "../../components/rides/RideIncidentTable";

import { getRidePermissions } from "../../config/ridePermissions";

import { useAuthStore } from "../../store/authStore";
import { useRideStore } from "../../store/rideStore";

export default function RideIncidentsPage() {
  const user =
    useAuthStore(
      (state) =>
        state.user,
    );

  const incidents =
    useRideStore(
      (state) =>
        state.incidents,
    );

  if (!user) {
    return null;
  }

  const permissions =
    getRidePermissions(
      user.role,
    );

  return (
    <div>
      <div className="mb-7">
        <div className="text-sm font-semibold text-safari-600 dark:text-safari-400">
          Safari Ride
        </div>

        <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
          Ride Incidents
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Passenger and driver issues
          requiring operational review.
        </p>
      </div>

      <RideIncidentTable
        incidents={incidents}
        canManage={
          permissions.manageIncidents
        }
      />
    </div>
  );
}