import {
  ShieldCheck,
} from "lucide-react";

import {
  useSettingsStore,
} from "../../store/settingsStore";

import SettingToggle from "./SettingToggle";
import SettingsSectionHeader from "./SettingsSectionHeader";

export default function SecuritySettingsPanel({
  canEdit,
}: {
  canEdit: boolean;
}) {
  const settings =
    useSettingsStore(
      (state) =>
        state.settings.security,
    );

  const update =
    useSettingsStore(
      (state) =>
        state.updateSecurity,
    );

  return (
    <section className="safari-card p-6">
      <SettingsSectionHeader
        icon={ShieldCheck}
        eyebrow="Security"
        title="Security & Audit"
        description="Internal authentication protection and administrative auditing behavior."
      />

      <div className="mt-7 grid gap-4 md:grid-cols-2">
        <SettingToggle
          label="Audit Logging"
          checked={
            settings.auditLoggingEnabled
          }
          disabled={!canEdit}
          onChange={(checked) =>
            update({
              auditLoggingEnabled:
                checked,
            })
          }
        />

        <SettingToggle
          label="Login Audit"
          checked={
            settings.loginAuditEnabled
          }
          disabled={!canEdit}
          onChange={(checked) =>
            update({
              loginAuditEnabled:
                checked,
            })
          }
        />

        <SettingToggle
          label="Financial Audit"
          checked={
            settings.financialAuditEnabled
          }
          disabled={!canEdit}
          onChange={(checked) =>
            update({
              financialAuditEnabled:
                checked,
            })
          }
        />

        <SettingToggle
          label="Admin Action Audit"
          checked={
            settings.adminActionAuditEnabled
          }
          disabled={!canEdit}
          onChange={(checked) =>
            update({
              adminActionAuditEnabled:
                checked,
            })
          }
        />

        <SettingToggle
          label="Require Admin MFA"
          checked={
            settings.requireAdminMfa
          }
          disabled={!canEdit}
          onChange={(checked) =>
            update({
              requireAdminMfa:
                checked,
            })
          }
        />

        <SettingToggle
          label="Concurrent Sessions"
          checked={
            settings.allowConcurrentSessions
          }
          disabled={!canEdit}
          onChange={(checked) =>
            update({
              allowConcurrentSessions:
                checked,
            })
          }
        />
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <NumberField
          label="Maximum Login Attempts"
          value={
            settings.maxLoginAttempts
          }
          disabled={!canEdit}
          onChange={(value) =>
            update({
              maxLoginAttempts:
                value,
            })
          }
        />

        <NumberField
          label="Lockout Minutes"
          value={
            settings.lockoutMinutes
          }
          disabled={!canEdit}
          onChange={(value) =>
            update({
              lockoutMinutes:
                value,
            })
          }
        />

        <NumberField
          label="Idle Timeout Minutes"
          value={
            settings.sessionIdleTimeoutMinutes
          }
          disabled={!canEdit}
          onChange={(value) =>
            update({
              sessionIdleTimeoutMinutes:
                value,
            })
          }
        />
      </div>
    </section>
  );
}

function NumberField({
  label,
  value,
  disabled,
  onChange,
}: {
  label: string;

  value: number;

  disabled: boolean;

  onChange: (
    value: number,
  ) => void;
}) {
  return (
    <label>
      <span className="text-xs font-semibold text-slate-500">
        {label}
      </span>

      <input
        type="number"
        min="0"
        value={value}
        disabled={disabled}
        onChange={(event) =>
          onChange(
            Number(
              event.target.value,
            ),
          )
        }
        className="safari-input mt-2"
      />
    </label>
  );
}