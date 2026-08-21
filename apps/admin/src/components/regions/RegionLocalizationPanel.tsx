import {
  useMarketStore,
} from "../../store/regionStore";

import type {
  SafariMarket,
} from "../../types/region";

export default function RegionLocalizationPanel({
  region,
  canEdit,
}: {
  region: SafariMarket;

  canEdit: boolean;
}) {
  const update =
    useMarketStore(
      (state) =>
        state.updateLocalization,
    );

  const settings =
    region.localization;

  return (
    <section className="safari-card p-6">
      <div>
        <div className="text-sm font-semibold text-safari-600">
          {region.flagEmoji}{" "}
          {region.name}
        </div>

        <h2 className="mt-1 text-xl font-bold text-slate-950 dark:text-white">
          Localization
        </h2>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <Field
          label="Default Language"
          value={
            settings.defaultLanguage
          }
          disabled={!canEdit}
          onChange={(value) =>
            update(region.id, {
              defaultLanguage:
                value,
            })
          }
        />

        <Field
          label="Timezone"
          value={
            settings.timezone
          }
          disabled={!canEdit}
          onChange={(value) =>
            update(region.id, {
              timezone: value,
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
            update(region.id, {
              dateFormat: value,
            })
          }
        />

        <Field
          label="Phone Prefix"
          value={
            settings.phonePrefix
          }
          disabled={!canEdit}
          onChange={(value) =>
            update(region.id, {
              phonePrefix: value,
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
              update(region.id, {
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

        <label>
          <span className="text-xs font-semibold text-slate-500">
            Supported Languages
          </span>

          <input
            value={settings.supportedLanguages.join(
              ", ",
            )}
            disabled={!canEdit}
            onChange={(event) =>
              update(region.id, {
                supportedLanguages:
                  event.target.value
                    .split(",")
                    .map((item) =>
                      item.trim(),
                    )
                    .filter(Boolean),
              })
            }
            className="safari-input mt-2"
          />
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