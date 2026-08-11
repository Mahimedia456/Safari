import DriverTable from "../../components/drivers/DriverTable";

import {
  useDriverStore,
} from "../../store/driverStore";

export default function SuspendedDriversPage() {
  const drivers =
    useDriverStore(
      (state) =>
        state.drivers,
    );

  const suspended =
    drivers.filter(
      (driver) =>
        [
          "suspended",
          "blocked",
        ].includes(
          driver.status,
        ),
    );

  return (
    <div>
      <div className="mb-7">
        <div className="text-sm font-semibold text-safari-600">
          Driver Compliance
        </div>

        <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
          Suspended Drivers
        </h1>
      </div>

      <DriverTable
        drivers={
          suspended
        }
      />
    </div>
  );
}