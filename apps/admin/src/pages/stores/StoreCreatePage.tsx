import {
  useMemo,
  useState,
} from "react";

import {
  Plus,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import StoreFilters from "../../components/stores/StoreFilters";

import type {
  StoreFiltersState,
} from "../../components/stores/StoreFilters";

import StoreStats from "../../components/stores/StoreStats";
import StoreTable from "../../components/stores/StoreTable";

import { getStorePermissions } from "../../config/storePermissions";

import { useAuthStore } from "../../store/authStore";
import { useStoreStore } from "../../store/storeStore";

export default function StoresPage() {
  const user =
    useAuthStore(
      (state) =>
        state.user,
    );

  const stores =
    useStoreStore(
      (state) =>
        state.stores,
    );

  const [
    filters,
    setFilters,
  ] =
    useState<StoreFiltersState>(
      {
        search: "",
        type: "all",
        status: "all",
        country: "all",
      },
    );

  const permissions =
    user
      ? getStorePermissions(
          user.role,
        )
      : null;

  const filtered =
    useMemo(() => {
      const search =
        filters.search
          .trim()
          .toLowerCase();

      return stores.filter(
        (store) => {
          const matchesSearch =
            !search ||
            store.name
              .toLowerCase()
              .includes(
                search,
              ) ||
            store.merchantName
              .toLowerCase()
              .includes(
                search,
              ) ||
            store.id
              .toLowerCase()
              .includes(
                search,
              );

          const matchesType =
            filters.type ===
              "all" ||
            store.type ===
              filters.type;

          const matchesStatus =
            filters.status ===
              "all" ||
            store.status ===
              filters.status;

          const matchesCountry =
            filters.country ===
              "all" ||
            store.country ===
              filters.country;

          return (
            matchesSearch &&
            matchesType &&
            matchesStatus &&
            matchesCountry
          );
        },
      );
    }, [
      stores,
      filters,
    ]);

  return (
    <div>
      <div
        className="
          mb-7

          flex flex-col
          gap-4

          md:flex-row
          md:items-end
          md:justify-between
        "
      >
        <div>
          <div
            className="
              text-sm
              font-semibold

              text-safari-600

              dark:text-safari-400
            "
          >
            Partners
          </div>

          <h1
            className="
              mt-1

              text-3xl
              font-bold
              tracking-tight

              text-slate-950

              dark:text-white
            "
          >
            Stores
          </h1>

          <p
            className="
              mt-2

              text-sm

              text-slate-500

              dark:text-slate-400
            "
          >
            Manage merchant stores,
            approvals, location and
            individual Safari commission.
          </p>
        </div>

        {permissions?.create && (
          <Link
            to="/stores/create"
            className="
              inline-flex h-11
              items-center
              gap-2

              rounded-xl

              bg-safari-600

              px-4

              text-sm
              font-semibold

              text-white

              hover:bg-safari-700
            "
          >
            <Plus size={17} />

            Add Store
          </Link>
        )}
      </div>

      <StoreStats
        stores={stores}
      />

      <StoreFilters
        filters={
          filters
        }
        onChange={
          setFilters
        }
      />

      <StoreTable
        stores={
          filtered
        }
      />
    </div>
  );
}