import RegionTable from "../../components/regions/RegionTable";

import {
  useMarketStore,
} from "../../store/regionStore";

export default function RegionsPage() {
  const regions =
    useMarketStore(
      (state) =>
        state.regions,
    );

  return (
    <div>
      <div className="mb-7">
        <div className="text-sm font-semibold text-safari-600">
          Safari Pakistan
        </div>

        <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
          Pakistan
        </h1>
      </div>

      <RegionTable
        regions={regions}
      />
    </div>
  );
}