import {
  Navigate,
  useParams,
} from "react-router-dom";

import DriverDocumentTable from "../../components/drivers/DriverDocumentTable";

import {
  getDriverPermissions,
} from "../../config/driverPermissions";

import {
  useAuthStore,
} from "../../store/authStore";

import {
  useDriverStore,
} from "../../store/driverStore";

export default function DriverDocumentsPage() {
  const {
    driverId,
  } = useParams();

  const user =
    useAuthStore(
      (state) =>
        state.user,
    );

  const driver =
    useDriverStore(
      (state) =>
        state.drivers.find(
          (item) =>
            item.id ===
            driverId,
        ),
    );

  if (!driver) {
    return (
      <Navigate
        to="/drivers"
        replace
      />
    );
  }

  if (!user) {
    return null;
  }

  const permissions =
    getDriverPermissions(
      user.role,
    );

  return (
    <div>
      <div className="mb-7">
        <div className="text-sm font-semibold text-safari-600">
          {
            driver.fullName
          }
        </div>

        <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
          Driver Documents
        </h1>
      </div>

      <DriverDocumentTable
        driverId={
          driver.id
        }
        documents={
          driver.documents
        }
        canManage={
          permissions.reviewDocuments
        }
      />
    </div>
  );
}