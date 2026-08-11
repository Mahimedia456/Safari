import {
  ArrowLeft,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
} from "lucide-react";

import {
  Link,
  Navigate,
  useParams,
} from "react-router-dom";

import PassengerAddressTable from "../../components/passengers/PassengerAddressTable";
import PassengerRideTable from "../../components/passengers/PassengerRideTable";
import PassengerStatusBadge from "../../components/passengers/PassengerStatusBadge";
import PassengerWalletPanel from "../../components/passengers/PassengerWalletPanel";

import {
  getPassengerPermissions,
} from "../../config/passengerPermissions";

import {
  useAuthStore,
} from "../../store/authStore";

import {
  usePassengerStore,
} from "../../store/passengerStore";

import type {
  PassengerStatus,
} from "../../types/passenger";

export default function PassengerDetailPage() {
  const {
    passengerId,
  } = useParams();

  const user =
    useAuthStore(
      (state) =>
        state.user,
    );

  const passenger =
    usePassengerStore(
      (state) =>
        state.passengers.find(
          (item) =>
            item.id ===
            passengerId,
        ),
    );

  const rides =
    usePassengerStore(
      (state) =>
        state.rides.filter(
          (ride) =>
            ride.passengerId ===
            passengerId,
        ),
    );

  const setStatus =
    usePassengerStore(
      (state) =>
        state.setPassengerStatus,
    );

  if (!passenger) {
    return (
      <Navigate
        to="/passengers"
        replace
      />
    );
  }

  if (!user) {
    return null;
  }

  const permissions =
    getPassengerPermissions(
      user.role,
    );

  const statuses: PassengerStatus[] =
    [
      "active",
      "inactive",
      "suspended",
      "blocked",
    ];

  return (
    <div>
      <Link
        to="/passengers"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-safari-600"
      >
        <ArrowLeft
          size={16}
        />

        Passengers
      </Link>

      <div className="mt-5 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <div className="flex flex-wrap gap-2">
            <PassengerStatusBadge
              status={
                passenger.status
              }
            />

            <span
              className={[
                "rounded-full px-2.5 py-1 text-xs font-semibold capitalize",

                passenger.verificationStatus ===
                "verified"
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
                  : passenger.verificationStatus ===
                      "flagged"
                    ? "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                    : "bg-slate-100 text-slate-500 dark:bg-white/[0.06]",
              ].join(" ")}
            >
              {
                passenger.verificationStatus
              }
            </span>
          </div>

          <h1 className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">
            {
              passenger.fullName
            }
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {passenger.id}
          </p>
        </div>

        {(permissions.suspend ||
          permissions.block ||
          permissions.reactivate) && (
          <select
            value={
              passenger.status
            }
            onChange={(
              event,
            ) =>
              setStatus(
                passenger.id,
                event.target
                  .value as PassengerStatus,
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

      <div className="mt-6 grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <section className="safari-card p-6">
          <h2 className="text-base font-semibold text-slate-950 dark:text-white">
            Customer Profile
          </h2>

          <div className="mt-5 space-y-4">
            <Info
              icon={Phone}
              label="Phone"
              value={
                passenger.phone
              }
            />

            <Info
              icon={Mail}
              label="Email"
              value={
                passenger.email
              }
            />

            <Info
              icon={MapPin}
              label="Region"
              value={`${passenger.city}, ${passenger.region}`}
            />

            <Info
              icon={Star}
              label="Rating"
              value={`${passenger.rating} (${passenger.totalRatings} ratings)`}
            />

            <Info
              icon={
                ShieldCheck
              }
              label="Referral Code"
              value={
                passenger.referralCode
              }
            />

            {passenger.emergencyContactName && (
              <Info
                icon={
                  ShieldCheck
                }
                label="Emergency Contact"
                value={`${passenger.emergencyContactName} · ${passenger.emergencyContactPhone ?? ""}`}
              />
            )}
          </div>
        </section>

        {permissions.viewWallet && (
          <PassengerWalletPanel
            passenger={
              passenger
            }
          />
        )}
      </div>

      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-950 dark:text-white">
            Ride History
          </h2>

          <Link
            to={`/passengers/${passenger.id}/rides`}
            className="text-sm font-semibold text-safari-600"
          >
            View all
          </Link>
        </div>

        <PassengerRideTable
          rides={rides}
        />
      </div>

      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-950 dark:text-white">
            Saved Addresses
          </h2>

          <Link
            to={`/passengers/${passenger.id}/addresses`}
            className="text-sm font-semibold text-safari-600"
          >
            Manage
          </Link>
        </div>

        <PassengerAddressTable
          passengerId={
            passenger.id
          }
          addresses={
            passenger.addresses
          }
          canManage={
            permissions.view
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