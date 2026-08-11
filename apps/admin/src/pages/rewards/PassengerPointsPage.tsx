import PassengerPointsTable from "../../components/rewards/PassengerPointsTable";

import {
  useRewardsStore,
} from "../../store/rewardsStore";

export default function PassengerPointsPage() {
  const passengers = useRewardsStore(
    (state) => state.passengerRewards,
  );

  return (
    <div>
      <div className="mb-7">
        <div className="text-sm font-semibold text-safari-600">
          Loyalty Customers
        </div>

        <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
          Passenger Points
        </h1>
      </div>

      <PassengerPointsTable
        passengers={passengers}
      />
    </div>
  );
}