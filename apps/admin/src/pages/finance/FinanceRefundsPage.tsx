import FinanceRefundTable from "../../components/finance/FinanceRefundTable";

import {
  getFinancePermissions,
} from "../../config/financePermissions";

import {
  useAuthStore,
} from "../../store/authStore";

import {
  useFinanceStore,
} from "../../store/financeStore";

export default function FinanceRefundsPage() {
  const user =
    useAuthStore(
      (state) =>
        state.user,
    );

  const refunds =
    useFinanceStore(
      (state) =>
        state.refunds,
    );

  if (!user) {
    return null;
  }

  const permissions =
    getFinancePermissions(
      user.role,
    );

  return (
    <div>
      <div className="mb-7">
        <div className="text-sm font-semibold text-safari-600">
          Safari Finance
        </div>

        <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
          Refunds
        </h1>
      </div>

      <FinanceRefundTable
        refunds={refunds}
        canManage={
          permissions.manageRefunds
        }
      />
    </div>
  );
}