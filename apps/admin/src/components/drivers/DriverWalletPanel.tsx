import {
  CircleDollarSign,
  Gift,
  WalletCards,
} from "lucide-react";

import type {
  Driver,
} from "../../types/driver";

export default function DriverWalletPanel({
  driver,
}: {
  driver: Driver;
}) {
  const symbol =
    driver.region ===
    "Germany"
      ? "€"
      : "Rs ";

  return (
    <section className="safari-card p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-safari-600 dark:text-safari-400">
            Driver Finance
          </div>

          <h2 className="mt-1 text-xl font-bold text-slate-950 dark:text-white">
            Wallet & Earnings
          </h2>
        </div>

        <WalletCards className="text-safari-600" />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Item
          icon={
            WalletCards
          }
          label="Wallet Balance"
          value={`${symbol}${driver.wallet.balance.toLocaleString()}`}
        />

        <Item
          icon={
            CircleDollarSign
          }
          label="Pending Payout"
          value={`${symbol}${driver.wallet.pendingPayout.toLocaleString()}`}
        />

        <Item
          icon={
            CircleDollarSign
          }
          label="Total Earnings"
          value={`${symbol}${driver.wallet.totalEarnings.toLocaleString()}`}
        />

        <Item
          icon={
            CircleDollarSign
          }
          label="Safari Commission"
          value={`${symbol}${driver.wallet.totalCommission.toLocaleString()}`}
        />

        <Item
          icon={Gift}
          label="Free Rides Used"
          value={
            driver.wallet
              .freeRideUsed
          }
        />

        <Item
          icon={Gift}
          label="Free Rides Remaining"
          value={
            driver.wallet
              .freeRideRemaining
          }
        />
      </div>
    </section>
  );
}

function Item({
  icon: Icon,
  label,
  value,
}: {
  icon:
    typeof WalletCards;

  label: string;

  value:
    string | number;
}) {
  return (
    <div className="rounded-xl border border-slate-100 p-4 dark:border-white/[0.06]">
      <Icon
        size={16}
        className="text-safari-600"
      />

      <div className="mt-3 text-xs text-slate-400">
        {label}
      </div>

      <div className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
        {value}
      </div>
    </div>
  );
}