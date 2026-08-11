import {
  CarFront,
  CircleDollarSign,
  RadioTower,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";

import type {
  Driver,
} from "../../types/driver";

export default function DriverStats({
  drivers,
}: {
  drivers: Driver[];
}) {
  const online =
    drivers.filter(
      (driver) =>
        driver.online,
    ).length;

  const active =
    drivers.filter(
      (driver) =>
        driver.status ===
        "active",
    ).length;

  const verified =
    drivers.filter(
      (driver) =>
        driver.verificationStatus ===
        "verified",
    ).length;

  const pakistanEarnings =
    drivers
      .filter(
        (driver) =>
          driver.region ===
          "Pakistan",
      )
      .reduce(
        (sum, driver) =>
          sum +
          driver.wallet
            .currentMonthEarnings,
        0,
      );

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
      <Card
        label="Drivers"
        value={
          drivers.length
        }
        icon={CarFront}
      />

      <Card
        label="Active"
        value={active}
        icon={
          UserRoundCheck
        }
      />

      <Card
        label="Online Now"
        value={online}
        icon={RadioTower}
      />

      <Card
        label="Verified"
        value={verified}
        icon={
          ShieldCheck
        }
      />

      <Card
        label="PK Monthly Earnings"
        value={`Rs ${pakistanEarnings.toLocaleString()}`}
        icon={
          CircleDollarSign
        }
      />
    </div>
  );
}

function Card({
  label,
  value,
  icon: Icon,
}: {
  label: string;

  value:
    string | number;

  icon:
    typeof CarFront;
}) {
  return (
    <div className="safari-card p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-safari-50 text-safari-600 dark:bg-safari-500/10 dark:text-safari-400">
        <Icon size={19} />
      </div>

      <div className="mt-5 text-2xl font-bold text-slate-950 dark:text-white">
        {value}
      </div>

      <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        {label}
      </div>
    </div>
  );
}