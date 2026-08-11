import DriverVehicleTable from "../../components/drivers/DriverVehicleTable";

import {
  useDriverStore,
} from "../../store/driverStore";

export default function DriverVehiclesPage() {
  const vehicles =
    useDriverStore(
      (state) =>
        state.vehicles,
    );

  return (
    <div>
      <div className="mb-7">
        <div className="text-sm font-semibold text-safari-600">
          Safari Drivers
        </div>

        <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
          Driver Vehicles
        </h1>
      </div>

      <DriverVehicleTable
        vehicles={vehicles}
      />
    </div>
  );
}