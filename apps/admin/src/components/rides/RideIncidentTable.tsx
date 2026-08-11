import {
  ExternalLink,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import {
  useRideStore,
} from "../../store/rideStore";

import type {
  RideIncident,
  RideIncidentStatus,
} from "../../types/ride";

type Props = {
  incidents:
    RideIncident[];

  canManage: boolean;
};

export default function RideIncidentTable({
  incidents,
  canManage,
}: Props) {
  const setIncidentStatus =
    useRideStore(
      (state) =>
        state.setIncidentStatus,
    );

  const statuses: RideIncidentStatus[] =
    [
      "open",
      "investigating",
      "resolved",
    ];

  return (
    <div className="safari-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-slate-100 bg-slate-50/70 dark:border-white/[0.06] dark:bg-white/[0.02]">
            <tr>
              {[
                "Incident",
                "Ride",
                "Issue",
                "Priority",
                "Reported By",
                "Status",
                "",
              ].map(
                (label) => (
                  <th
                    key={label}
                    className="whitespace-nowrap px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400"
                  >
                    {label}
                  </th>
                ),
              )}
            </tr>
          </thead>

          <tbody>
            {incidents.map(
              (incident) => (
                <tr
                  key={
                    incident.id
                  }
                  className="border-b border-slate-100 last:border-0 dark:border-white/[0.05]"
                >
                  <td className="px-5 py-4 font-semibold text-slate-900 dark:text-white">
                    {
                      incident.id
                    }
                  </td>

                  <td className="px-5 py-4 text-sm font-semibold text-safari-600 dark:text-safari-400">
                    {
                      incident.rideId
                    }
                  </td>

                  <td className="max-w-md px-5 py-4">
                    <div className="text-sm font-medium text-slate-800 dark:text-slate-200">
                      {
                        incident.title
                      }
                    </div>

                    <div className="mt-1 text-xs leading-5 text-slate-400">
                      {
                        incident.description
                      }
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={[
                        "rounded-full px-2.5 py-1 text-xs font-semibold capitalize",

                        incident.priority ===
                        "critical"
                          ? "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                          : incident.priority ===
                              "high"
                            ? "bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400"
                            : incident.priority ===
                                "medium"
                              ? "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                              : "bg-slate-100 text-slate-600 dark:bg-white/[0.06] dark:text-slate-300",
                      ].join(" ")}
                    >
                      {
                        incident.priority
                      }
                    </span>
                  </td>

                  <td className="px-5 py-4 text-sm capitalize text-slate-500">
                    {
                      incident.reportedBy
                    }
                  </td>

                  <td className="px-5 py-4">
                    {canManage ? (
                      <select
                        value={
                          incident.status
                        }
                        onChange={(
                          event,
                        ) =>
                          setIncidentStatus(
                            incident.id,
                            event.target
                              .value as RideIncidentStatus,
                          )
                        }
                        className="safari-select"
                      >
                        {statuses.map(
                          (status) => (
                            <option
                              key={
                                status
                              }
                              value={
                                status
                              }
                            >
                              {status}
                            </option>
                          ),
                        )}
                      </select>
                    ) : (
                      <span className="text-sm capitalize text-slate-500">
                        {
                          incident.status
                        }
                      </span>
                    )}
                  </td>

                  <td className="px-5 py-4">
                    <Link
                      to={`/rides/${incident.rideId}`}
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-safari-50 hover:text-safari-600 dark:hover:bg-safari-500/10"
                    >
                      <ExternalLink
                        size={15}
                      />
                    </Link>
                  </td>
                </tr>
              ),
            )}

            {incidents.length ===
              0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-5 py-14 text-center text-sm text-slate-400"
                >
                  No ride incidents
                  found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}