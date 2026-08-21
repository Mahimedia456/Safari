import {
  Navigate,
  useParams,
} from "react-router-dom";

import RegionLocalizationPanel from "../../components/regions/RegionLocalizationPanel";

import {
  getMarketPermissions,
} from "../../config/regionPermissions";

import {
  useAuthStore,
} from "../../store/authStore";

import {
  useMarketStore,
} from "../../store/regionStore";

export default function RegionLocalizationPage() {
  const {
    regionCode,
  } = useParams();

  const user =
    useAuthStore(
      (state) =>
        state.user,
    );

  const region =
    useMarketStore(
      (state) =>
        state.regions.find(
          (item) =>
            item.code.toLowerCase() ===
            regionCode?.toLowerCase(),
        ),
    );

  if (!region) {
    return (
      <Navigate
        to="/regions"
        replace
      />
    );
  }

  if (!user) {
    return null;
  }

  const permissions =
    getMarketPermissions(
      user.role,
    );

  return (
    <div>
      <div className="mb-7">
        <div className="text-sm font-semibold text-safari-600">
          {region.flagEmoji}{" "}
          {region.name}
        </div>

        <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
          Localization
        </h1>
      </div>

      <RegionLocalizationPanel
        region={region}
        canEdit={
          permissions.editLocalization
        }
      />
    </div>
  );
}