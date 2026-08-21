import {
  useMemo,
  useState,
} from "react";

import {
  Search,
} from "lucide-react";

import FoodOrderTable from "../../components/food/FoodOrderTable";

import { useFoodStore } from "../../store/foodStore";

export default function FoodOrdersPage() {
  const orders =
    useFoodStore(
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
            order.restaurantName
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
          Safari Food
        </div>

        <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
          Food Orders
        </h1>
      </div>

      <div
        className="
          safari-card
          mb-5
          grid
          grid-cols-1
          gap-3
          p-4
          md:grid-cols-[1fr_220px]
        "
      >
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
            placeholder="Search order, customer or restaurant..."
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

          <option value="preparing">
            Preparing
          </option>

          <option value="ready">
            Ready
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

      <FoodOrderTable
        orders={filtered}
      />
    </div>
  );
}