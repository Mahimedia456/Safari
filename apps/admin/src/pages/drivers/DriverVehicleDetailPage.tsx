import {
  ArrowLeft,
  CarFront,
} from "lucide-react";

import {
  Link,
  Navigate,
  useParams,
} from "react-router-dom";

import DriverVerificationBadge from "../../components/drivers/DriverVerificationBadge";

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
  DriverVerificationStatus,
} from "../../types/driver";


export default function DriverVehicleDetailPage() {
  const {
    vehicleId,
  } = useParams();

  const user =
    useAuthStore(
      (state) =>
        state.user,
    );

  const vehicle =
    useDriverStore(
      (state) =>
        state.vehicles.find(
          (item) =>
            item.id ===
            vehicleId,
        ),
    );

  const driver =
    useDriverStore(
      (state) =>
        state.drivers.find(
          (item) =>
            item.id ===
            vehicle?.driverId,
        ),
    );

  const setActive =
    useDriverStore(
      (state) =>
        state.setVehicleActive,
    );

  const setRegistration =
    useDriverStore(
      (state) =>
        state.setVehicleRegistrationStatus,
    );

  const setInsurance =
    useDriverStore(
      (state) =>
        state.setVehicleInsuranceStatus,
    );

  if (!vehicle) {
    return (
      <Navigate
        to="/drivers/vehicles"
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

  const verificationOptions: DriverVerificationStatus[] =
    [
      "pending",
      "verified",
      "rejected",
      "expired",
    ];

  return (
    <div>
      <Link
        to="/drivers/vehicles"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-safari-600"
      >
        <ArrowLeft
          size={16}
        />

        Vehicles
      </Link>

      <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-safari-50 text-safari-600 dark:bg-safari-500/10">
            <CarFront
              size={20}
            />
          </div>

          <h1 className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">
            {vehicle.make}{" "}
            {vehicle.model}
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {
              vehicle.plateNumber
            }{" "}
            ·{" "}
            {driver?.fullName ??
              vehicle.driverId}
          </p>
        </div>

        {permissions.manageVehicles && (
          <button
            type="button"
            onClick={() =>
              setActive(
                vehicle.id,
                !vehicle.active,
              )
            }
            className="safari-secondary-button"
          >
            {vehicle.active
              ? "Deactivate"
              : "Activate"}
          </button>
        )}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="safari-card p-6">
          <h2 className="text-base font-semibold text-slate-950 dark:text-white">
            Vehicle
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Info
              label="Make"
              value={
                vehicle.make
              }
            />

            <Info
              label="Model"
              value={
                vehicle.model
              }
            />

            <Info
              label="Year"
              value={`${vehicle.year}`}
            />

            <Info
              label="Color"
              value={
                vehicle.color
              }
            />

            <Info
              label="Category"
              value={
                vehicle.category
              }
            />

            <Info
              label="Plate"
              value={
                vehicle.plateNumber
              }
            />
          </div>
        </section>

        <section className="safari-card p-6">
          <h2 className="text-base font-semibold text-slate-950 dark:text-white">
            Compliance
          </h2>

          <div className="mt-5 space-y-5">
            <div>
              <div className="mb-2 text-xs text-slate-400">
                Registration
              </div>

              <DriverVerificationBadge
                status={
                  vehicle.registrationStatus
                }
              />

              {permissions.manageVehicles && (
                <select
                  value={
                    vehicle.registrationStatus
                  }
                  onChange={(
                    event,
                  ) =>
                    setRegistration(
                      vehicle.id,
                      event.target
                        .value as "verified" | "rejected",
                    )
                  }
                  className="safari-select mt-3"
                >
                  {verificationOptions.map(
                    (
                      status,
                    ) => (
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
            </div>

            <div>
              <div className="mb-2 text-xs text-slate-400">
                Insurance
              </div>

              <DriverVerificationBadge
                status={
                  vehicle.insuranceStatus
                }
              />

              {permissions.manageVehicles && (
                <select
                  value={
                    vehicle.insuranceStatus
                  }
                  onChange={(
                    event,
                  ) =>
                    setInsurance(
                      vehicle.id,
                      event.target
                        .value as "verified" | "rejected",
                    )
                  }
                  className="safari-select mt-3"
                >
                  {verificationOptions.map(
                    (
                      status,
                    ) => (
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
            </div>
          </div>
        </section>
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
    <div className="rounded-xl border border-slate-100 p-4 dark:border-white/[0.06]">
      <div className="text-xs text-slate-400">
        {label}
      </div>

      <div className="mt-2 text-sm font-semibold capitalize text-slate-800 dark:text-slate-200">
        {value}
      </div>
    </div>
  );
}