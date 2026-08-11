import {
  Navigate,
  useParams,
} from "react-router-dom";

import PassengerAddressTable from "../../components/passengers/PassengerAddressTable";

import {
  usePassengerStore,
} from "../../store/passengerStore";

export default function PassengerAddressesPage() {
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
          Saved Addresses
        </h1>
      </div>

      <PassengerAddressTable
        passengerId={
          passenger.id
        }
        addresses={
          passenger.addresses
        }
        canManage
      />
    </div>
  );
}