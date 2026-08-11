import {
  useMemo,
  useState,
} from "react";

import type {
  FormEvent,
} from "react";

import {
  ArrowRight,
  Building2,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Store,
  User,
} from "lucide-react";

import {
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";

import { useAuthStore } from "../../store/authStore";

import type {
  AccountRole,
  AccountType,
} from "../../types/auth";

type RoleOption = {
  label: string;
  description: string;
  value: AccountRole;
};

const administrationRoles: RoleOption[] =
  [
    {
      label: "Super Admin",
      description:
        "Full Safari platform access",
      value: "super_admin",
    },
    {
      label: "Admin",
      description:
        "General administration access",
      value: "admin",
    },
    {
      label:
        "Operations Manager",
      description:
        "Rides, merchants and operations",
      value:
        "operations_manager",
    },
    {
      label:
        "Finance Manager",
      description:
        "Revenue, transactions and payouts",
      value:
        "finance_manager",
    },
    {
      label: "Support",
      description:
        "Customer and merchant support",
      value: "support",
    },
  ];

const merchantRoles: RoleOption[] =
  [
    {
      label:
        "Food Merchant",
      description:
        "Restaurant or food business",
      value:
        "food_merchant",
    },
    {
      label:
        "Grocery Merchant",
      description:
        "Grocery or retail store",
      value:
        "grocery_merchant",
    },
    {
      label:
        "Pharmacy Merchant",
      description:
        "Pharmacy business",
      value:
        "pharmacy_merchant",
    },
    {
      label:
        "Services Merchant",
      description:
        "Service provider or business",
      value:
        "services_merchant",
    },
  ];

export default function RegisterPage() {
  const navigate =
    useNavigate();

  const user =
    useAuthStore(
      (state) => state.user,
    );

  const register =
    useAuthStore(
      (state) =>
        state.register,
    );

  const [
    accountType,
    setAccountType,
  ] =
    useState<AccountType>(
      "merchant",
    );

  const [role, setRole] =
    useState<AccountRole>(
      "food_merchant",
    );

  const [
    fullName,
    setFullName,
  ] = useState("");

  const [email, setEmail] =
    useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [error, setError] =
    useState("");

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  const roleOptions =
    useMemo(() => {
      return accountType ===
        "merchant"
        ? merchantRoles
        : administrationRoles;
    }, [accountType]);

  const selectedRole =
    roleOptions.find(
      (option) =>
        option.value ===
        role,
    );

  if (user) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  const handleAccountTypeChange = (
    nextType: AccountType,
  ) => {
    setAccountType(
      nextType,
    );

    if (
      nextType ===
      "merchant"
    ) {
      setRole(
        "food_merchant",
      );
    } else {
      setRole("admin");
    }

    setError("");
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setError("");

    if (!fullName.trim()) {
      setError(
        accountType ===
          "merchant"
          ? "Enter the business owner name."
          : "Enter your full name.",
      );

      return;
    }

    if (!email.trim()) {
      setError(
        "Enter your email address.",
      );

      return;
    }

    if (
      password.length < 8
    ) {
      setError(
        "Password must contain at least 8 characters.",
      );

      return;
    }

    if (
      password !==
      confirmPassword
    ) {
      setError(
        "Passwords do not match.",
      );

      return;
    }

    setIsSubmitting(true);

    const result =
      register({
        fullName,
        email,
        password,
        accountType,
        role,
      });

    setIsSubmitting(false);

    if (!result.success) {
      setError(
        result.message,
      );

      return;
    }

    navigate("/", {
      replace: true,
    });
  };

  return (
    <div className="w-full max-w-[560px]">
      <div
        className="
          overflow-hidden

          rounded-[28px]

          border
          border-slate-200

          bg-white

          shadow-panel

          dark:border-white/10
          dark:bg-[#111315]
        "
      >
        <div className="p-6 sm:p-8">
          <div className="mb-7">
            <div
              className="
                mb-3
                inline-flex
                items-center
                gap-2

                rounded-full

                bg-safari-50

                px-3 py-1.5

                text-xs
                font-semibold

                text-safari-700

                dark:bg-safari-500/10
                dark:text-safari-400
              "
            >
              <ShieldCheck
                size={14}
              />

              Safari Accounts
            </div>

            <h1
              className="
                text-3xl
                font-bold
                tracking-tight

                text-slate-950

                dark:text-white
              "
            >
              Create account
            </h1>

            <p
              className="
                mt-2

                text-sm
                leading-6

                text-slate-500

                dark:text-slate-400
              "
            >
              Choose the account type
              and Safari will configure
              the correct workspace and
              navigation.
            </p>
          </div>

          <form
            onSubmit={
              handleSubmit
            }
            className="space-y-5"
          >
            {/* ACCOUNT TYPE */}

            <div>
              <label
                className="
                  mb-2 block

                  text-sm
                  font-medium

                  text-slate-700

                  dark:text-slate-200
                "
              >
                Account type
              </label>

              <div
                className="
                  grid
                  grid-cols-1
                  gap-3

                  sm:grid-cols-2
                "
              >
                <button
                  type="button"
                  onClick={() =>
                    handleAccountTypeChange(
                      "administration",
                    )
                  }
                  className={[
                    "flex min-h-[86px] items-center gap-3 rounded-2xl border p-4 text-left transition",

                    accountType ===
                    "administration"
                      ? "border-safari-500 bg-safari-50 ring-4 ring-safari-500/5 dark:bg-safari-500/10"
                      : "border-slate-200 bg-white hover:border-slate-300 dark:border-white/10 dark:bg-[#151719] dark:hover:border-white/20",
                  ].join(" ")}
                >
                  <div
                    className="
                      flex h-11 w-11
                      shrink-0
                      items-center
                      justify-center

                      rounded-xl

                      bg-safari-100

                      text-safari-700

                      dark:bg-safari-500/10
                      dark:text-safari-400
                    "
                  >
                    <ShieldCheck
                      size={20}
                    />
                  </div>

                  <div>
                    <div
                      className="
                        text-sm
                        font-semibold

                        text-slate-900

                        dark:text-white
                      "
                    >
                      Administration
                    </div>

                    <div
                      className="
                        mt-1
                        text-xs

                        text-slate-400
                      "
                    >
                      Safari internal
                      team
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleAccountTypeChange(
                      "merchant",
                    )
                  }
                  className={[
                    "flex min-h-[86px] items-center gap-3 rounded-2xl border p-4 text-left transition",

                    accountType ===
                    "merchant"
                      ? "border-safari-500 bg-safari-50 ring-4 ring-safari-500/5 dark:bg-safari-500/10"
                      : "border-slate-200 bg-white hover:border-slate-300 dark:border-white/10 dark:bg-[#151719] dark:hover:border-white/20",
                  ].join(" ")}
                >
                  <div
                    className="
                      flex h-11 w-11
                      shrink-0
                      items-center
                      justify-center

                      rounded-xl

                      bg-safari-100

                      text-safari-700

                      dark:bg-safari-500/10
                      dark:text-safari-400
                    "
                  >
                    <Store
                      size={20}
                    />
                  </div>

                  <div>
                    <div
                      className="
                        text-sm
                        font-semibold

                        text-slate-900

                        dark:text-white
                      "
                    >
                      Merchant
                    </div>

                    <div
                      className="
                        mt-1
                        text-xs

                        text-slate-400
                      "
                    >
                      Store or service
                      business
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* ROLE */}

            <div>
              <label
                htmlFor="account-role"
                className="
                  mb-2 block

                  text-sm
                  font-medium

                  text-slate-700

                  dark:text-slate-200
                "
              >
                {accountType ===
                "merchant"
                  ? "Business type"
                  : "Administration role"}
              </label>

              <div className="relative">
                <Building2
                  size={18}
                  className="
                    pointer-events-none

                    absolute
                    left-4
                    top-1/2

                    -translate-y-1/2

                    text-slate-400
                  "
                />

                <select
                  id="account-role"
                  value={role}
                  onChange={(
                    event,
                  ) =>
                    setRole(
                      event.target
                        .value as AccountRole,
                    )
                  }
                  className="
                    safari-input
                    appearance-none
                    pl-11
                  "
                >
                  {roleOptions.map(
                    (option) => (
                      <option
                        key={
                          option.value
                        }
                        value={
                          option.value
                        }
                      >
                        {
                          option.label
                        }
                      </option>
                    ),
                  )}
                </select>
              </div>

              {selectedRole && (
                <div
                  className="
                    mt-2

                    text-xs

                    text-slate-400
                  "
                >
                  {
                    selectedRole.description
                  }
                </div>
              )}
            </div>

            {/* NAME */}

            <div>
              <label
                htmlFor="register-name"
                className="
                  mb-2 block

                  text-sm
                  font-medium

                  text-slate-700

                  dark:text-slate-200
                "
              >
                {accountType ===
                "merchant"
                  ? "Business owner name"
                  : "Full name"}
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="
                    pointer-events-none

                    absolute
                    left-4
                    top-1/2

                    -translate-y-1/2

                    text-slate-400
                  "
                />

                <input
                  id="register-name"
                  type="text"
                  autoComplete="name"
                  value={fullName}
                  onChange={(
                    event,
                  ) =>
                    setFullName(
                      event.target
                        .value,
                    )
                  }
                  placeholder={
                    accountType ===
                    "merchant"
                      ? "Owner full name"
                      : "Your full name"
                  }
                  className="safari-input pl-11"
                />
              </div>
            </div>

            {/* EMAIL */}

            <div>
              <label
                htmlFor="register-email"
                className="
                  mb-2 block

                  text-sm
                  font-medium

                  text-slate-700

                  dark:text-slate-200
                "
              >
                Email address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="
                    pointer-events-none

                    absolute
                    left-4
                    top-1/2

                    -translate-y-1/2

                    text-slate-400
                  "
                />

                <input
                  id="register-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(
                    event,
                  ) =>
                    setEmail(
                      event.target
                        .value,
                    )
                  }
                  placeholder="name@example.com"
                  className="safari-input pl-11"
                />
              </div>
            </div>

            {/* PASSWORD */}

            <div>
              <label
                htmlFor="register-password"
                className="
                  mb-2 block

                  text-sm
                  font-medium

                  text-slate-700

                  dark:text-slate-200
                "
              >
                Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="
                    pointer-events-none

                    absolute
                    left-4
                    top-1/2

                    -translate-y-1/2

                    text-slate-400
                  "
                />

                <input
                  id="register-password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  autoComplete="new-password"
                  value={password}
                  onChange={(
                    event,
                  ) =>
                    setPassword(
                      event.target
                        .value,
                    )
                  }
                  placeholder="Minimum 8 characters"
                  className="safari-input pl-11 pr-12"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (current) =>
                        !current,
                    )
                  }
                  className="
                    absolute
                    right-4
                    top-1/2

                    -translate-y-1/2

                    text-slate-400

                    transition

                    hover:text-slate-700

                    dark:hover:text-white
                  "
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff
                      size={18}
                    />
                  ) : (
                    <Eye
                      size={18}
                    />
                  )}
                </button>
              </div>
            </div>

            {/* CONFIRM PASSWORD */}

            <div>
              <label
                htmlFor="confirm-password"
                className="
                  mb-2 block

                  text-sm
                  font-medium

                  text-slate-700

                  dark:text-slate-200
                "
              >
                Confirm password
              </label>

              <input
                id="confirm-password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                autoComplete="new-password"
                value={
                  confirmPassword
                }
                onChange={(
                  event,
                ) =>
                  setConfirmPassword(
                    event.target
                      .value,
                  )
                }
                placeholder="Repeat password"
                className="safari-input"
              />
            </div>

            {error && (
              <div
                className="
                  rounded-xl

                  border
                  border-red-200

                  bg-red-50

                  px-4 py-3

                  text-sm

                  text-red-700

                  dark:border-red-500/20
                  dark:bg-red-500/10
                  dark:text-red-300
                "
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={
                isSubmitting
              }
              className="
                safari-primary-button
                gap-2
              "
            >
              {isSubmitting
                ? "Creating account..."
                : "Create account"}

              {!isSubmitting && (
                <ArrowRight
                  size={17}
                />
              )}
            </button>
          </form>

          <div
            className="
              mt-7

              border-t
              border-slate-100

              pt-6

              text-center

              dark:border-white/10
            "
          >
            <p
              className="
                text-sm

                text-slate-500

                dark:text-slate-400
              "
            >
              Already have an account?{" "}
              <Link
                to="/login"
                className="
                  font-semibold

                  text-safari-600

                  transition

                  hover:text-safari-700

                  dark:text-safari-400
                "
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}