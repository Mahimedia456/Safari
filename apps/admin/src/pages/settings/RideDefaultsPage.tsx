import RideDefaultsPanel from "../../components/settings/RideDefaultsPanel";

import {
  getSettingsPermissions,
} from "../../config/settingsPermissions";

import {
  useAuthStore,
} from "../../store/authStore";

export default function RideDefaultsPage() {
  const user =
    useAuthStore(
      (state) =>
        state.user,
    );

  if (!user) {
    return null;
  }

  const permissions =
    getSettingsPermissions(
      user.role,
    );

  return (
    <div>
      <Header title="Ride Defaults" />

      <RideDefaultsPanel
        canEdit={
          permissions.editRideDefaults
        }
      />
    </div>
  );
}

function Header({
  title,
}: {
  title: string;
}) {
  return (
    <div className="mb-7">
      <div className="text-sm font-semibold text-safari-600">
        System Settings
      </div>

      <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
        {title}
      </h1>
    </div>
  );
}