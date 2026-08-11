import {
  useState,
} from "react";

import {
  ArrowLeft,
  Building2,
  ShoppingBag,
} from "lucide-react";

import {
  Link,
  Navigate,
  useParams,
} from "react-router-dom";

import MerchantActivityPanel from "../../components/merchants/MerchantActivityPanel";
import MerchantBankPanel from "../../components/merchants/MerchantBankPanel";
import MerchantDocumentsPanel from "../../components/merchants/MerchantDocumentsPanel";
import MerchantNotesPanel from "../../components/merchants/MerchantNotesPanel";
import MerchantProfilePanel from "../../components/merchants/MerchantProfilePanel";
import MerchantStatusActions from "../../components/merchants/MerchantStatusActions";
import MerchantStatusBadge from "../../components/merchants/MerchantStatusBadge";
import MerchantStoresPanel from "../../components/merchants/MerchantStoresPanel";
import MerchantTypeBadge from "../../components/merchants/MerchantTypeBadge";

import { getMerchantPermissions } from "../../config/merchantPermissions";

import { useAuthStore } from "../../store/authStore";
import { useMerchantStore } from "../../store/merchantStore";

type Tab =
  | "overview"
  | "stores"
  | "documents"
  | "bank"
  | "notes"
  | "activity";

export default function MerchantDetailPage() {
  const {
    merchantId,
  } = useParams();

  const [
    tab,
    setTab,
  ] =
    useState<Tab>(
      "overview",
    );

  const user =
    useAuthStore(
      (state) =>
        state.user,
    );

  const merchant =
    useMerchantStore(
      (state) =>
        state.merchants.find(
          (item) =>
            item.id ===
            merchantId,
        ),
    );

  if (!merchant) {
    return (
      <Navigate
        to="/merchants"
        replace
      />
    );
  }

  if (!user) {
    return null;
  }

  const permissions =
    getMerchantPermissions(
      user.role,
    );

  const tabs: {
    value: Tab;
    label: string;
  }[] = [
    {
      value:
        "overview",
      label:
        "Overview",
    },

    {
      value: "stores",
      label: "Stores",
    },

    {
      value:
        "documents",
      label:
        "Documents",
    },

    {
      value: "bank",
      label:
        "Bank Details",
    },

    {
      value: "notes",
      label: "Notes",
    },

    {
      value:
        "activity",
      label:
        "Activity",
    },
  ];

  return (
    <div>
      <Link
        to="/merchants"
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
        <ArrowLeft
          size={16}
        />

        Merchants
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
              items-center
              gap-2
            "
          >
            <MerchantStatusBadge
              status={
                merchant.status
              }
            />

            <MerchantTypeBadge
              type={
                merchant.type
              }
            />
          </div>

          <h1
            className="
              mt-3

              text-3xl
              font-bold
              tracking-tight

              text-slate-950

              dark:text-white
            "
          >
            {
              merchant.businessName
            }
          </h1>

          <div
            className="
              mt-2

              flex
              flex-wrap
              gap-x-5
              gap-y-2

              text-sm

              text-slate-500

              dark:text-slate-400
            "
          >
            <span>
              {
                merchant.ownerName
              }
            </span>

            <span>
              {merchant.id}
            </span>

            <span>
              {merchant.city},{" "}
              {
                merchant.country
              }
            </span>
          </div>
        </div>

        <div
          className="
            grid
            grid-cols-2
            gap-3

            sm:grid-cols-3
          "
        >
          <MiniStat
            label="Stores"
            value={String(
              merchant.totalStores,
            )}
            icon={
              Building2
            }
          />

          <MiniStat
            label="Orders"
            value={String(
              merchant.totalOrders,
            )}
            icon={
              ShoppingBag
            }
          />

          <MiniStat
            label="Active stores"
            value={String(
              merchant.activeStores,
            )}
            icon={
              Building2
            }
          />
        </div>
      </div>

      {(merchant.rejectionReason ||
        merchant.suspensionReason) && (
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
          {merchant.rejectionReason ??
            merchant.suspensionReason}
        </div>
      )}

      {(permissions.approve ||
        permissions.reject ||
        permissions.suspend ||
        permissions.reactivate) && (
        <div className="mt-6">
          <MerchantStatusActions
            merchant={
              merchant
            }
            permissions={
              permissions
            }
          />
        </div>
      )}

      <div
        className="
          mt-6

          flex
          gap-1

          overflow-x-auto

          border-b
          border-slate-200

          dark:border-white/10
        "
      >
        {tabs.map(
          (item) => (
            <button
              key={
                item.value
              }
              type="button"
              onClick={() =>
                setTab(
                  item.value,
                )
              }
              className={[
                "whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition",

                tab ===
                item.value
                  ? "border-safari-600 text-safari-600 dark:text-safari-400"
                  : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white",
              ].join(" ")}
            >
              {item.label}
            </button>
          ),
        )}
      </div>

      <div className="mt-6">
        {tab ===
          "overview" && (
          <MerchantProfilePanel
            merchant={
              merchant
            }
          />
        )}

        {tab ===
          "stores" && (
          <MerchantStoresPanel
            merchant={
              merchant
            }
          />
        )}

        {tab ===
          "documents" && (
          <MerchantDocumentsPanel
            merchant={
              merchant
            }
          />
        )}

        {tab ===
          "bank" && (
          <MerchantBankPanel
            merchant={
              merchant
            }
            canView={
              permissions.viewBank
            }
          />
        )}

        {tab ===
          "notes" && (
          <MerchantNotesPanel
            merchant={
              merchant
            }
            canAdd={
              permissions.addNote
            }
          />
        )}

        {tab ===
          "activity" && (
          <MerchantActivityPanel
            merchant={
              merchant
            }
          />
        )}
      </div>
    </div>
  );
}

function MiniStat({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon:
    typeof Building2;
}) {
  return (
    <div
      className="
        min-w-[120px]

        rounded-xl

        border
        border-slate-200

        bg-white

        p-4

        dark:border-white/10
        dark:bg-[#111315]
      "
    >
      <Icon
        size={17}
        className="
          text-safari-600

          dark:text-safari-400
        "
      />

      <div
        className="
          mt-3

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