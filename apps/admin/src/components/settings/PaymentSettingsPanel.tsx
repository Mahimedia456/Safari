import {
  WalletCards,
} from "lucide-react";

import {
  useSettingsStore,
} from "../../store/settingsStore";

import SettingToggle from "./SettingToggle";
import SettingsSectionHeader from "./SettingsSectionHeader";

export default function PaymentSettingsPanel({
  canEdit,
}: {
  canEdit: boolean;
}) {
  const settings =
    useSettingsStore(
      (state) =>
        state.settings.payments,
    );

  const update =
    useSettingsStore(
      (state) =>
        state.updatePayments,
    );

  return (
    <section className="safari-card p-6">
      <SettingsSectionHeader
        icon={WalletCards}
        eyebrow="Payments"
        title="Payment & Payout Defaults"
        description="Global payment capabilities. Market settings can disable methods for individual countries."
      />

      <div className="mt-7 grid gap-4 md:grid-cols-2">
        <SettingToggle
          label="Cash Payments"
          checked={
            settings.cashEnabled
          }
          disabled={!canEdit}
          onChange={(checked) =>
            update({
              cashEnabled:
                checked,
            })
          }
        />

        <SettingToggle
          label="Card Payments"
          checked={
            settings.cardEnabled
          }
          disabled={!canEdit}
          onChange={(checked) =>
            update({
              cardEnabled:
                checked,
            })
          }
        />

        <SettingToggle
          label="Wallet Payments"
          checked={
            settings.walletEnabled
          }
          disabled={!canEdit}
          onChange={(checked) =>
            update({
              walletEnabled:
                checked,
            })
          }
        />

        <SettingToggle
          label="Bank Transfers"
          checked={
            settings.bankTransferEnabled
          }
          disabled={!canEdit}
          onChange={(checked) =>
            update({
              bankTransferEnabled:
                checked,
            })
          }
        />

        <SettingToggle
          label="Allow Negative Wallet"
          checked={
            settings.allowNegativeWallet
          }
          disabled={!canEdit}
          onChange={(checked) =>
            update({
              allowNegativeWallet:
                checked,
            })
          }
        />

        <SettingToggle
          label="Automatic Refunds"
          checked={
            settings.automaticRefundsEnabled
          }
          disabled={!canEdit}
          onChange={(checked) =>
            update({
              automaticRefundsEnabled:
                checked,
            })
          }
        />

        <SettingToggle
          label="Automatic Payouts"
          checked={
            settings.automaticPayoutsEnabled
          }
          disabled={!canEdit}
          onChange={(checked) =>
            update({
              automaticPayoutsEnabled:
                checked,
            })
          }
        />
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
        <NumberField
          label="Minimum Wallet Top-up"
          value={
            settings.minimumWalletTopup
          }
          disabled={!canEdit}
          onChange={(value) =>
            update({
              minimumWalletTopup:
                value,
            })
          }
        />

        <NumberField
          label="Maximum Wallet Top-up"
          value={
            settings.maximumWalletTopup
          }
          disabled={!canEdit}
          onChange={(value) =>
            update({
              maximumWalletTopup:
                value,
            })
          }
        />

        <NumberField
          label="Driver Payout Minimum"
          value={
            settings.driverPayoutMinimum
          }
          disabled={!canEdit}
          onChange={(value) =>
            update({
              driverPayoutMinimum:
                value,
            })
          }
        />

        <NumberField
          label="Merchant Payout Minimum"
          value={
            settings.merchantPayoutMinimum
          }
          disabled={!canEdit}
          onChange={(value) =>
            update({
              merchantPayoutMinimum:
                value,
            })
          }
        />

        <NumberField
          label="Payout Processing Days"
          value={
            settings.payoutProcessingDays
          }
          disabled={!canEdit}
          onChange={(value) =>
            update({
              payoutProcessingDays:
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