import {
  useState,
} from "react";

import type {
  AccountRole,
} from "../../types/auth";

type FormValues = {
  fullName: string;

  email: string;

  phone: string;

  role: AccountRole;

  regionScope:
    | "all"
    | "Pakistan"
    | "Pakistan";
};

type Props = {
  onSubmit: (
    values: FormValues,
  ) => void;
};

const assignableRoles: AccountRole[] = [
  "admin",
  "operations_manager",
  "finance_manager",
  "support",
];

export default function AdminUserForm({
  onSubmit,
}: Props) {
  const [
    values,
    setValues,
  ] = useState<FormValues>({
    fullName: "",

    email: "",

    phone: "",

    role:
      "operations_manager",

    regionScope: "all",
  });

  const update = <
    K extends keyof FormValues,
  >(
    key: K,
    value:
      FormValues[K],
  ) => {
    setValues(
      (current) => ({
        ...current,

        [key]: value,
      }),
    );
  };

  const submit = (
    event:
      React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (
      !values.fullName.trim() ||
      !values.email.trim()
    ) {
      return;
    }

    onSubmit(values);
  };

  return (
    <form
      onSubmit={submit}
      className="safari-card p-6"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Field
          label="Full Name"
          value={
            values.fullName
          }
          onChange={(value) =>
            update(
              "fullName",
              value,
            )
          }
        />

        <Field
          label="Email"
          type="email"
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

        <label>
          <span className="text-xs font-semibold text-slate-500">
            Role
          </span>

          <select
            value={values.role}
            onChange={(event) =>
              update(
                "role",
                event.target
                  .value as AccountRole,
              )
            }
            className="safari-input mt-2"
          >
            {assignableRoles.map(
              (role) => (
                <option
                  key={role}
                  value={role}
                >
                  {role.replaceAll(
                    "_",
                    " ",
                  )}
                </option>
              ),
            )}
          </select>
        </label>

        <label>
          <span className="text-xs font-semibold text-slate-500">
            Market Scope
          </span>

          <select
            value={
              values.regionScope
            }
            onChange={(event) =>
              update(
                "regionScope",
                event.target
                  .value as FormValues["regionScope"],
              )
            }
            className="safari-input mt-2"
          >
            <option value="all">
              Pakistan
            </option>

            <option value="Pakistan">
              Pakistan
            </option>
          </select>
        </label>
      </div>

      <button
        type="submit"
        className="mt-6 h-11 rounded-xl bg-safari-600 px-5 text-sm font-semibold text-white hover:bg-safari-700"
      >
        Create Admin User
      </button>
    </form>
  );
}

function Field({
  label,
  type = "text",
  value,
  onChange,
}: {
  label: string;

  type?: string;

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
        type={type}
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