import {
  useMemo,
  useState,
} from "react";

import {
  Search,
} from "lucide-react";

import TransactionTable from "../../components/finance/TransactionTable";

import {
  useFinanceStore,
} from "../../store/financeStore";

export default function TransactionsPage() {
  const transactions =
    useFinanceStore(
      (state) =>
        state.transactions,
    );

  const [search, setSearch] =
    useState("");

  const [module, setModule] =
    useState("all");

  const [region, setRegion] =
    useState("all");

  const filtered =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

      return transactions.filter(
        (transaction) => {
          const matchesSearch =
            !query ||
            transaction.id
              .toLowerCase()
              .includes(query) ||
            transaction.referenceId
              .toLowerCase()
              .includes(query) ||
            transaction.customerName
              ?.toLowerCase()
              .includes(query) ||
            transaction.partnerName
              ?.toLowerCase()
              .includes(query);

          const matchesModule =
            module === "all" ||
            transaction.module ===
              module;

          const matchesRegion =
            region === "all" ||
            transaction.region ===
              region;

          return (
            matchesSearch &&
            matchesModule &&
            matchesRegion
          );
        },
      );
    }, [
      transactions,
      search,
      module,
      region,
    ]);

  return (
    <div>
      <div className="mb-7">
        <div className="text-sm font-semibold text-safari-600">
          Safari Finance
        </div>

        <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
          Transactions
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
            onChange={(event) =>
              setSearch(
                event.target.value,
              )
            }
            className="safari-input pl-11"
            placeholder="Search transaction, customer, partner..."
          />
        </div>

        <select
          value={module}
          onChange={(event) =>
            setModule(
              event.target.value,
            )
          }
          className="safari-input"
        >
          <option value="all">
            All Modules
          </option>

          <option value="ride">
            Ride
          </option>

          <option value="food">
            Food
          </option>

          <option value="grocery">
            Grocery
          </option>

          <option value="pharmacy">
            Pharmacy
          </option>

          <option value="services">
            Services
          </option>

          <option value="wallet">
            Wallet
          </option>
        </select>

        <select
          value={region}
          onChange={(event) =>
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

      <TransactionTable
        transactions={filtered}
      />
    </div>
  );
}