import PayoutTable from "../../components/finance/PayoutTable";

import {
  getFinancePermissions,
} from "../../config/financePermissions";

import {
  useAuthStore,
} from "../../store/authStore";

import {
  useFinanceStore,
} from "../../store/financeStore";

export default function MerchantPayoutsPage() {
  const user =
    useAuthStore(
      (state) =>
        state.user,
    );

  const payouts =
    useFinanceStore(
      (state) =>
        state.payouts.filter(
          (item) =>
            item.recipientType ===
            "merchant",
        ),
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
          Safari Merchants
        </div>

        <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
          Merchant Payouts
        </h1>
      </div>

      <PayoutTable
        payouts={payouts}
        canManage={
          permissions.managePayouts
        }
      />
    </div>
  );
}