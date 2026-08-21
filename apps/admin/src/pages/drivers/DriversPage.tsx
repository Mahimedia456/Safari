import {
  useMemo,
  useState,
} from "react";

import {
  Search,
} from "lucide-react";

import DriverTable from "../../components/drivers/DriverTable";

import {
  useDriverStore,
} from "../../store/driverStore";

export default function DriversPage() {
  const drivers =
    useDriverStore(
      (state) =>
        state.drivers,
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
    setMarket,
  ] = useState("all");

  const filtered =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

      return (drivers ?? []).filter(
        (driver) => {
          const matchesSearch =
            !query ||
            driver.id
              .toLowerCase()
              .includes(query) ||
            driver.fullName
              .toLowerCase()
              .includes(query) ||
            driver.phone
              .toLowerCase()
              .includes(query) ||
            driver.city
              .toLowerCase()
              .includes(query);

          const matchesStatus =
            status === "all" ||
            driver.status ===
              status;

          const matchesMarket =
            region === "all" ||
            driver.region ===
              region;

          return (
            matchesSearch &&
            matchesStatus &&
            matchesMarket
          );
        },
      );
    }, [
      drivers,
      search,
      status,
      region,
    ]);

  return (
    <div>
      <div className="mb-7">
        <div className="text-sm font-semibold text-safari-600">
          Safari Drivers
        </div>

        <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
          All Drivers
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
            placeholder="Search driver, phone or city..."
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

          <option value="offline">
            Offline
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
            setMarket(
              event.target.value,
            )
          }
          className="safari-input"
        >
          <option value="all">
            Pakistan
          </option>

          <option value="Pakistan">
            Pakistan
          </option>
        </select>
      </div>

      <DriverTable
        drivers={filtered}
      />
    </div>
  );
}