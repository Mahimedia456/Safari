import {
  Navigate,
} from "react-router-dom";

import MerchantEarningsTable from "../../components/merchant/MerchantEarningsTable";
import MerchantFinanceStats from "../../components/merchant/MerchantFinanceStats";

import {
  useAuthStore,
} from "../../store/authStore";

import {
  useMerchantPortalStore,
} from "../../store/merchantPortalStore";

import {
  isMerchantRole,
} from "../../types/merchantPortal";

export default function MerchantEarningsPage() {
  const user =
    useAuthStore(
      (state) => state.user,
    );

  const earnings =
    useMerchantPortalStore(
      (state) => state.earnings,
    );

  const payouts =
    useMerchantPortalStore(
      (state) => state.payouts,
    );

  const profiles =
    useMerchantPortalStore(
      (state) => state.profiles,
    );

  if (!user) {
    return null;
  }

  if (!isMerchantRole(user.role)) {
    return (
      <Navigate
        to="/access-denied"
        replace
      />
    );
  }

  const merchantRole =
    user.role;

  const profile =
    profiles.find(
      (item) =>
        item.role ===
        merchantRole,
    );

  const merchantEarnings =
    earnings.filter(
      (item) =>
        item.merchantRole ===
        merchantRole,
    );

  const merchantPayouts =
    payouts.filter(
      (item) =>
        item.merchantRole ===
        merchantRole,
    );

  return (
    <div>
      <div className="mb-7">
        <div className="text-sm font-semibold text-safari-600 dark:text-safari-400">
          Merchant Finance
        </div>

        <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
          Earnings
        </h1>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {profile?.businessName ??
            "Safari Merchant"}{" "}
          · Gross sales, commission,
          refunds and net earnings.
        </p>
      </div>

      <MerchantFinanceStats
        earnings={merchantEarnings}
        payouts={merchantPayouts}
      />

      <div className="mt-6">
        <MerchantEarningsTable
          entries={merchantEarnings}
        />
      </div>
    </div>
  );
}