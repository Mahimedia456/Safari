import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  RefreshCcw,
  Search,
} from "lucide-react";

import RideTable from "../../components/rides/RideTable";
import RideStats from "../../components/rides/RideStats";

import {
  useRideStore,
} from "../../store/rideStore";

export default function RidesPage() {
  const rides =
    useRideStore(
      (state) =>
        state.rides ?? [],
    );

  const loading =
    useRideStore(
      (state) =>
        state.loading,
    );

  const loaded =
    useRideStore(
      (state) =>
        state.loaded,
    );

  const error =
    useRideStore(
      (state) =>
        state.error,
    );

  const loadRides =
    useRideStore(
      (state) =>
        state.loadRides,
    );

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("all");

  useEffect(() => {
    if (!loaded) {
      void loadRides();
    }
  }, [
    loaded,
    loadRides,
  ]);

  const filtered =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

      return rides.filter(
        (ride) => {
          const searchMatch =
            !query ||
            ride.id
              .toLowerCase()
              .includes(query) ||
            (
              ride.passengerName ??
              ""
            )
              .toLowerCase()
              .includes(query) ||
            (
              ride.driverName ??
              ""
            )
              .toLowerCase()
              .includes(query) ||
            (
              ride.city ??
              ""
            )
              .toLowerCase()
              .includes(query) ||
            (
              ride.pickup ??
              ""
            )
              .toLowerCase()
              .includes(query) ||
            (
              ride.destination ??
              ""
            )
              .toLowerCase()
              .includes(query);

          const isCancelled =
            ride.status.startsWith(
              "cancelled",
            );

          const statusMatch =
            status === "all" ||
            (
              status ===
                "cancelled"
                ? isCancelled
                : ride.status ===
                  status
            );

          return (
            searchMatch &&
            statusMatch
          );
        },
      );
    }, [
      rides,
      search,
      status,
    ]);

  return (
    <div>
      <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-sm font-semibold text-safari-600 dark:text-safari-400">
            Safari Pakistan · Ride
          </div>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
            All Rides
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Real ride records loaded from the Safari backend and Supabase.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            void loadRides()
          }
          disabled={loading}
          className="safari-secondary-button inline-flex items-center gap-2 disabled:opacity-60"
        >
          <RefreshCcw
            size={15}
            className={
              loading
                ? "animate-spin"
                : ""
            }
          />
          Refresh
        </button>
      </div>

      <RideStats rides={rides} />

      {error ? (
        <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">
          {error}
        </div>
      ) : null}

      <div className="safari-card mb-5 mt-5 grid grid-cols-1 gap-3 p-4 lg:grid-cols-[minmax(0,1fr)_230px]">
        <div className="relative">
          <Search
            size={17}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value,
              )
            }
            className="safari-input pl-11"
            placeholder="Search ride, passenger, driver, route or city..."
          />
        </div>

        <select
          value={status}
          onChange={(event) =>
            setStatus(
              event.target.value,
            )
          }
          className="safari-input"
        >
          <option value="all">
            All statuses
          </option>

          <option value="requested">
            Requested
          </option>

          <option value="searching">
            Searching
          </option>

          <option value="driver_assigned">
            Driver Assigned
          </option>

          <option value="driver_arriving">
            Driver Arriving
          </option>

          <option value="driver_arrived">
            Driver Arrived
          </option>

          <option value="waiting">
            Waiting
          </option>

          <option value="in_progress">
            In Progress
          </option>

          <option value="completed">
            Completed
          </option>

          <option value="cancelled">
            Cancelled
          </option>
        </select>
      </div>

      <RideTable
        rides={filtered}
      />
    </div>
  );
}
