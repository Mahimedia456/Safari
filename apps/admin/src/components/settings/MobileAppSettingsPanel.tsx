import {
  Smartphone,
} from "lucide-react";

import {
  useSettingsStore,
} from "../../store/settingsStore";

import type {
  MobileAppPlatformSettings,
} from "../../types/settings";

import SettingToggle from "./SettingToggle";
import SettingsSectionHeader from "./SettingsSectionHeader";

type PlatformName =
  | "passenger"
  | "driver";

type OsName =
  | "android"
  | "ios";

export default function MobileAppSettingsPanel({
  canEdit,
}: {
  canEdit: boolean;
}) {
  const mobileApps =
    useSettingsStore(
      (state) =>
        state.settings.mobileApps,
    );

  const update =
    useSettingsStore(
      (state) =>
        state.updateMobileApps,
    );

  const updatePlatform = (
    app: PlatformName,
    os: OsName,
    changes:
      Partial<MobileAppPlatformSettings>,
  ) => {
    update({
      [app]: {
        ...mobileApps[app],

        [os]: {
          ...mobileApps[app][os],
          ...changes,
        },
      },
    });
  };

  return (
    <section className="safari-card p-6">
      <SettingsSectionHeader
        icon={Smartphone}
        eyebrow="Mobile Applications"
        title="App Version Control"
        description="Control minimum supported versions and force updates for passenger and driver applications."
      />

      <div className="mt-7 grid gap-6 xl:grid-cols-2">
        <AppSection
          title="Passenger Android"
          settings={
            mobileApps.passenger
              .android
          }
          disabled={!canEdit}
          onUpdate={(
            changes,
          ) =>
            updatePlatform(
              "passenger",
              "android",
              changes,
            )
          }
        />

        <AppSection
          title="Passenger iOS"
          settings={
            mobileApps.passenger
              .ios
          }
          disabled={!canEdit}
          onUpdate={(
            changes,
          ) =>
            updatePlatform(
              "passenger",
              "ios",
              changes,
            )
          }
        />

        <AppSection
          title="Driver Android"
          settings={
            mobileApps.driver
              .android
          }
          disabled={!canEdit}
          onUpdate={(
            changes,
          ) =>
            updatePlatform(
              "driver",
              "android",
              changes,
            )
          }
        />

        <AppSection
          title="Driver iOS"
          settings={
            mobileApps.driver
              .ios
          }
          disabled={!canEdit}
          onUpdate={(
            changes,
          ) =>
            updatePlatform(
              "driver",
              "ios",
              changes,
            )
          }
        />
      </div>
    </section>
  );
}

function AppSection({
  title,
  settings,
  disabled,
  onUpdate,
}: {
  title: string;

  settings:
    MobileAppPlatformSettings;

  disabled: boolean;

  onUpdate: (
    changes:
      Partial<MobileAppPlatformSettings>,
  ) => void;
}) {
  return (
    <div className="rounded-2xl border border-slate-100 p-5 dark:border-white/[0.06]">
      <h3 className="font-bold text-slate-900 dark:text-white">
        {title}
      </h3>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field
          label="Latest Version"
          value={
            settings.latestVersion
          }
          disabled={disabled}
          onChange={(value) =>
            onUpdate({
              latestVersion:
                value,
            })
          }
        />

        <Field
          label="Minimum Version"
          value={
            settings.minimumVersion
          }
          disabled={disabled}
          onChange={(value) =>
            onUpdate({
              minimumVersion:
                value,
            })
          }
        />
      </div>

      <div className="mt-4">
        <Field
          label="Store URL"
          value={
            settings.storeUrl
          }
          disabled={disabled}
          onChange={(value) =>
            onUpdate({
              storeUrl: value,
            })
          }
        />
      </div>

      <label className="mt-4 block">
        <span className="text-xs font-semibold text-slate-500">
          Update Message
        </span>

        <textarea
          rows={3}
          value={
            settings.updateMessage
          }
          disabled={disabled}
          onChange={(event) =>
            onUpdate({
              updateMessage:
                event.target.value,
            })
          }
          className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-white p-3 text-sm outline-none focus:border-safari-500 dark:border-white/10 dark:bg-[#151719] dark:text-white"
        />
      </label>

      <div className="mt-4">
        <SettingToggle
          label="Force Update"
          checked={
            settings.forceUpdate
          }
          disabled={disabled}
          onChange={(checked) =>
            onUpdate({
              forceUpdate:
                checked,
            })
          }
        />
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  disabled,
  onChange,
}: {
  label: string;

  value: string;

  disabled: boolean;

  onChange: (
    value: string,
  ) => void;
}) {
  return (
    <label>
      <span className="text-xs font-semibold text-slate-500">
        {label}
      </span>

      <input
        value={value}
        disabled={disabled}
        onChange={(event) =>
          onChange(
            event.target.value,
          )
        }
        className="safari-input mt-2"
      />
    </label>
  );
}