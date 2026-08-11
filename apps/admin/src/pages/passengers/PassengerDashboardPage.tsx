import {
  Link,
} from "react-router-dom";

import PassengerStats from "../../components/passengers/PassengerStats";
import PassengerTable from "../../components/passengers/PassengerTable";

import {
  usePassengerStore,
} from "../../store/passengerStore";

export default function PassengerDashboardPage() {
  const passengers =
    usePassengerStore(
      (state) =>
        state.passengers,
    );

  const flags =
    usePassengerStore(
      (state) =>
        state.flags,
    );

  const openFlags =
    flags.filter(
      (flag) =>
        flag.status !==
        "resolved",
    ).length;

  return (
    <div>
      <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-sm font-semibold text-safari-600 dark:text-safari-400">
            Safari Passengers
          </div>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
            Passenger Management
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Manage customer accounts,
            wallets, ride activity,
            safety and support.
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            to="/passengers/safety"
            className="safari-secondary-button"
          >
            Safety Flags ({openFlags})
          </Link>

          <Link
            to="/passengers"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-safari-600 px-4 text-sm font-semibold text-white hover:bg-safari-700"
          >
            All Passengers
          </Link>
        </div>
      </div>

      <PassengerStats
        passengers={
          passengers
        }
      />

      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-950 dark:text-white">
            Recent Customers
          </h2>

          <Link
            to="/passengers"
            className="text-sm font-semibold text-safari-600 dark:text-safari-400"
          >
            View all
          </Link>
        </div>

        <PassengerTable
          passengers={
            passengers
          }
        />
      </div>
    </div>
  );
}