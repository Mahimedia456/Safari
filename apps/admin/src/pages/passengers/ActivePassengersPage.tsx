import PassengerTable from "../../components/passengers/PassengerTable";

import {
  usePassengerStore,
} from "../../store/passengerStore";

export default function ActivePassengersPage() {
  const passengers =
    usePassengerStore(
      (state) =>
        state.passengers,
    );

  const active =
    passengers.filter(
      (passenger) =>
        passenger.status ===
        "active",
    );

  return (
    <div>
      <div className="mb-7">
        <div className="text-sm font-semibold text-safari-600">
          Safari Customers
        </div>

        <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
          Active Passengers
        </h1>
      </div>

      <PassengerTable
        passengers={active}
      />
    </div>
  );
}