import {
  KeyRound,
} from "lucide-react";

import {
  useSettingsStore,
} from "../../store/settingsStore";

import SettingToggle from "./SettingToggle";
import SettingsSectionHeader from "./SettingsSectionHeader";

export default function AuthSettingsPanel({
  canEdit,
}: {
  canEdit: boolean;
}) {
  const settings =
    useSettingsStore(
      (state) =>
        state.settings.auth,
    );

  const update =
    useSettingsStore(
      (state) =>
        state.updateAuth,
    );

  return (
    <section className="safari-card p-6">
      <SettingsSectionHeader
        icon={KeyRound}
        eyebrow="Authentication"
        title="Login & OTP Settings"
        description="Global authentication, password and OTP policies."
      />

      <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <NumberField
          label="OTP Length"
          value={settings.otpLength}
          disabled={!canEdit}
          onChange={(value) =>
            update({
              otpLength: value,
            })
          }
        />

        <NumberField
          label="OTP Expiry Minutes"
          value={
            settings.otpExpiryMinutes
          }
          disabled={!canEdit}
          onChange={(value) =>
            update({
              otpExpiryMinutes:
                value,
            })
          }
        />

        <NumberField
          label="OTP Resend Seconds"
          value={
            settings.otpResendSeconds
          }
          disabled={!canEdit}
          onChange={(value) =>
            update({
              otpResendSeconds:
                value,
            })
          }
        />

        <NumberField
          label="Max OTP Attempts"
          value={
            settings.maxOtpAttempts
          }
          disabled={!canEdit}
          onChange={(value) =>
            update({
              maxOtpAttempts:
                value,
            })
          }
        />

        <NumberField
          label="Password Min Length"
          value={
            settings.passwordMinLength
          }
          disabled={!canEdit}
          onChange={(value) =>
            update({
              passwordMinLength:
                value,
            })
          }
        />

        <NumberField
          label="Session Expiry Hours"
          value={
            settings.sessionExpiryHours
          }
          disabled={!canEdit}
          onChange={(value) =>
            update({
              sessionExpiryHours:
                value,
            })
          }
        />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <SettingToggle
          label="Allow Email Login"
          checked={
            settings.allowEmailLogin
          }
          disabled={!canEdit}
          onChange={(checked) =>
            update({
              allowEmailLogin:
                checked,
            })
          }
        />

        <SettingToggle
          label="Allow Phone Login"
          checked={
            settings.allowPhoneLogin
          }
          disabled={!canEdit}
          onChange={(checked) =>
            update({
              allowPhoneLogin:
                checked,
            })
          }
        />

        <SettingToggle
          label="Google Login"
          checked={
            settings.allowGoogleLogin
          }
          disabled={!canEdit}
          onChange={(checked) =>
            update({
              allowGoogleLogin:
                checked,
            })
          }
        />

        <SettingToggle
          label="Apple Login"
          checked={
            settings.allowAppleLogin
          }
          disabled={!canEdit}
          onChange={(checked) =>
            update({
              allowAppleLogin:
                checked,
            })
          }
        />

        <SettingToggle
          label="Require Uppercase"
          checked={
            settings.requireUppercase
          }
          disabled={!canEdit}
          onChange={(checked) =>
            update({
              requireUppercase:
                checked,
            })
          }
        />

        <SettingToggle
          label="Require Number"
          checked={
            settings.requireNumber
          }
          disabled={!canEdit}
          onChange={(checked) =>
            update({
              requireNumber:
                checked,
            })
          }
        />

        <SettingToggle
          label="Require Special Character"
          checked={
            settings.requireSpecialCharacter
          }
          disabled={!canEdit}
          onChange={(checked) =>
            update({
              requireSpecialCharacter:
                checked,
            })
          }
        />

        <SettingToggle
          label="Require Phone Verification"
          checked={
            settings.requirePhoneVerification
          }
          disabled={!canEdit}
          onChange={(checked) =>
            update({
              requirePhoneVerification:
                checked,
            })
          }
        />

        <SettingToggle
          label="Require Email Verification"
          checked={
            settings.requireEmailVerification
          }
          disabled={!canEdit}
          onChange={(checked) =>
            update({
              requireEmailVerification:
                checked,
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