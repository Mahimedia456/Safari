import {
  Construction,
} from "lucide-react";

import {
  useSettingsStore,
} from "../../store/settingsStore";

import SettingToggle from "./SettingToggle";
import SettingsSectionHeader from "./SettingsSectionHeader";

export default function MaintenanceSettingsPanel({
  canEdit,
}: {
  canEdit: boolean;
}) {
  const settings =
    useSettingsStore(
      (state) =>
        state.settings.maintenance,
    );

  const update =
    useSettingsStore(
      (state) =>
        state.updateMaintenance,
    );

  return (
    <section className="safari-card p-6">
      <SettingsSectionHeader
        icon={Construction}
        eyebrow="Availability"
        title="Maintenance Mode"
        description="Disable all or selected Safari applications during planned platform maintenance."
      />

      <div className="mt-7">
        <SettingToggle
          label="Global Maintenance Mode"
          description="Platform-wide maintenance state."
          checked={
            settings.enabled
          }
          disabled={!canEdit}
          onChange={(checked) =>
            update({
              enabled: checked,
            })
          }
        />
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <SettingToggle
          label="Passenger App Disabled"
          checked={
            settings.passengerAppDisabled
          }
          disabled={!canEdit}
          onChange={(checked) =>
            update({
              passengerAppDisabled:
                checked,
            })
          }
        />

        <SettingToggle
          label="Driver App Disabled"
          checked={
            settings.driverAppDisabled
          }
          disabled={!canEdit}
          onChange={(checked) =>
            update({
              driverAppDisabled:
                checked,
            })
          }
        />

        <SettingToggle
          label="Merchant Panel Disabled"
          checked={
            settings.merchantPanelDisabled
          }
          disabled={!canEdit}
          onChange={(checked) =>
            update({
              merchantPanelDisabled:
                checked,
            })
          }
        />

        <SettingToggle
          label="Admin Panel Disabled"
          description="Super Admin should remain able to bypass this later in the backend."
          checked={
            settings.adminPanelDisabled
          }
          disabled={!canEdit}
          onChange={(checked) =>
            update({
              adminPanelDisabled:
                checked,
            })
          }
        />
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <Field
          label="Maintenance Title"
          value={settings.title}
          disabled={!canEdit}
          onChange={(value) =>
            update({
              title: value,
            })
          }
        />

        <Field
          label="Start Time"
          value={
            settings.scheduledStart ??
            ""
          }
          disabled={!canEdit}
          type="datetime-local"
          onChange={(value) =>
            update({
              scheduledStart:
                value,
            })
          }
        />

        <Field
          label="End Time"
          value={
            settings.scheduledEnd ??
            ""
          }
          disabled={!canEdit}
          type="datetime-local"
          onChange={(value) =>
            update({
              scheduledEnd:
                value,
            })
          }
        />
      </div>

      <label className="mt-5 block">
        <span className="text-xs font-semibold text-slate-500">
          Maintenance Message
        </span>

        <textarea
          rows={4}
          value={settings.message}
          disabled={!canEdit}
          onChange={(event) =>
            update({
              message:
                event.target.value,
            })
          }
          className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-white p-4 text-sm outline-none focus:border-safari-500 dark:border-white/10 dark:bg-[#151719] dark:text-white"
        />
      </label>
    </section>
  );
}

function Field({
  label,
  value,
  type = "text",
  disabled,
  onChange,
}: {
  label: string;

  value: string;

  type?: string;

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
        type={type}
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