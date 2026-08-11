import GeneralSettingsPanel from "../../components/settings/GeneralSettingsPanel";

import {
  getSettingsPermissions,
} from "../../config/settingsPermissions";

import {
  useAuthStore,
} from "../../store/authStore";

export default function GeneralSettingsPage() {
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
      <PageHeader
        eyebrow="System Settings"
        title="General"
      />

      <GeneralSettingsPanel
        canEdit={
          permissions.editGeneral
        }
      />
    </div>
  );
}

function PageHeader({
  eyebrow,
  title,
}: {
  eyebrow: string;

  title: string;
}) {
  return (
    <div className="mb-7">
      <div className="text-sm font-semibold text-safari-600">
        {eyebrow}
      </div>

      <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
        {title}
      </h1>
    </div>
  );
}