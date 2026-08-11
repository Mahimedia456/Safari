import {
  Navigate,
  useParams,
} from "react-router-dom";

import PassengerRideTable from "../../components/passengers/PassengerRideTable";

import {
  usePassengerStore,
} from "../../store/passengerStore";

export default function PassengerRidesPage() {
  const {
    passengerId,
  } = useParams();

  const passenger =
    usePassengerStore(
      (state) =>
        state.passengers.find(
          (item) =>
            item.id ===
            passengerId,
        ),
    );

  const rides =
    usePassengerStore(
      (state) =>
        state.rides.filter(
          (ride) =>
            ride.passengerId ===
            passengerId,
        ),
    );

  if (!passenger) {
    return (
      <Navigate
        to="/passengers"
        replace
      />
    );
  }

  return (
    <div>
      <div className="mb-7">
        <div className="text-sm font-semibold text-safari-600">
          {
            passenger.fullName
          }
        </div>

        <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
          Ride History
        </h1>
      </div>

      <PassengerRideTable
        rides={rides}
      />
    </div>
  );
}