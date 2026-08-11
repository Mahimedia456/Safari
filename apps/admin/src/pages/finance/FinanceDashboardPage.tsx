import {
  Link,
} from "react-router-dom";

import FinanceStats from "../../components/finance/FinanceStats";
import TransactionTable from "../../components/finance/TransactionTable";

import {
  useFinanceStore,
} from "../../store/financeStore";

export default function FinanceDashboardPage() {
  const transactions =
    useFinanceStore(
      (state) =>
        state.transactions,
    );

  const commissions =
    useFinanceStore(
      (state) =>
        state.commissions,
    );

  const payouts =
    useFinanceStore(
      (state) =>
        state.payouts,
    );

  return (
    <div>
      <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-sm font-semibold text-safari-600 dark:text-safari-400">
            Safari Finance
          </div>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
            Finance Control Center
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Payments, commissions,
            payouts, refunds and
            settlements across Safari.
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            to="/finance/revenue"
            className="safari-secondary-button"
          >
            Revenue
          </Link>

          <Link
            to="/finance/payouts/drivers"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-safari-600 px-4 text-sm font-semibold text-white"
          >
            Payouts
          </Link>
        </div>
      </div>

      <FinanceStats
        transactions={
          transactions
        }
        commissions={
          commissions
        }
        payouts={payouts}
      />

      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-semibold text-slate-950 dark:text-white">
            Recent Transactions
          </h2>

          <Link
            to="/finance/transactions"
            className="text-sm font-semibold text-safari-600"
          >
            View all
          </Link>
        </div>

        <TransactionTable
          transactions={
            transactions
          }
        />
      </div>
    </div>
  );
}