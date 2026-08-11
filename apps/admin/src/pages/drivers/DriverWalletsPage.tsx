import {
  Link,
} from "react-router-dom";

import {
  useDriverStore,
} from "../../store/driverStore";

export default function DriverWalletsPage() {
  const drivers =
    useDriverStore(
      (state) =>
        state.drivers,
    );

  return (
    <div>
      <div className="mb-7">
        <div className="text-sm font-semibold text-safari-600">
          Driver Finance
        </div>

        <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
          Driver Wallets
        </h1>
      </div>

      <div className="safari-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-slate-100 bg-slate-50/70 dark:border-white/[0.06] dark:bg-white/[0.02]">
              <tr>
                {[
                  "Driver",
                  "Region",
                  "Balance",
                  "Pending Payout",
                  "Month Earnings",
                  "Commission",
                  "Free Rides",
                ].map(
                  (label) => (
                    <th
                      key={label}
                      className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400"
                    >
                      {label}
                    </th>
                  ),
                )}
              </tr>
            </thead>

            <tbody>
              {drivers.map(
                (driver) => {
                  const symbol =
                    driver.region ===
                    "Germany"
                      ? "€"
                      : "Rs ";

                  return (
                    <tr
                      key={
                        driver.id
                      }
                      className="border-b border-slate-100 last:border-0 dark:border-white/[0.05]"
                    >
                      <td className="px-5 py-4">
                        <Link
                          to={`/drivers/${driver.id}`}
                          className="font-semibold text-slate-900 hover:text-safari-600 dark:text-white"
                        >
                          {
                            driver.fullName
                          }
                        </Link>
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-500">
                        {
                          driver.region
                        }
                      </td>

                      <td className="px-5 py-4 font-semibold text-slate-800 dark:text-slate-200">
                        {symbol}
                        {driver.wallet.balance.toLocaleString()}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-500">
                        {symbol}
                        {driver.wallet.pendingPayout.toLocaleString()}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-500">
                        {symbol}
                        {driver.wallet.currentMonthEarnings.toLocaleString()}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-500">
                        {symbol}
                        {driver.wallet.totalCommission.toLocaleString()}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-500">
                        {
                          driver.wallet.freeRideUsed
                        }{" "}
                        used /{" "}
                        {
                          driver.wallet.freeRideRemaining
                        }{" "}
                        left
                      </td>
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}