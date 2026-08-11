import {
  Bell,
  Construction,
  Flag,
  Globe2,
  KeyRound,
  Scale,
  ShieldCheck,
  Smartphone,
  Store,
  Upload,
  WalletCards,
  CarFront,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import SettingsStats from "../../components/settings/SettingsStats";

import {
  useSettingsStore,
} from "../../store/settingsStore";

const cards = [
  {
    title:
      "General Settings",

    description:
      "Platform name, locale and default behavior.",

    path:
      "/settings/general",

    icon: Globe2,
  },

  {
    title:
      "Mobile Apps",

    description:
      "Version control and forced updates.",

    path:
      "/settings/mobile-apps",

    icon: Smartphone,
  },

  {
    title:
      "Maintenance",

    description:
      "Platform and app maintenance control.",

    path:
      "/settings/maintenance",

    icon:
      Construction,
  },

  {
    title:
      "Authentication",

    description:
      "Login, password and OTP policies.",

    path:
      "/settings/auth",

    icon: KeyRound,
  },

  {
    title:
      "Payments",

    description:
      "Global payment and payout defaults.",

    path:
      "/settings/payments",

    icon:
      WalletCards,
  },

  {
    title:
      "Ride Defaults",

    description:
      "Matching, waiting and safety defaults.",

    path:
      "/settings/rides",

    icon:
      CarFront,
  },

  {
    title:
      "Marketplace",

    description:
      "Food, grocery, pharmacy and services defaults.",

    path:
      "/settings/marketplace",

    icon: Store,
  },

  {
    title:
      "Notifications",

    description:
      "Push, email, SMS and events.",

    path:
      "/settings/notifications",

    icon: Bell,
  },

  {
    title:
      "Uploads",

    description:
      "File size and type restrictions.",

    path:
      "/settings/uploads",

    icon: Upload,
  },

  {
    title:
      "Support & Legal",

    description:
      "Policies and support destinations.",

    path:
      "/settings/legal",

    icon: Scale,
  },

  {
    title:
      "Feature Flags",

    description:
      "Globally control Safari features.",

    path:
      "/settings/features",

    icon: Flag,
  },

  {
    title:
      "Security",

    description:
      "MFA, sessions and audit controls.",

    path:
      "/settings/security",

    icon:
      ShieldCheck,
  },

  {
    title:
      "Audit Logs",

    description:
      "Review administrative changes.",

    path:
      "/settings/audit-logs",

    icon:
      ShieldCheck,
  },
];

export default function SettingsDashboardPage() {
  const settings =
    useSettingsStore(
      (state) =>
        state.settings,
    );

  return (
    <div>
      <div className="mb-7">
        <div className="text-sm font-semibold text-safari-600 dark:text-safari-400">
          Safari Platform
        </div>

        <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
          System Settings
        </h1>

        <p className="mt-2 max-w-3xl text-sm text-slate-500 dark:text-slate-400">
          Global configuration for the
          Safari passenger app, driver
          platform, marketplace and
          administrative system.
        </p>
      </div>

      <SettingsStats
        settings={settings}
      />

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map(
          (card) => {
            const Icon =
              card.icon;

            return (
              <Link
                key={card.path}
                to={card.path}
                className="safari-card group p-5 transition hover:-translate-y-0.5 hover:border-safari-200 dark:hover:border-safari-500/20"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-safari-50 text-safari-600 dark:bg-safari-500/10 dark:text-safari-400">
                  <Icon
                    size={19}
                  />
                </div>

                <h2 className="mt-5 font-bold text-slate-900 group-hover:text-safari-600 dark:text-white">
                  {card.title}
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  {
                    card.description
                  }
                </p>

                <div className="mt-4 text-sm font-semibold text-safari-600 dark:text-safari-400">
                  Open settings →
                </div>
              </Link>
            );
          },
        )}
      </div>
    </div>
  );
}