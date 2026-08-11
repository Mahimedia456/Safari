import {
  useMemo,
  useState,
} from "react";

import {
  Search,
} from "lucide-react";

import PassengerTable from "../../components/passengers/PassengerTable";

import {
  usePassengerStore,
} from "../../store/passengerStore";

export default function PassengersPage() {
  const passengers =
    usePassengerStore(
      (state) =>
        state.passengers,
    );

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    status,
    setStatus,
  ] = useState("all");

  const [
    region,
    setRegion,
  ] = useState("all");

  const filtered =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

      return passengers.filter(
        (passenger) => {
          const searchMatch =
            !query ||
            passenger.id
              .toLowerCase()
              .includes(query) ||
            passenger.fullName
              .toLowerCase()
              .includes(query) ||
            passenger.email
              .toLowerCase()
              .includes(query) ||
            passenger.phone
              .toLowerCase()
              .includes(query) ||
            passenger.city
              .toLowerCase()
              .includes(query);

          const statusMatch =
            status === "all" ||
            passenger.status ===
              status;

          const regionMatch =
            region === "all" ||
            passenger.region ===
              region;

          return (
            searchMatch &&
            statusMatch &&
            regionMatch
          );
        },
      );
    }, [
      passengers,
      search,
      status,
      region,
    ]);

  return (
    <div>
      <div className="mb-7">
        <div className="text-sm font-semibold text-safari-600">
          Safari Customers
        </div>

        <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
          All Passengers
        </h1>
      </div>

      <div className="safari-card mb-5 grid gap-3 p-4 lg:grid-cols-[1fr_220px_220px]">
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
            placeholder="Search passenger, phone, email or city..."
            className="safari-input pl-11"
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
            All Statuses
          </option>

          <option value="active">
            Active
          </option>

          <option value="inactive">
            Inactive
          </option>

          <option value="suspended">
            Suspended
          </option>

          <option value="blocked">
            Blocked
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

      <PassengerTable
        passengers={filtered}
      />
    </div>
  );
}