import {
  ArrowLeft,
  Mail,
  MapPin,
  Phone,
  Star,
} from "lucide-react";

import {
  Link,
  Navigate,
  useParams,
} from "react-router-dom";

import DriverDocumentTable from "../../components/drivers/DriverDocumentTable";
import DriverRideSummary from "../../components/drivers/DriverRideSummary";
import DriverStatusBadge from "../../components/drivers/DriverStatusBadge";
import DriverVerificationBadge from "../../components/drivers/DriverVerificationBadge";
import DriverWalletPanel from "../../components/drivers/DriverWalletPanel";

import {
  getDriverPermissions,
} from "../../config/driverPermissions";

import {
  useAuthStore,
} from "../../store/authStore";

import {
  useDriverStore,
} from "../../store/driverStore";

import type {
  DriverStatus,
} from "../../types/driver";

export default function DriverDetailPage() {
  const {
    driverId,
  } = useParams();

  const user =
    useAuthStore(
      (state) =>
        state.user,
    );

  const driver =
    useDriverStore(
      (state) =>
        state.drivers.find(
          (item) =>
            item.id ===
            driverId,
        ),
    );

  const setStatus =
    useDriverStore(
      (state) =>
        state.setDriverStatus,
    );

  const setOnline =
    useDriverStore(
      (state) =>
        state.setDriverOnline,
    );

  if (!driver) {
    return (
      <Navigate
        to="/drivers"
        replace
      />
    );
  }

  if (!user) {
    return null;
  }

  const permissions =
    getDriverPermissions(
      user.role,
    );

  const statuses: DriverStatus[] =
    [
      "active",
      "offline",
      "suspended",
      "blocked",
    ];

  return (
    <div>
      <Link
        to="/drivers"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-safari-600"
      >
        <ArrowLeft
          size={16}
        />

        Drivers
      </Link>

      <div className="mt-5 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <div className="flex flex-wrap gap-2">
            <DriverStatusBadge
              status={
                driver.status
              }
            />

            <DriverVerificationBadge
              status={
                driver.verificationStatus
              }
            />
          </div>

          <h1 className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">
            {
              driver.fullName
            }
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {driver.id}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {permissions.suspendDriver && (
            <select
              value={
                driver.status
              }
              onChange={(
                event,
              ) =>
                setStatus(
                  driver.id,
                  event.target
                    .value as DriverStatus,
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
          )}

          {driver.status ===
            "active" && (
            <button
              type="button"
              onClick={() =>
                setOnline(
                  driver.id,
                  !driver.online,
                )
              }
              className="safari-secondary-button"
            >
              {driver.online
                ? "Set Offline"
                : "Set Online"}
            </button>
          )}
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <section className="safari-card p-6">
          <h2 className="text-base font-semibold text-slate-950 dark:text-white">
            Driver Profile
          </h2>

          <div className="mt-5 space-y-4">
            <Info
              icon={Phone}
              label="Phone"
              value={
                driver.phone
              }
            />

            <Info
              icon={Mail}
              label="Email"
              value={
                driver.email
              }
            />

            <Info
              icon={MapPin}
              label="Region"
              value={`${driver.city}, ${driver.region}`}
            />

            <Info
              icon={Star}
              label="Rating"
              value={`${driver.rating} (${driver.totalRatings} ratings)`}
            />
          </div>
        </section>

        {permissions.viewWallet && (
          <DriverWalletPanel
            driver={driver}
          />
        )}
      </div>

      <div className="mt-6">
        <DriverRideSummary
          driver={driver}
        />
      </div>

      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-950 dark:text-white">
            Documents
          </h2>

          <Link
            to={`/drivers/${driver.id}/documents`}
            className="text-sm font-semibold text-safari-600"
          >
            Open documents
          </Link>
        </div>

        <DriverDocumentTable
          driverId={
            driver.id
          }
          documents={
            driver.documents
          }
          canManage={
            permissions.reviewDocuments
          }
        />
      </div>
    </div>
  );
}

function Info({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Phone;

  label: string;

  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-100 p-4 dark:border-white/[0.06]">
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Icon size={14} />

        {label}
      </div>

      <div className="mt-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
        {value}
      </div>
    </div>
  );
}