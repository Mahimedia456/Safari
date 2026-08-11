import {
  Flag,
} from "lucide-react";

import {
  useSettingsStore,
} from "../../store/settingsStore";

import type {
  FeatureFlags,
} from "../../types/settings";

import SettingToggle from "./SettingToggle";
import SettingsSectionHeader from "./SettingsSectionHeader";

const flags: Array<{
  key:
    keyof FeatureFlags;

  label: string;
}> = [
  {
    key: "rides",
    label: "Rides",
  },

  {
    key: "food",
    label: "Food",
  },

  {
    key: "grocery",
    label: "Grocery",
  },

  {
    key: "pharmacy",
    label: "Pharmacy",
  },

  {
    key: "services",
    label: "Services",
  },

  {
    key: "wallet",
    label: "Wallet",
  },

  {
    key: "rewards",
    label: "Rewards",
  },

  {
    key: "referrals",
    label: "Referrals",
  },

  {
    key:
      "scheduledRides",

    label:
      "Scheduled Rides",
  },

  {
    key:
      "scheduledOrders",

    label:
      "Scheduled Orders",
  },

  {
    key:
      "surgePricing",

    label:
      "Surge Pricing",
  },

  {
    key:
      "driverFreeRideProgram",

    label:
      "Driver Free Ride Program",
  },

  {
    key:
      "passengerSafety",

    label:
      "Passenger Safety",
  },

  {
    key:
      "merchantPromotions",

    label:
      "Merchant Promotions",
  },

  {
    key:
      "liveDriverTracking",

    label:
      "Live Driver Tracking",
  },
];

export default function FeatureFlagsPanel({
  canEdit,
}: {
  canEdit: boolean;
}) {
  const settings =
    useSettingsStore(
      (state) =>
        state.settings.features,
    );

  const update =
    useSettingsStore(
      (state) =>
        state.updateFeatures,
    );

  return (
    <section className="safari-card p-6">
      <SettingsSectionHeader
        icon={Flag}
        eyebrow="Feature Management"
        title="Feature Flags"
        description="Globally expose or hide major Safari platform capabilities."
      />

      <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {flags.map(
          (flag) => (
            <SettingToggle
              key={flag.key}
              label={flag.label}
              checked={
                settings[
                  flag.key
                ]
              }
              disabled={!canEdit}
              onChange={(checked) =>
                update({
                  [flag.key]:
                    checked,
                })
              }
            />
          ),
        )}
      </div>
    </section>
  );
}