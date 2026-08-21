import {
  useMemo,
  useState,
} from "react";

import {
  Search,
} from "lucide-react";

import ServiceBookingTable from "../../components/services/ServiceBookingTable";

import { useServicesStore } from "../../store/servicesStore";

export default function ServiceBookingsPage() {
  const bookings =
    useServicesStore(
      (state) =>
        state.bookings,
    );

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("all");

  const filtered =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

      return (bookings ?? []).filter(
        (booking) => {
          const matchesSearch =
            !query ||
            booking.id
              .toLowerCase()
              .includes(query) ||
            booking.customerName
              .toLowerCase()
              .includes(query) ||
            booking.serviceName
              .toLowerCase()
              .includes(query);

          const matchesStatus =
            status === "all" ||
            booking.status ===
              status;

          return (
            matchesSearch &&
            matchesStatus
          );
        },
      );
    }, [
      bookings,
      search,
      status,
    ]);

  return (
    <div>
      <div className="mb-7">
        <div className="text-sm font-semibold text-safari-600 dark:text-safari-400">
          Safari Services
        </div>

        <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
          Bookings
        </h1>
      </div>

      <div className="safari-card mb-5 grid grid-cols-1 gap-3 p-4 md:grid-cols-[1fr_220px]">
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
                event.target
                  .value,
              )
            }
            className="safari-input pl-11"
            placeholder="Search booking, customer or service..."
          />
        </div>

        <select
          value={status}
          onChange={(
            event,
          ) =>
            setStatus(
              event.target
                .value,
            )
          }
          className="safari-input"
        >
          <option value="all">
            All statuses
          </option>

          <option value="pending">
            Pending
          </option>

          <option value="confirmed">
            Confirmed
          </option>

          <option value="assigned">
            Assigned
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

      <ServiceBookingTable
        bookings={filtered}
      />
    </div>
  );
}