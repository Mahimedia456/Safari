import {
  Store,
} from "lucide-react";

import {
  useSettingsStore,
} from "../../store/settingsStore";

import SettingToggle from "./SettingToggle";
import SettingsSectionHeader from "./SettingsSectionHeader";

export default function MarketplaceDefaultsPanel({
  canEdit,
}: {
  canEdit: boolean;
}) {
  const settings =
    useSettingsStore(
      (state) =>
        state.settings.marketplace,
    );

  const update =
    useSettingsStore(
      (state) =>
        state.updateMarketplace,
    );

  return (
    <section className="safari-card p-6">
      <SettingsSectionHeader
        icon={Store}
        eyebrow="Marketplace"
        title="Marketplace Defaults"
        description="Default behavior shared by Food, Grocery, Pharmacy and Services."
      />

      <div className="mt-7">
        <label>
          <span className="text-xs font-semibold text-slate-500">
            Default Preparation Minutes
          </span>

          <input
            type="number"
            min="0"
            value={
              settings.defaultPreparationMinutes
            }
            disabled={!canEdit}
            onChange={(event) =>
              update({
                defaultPreparationMinutes:
                  Number(
                    event.target
                      .value,
                  ),
              })
            }
            className="safari-input mt-2 max-w-xs"
          />
        </label>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <SettingToggle
          label="Food Order Auto Accept"
          checked={
            settings.foodOrderAutoAccept
          }
          disabled={!canEdit}
          onChange={(checked) =>
            update({
              foodOrderAutoAccept:
                checked,
            })
          }
        />

        <SettingToggle
          label="Grocery Order Auto Accept"
          checked={
            settings.groceryOrderAutoAccept
          }
          disabled={!canEdit}
          onChange={(checked) =>
            update({
              groceryOrderAutoAccept:
                checked,
            })
          }
        />

        <SettingToggle
          label="Pharmacy Order Auto Accept"
          checked={
            settings.pharmacyOrderAutoAccept
          }
          disabled={!canEdit}
          onChange={(checked) =>
            update({
              pharmacyOrderAutoAccept:
                checked,
            })
          }
        />

        <SettingToggle
          label="Service Booking Auto Accept"
          checked={
            settings.servicesBookingAutoAccept
          }
          disabled={!canEdit}
          onChange={(checked) =>
            update({
              servicesBookingAutoAccept:
                checked,
            })
          }
        />

        <SettingToggle
          label="Merchant Cancellation Reason"
          checked={
            settings.merchantCancellationReasonRequired
          }
          disabled={!canEdit}
          onChange={(checked) =>
            update({
              merchantCancellationReasonRequired:
                checked,
            })
          }
        />

        <SettingToggle
          label="Customer Cancellation Reason"
          checked={
            settings.customerCancellationReasonRequired
          }
          disabled={!canEdit}
          onChange={(checked) =>
            update({
              customerCancellationReasonRequired:
                checked,
            })
          }
        />

        <SettingToggle
          label="Reviews"
          checked={
            settings.reviewsEnabled
          }
          disabled={!canEdit}
          onChange={(checked) =>
            update({
              reviewsEnabled:
                checked,
            })
          }
        />

        <SettingToggle
          label="Customer Tips"
          checked={
            settings.tipsEnabled
          }
          disabled={!canEdit}
          onChange={(checked) =>
            update({
              tipsEnabled: checked,
            })
          }
        />

        <SettingToggle
          label="Scheduled Orders"
          checked={
            settings.scheduledOrdersEnabled
          }
          disabled={!canEdit}
          onChange={(checked) =>
            update({
              scheduledOrdersEnabled:
                checked,
            })
          }
        />

        <SettingToggle
          label="Merchant Chat"
          checked={
            settings.merchantChatEnabled
          }
          disabled={!canEdit}
          onChange={(checked) =>
            update({
              merchantChatEnabled:
                checked,
            })
          }
        />
      </div>
    </section>
  );
}