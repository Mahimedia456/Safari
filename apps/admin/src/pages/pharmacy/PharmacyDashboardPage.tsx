import {
  Link,
} from "react-router-dom";

import PharmacyOrderTable from "../../components/pharmacy/PharmacyOrderTable";
import PharmacyStats from "../../components/pharmacy/PharmacyStats";

import { usePharmacyStore } from "../../store/pharmacyStore";

export default function PharmacyDashboardPage() {
  const orders =
    usePharmacyStore(
      (state) =>
        state.orders,
    );

  const products =
    usePharmacyStore(
      (state) =>
        state.products,
    );

  const prescriptions =
    usePharmacyStore(
      (state) =>
        state.prescriptions,
    );

  return (
    <div>
      <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-sm font-semibold text-safari-600 dark:text-safari-400">
            Safari Pharmacy
          </div>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
            Pharmacy Management
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Manage pharmacy orders,
            medicines, stock,
            prescriptions and
            compliance.
          </p>
        </div>

        <Link
          to="/pharmacy/prescriptions"
          className="safari-secondary-button"
        >
          Review Prescriptions
        </Link>
      </div>

      <PharmacyStats
        orders={orders}
        products={products}
        prescriptions={
          prescriptions
        }
      />

      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-950 dark:text-white">
            Recent orders
          </h2>

          <Link
            to="/pharmacy/orders"
            className="text-sm font-semibold text-safari-600 dark:text-safari-400"
          >
            View all
          </Link>
        </div>

        <PharmacyOrderTable
          orders={orders}
        />
      </div>
    </div>
  );
}