import {
  useState,
} from "react";

import type {
  FormEvent,
} from "react";

import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Store,
} from "lucide-react";

import {
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";

import { useAuthStore } from "../../store/authStore";

type DemoAccount = {
  label: string;
  description: string;
  email: string;
  password: string;
  type: "admin" | "merchant";
};

const demoAccounts: DemoAccount[] = [
  {
    label: "Super Admin",
    description: "Complete platform access",
    email: "admin@safari.com",
    password: "safarimobile",
    type: "admin",
  },
  {
    label: "Food Merchant",
    description: "Restaurant / food store",
    email: "food@safari.com",
    password: "safarimobile",
    type: "merchant",
  },
  {
    label: "Grocery Merchant",
    description: "Grocery store",
    email: "grocery@safari.com",
    password: "safarimobile",
    type: "merchant",
  },
  {
    label: "Pharmacy Merchant",
    description: "Pharmacy store",
    email: "pharmacy@safari.com",
    password: "safarimobile",
    type: "merchant",
  },
  {
    label: "Services Merchant",
    description: "Service business",
    email: "services@safari.com",
    password: "safarimobile",
    type: "merchant",
  },
];

export default function LoginPage() {
  const navigate =
    useNavigate();

  const user =
    useAuthStore(
      (state) => state.user,
    );

  const login =
    useAuthStore(
      (state) => state.login,
    );

  const [email, setEmail] =
    useState("");

  const [
    password,
    setPassword,
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

  if (user) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setError("");

    if (!email.trim()) {
      setError(
        "Enter your email address.",
      );

      return;
    }

    if (!password) {
      setError(
        "Enter your password.",
      );

      return;
    }

    setIsSubmitting(true);

    const result = await login({
      email,
      password,
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

  const useDemoAccount = (
    account: DemoAccount,
  ) => {
    setError("");

    setEmail(
      account.email,
    );

    setPassword(
      account.password,
    );
  };

  return (
    <div className="w-full max-w-[520px]">
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
          <div className="mb-8">
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

              Safari Control Center
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
              Welcome back
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
              Sign in to manage Safari
              operations, merchants,
              drivers and services.
            </p>
          </div>

          <form
            onSubmit={
              handleSubmit
            }
            className="space-y-5"
          >
            <div>
              <label
                htmlFor="login-email"
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
                  id="login-email"
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
                  placeholder="name@safari.com"
                  className="safari-input pl-11"
                />
              </div>
            </div>

            <div>
              <div
                className="
                  mb-2
                  flex
                  items-center
                  justify-between
                "
              >
                <label
                  htmlFor="login-password"
                  className="
                    text-sm
                    font-medium

                    text-slate-700

                    dark:text-slate-200
                  "
                >
                  Password
                </label>

                <button
                  type="button"
                  className="
                    text-xs
                    font-semibold

                    text-safari-600

                    transition

                    hover:text-safari-700

                    dark:text-safari-400
                    dark:hover:text-safari-300
                  "
                >
                  Forgot password?
                </button>
              </div>

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
                  id="login-password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  autoComplete="current-password"
                  value={password}
                  onChange={(
                    event,
                  ) =>
                    setPassword(
                      event.target
                        .value,
                    )
                  }
                  placeholder="Enter password"
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
                ? "Signing in..."
                : "Sign in"}

              {!isSubmitting && (
                <ArrowRight
                  size={17}
                />
              )}
            </button>
          </form>

          {/* DEMO ACCOUNTS */}

          <div
            className="
              mt-7

              border-t
              border-slate-100

              pt-6

              dark:border-white/10
            "
          >
            <div
              className="
                flex
                items-start
                justify-between
                gap-4
              "
            >
              <div>
                <h2
                  className="
                    text-sm
                    font-semibold

                    text-slate-900

                    dark:text-white
                  "
                >
                  Demo accounts
                </h2>

                <p
                  className="
                    mt-1

                    text-xs

                    text-slate-500

                    dark:text-slate-400
                  "
                >
                  Select any role to
                  auto-fill login details.
                </p>
              </div>

              <span
                className="
                  rounded-lg

                  bg-slate-100

                  px-2 py-1

                  text-[10px]
                  font-semibold

                  text-slate-500

                  dark:bg-white/[0.06]
                  dark:text-slate-400
                "
              >
                DEMO
              </span>
            </div>

            <div className="mt-4 space-y-2">
              {demoAccounts.map(
                (account) => (
                  <button
                    key={
                      account.email
                    }
                    type="button"
                    onClick={() =>
                      useDemoAccount(
                        account,
                      )
                    }
                    className="
                      flex w-full
                      items-center
                      gap-3

                      rounded-xl

                      border
                      border-slate-200

                      bg-slate-50/60

                      p-3

                      text-left

                      transition

                      hover:border-safari-300
                      hover:bg-safari-50

                      dark:border-white/10
                      dark:bg-white/[0.025]

                      dark:hover:border-safari-500/30
                      dark:hover:bg-safari-500/[0.06]
                    "
                  >
                    <div
                      className="
                        flex h-9 w-9
                        shrink-0

                        items-center
                        justify-center

                        rounded-lg

                        bg-white

                        text-safari-600

                        shadow-sm

                        dark:bg-[#181a1d]
                        dark:text-safari-400
                      "
                    >
                      {account.type ===
                      "admin" ? (
                        <ShieldCheck
                          size={17}
                        />
                      ) : (
                        <Store
                          size={17}
                        />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div
                        className="
                          text-xs
                          font-semibold

                          text-slate-800

                          dark:text-slate-200
                        "
                      >
                        {
                          account.label
                        }
                      </div>

                      <div
                        className="
                          mt-0.5

                          truncate

                          text-[11px]

                          text-slate-400
                        "
                      >
                        {
                          account.description
                        }
                      </div>
                    </div>

                    <span
                      className="
                        shrink-0

                        text-[11px]
                        font-semibold

                        text-safari-600

                        dark:text-safari-400
                      "
                    >
                      Use
                    </span>
                  </button>
                ),
              )}
            </div>

            <div
              className="
                mt-3

                rounded-xl

                bg-slate-50

                px-3 py-2.5

                text-xs

                text-slate-500

                dark:bg-white/[0.03]
                dark:text-slate-400
              "
            >
              Demo password for all
              accounts:{" "}
              <span
                className="
                  font-semibold

                  text-slate-700

                  dark:text-slate-200
                "
              >
                12345678
              </span>
            </div>
          </div>

          {/* REGISTER */}

          <div
            className="
              mt-6

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
              Don't have an account?{" "}
              <Link
                to="/register"
                className="
                  font-semibold

                  text-safari-600

                  transition

                  hover:text-safari-700

                  dark:text-safari-400
                "
              >
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      <p
        className="
          mt-5

          text-center

          text-xs

          text-slate-400

          dark:text-slate-600
        "
      >
        Safari Administration Platform
      </p>
    </div>
  );
}