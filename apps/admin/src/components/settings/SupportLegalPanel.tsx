import {
  Scale,
} from "lucide-react";

import {
  useSettingsStore,
} from "../../store/settingsStore";

import SettingsSectionHeader from "./SettingsSectionHeader";

export default function SupportLegalPanel({
  canEdit,
}: {
  canEdit: boolean;
}) {
  const settings =
    useSettingsStore(
      (state) =>
        state.settings.supportLegal,
    );

  const update =
    useSettingsStore(
      (state) =>
        state.updateSupportLegal,
    );

  const fields = [
    {
      key:
        "helpCenterUrl",

      label:
        "Help Center URL",
    },

    {
      key:
        "privacyPolicyUrl",

      label:
        "Privacy Policy URL",
    },

    {
      key: "termsUrl",

      label:
        "Terms URL",
    },

    {
      key:
        "driverTermsUrl",

      label:
        "Driver Terms URL",
    },

    {
      key:
        "merchantTermsUrl",

      label:
        "Merchant Terms URL",
    },

    {
      key:
        "refundPolicyUrl",

      label:
        "Refund Policy URL",
    },

    {
      key: "safetyUrl",

      label:
        "Safety URL",
    },

    {
      key:
        "contactEmail",

      label:
        "Contact Email",
    },

    {
      key: "legalEmail",

      label:
        "Legal Email",
    },
  ] as const;

  return (
    <section className="safari-card p-6">
      <SettingsSectionHeader
        icon={Scale}
        eyebrow="Legal"
        title="Support & Legal"
        description="Public support resources and policy destinations used by mobile and web applications."
      />

      <div className="mt-7 grid gap-5 md:grid-cols-2">
        {fields.map(
          (field) => (
            <label
              key={field.key}
            >
              <span className="text-xs font-semibold text-slate-500">
                {field.label}
              </span>

              <input
                value={
                  settings[
                    field.key
                  ]
                }
                disabled={
                  !canEdit
                }
                onChange={(
                  event,
                ) =>
                  update({
                    [field.key]:
                      event.target
                        .value,
                  })
                }
                className="safari-input mt-2"
              />
            </label>
          ),
        )}
      </div>

      <label className="mt-5 block">
        <span className="text-xs font-semibold text-slate-500">
          Company Address
        </span>

        <textarea
          rows={4}
          value={
            settings.companyAddress
          }
          disabled={!canEdit}
          onChange={(event) =>
            update({
              companyAddress:
                event.target.value,
            })
          }
          className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-white p-4 text-sm outline-none focus:border-safari-500 dark:border-white/10 dark:bg-[#151719] dark:text-white"
        />
      </label>
    </section>
  );
}