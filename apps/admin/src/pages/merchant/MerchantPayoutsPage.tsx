import {
  Navigate,
} from "react-router-dom";

import MerchantFinanceStats from "../../components/merchant/MerchantFinanceStats";
import MerchantPayoutTable from "../../components/merchant/MerchantPayoutTable";

import {
  useAuthStore,
} from "../../store/authStore";

import {
  useMerchantPortalStore,
} from "../../store/merchantPortalStore";

import {
  isMerchantRole,
} from "../../types/merchantPortal";

export default function MerchantPayoutsPage() {
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
          Payouts
        </h1>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {profile?.businessName ??
            "Safari Merchant"}{" "}
          · Settlement balance and
          payout history.
        </p>
      </div>

      <MerchantFinanceStats
        earnings={merchantEarnings}
        payouts={merchantPayouts}
      />

      <div className="mt-6">
        <MerchantPayoutTable
          payouts={merchantPayouts}
        />
      </div>
    </div>
  );
}