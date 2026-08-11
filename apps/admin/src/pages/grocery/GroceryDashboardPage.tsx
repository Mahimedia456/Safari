import {
  Link,
} from "react-router-dom";

import GroceryOrderTable from "../../components/grocery/GroceryOrderTable";
import GroceryStats from "../../components/grocery/GroceryStats";

import { useGroceryStore } from "../../store/groceryStore";

export default function GroceryDashboardPage() {
  const orders =
    useGroceryStore(
      (state) =>
        state.orders,
    );

  const products =
    useGroceryStore(
      (state) =>
        state.products,
    );

  return (
    <div>
      <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-sm font-semibold text-safari-600 dark:text-safari-400">
            Safari Grocery
          </div>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
            Grocery Management
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Manage orders, catalogue,
            inventory, substitutions and
            promotions.
          </p>
        </div>

        <Link
          to="/grocery/orders"
          className="safari-secondary-button"
        >
          View Orders
        </Link>
      </div>

      <GroceryStats
        orders={orders}
        products={products}
      />

      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-950 dark:text-white">
            Recent orders
          </h2>

          <Link
            to="/grocery/orders"
            className="text-sm font-semibold text-safari-600 dark:text-safari-400"
          >
            View all
          </Link>
        </div>

        <GroceryOrderTable
          orders={orders}
        />
      </div>
    </div>
  );
}