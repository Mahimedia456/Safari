import RegionTable from "../../components/regions/RegionTable";

import {
  useRegionStore,
} from "../../store/regionStore";

export default function RegionsPage() {
  const regions =
    useRegionStore(
      (state) =>
        state.regions,
    );

  return (
    <div>
      <div className="mb-7">
        <div className="text-sm font-semibold text-safari-600">
          Safari Global
        </div>

        <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
          All Regions
        </h1>
      </div>

      <RegionTable
        regions={regions}
      />
    </div>
  );
}