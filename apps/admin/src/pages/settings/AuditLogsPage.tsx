import {
  Navigate,
} from "react-router-dom";

import AuditLogTable from "../../components/settings/AuditLogTable";

import {
  getSettingsPermissions,
} from "../../config/settingsPermissions";

import {
  useAuthStore,
} from "../../store/authStore";

import {
  useSettingsStore,
} from "../../store/settingsStore";

export default function AuditLogsPage() {
  const user =
    useAuthStore(
      (state) =>
        state.user,
    );

  const logs =
    useSettingsStore(
      (state) =>
        state.auditLogs,
    );

  if (!user) {
    return null;
  }

  const permissions =
    getSettingsPermissions(
      user.role,
    );

  if (
    !permissions.viewAuditLogs
  ) {
    return (
      <Navigate
        to="/access-denied"
        replace
      />
    );
  }

  return (
    <div>
      <div className="mb-7">
        <div className="text-sm font-semibold text-safari-600">
          Security
        </div>

        <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
          Audit Logs
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Administrative, security and
          financial configuration
          activity.
        </p>
      </div>

      <AuditLogTable
        logs={logs}
      />
    </div>
  );
}