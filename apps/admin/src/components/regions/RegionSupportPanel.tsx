import {
  useRegionStore,
} from "../../store/regionStore";

import type {
  SafariRegion,
} from "../../types/region";

export default function RegionSupportPanel({
  region,
  canEdit,
}: {
  region: SafariRegion;

  canEdit: boolean;
}) {
  const update =
    useRegionStore(
      (state) =>
        state.updateSupport,
    );

  const support =
    region.support;

  return (
    <section className="safari-card p-6">
      <div>
        <div className="text-sm font-semibold text-safari-600">
          {region.flagEmoji}{" "}
          {region.name}
        </div>

        <h2 className="mt-1 text-xl font-bold text-slate-950 dark:text-white">
          Support & Emergency
        </h2>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <Field
          label="Support Email"
          value={
            support.supportEmail
          }
          disabled={!canEdit}
          onChange={(value) =>
            update(region.id, {
              supportEmail: value,
            })
          }
        />

        <Field
          label="Support Phone"
          value={
            support.supportPhone
          }
          disabled={!canEdit}
          onChange={(value) =>
            update(region.id, {
              supportPhone: value,
            })
          }
        />

        <Field
          label="Emergency Phone"
          value={
            support.emergencyPhone
          }
          disabled={!canEdit}
          onChange={(value) =>
            update(region.id, {
              emergencyPhone:
                value,
            })
          }
        />
      </div>

      <label className="mt-5 block">
        <span className="text-xs font-semibold text-slate-500">
          Emergency Message
        </span>

        <textarea
          rows={4}
          value={
            support.emergencyMessage
          }
          disabled={!canEdit}
          onChange={(event) =>
            update(region.id, {
              emergencyMessage:
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