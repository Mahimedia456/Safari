import {
  Link,
} from "react-router-dom";

import DriverStats from "../../components/drivers/DriverStats";
import DriverTable from "../../components/drivers/DriverTable";

import {
  useDriverStore,
} from "../../store/driverStore";

export default function DriverDashboardPage() {
  const drivers =
    (useDriverStore(
      (state) =>
        state.drivers,
    ) ?? []);

  const applications =
    (useDriverStore(
      (state) =>
        state.applications,
    ) ?? []);

  const pending =
    (applications ?? []).filter(
      (application) =>
        [
          "pending",
          "under_review",
        ].includes(
          application.status,
        ),
    ).length;

  return (
    <div>
      <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-sm font-semibold text-safari-600 dark:text-safari-400">
            Safari Drivers
          </div>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
            Driver Management
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Manage driver onboarding,
            verification, vehicles,
            activity and earnings.
          </p>
        </div>

        <Link
          to="/drivers/applications"
          className="safari-secondary-button"
        >
          Applications ({pending})
        </Link>
      </div>

      <DriverStats
        drivers={drivers}
      />

      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-950 dark:text-white">
            Drivers
          </h2>

          <Link
            to="/drivers"
            className="text-sm font-semibold text-safari-600 dark:text-safari-400"
          >
            View all
          </Link>
        </div>

        <DriverTable
          drivers={drivers}
        />
      </div>
    </div>
  );
}