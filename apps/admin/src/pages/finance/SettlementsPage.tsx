import SettlementTable from "../../components/finance/SettlementTable";

import {
  getFinancePermissions,
} from "../../config/financePermissions";

import {
  useAuthStore,
} from "../../store/authStore";

import {
  useFinanceStore,
} from "../../store/financeStore";

export default function SettlementsPage() {
  const user =
    useAuthStore(
      (state) =>
        state.user,
    );

  const settlements =
    useFinanceStore(
      (state) =>
        state.settlements,
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
          Settlement Engine
        </div>

        <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
          Settlements
        </h1>
      </div>

      <SettlementTable
        settlements={
          settlements
        }
        canManage={
          permissions.manageSettlements
        }
      />
    </div>
  );
}