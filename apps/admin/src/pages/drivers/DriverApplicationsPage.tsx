import DriverApplicationTable from "../../components/drivers/DriverApplicationTable";

import {
  useDriverStore,
} from "../../store/driverStore";

export default function DriverApplicationsPage() {
  const applications =
    (useDriverStore(
      (state) =>
        state.applications,
    ) ?? []);

  return (
    <div>
      <div className="mb-7">
        <div className="text-sm font-semibold text-safari-600">
          Safari Drivers
        </div>

        <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
          Driver Applications
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Review new driver
          registrations before
          activation.
        </p>
      </div>

      <DriverApplicationTable
        applications={
          applications
        }
      />
    </div>
  );
}