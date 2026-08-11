import type {
  PassengerRewardAccount,
} from "../../types/rewards";

export default function PassengerPointsTable({
  passengers,
}: {
  passengers: PassengerRewardAccount[];
}) {
  return (
    <div className="safari-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-slate-100 bg-slate-50/70 dark:border-white/[0.06] dark:bg-white/[0.02]">
            <tr>
              {[
                "Passenger",
                "Region",
                "Available",
                "Lifetime Earned",
                "Redeemed",
                "Expiring Soon",
              ].map((label) => (
                <th
                  key={label}
                  className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {passengers.map((passenger) => (
              <tr
                key={passenger.passengerId}
                className="border-b border-slate-100 last:border-0 dark:border-white/[0.05]"
              >
                <td className="px-5 py-4">
                  <div className="font-semibold text-slate-900 dark:text-white">
                    {passenger.passengerName}
                  </div>

                  <div className="mt-1 text-xs text-slate-400">
                    {passenger.passengerId}
                  </div>
                </td>

                <td className="px-5 py-4 text-sm text-slate-500">
                  {passenger.region}
                </td>

                <td className="px-5 py-4 text-lg font-bold text-safari-600 dark:text-safari-400">
                  {passenger.availablePoints.toLocaleString()}
                </td>

                <td className="px-5 py-4 text-sm text-slate-500">
                  {passenger.lifetimeEarned.toLocaleString()}
                </td>

                <td className="px-5 py-4 text-sm text-slate-500">
                  {passenger.lifetimeRedeemed.toLocaleString()}
                </td>

                <td className="px-5 py-4 text-sm text-amber-600">
                  {passenger.expiringSoon.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}