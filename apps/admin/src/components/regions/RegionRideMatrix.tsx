import {
  useRegionStore,
} from "../../store/regionStore";

import type {
  SafariRegion,
} from "../../types/region";

export default function RegionRideMatrix({
  region,
  canEdit,
}: {
  region: SafariRegion;

  canEdit: boolean;
}) {
  const toggleRide =
    useRegionStore(
      (state) =>
        state.toggleRideType,
    );

  const toggleDrivers =
    useRegionStore(
      (state) =>
        state.toggleRideDriverRegistration,
    );

  return (
    <div className="safari-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-slate-100 bg-slate-50/70 dark:border-white/[0.06] dark:bg-white/[0.02]">
            <tr>
              {[
                "Ride Type",
                "Ride Availability",
                "Driver Registration",
              ].map(
                (label) => (
                  <th
                    key={label}
                    className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400"
                  >
                    {label}
                  </th>
                ),
              )}
            </tr>
          </thead>

          <tbody>
            {region.rides.map(
              (item) => (
                <tr
                  key={item.rideType}
                  className="border-b border-slate-100 last:border-0 dark:border-white/[0.05]"
                >
                  <td className="px-5 py-4 font-semibold capitalize text-slate-900 dark:text-white">
                    {item.rideType}
                  </td>

                  <td className="px-5 py-4">
                    <Toggle
                      active={
                        item.enabled
                      }
                      disabled={
                        !canEdit
                      }
                      onClick={() =>
                        toggleRide(
                          region.id,
                          item.rideType,
                        )
                      }
                    />
                  </td>

                  <td className="px-5 py-4">
                    <Toggle
                      active={
                        item.acceptingNewDrivers
                      }
                      disabled={
                        !canEdit
                      }
                      onClick={() =>
                        toggleDrivers(
                          region.id,
                          item.rideType,
                        )
                      }
                    />
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Toggle({
  active,
  disabled,
  onClick,
}: {
  active: boolean;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={[
        "rounded-full px-3 py-1 text-xs font-semibold",

        active
          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
          : "bg-slate-100 text-slate-500 dark:bg-white/[0.06]",

        disabled
          ? "cursor-default opacity-70"
          : "",
      ].join(" ")}
    >
      {active
        ? "Enabled"
        : "Disabled"}
    </button>
  );
}