import FoodMenuTable from "../../components/food/FoodMenuTable";

import { getFoodPermissions } from "../../config/foodPermissions";

import { useAuthStore } from "../../store/authStore";
import { useFoodStore } from "../../store/foodStore";

export default function FoodMenuPage() {
  const user =
    useAuthStore(
      (state) =>
        state.user,
    );

  const items =
    useFoodStore(
      (state) =>
        state.menuItems,
    );

  if (!user) {
    return null;
  }

  const permissions =
    getFoodPermissions(
      user.role,
    );

  return (
    <div>
      <div className="mb-7">
        <div className="text-sm font-semibold text-safari-600 dark:text-safari-400">
          Safari Food
        </div>

        <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
          Menu
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Manage food items,
          availability, add-ons and
          variants.
        </p>
      </div>

      <FoodMenuTable
        items={items}
        canManage={
          permissions.manageMenu
        }
      />
    </div>
  );
}