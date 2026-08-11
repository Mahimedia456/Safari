import type {
  ReactNode,
} from "react";

import {
  Navigate,
} from "react-router-dom";

import { useAuthStore } from "../../store/authStore";

type Props = {
  children: ReactNode;
};

export default function ProtectedRoute({
  children,
}: Props) {
  const user =
    useAuthStore(
      (state) =>
        state.user,
    );

  const initialized =
    useAuthStore(
      (state) =>
        state.initialized,
    );

  if (!initialized) {
    return (
      <div
        className="
          flex min-h-screen
          items-center
          justify-center

          bg-[#f6f7f9]

          dark:bg-[#090a0c]
        "
      >
        <div
          className="
            h-9 w-9

            animate-spin

            rounded-full

            border-[3px]
            border-slate-200
            border-t-safari-600

            dark:border-white/10
            dark:border-t-safari-400
          "
        />
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return children;
}