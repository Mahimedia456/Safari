import {
  useState,
} from "react";

import type {
  MerchantPortalProfile,
} from "../../types/merchantPortal";

type Props = {
  profile:
    MerchantPortalProfile;

  onSave: (
    changes:
      Partial<MerchantPortalProfile>,
  ) => void;
};

export default function MerchantBusinessSettingsForm({
  profile,
  onSave,
}: Props) {
  const [
    values,
    setValues,
  ] = useState(profile);

  const update = <
    K extends keyof MerchantPortalProfile,
  >(
    key: K,
    value:
      MerchantPortalProfile[K],
  ) => {
    setValues(
      (current) => ({
        ...current,

        [key]: value,
      }),
    );
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
      <section className="safari-card p-6">
        <h2 className="text-lg font-bold text-slate-950 dark:text-white">
          Business Information
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <Field
            label="Business Name"
            value={
              values.businessName
            }
            onChange={(value) =>
              update(
                "businessName",
                value,
              )
            }
          />

          <Field
            label="Owner Name"
            value={
              values.ownerName
            }
            onChange={(value) =>
              update(
                "ownerName",
                value,
              )
            }
          />

          <Field
            label="Email"
            value={values.email}
            onChange={(value) =>
              update(
                "email",
                value,
              )
            }
          />

          <Field
            label="Phone"
            value={values.phone}
            onChange={(value) =>
              update(
                "phone",
                value,
              )
            }
          />

          <Field
            label="City"
            value={values.city}
            onChange={(value) =>
              update(
                "city",
                value,
              )
            }
          />

          <Field
            label="Business Address"
            value={
              values.businessAddress
            }
            onChange={(value) =>
              update(
                "businessAddress",
                value,
              )
            }
          />
        </div>

        <button
          type="button"
          onClick={() =>
            onSave(values)
          }
          className="mt-6 h-11 rounded-xl bg-safari-600 px-5 text-sm font-semibold text-white hover:bg-safari-700"
        >
          Save Changes
        </button>
      </section>

      <section className="safari-card p-6">
        <h2 className="text-lg font-bold text-slate-950 dark:text-white">
          Account & Finance
        </h2>

        <div className="mt-6 space-y-4">
          <Info
            label="Merchant ID"
            value={profile.id}
          />

          <Info
            label="Merchant Type"
            value={profile.role.replaceAll(
              "_",
              " ",
            )}
          />

          <Info
            label="Market"
            value={
              profile.region
            }
          />

          <Info
            label="Currency"
            value={
              profile.currency
            }
          />

          <Info
            label="Safari Commission"
            value={`${profile.commissionPercent}%`}
          />

          <Info
            label="Bank"
            value={
              profile.bankName
            }
          />

          <Info
            label="Account"
            value={
              profile.accountNumberMasked
            }
          />
        </div>

        <p className="mt-5 text-xs leading-5 text-slate-400">
          Safari commission is
          controlled by the admin.
          Merchants cannot modify
          their own commission rate.
        </p>
      </section>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;

  value: string;

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

function Info({
  label,
  value,
}: {
  label: string;

  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-100 p-4 dark:border-white/[0.06]">
      <div className="text-xs text-slate-400">
        {label}
      </div>

      <div className="mt-1 font-semibold capitalize text-slate-900 dark:text-white">
        {value}
      </div>
    </div>
  );
}