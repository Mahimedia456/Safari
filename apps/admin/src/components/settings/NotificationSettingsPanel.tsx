import {
  Bell,
} from "lucide-react";

import {
  useSettingsStore,
} from "../../store/settingsStore";

import SettingToggle from "./SettingToggle";
import SettingsSectionHeader from "./SettingsSectionHeader";

export default function NotificationSettingsPanel({
  canEdit,
}: {
  canEdit: boolean;
}) {
  const settings =
    useSettingsStore(
      (state) =>
        state.settings.notifications,
    );

  const update =
    useSettingsStore(
      (state) =>
        state.updateNotifications,
    );

  return (
    <section className="safari-card p-6">
      <SettingsSectionHeader
        icon={Bell}
        eyebrow="Communication"
        title="Notification Settings"
        description="Configure notification channels and event categories."
      />

      <div className="mt-7 grid gap-4 md:grid-cols-2">
        <SettingToggle
          label="Push Notifications"
          checked={
            settings.pushEnabled
          }
          disabled={!canEdit}
          onChange={(checked) =>
            update({
              pushEnabled:
                checked,
            })
          }
        />

        <SettingToggle
          label="Email Notifications"
          checked={
            settings.emailEnabled
          }
          disabled={!canEdit}
          onChange={(checked) =>
            update({
              emailEnabled:
                checked,
            })
          }
        />

        <SettingToggle
          label="SMS Notifications"
          checked={
            settings.smsEnabled
          }
          disabled={!canEdit}
          onChange={(checked) =>
            update({
              smsEnabled:
                checked,
            })
          }
        />

        <SettingToggle
          label="WhatsApp Notifications"
          checked={
            settings.whatsappEnabled
          }
          disabled={!canEdit}
          onChange={(checked) =>
            update({
              whatsappEnabled:
                checked,
            })
          }
        />

        <SettingToggle
          label="Ride Updates"
          checked={
            settings.rideUpdatesEnabled
          }
          disabled={!canEdit}
          onChange={(checked) =>
            update({
              rideUpdatesEnabled:
                checked,
            })
          }
        />

        <SettingToggle
          label="Order Updates"
          checked={
            settings.orderUpdatesEnabled
          }
          disabled={!canEdit}
          onChange={(checked) =>
            update({
              orderUpdatesEnabled:
                checked,
            })
          }
        />

        <SettingToggle
          label="Payout Updates"
          checked={
            settings.payoutUpdatesEnabled
          }
          disabled={!canEdit}
          onChange={(checked) =>
            update({
              payoutUpdatesEnabled:
                checked,
            })
          }
        />

        <SettingToggle
          label="Promotions"
          checked={
            settings.promotionNotificationsEnabled
          }
          disabled={!canEdit}
          onChange={(checked) =>
            update({
              promotionNotificationsEnabled:
                checked,
            })
          }
        />

        <SettingToggle
          label="Security Notifications"
          checked={
            settings.securityNotificationsEnabled
          }
          disabled={!canEdit}
          onChange={(checked) =>
            update({
              securityNotificationsEnabled:
                checked,
            })
          }
        />

        <SettingToggle
          label="System Announcements"
          checked={
            settings.systemAnnouncementsEnabled
          }
          disabled={!canEdit}
          onChange={(checked) =>
            update({
              systemAnnouncementsEnabled:
                checked,
            })
          }
        />
      </div>
    </section>
  );
}