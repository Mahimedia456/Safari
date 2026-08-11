import {
  Link,
} from "react-router-dom";

import PricingStats from "../../components/pricing/PricingStats";

import {
  usePricingStore,
} from "../../store/pricingStore";

export default function PricingDashboardPage() {
  const pricing =
    usePricingStore(
      (state) =>
        state.pricingRules,
    );

  const commission =
    usePricingStore(
      (state) =>
        state.driverCommission,
    );

  return (
    <div>
      <div className="mb-7">
        <div className="text-sm font-semibold text-safari-600 dark:text-safari-400">
          Safari Pricing Engine
        </div>

        <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
          Ride Fare & Pricing
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Central control for ride
          fares, surge pricing,
          commissions and free driver
          rides.
        </p>
      </div>

      <PricingStats
        pricing={pricing}
        commission={
          commission
        }
      />

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <Card
          title="Pakistan Pricing"
          path="/pricing/pakistan"
        />

        <Card
          title="Germany Pricing"
          path="/pricing/germany"
        />

        <Card
          title="Surge Pricing"
          path="/pricing/surge"
        />

        <Card
          title="Driver Commission"
          path="/pricing/commission"
        />

        <Card
          title="Free Ride Program"
          path="/pricing/free-rides"
        />

        <Card
          title="Fare Calculator"
          path="/pricing/calculator"
        />
      </div>
    </div>
  );
}

function Card({
  title,
  path,
}: {
  title: string;
  path: string;
}) {
  return (
    <Link
      to={path}
      className="safari-card p-5 transition hover:-translate-y-0.5 hover:border-safari-200"
    >
      <div className="font-semibold text-slate-900 dark:text-white">
        {title}
      </div>

      <div className="mt-2 text-sm font-semibold text-safari-600 dark:text-safari-400">
        Manage →
      </div>
    </Link>
  );
}