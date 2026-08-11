import {
  useMemo,
  useState,
} from "react";

import {
  Search,
} from "lucide-react";

import RideTable from "../../components/rides/RideTable";

import { useRideStore } from "../../store/rideStore";

export default function RidesPage() {
  const rides =
    useRideStore(
      (state) =>
        state.rides,
    );

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("all");

  const [region, setRegion] =
    useState("all");

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
            ride.passengerName
              .toLowerCase()
              .includes(query) ||
            ride.driverName
              ?.toLowerCase()
              .includes(query) ||
            ride.city
              .toLowerCase()
              .includes(query);

          const statusMatch =
            status === "all" ||
            ride.status === status;

          const regionMatch =
            region === "all" ||
            ride.region === region;

          return (
            searchMatch &&
            statusMatch &&
            regionMatch
          );
        },
      );
    }, [
      rides,
      search,
      status,
      region,
    ]);

  return (
    <div>
      <div className="mb-7">
        <div className="text-sm font-semibold text-safari-600 dark:text-safari-400">
          Safari Ride
        </div>

        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
          All Rides
        </h1>
      </div>

      <div className="safari-card mb-5 grid grid-cols-1 gap-3 p-4 lg:grid-cols-[1fr_220px_220px]">
        <div className="relative">
          <Search
            size={17}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            value={search}
            onChange={(
              event,
            ) =>
              setSearch(
                event.target.value,
              )
            }
            className="safari-input pl-11"
            placeholder="Search ride, passenger, driver or city..."
          />
        </div>

        <select
          value={status}
          onChange={(
            event,
          ) =>
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

        <select
          value={region}
          onChange={(
            event,
          ) =>
            setRegion(
              event.target.value,
            )
          }
          className="safari-input"
        >
          <option value="all">
            All Regions
          </option>

          <option value="Pakistan">
            Pakistan
          </option>

          <option value="Germany">
            Germany
          </option>
        </select>
      </div>

      <RideTable
        rides={filtered}
      />
    </div>
  );
}