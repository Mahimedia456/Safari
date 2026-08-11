import GroceryProductTable from "../../components/grocery/GroceryProductTable";

import { getGroceryPermissions } from "../../config/groceryPermissions";

import { useAuthStore } from "../../store/authStore";
import { useGroceryStore } from "../../store/groceryStore";

export default function GroceryProductsPage() {
  const user =
    useAuthStore(
      (state) =>
        state.user,
    );

  const products =
    useGroceryStore(
      (state) =>
        state.products,
    );

  if (!user) {
    return null;
  }

  const permissions =
    getGroceryPermissions(
      user.role,
    );

  return (
    <div>
      <div className="mb-7">
        <div
          className="
            text-sm
            font-semibold
            text-safari-600

            dark:text-safari-400
          "
        >
          Safari Grocery
        </div>

        <h1
          className="
            mt-1
            text-3xl
            font-bold
            tracking-tight
            text-slate-950

            dark:text-white
          "
        >
          Products
        </h1>

        <p
          className="
            mt-2
            text-sm
            text-slate-500

            dark:text-slate-400
          "
        >
          Manage grocery products,
          pricing, units,
          availability and
          substitutions.
        </p>
      </div>

      <GroceryProductTable
        products={products}
        canManage={
          permissions.manageProducts
        }
      />
    </div>
  );
}