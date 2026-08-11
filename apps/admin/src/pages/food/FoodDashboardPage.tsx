import {
  Link,
} from "react-router-dom";

import FoodOrderTable from "../../components/food/FoodOrderTable";
import FoodStats from "../../components/food/FoodStats";

import { useFoodStore } from "../../store/foodStore";

export default function FoodDashboardPage() {
  const orders =
    useFoodStore(
      (state) =>
        state.orders,
    );

  return (
    <div>
      <div
        className="
          mb-7
          flex flex-col
          gap-4
          md:flex-row
          md:items-end
          md:justify-between
        "
      >
        <div>
          <div className="text-sm font-semibold text-safari-600 dark:text-safari-400">
            Safari Food
          </div>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
            Food Management
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Manage restaurant orders,
            menus, promotions, reviews
            and refunds.
          </p>
        </div>

        <Link
          to="/food/orders"
          className="safari-secondary-button"
        >
          View Orders
        </Link>
      </div>

      <FoodStats
        orders={orders}
      />

      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-950 dark:text-white">
            Recent orders
          </h2>

          <Link
            to="/food/orders"
            className="text-sm font-semibold text-safari-600 dark:text-safari-400"
          >
            View all
          </Link>
        </div>

        <FoodOrderTable
          orders={orders}
        />
      </div>
    </div>
  );
}