import {
  Globe2,
} from "lucide-react";

import {
  useSettingsStore,
} from "../../store/settingsStore";

import SettingsSectionHeader from "./SettingsSectionHeader";

export default function GeneralSettingsPanel({
  canEdit,
}: {
  canEdit: boolean;
}) {
  const settings =
    useSettingsStore(
      (state) =>
        state.settings.general,
    );

  const update =
    useSettingsStore(
      (state) =>
        state.updateGeneral,
    );

  return (
    <section className="safari-card p-6">
      <SettingsSectionHeader
        icon={Globe2}
        eyebrow="Platform"
        title="General Settings"
        description="Global Safari identity, locale and default platform configuration."
      />

      <div className="mt-7 grid gap-5 md:grid-cols-2">
        <Field
          label="Platform Name"
          value={
            settings.platformName
          }
          disabled={!canEdit}
          onChange={(value) =>
            update({
              platformName:
                value,
            })
          }
        />

        <Field
          label="Company Name"
          value={
            settings.companyName
          }
          disabled={!canEdit}
          onChange={(value) =>
            update({
              companyName:
                value,
            })
          }
        />

        <Field
          label="Default Timezone"
          value={
            settings.defaultTimezone
          }
          disabled={!canEdit}
          onChange={(value) =>
            update({
              defaultTimezone:
                value,
            })
          }
        />

        <Field
          label="Default Language"
          value={
            settings.defaultLanguage
          }
          disabled={!canEdit}
          onChange={(value) =>
            update({
              defaultLanguage:
                value,
            })
          }
        />

        <Field
          label="Default Country"
          value={
            settings.defaultCountry
          }
          disabled={!canEdit}
          onChange={(value) =>
            update({
              defaultCountry:
                value,
            })
          }
        />

        <Field
          label="Default Currency"
          value={
            settings.defaultCurrency
          }
          disabled={!canEdit}
          onChange={(value) =>
            update({
              defaultCurrency:
                value,
            })
          }
        />

        <Field
          label="Support Email"
          value={
            settings.supportEmail
          }
          disabled={!canEdit}
          onChange={(value) =>
            update({
              supportEmail:
                value,
            })
          }
        />

        <Field
          label="Support Phone"
          value={
            settings.supportPhone
          }
          disabled={!canEdit}
          onChange={(value) =>
            update({
              supportPhone:
                value,
            })
          }
        />

        <Field
          label="Date Format"
          value={
            settings.dateFormat
          }
          disabled={!canEdit}
          onChange={(value) =>
            update({
              dateFormat: value,
            })
          }
        />

        <label>
          <span className="text-xs font-semibold text-slate-500">
            Time Format
          </span>

          <select
            value={
              settings.timeFormat
            }
            disabled={!canEdit}
            onChange={(event) =>
              update({
                timeFormat:
                  event.target
                    .value as
                    | "12h"
                    | "24h",
              })
            }
            className="safari-input mt-2"
          >
            <option value="12h">
              12 Hour
            </option>

            <option value="24h">
              24 Hour
            </option>
          </select>
        </label>
      </div>
    </section>
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