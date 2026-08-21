import {
  ArrowLeft,
  Clock3,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import MerchantTable from "../../components/merchants/MerchantTable";

import { useMerchantStore } from "../../store/merchantStore";

export default function MerchantApplicationsPage() {
  const merchants =
    useMerchantStore(
      (state) =>
        state.merchants,
    );

  const pending =
    (merchants ?? []).filter(
      (merchant) =>
        merchant.status ===
        "pending",
    );

  return (
    <div>
      <Link
        to="/merchants"
        className="
          mb-5

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

      <div>
        <div
          className="
            flex
            items-center
            gap-2

            text-sm
            font-semibold

            text-amber-600

            dark:text-amber-400
          "
        >
          <Clock3
            size={16}
          />

          Merchant onboarding
        </div>

        <h1
          className="
            mt-2

            text-3xl
            font-bold

            text-slate-950

            dark:text-white
          "
        >
          Applications
        </h1>

        <p
          className="
            mt-2

            text-sm

            text-slate-500

            dark:text-slate-400
          "
        >
          Review pending merchant
          registrations and required
          business documentation.
        </p>
      </div>

      <div
        className="
          mt-6

          safari-card

          p-5
        "
      >
        <div
          className="
            text-3xl
            font-bold

            text-slate-950

            dark:text-white
          "
        >
          {pending.length}
        </div>

        <div
          className="
            mt-1

            text-sm

            text-slate-500
          "
        >
          Pending applications
        </div>
      </div>

      <MerchantTable
        merchants={
          pending
        }
      />
    </div>
  );
}