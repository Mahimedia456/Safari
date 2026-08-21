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

import MerchantFilters from "../../components/merchants/MerchantFilters";
import MerchantStats from "../../components/merchants/MerchantStats";
import MerchantTable from "../../components/merchants/MerchantTable";

import type {
  MerchantFilterState,
} from "../../components/merchants/MerchantFilters";

import { useMerchantStore } from "../../store/merchantStore";

export default function MerchantsPage() {
  const merchants =
    useMerchantStore(
      (state) =>
        state.merchants,
    );

  const [
    filters,
    setFilters,
  ] =
    useState<MerchantFilterState>(
      {
        search: "",

        status: "all",

        type: "all",

        country: "all",
      },
    );

  const filtered =
    useMemo(() => {
      const search =
        filters.search
          .trim()
          .toLowerCase();

      return (merchants ?? []).filter(
        (merchant) => {
          const matchesSearch =
            !search ||
            merchant.businessName
              .toLowerCase()
              .includes(
                search,
              ) ||
            merchant.ownerName
              .toLowerCase()
              .includes(
                search,
              ) ||
            merchant.email
              .toLowerCase()
              .includes(
                search,
              ) ||
            merchant.id
              .toLowerCase()
              .includes(
                search,
              );

          const matchesStatus =
            filters.status ===
              "all" ||
            merchant.status ===
              filters.status;

          const matchesType =
            filters.type ===
              "all" ||
            merchant.type ===
              filters.type;

          const matchesCountry =
            filters.country ===
              "all" ||
            merchant.country ===
              filters.country;

          return (
            matchesSearch &&
            matchesStatus &&
            matchesType &&
            matchesCountry
          );
        },
      );
    }, [
      filters,
      merchants,
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
            Merchants
          </h1>

          <p
            className="
              mt-2

              text-sm

              text-slate-500

              dark:text-slate-400
            "
          >
            Manage Safari food,
            grocery, pharmacy and
            services partners.
          </p>
        </div>

        <div
          className="
            flex
            flex-wrap
            gap-2
          "
        >
          <Link
            to="/merchants/applications"
            className="
              safari-secondary-button
            "
          >
            Applications
          </Link>

          <button
            type="button"
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

            Add Merchant
          </button>
        </div>
      </div>

      <MerchantStats
        merchants={
          merchants
        }
      />

      <MerchantFilters
        filters={
          filters
        }
        onChange={
          setFilters
        }
      />

      <MerchantTable
        merchants={
          filtered
        }
      />
    </div>
  );
}