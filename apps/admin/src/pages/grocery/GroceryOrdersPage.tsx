import {
  useMemo,
  useState,
} from "react";

import {
  Search,
} from "lucide-react";

import GroceryOrderTable from "../../components/grocery/GroceryOrderTable";

import { useGroceryStore } from "../../store/groceryStore";

export default function GroceryOrdersPage() {
  const orders =
    useGroceryStore(
      (state) =>
        state.orders,
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

      return (orders ?? []).filter(
        (order) => {
          const matchesSearch =
            !query ||
            order.id
              .toLowerCase()
              .includes(
                query,
              ) ||
            order.customerName
              .toLowerCase()
              .includes(
                query,
              ) ||
            order.storeName
              .toLowerCase()
              .includes(
                query,
              );

          const matchesStatus =
            status === "all" ||
            order.status ===
              status;

          return (
            matchesSearch &&
            matchesStatus
          );
        },
      );
    }, [
      orders,
      search,
      status,
    ]);

  return (
    <div>
      <div className="mb-7">
        <div className="text-sm font-semibold text-safari-600 dark:text-safari-400">
          Safari Grocery
        </div>

        <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
          Grocery Orders
        </h1>
      </div>

      <div className="safari-card mb-5 grid grid-cols-1 gap-3 p-4 md:grid-cols-[1fr_220px]">
        <div className="relative">
          <Search
            size={17}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            className="safari-input pl-11"
            value={search}
            onChange={(
              event,
            ) =>
              setSearch(
                event.target
                  .value,
              )
            }
            placeholder="Search order, customer or store..."
          />
        </div>

        <select
          className="safari-input"
          value={status}
          onChange={(
            event,
          ) =>
            setStatus(
              event.target
                .value,
            )
          }
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

          <option value="picking">
            Picking
          </option>

          <option value="packed">
            Packed
          </option>

          <option value="picked_up">
            Picked Up
          </option>

          <option value="delivered">
            Delivered
          </option>

          <option value="cancelled">
            Cancelled
          </option>
        </select>
      </div>

      <GroceryOrderTable
        orders={filtered}
      />
    </div>
  );
}