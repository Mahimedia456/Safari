import RevenueBreakdown from "../../components/finance/RevenueBreakdown";

import {
  useFinanceStore,
} from "../../store/financeStore";

export default function RevenuePage() {
  const transactions =
    useFinanceStore(
      (state) =>
        state.transactions,
    );

  return (
    <div>
      <div className="mb-7">
        <div className="text-sm font-semibold text-safari-600">
          Safari Finance
        </div>

        <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
          Revenue
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Gross transaction volume and
          Safari commission by business
          module.
        </p>
      </div>

      <RevenueBreakdown
        transactions={
          transactions
        }
      />
    </div>
  );
}