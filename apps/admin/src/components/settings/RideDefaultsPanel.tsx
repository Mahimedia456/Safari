import {
  CarFront,
} from "lucide-react";

import {
  useSettingsStore,
} from "../../store/settingsStore";

import SettingToggle from "./SettingToggle";
import SettingsSectionHeader from "./SettingsSectionHeader";

export default function RideDefaultsPanel({
  canEdit,
}: {
  canEdit: boolean;
}) {
  const settings =
    useSettingsStore(
      (state) =>
        state.settings.rides,
    );

  const update =
    useSettingsStore(
      (state) =>
        state.updateRides,
    );

  return (
    <section className="safari-card p-6">
      <SettingsSectionHeader
        icon={CarFront}
        eyebrow="Ride Operations"
        title="Ride Defaults"
        description="Operational defaults shared by the ride engine before more specific pricing or region rules are applied."
      />

      <div className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <Field
          label="Search Radius KM"
          value={
            settings.searchRadiusKm
          }
          disabled={!canEdit}
          onChange={(value) =>
            update({
              searchRadiusKm:
                value,
            })
          }
        />

        <Field
          label="Matching Timeout Seconds"
          value={
            settings.driverMatchingTimeoutSeconds
          }
          disabled={!canEdit}
          onChange={(value) =>
            update({
              driverMatchingTimeoutSeconds:
                value,
            })
          }
        />

        <Field
          label="Maximum Matching Attempts"
          value={
            settings.maximumDriverMatchingAttempts
          }
          disabled={!canEdit}
          onChange={(value) =>
            update({
              maximumDriverMatchingAttempts:
                value,
            })
          }
        />

        <Field
          label="Pickup Grace Minutes"
          value={
            settings.pickupGraceMinutes
          }
          disabled={!canEdit}
          onChange={(value) =>
            update({
              pickupGraceMinutes:
                value,
            })
          }
        />

        <Field
          label="Default Free Waiting"
          value={
            settings.defaultFreeWaitingMinutes
          }
          disabled={!canEdit}
          onChange={(value) =>
            update({
              defaultFreeWaitingMinutes:
                value,
            })
          }
        />

        <Field
          label="Scheduled Lead Minutes"
          value={
            settings.scheduledRideMinimumLeadMinutes
          }
          disabled={!canEdit}
          onChange={(value) =>
            update({
              scheduledRideMinimumLeadMinutes:
                value,
            })
          }
        />

        <Field
          label="Schedule Maximum Days"
          value={
            settings.scheduledRideMaximumDays
          }
          disabled={!canEdit}
          onChange={(value) =>
            update({
              scheduledRideMaximumDays:
                value,
            })
          }
        />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <SettingToggle
          label="Cancellation Reason Required"
          checked={
            settings.cancellationReasonRequired
          }
          disabled={!canEdit}
          onChange={(checked) =>
            update({
              cancellationReasonRequired:
                checked,
            })
          }
        />

        <SettingToggle
          label="Passenger Rating Required"
          checked={
            settings.passengerRatingRequired
          }
          disabled={!canEdit}
          onChange={(checked) =>
            update({
              passengerRatingRequired:
                checked,
            })
          }
        />

        <SettingToggle
          label="Driver Rating Required"
          checked={
            settings.driverRatingRequired
          }
          disabled={!canEdit}
          onChange={(checked) =>
            update({
              driverRatingRequired:
                checked,
            })
          }
        />

        <SettingToggle
          label="Emergency Button"
          checked={
            settings.emergencyButtonEnabled
          }
          disabled={!canEdit}
          onChange={(checked) =>
            update({
              emergencyButtonEnabled:
                checked,
            })
          }
        />

        <SettingToggle
          label="Trip Sharing"
          checked={
            settings.tripShareEnabled
          }
          disabled={!canEdit}
          onChange={(checked) =>
            update({
              tripShareEnabled:
                checked,
            })
          }
        />

        <SettingToggle
          label="Driver Destination Mode"
          checked={
            settings.driverDestinationEnabled
          }
          disabled={!canEdit}
          onChange={(checked) =>
            update({
              driverDestinationEnabled:
                checked,
            })
          }
        />
      </div>
    </section>
  );
}

function Field({
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