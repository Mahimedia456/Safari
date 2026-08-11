import {
  ArrowLeft,
  Edit3,
  PackageOpen,
  ShoppingBag,
} from "lucide-react";

import {
  Link,
  Navigate,
  useParams,
} from "react-router-dom";

import StoreCommissionPanel from "../../components/stores/StoreCommissionPanel";
import StoreHoursPanel from "../../components/stores/StoreHoursPanel";
import StoreLocationPanel from "../../components/stores/StoreLocationPanel";
import StoreStatusActions from "../../components/stores/StoreStatusActions";
import StoreStatusBadge from "../../components/stores/StoreStatusBadge";
import StoreTypeBadge from "../../components/stores/StoreTypeBadge";

import { getStorePermissions } from "../../config/storePermissions";

import { useAuthStore } from "../../store/authStore";
import { useStoreStore } from "../../store/storeStore";

export default function StoreDetailPage() {
  const {
    storeId,
  } = useParams();

  const user =
    useAuthStore(
      (state) =>
        state.user,
    );

  const store =
    useStoreStore(
      (state) =>
        state.stores.find(
          (item) =>
            item.id ===
            storeId,
        ),
    );

  if (!store) {
    return (
      <Navigate
        to="/stores"
        replace
      />
    );
  }

  if (!user) {
    return null;
  }

  const permissions =
    getStorePermissions(
      user.role,
    );

  return (
    <div>
      <Link
        to="/stores"
        className="
          inline-flex
          items-center
          gap-2

          text-sm
          font-medium

          text-slate-500

          hover:text-safari-600
        "
      >
        <ArrowLeft size={16} />

        Stores
      </Link>

      <div
        className="
          mt-5

          flex flex-col
          gap-5

          xl:flex-row
          xl:items-start
          xl:justify-between
        "
      >
        <div>
          <div
            className="
              flex
              flex-wrap
              gap-2
            "
          >
            <StoreStatusBadge
              status={
                store.status
              }
            />

            <StoreTypeBadge
              type={
                store.type
              }
            />
          </div>

          <h1
            className="
              mt-3

              text-3xl
              font-bold

              text-slate-950

              dark:text-white
            "
          >
            {store.name}
          </h1>

          <p
            className="
              mt-2

              text-sm

              text-slate-500

              dark:text-slate-400
            "
          >
            {
              store.merchantName
            }{" "}
            · {store.id}
          </p>
        </div>

        {permissions.edit && (
          <Link
            to={`/stores/${store.id}/edit`}
            className="
              inline-flex h-11
              items-center
              gap-2

              rounded-xl

              border
              border-slate-200

              bg-white

              px-4

              text-sm
              font-medium

              text-slate-700

              dark:border-white/10
              dark:bg-[#111315]
              dark:text-slate-200
            "
          >
            <Edit3 size={16} />

            Edit Store
          </Link>
        )}
      </div>

      {(store.rejectionReason ||
        store.suspensionReason) && (
        <div
          className="
            mt-6

            rounded-xl

            border
            border-red-200

            bg-red-50

            p-4

            text-sm
            text-red-700

            dark:border-red-500/20
            dark:bg-red-500/10
            dark:text-red-300
          "
        >
          {store.rejectionReason ??
            store.suspensionReason}
        </div>
      )}

      <div
        className="
          mt-6

          grid
          gap-4

          sm:grid-cols-2
          xl:grid-cols-4
        "
      >
        <InfoCard
          label="Orders"
          value={String(
            store.totalOrders,
          )}
          icon={
            ShoppingBag
          }
        />

        <InfoCard
          label="Commission"
          value={`${store.commissionPercentage}%`}
          icon={
            PackageOpen
          }
        />

        <InfoCard
          label="Delivery Radius"
          value={`${store.deliveryRadiusKm ?? 0} km`}
          icon={
            PackageOpen
          }
        />

        <InfoCard
          label="Minimum Order"
          value={String(
            store.minimumOrder ??
              0,
          )}
          icon={
            ShoppingBag
          }
        />
      </div>

      {(permissions.approve ||
        permissions.reject ||
        permissions.suspend ||
        permissions.reactivate) && (
        <div className="mt-6">
          <StoreStatusActions
            store={store}
            permissions={
              permissions
            }
          />
        </div>
      )}

      <div
        className="
          mt-6

          grid
          gap-6

          xl:grid-cols-2
        "
      >
        <StoreCommissionPanel
          store={store}
          canEdit={
            permissions.editCommission
          }
        />

        <StoreLocationPanel
          store={store}
        />

        <div className="xl:col-span-2">
          <StoreHoursPanel
            store={store}
          />
        </div>
      </div>
    </div>
  );
}

function InfoCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon:
    typeof PackageOpen;
}) {
  return (
    <div className="safari-card p-5">
      <Icon
        size={18}
        className="
          text-safari-600

          dark:text-safari-400
        "
      />

      <div
        className="
          mt-4

          text-xl
          font-bold

          text-slate-950

          dark:text-white
        "
      >
        {value}
      </div>

      <div
        className="
          mt-1

          text-xs
          text-slate-400
        "
      >
        {label}
      </div>
    </div>
  );
}