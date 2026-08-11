import GroceryCategoryTable from "../../components/grocery/GroceryCategoryTable";

import { getGroceryPermissions } from "../../config/groceryPermissions";

import { useAuthStore } from "../../store/authStore";
import { useGroceryStore } from "../../store/groceryStore";

export default function GroceryCategoriesPage() {
  const user =
    useAuthStore(
      (state) =>
        state.user,
    );

  const categories =
    useGroceryStore(
      (state) =>
        state.categories,
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
        <div className="text-sm font-semibold text-safari-600 dark:text-safari-400">
          Safari Grocery
        </div>

        <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
          Categories
        </h1>
      </div>

      <GroceryCategoryTable
        categories={
          categories
        }
        canManage={
          permissions.manageCategories
        }
      />
    </div>
  );
}