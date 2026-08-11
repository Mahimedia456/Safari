import FoodPromotionTable from "../../components/food/FoodPromotionTable";

import { getFoodPermissions } from "../../config/foodPermissions";

import { useAuthStore } from "../../store/authStore";
import { useFoodStore } from "../../store/foodStore";

export default function FoodPromotionsPage() {
  const user =
    useAuthStore(
      (state) =>
        state.user,
    );

  const promotions =
    useFoodStore(
      (state) =>
        state.promotions,
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
          Promotions
        </h1>
      </div>

      <FoodPromotionTable
        promotions={
          promotions
        }
        canManage={
          permissions.managePromotions
        }
      />
    </div>
  );
}