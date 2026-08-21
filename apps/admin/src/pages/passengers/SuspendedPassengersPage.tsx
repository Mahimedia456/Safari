import PassengerTable from "../../components/passengers/PassengerTable";

import {
  usePassengerStore,
} from "../../store/passengerStore";

export default function SuspendedPassengersPage() {
  const passengers =
    usePassengerStore(
      (state) =>
        state.passengers,
    );

  const restricted =
    (passengers ?? []).filter(
      (passenger) =>
        [
          "suspended",
          "blocked",
        ].includes(
          passenger.status,
        ),
    );

  return (
    <div>
      <div className="mb-7">
        <div className="text-sm font-semibold text-safari-600">
          Customer Compliance
        </div>

        <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
          Suspended & Blocked
        </h1>
      </div>

      <PassengerTable
        passengers={
          restricted
        }
      />
    </div>
  );
}