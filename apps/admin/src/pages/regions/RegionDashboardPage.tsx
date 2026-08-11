import {
  Link,
} from "react-router-dom";

import RegionStats from "../../components/regions/RegionStats";
import RegionTable from "../../components/regions/RegionTable";

import {
  useRegionStore,
} from "../../store/regionStore";

export default function RegionDashboardPage() {
  const regions =
    useRegionStore(
      (state) =>
        state.regions,
    );

  return (
    <div>
      <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-sm font-semibold text-safari-600 dark:text-safari-400">
            Safari Global
          </div>

          <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
            Region Management
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Configure Safari
            availability and operational
            behavior by country.
          </p>
        </div>

        <Link
          to="/regions"
          className="safari-secondary-button"
        >
          All Regions
        </Link>
      </div>

      <RegionStats
        regions={regions}
      />

      <div className="mt-6">
        <RegionTable
          regions={regions}
        />
      </div>
    </div>
  );
}