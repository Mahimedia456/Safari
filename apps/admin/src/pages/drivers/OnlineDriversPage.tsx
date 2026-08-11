import DriverTable from "../../components/drivers/DriverTable";

import {
  useDriverStore,
} from "../../store/driverStore";

export default function OnlineDriversPage() {
  const drivers =
    useDriverStore(
      (state) =>
        state.drivers,
    );

  const online =
    drivers.filter(
      (driver) =>
        driver.online,
    );

  return (
    <div>
      <div className="mb-7">
        <div className="text-sm font-semibold text-safari-600">
          Live Driver Network
        </div>

        <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
          Online Drivers
        </h1>
      </div>

      <DriverTable
        drivers={online}
      />
    </div>
  );
}