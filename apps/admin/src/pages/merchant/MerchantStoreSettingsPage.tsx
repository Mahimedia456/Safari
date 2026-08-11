import {
  Navigate,
} from "react-router-dom";

import MerchantBusinessSettingsForm from "../../components/merchant/MerchantBusinessSettingsForm";

import {
  useAuthStore,
} from "../../store/authStore";

import {
  useMerchantPortalStore,
} from "../../store/merchantPortalStore";

import {
  isMerchantRole,
} from "../../types/merchantPortal";

export default function MerchantStoreSettingsPage() {
  const user =
    useAuthStore(
      (state) => state.user,
    );

  const profiles =
    useMerchantPortalStore(
      (state) => state.profiles,
    );

  const updateProfile =
    useMerchantPortalStore(
      (state) =>
        state.updateProfile,
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

  if (!profile) {
    return (
      <div className="safari-card p-8">
        <h1 className="text-xl font-bold text-slate-950 dark:text-white">
          Merchant profile unavailable
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          No merchant profile is
          configured for this account.
        </p>
      </div>
    );
  }

  const title =
    merchantRole ===
    "services_merchant"
      ? "Business Settings"
      : "Store Settings";

  return (
    <div>
      <div className="mb-7">
        <div className="text-sm font-semibold text-safari-600 dark:text-safari-400">
          Merchant Business
        </div>

        <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
          {title}
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Manage business contact,
          location and account
          information.
        </p>
      </div>

      <MerchantBusinessSettingsForm
        profile={profile}
        onSave={(changes) =>
          updateProfile(
            merchantRole,
            changes,
          )
        }
      />
    </div>
  );
}