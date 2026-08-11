import type {
  ReactNode,
} from "react";

import {
  Navigate,
} from "react-router-dom";

import { getStorePermissions } from "../../config/storePermissions";

import { useAuthStore } from "../../store/authStore";

type Action =
  | "create"
  | "edit";

interface Props {
  action: Action;
  children: ReactNode;
}

export default function StoreActionGuard({
  action,
  children,
}: Props) {
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

  const permissions =
    getStorePermissions(
      user.role,
    );

  const allowed =
    action === "create"
      ? permissions.create
      : permissions.edit;

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