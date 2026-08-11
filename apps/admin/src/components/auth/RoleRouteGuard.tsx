import type {
  ReactNode,
} from "react";

import {
  Navigate,
  useLocation,
} from "react-router-dom";

import { canRoleAccessPath } from "../../config/navigation";

import { useAuthStore } from "../../store/authStore";

type Props = {
  children: ReactNode;
};

export default function RoleRouteGuard({
  children,
}: Props) {
  const location =
    useLocation();

  const user =
    useAuthStore(
      (state) =>
        state.user,
    );

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  const allowed =
    canRoleAccessPath(
      user.role,
      location.pathname,
    );

  if (!allowed) {
    return (
      <Navigate
        to="/access-denied"
        replace
      />
    );
  }

  return children;
}