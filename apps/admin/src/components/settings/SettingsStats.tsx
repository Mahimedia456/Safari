import {
  Bell,
  Flag,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

import type {
  SystemSettings,
} from "../../types/settings";

export default function SettingsStats({
  settings,
}: {
  settings:
    SystemSettings;
}) {
  const featureCount =
    Object.values(
      settings.features,
    ).filter(Boolean).length;

  const notificationCount =
    [
      settings.notifications
        .pushEnabled,

      settings.notifications
        .emailEnabled,

      settings.notifications
        .smsEnabled,

      settings.notifications
        .whatsappEnabled,
    ].filter(Boolean).length;

  const cards = [
    {
      label:
        "Maintenance",

      value:
        settings.maintenance
          .enabled
          ? "Enabled"
          : "Normal",

      icon: ShieldCheck,
    },

    {
      label:
        "Active Features",

      value: featureCount,

      icon: Flag,
    },

    {
      label:
        "Notification Channels",

      value:
        notificationCount,

      icon: Bell,
    },

    {
      label:
        "Passenger App",

      value:
        settings.mobileApps
          .passenger.android
          .latestVersion,

      icon: Smartphone,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map(
        (card) => {
          const Icon =
            card.icon;

          return (
            <div
              key={card.label}
              className="safari-card p-5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-safari-50 text-safari-600 dark:bg-safari-500/10 dark:text-safari-400">
                <Icon size={19} />
              </div>

              <div className="mt-5 text-2xl font-bold text-slate-950 dark:text-white">
                {card.value}
              </div>

              <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {card.label}
              </div>
            </div>
          );
        },
      )}
    </div>
  );
}