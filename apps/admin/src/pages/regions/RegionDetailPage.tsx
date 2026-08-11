import {
  ArrowLeft,
  Globe2,
} from "lucide-react";

import {
  Link,
  Navigate,
  useParams,
} from "react-router-dom";

import RegionLocalizationPanel from "../../components/regions/RegionLocalizationPanel";
import RegionOperationsPanel from "../../components/regions/RegionOperationsPanel";
import RegionRideMatrix from "../../components/regions/RegionRideMatrix";
import RegionServiceMatrix from "../../components/regions/RegionServiceMatrix";
import RegionStatusBadge from "../../components/regions/RegionStatusBadge";
import RegionSupportPanel from "../../components/regions/RegionSupportPanel";

import {
  getRegionPermissions,
} from "../../config/regionPermissions";

import {
  useAuthStore,
} from "../../store/authStore";

import {
  useRegionStore,
} from "../../store/regionStore";

import type {
  RegionStatus,
} from "../../types/region";

export default function RegionDetailPage() {
  const {
    regionCode,
  } = useParams();

  const user =
    useAuthStore(
      (state) =>
        state.user,
    );

  const region =
    useRegionStore(
      (state) =>
        state.regions.find(
          (item) =>
            item.code.toLowerCase() ===
            regionCode?.toLowerCase(),
        ),
    );

  const setStatus =
    useRegionStore(
      (state) =>
        state.setRegionStatus,
    );

  if (!region) {
    return (
      <Navigate
        to="/regions"
        replace
      />
    );
  }

  if (!user) {
    return null;
  }

  const permissions =
    getRegionPermissions(
      user.role,
    );

  const statuses: RegionStatus[] =
    [
      "active",
      "maintenance",
      "disabled",
    ];

  return (
    <div>
      <Link
        to="/regions"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-safari-600"
      >
        <ArrowLeft size={16} />
        Regions
      </Link>

      <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="text-3xl">
              {region.flagEmoji}
            </div>

            <RegionStatusBadge
              status={
                region.status
              }
            />
          </div>

          <h1 className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">
            {region.name}
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {region.code} ·{" "}
            {region.currency} ·{" "}
            {
              region.localization.timezone
            }
          </p>
        </div>

        {permissions.editRegionStatus && (
          <select
            value={region.status}
            onChange={(event) =>
              setStatus(
                region.id,
                event.target
                  .value as RegionStatus,
              )
            }
            className="safari-select"
          >
            {statuses.map(
              (status) => (
                <option
                  key={status}
                  value={status}
                >
                  {status}
                </option>
              ),
            )}
          </select>
        )}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-4">
        <Info
          label="Currency"
          value={`${region.currencySymbol}${region.currency}`}
        />

        <Info
          label="Cities"
          value={`${region.activeCities.length}`}
        />

        <Info
          label="Language"
          value={
            region.localization.defaultLanguage
          }
        />

        <Info
          label="Emergency"
          value={
            region.support.emergencyPhone
          }
        />
      </div>

      <div className="mt-6">
        <RegionOperationsPanel
          region={region}
          canEdit={
            permissions.editOperations
          }
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-semibold text-slate-950 dark:text-white">
              Services
            </h2>

            <Link
              to={`/regions/${region.code.toLowerCase()}/services`}
              className="text-sm font-semibold text-safari-600"
            >
              Manage
            </Link>
          </div>

          <RegionServiceMatrix
            region={region}
            canEdit={
              permissions.editServices
            }
          />
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-semibold text-slate-950 dark:text-white">
              Ride Types
            </h2>

            <Link
              to={`/regions/${region.code.toLowerCase()}/rides`}
              className="text-sm font-semibold text-safari-600"
            >
              Manage
            </Link>
          </div>

          <RegionRideMatrix
            region={region}
            canEdit={
              permissions.editRideAvailability
            }
          />
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <RegionLocalizationPanel
          region={region}
          canEdit={
            permissions.editLocalization
          }
        />

        <RegionSupportPanel
          region={region}
          canEdit={
            permissions.editSupport
          }
        />
      </div>
    </div>
  );
}

function Info({
  label,
  value,
}: {
  label: string;

  value: string;
}) {
  return (
    <div className="safari-card p-5">
      <Globe2
        size={17}
        className="text-safari-600"
      />

      <div className="mt-3 text-xs text-slate-400">
        {label}
      </div>

      <div className="mt-1 font-bold text-slate-900 dark:text-white">
        {value}
      </div>
    </div>
  );
}