import {
  Link,
} from "react-router-dom";

import RegionStats from "../../components/regions/RegionStats";
import RegionTable from "../../components/regions/RegionTable";

import {
  useMarketStore,
} from "../../store/regionStore";

export default function RegionDashboardPage() {
  const regions =
    useMarketStore(
      (state) =>
        state.regions,
    );

  return (
    <div>
      <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-sm font-semibold text-safari-600 dark:text-safari-400">
            Safari Pakistan
          </div>

          <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
            Pakistan Operations
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage Safari availability and operational behavior for Pakistan.
          </p>
        </div>

        <Link
          to="/regions"
          className="safari-secondary-button"
        >
          Pakistan
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