import {
  Bike,
  CircleDollarSign,
  Clock3,
  ShoppingBasket,
  Store,
  Users,
  UtensilsCrossed,
} from "lucide-react";

import type {
  LucideIcon,
} from "lucide-react";

import {
  useAuthStore,
} from "../../store/authStore";

type StatCard = {
  label: string;

  value: string;

  helper: string;

  icon: LucideIcon;

  trend?: string;
};

export default function DashboardPage() {
  const user =
    useAuthStore(
      (state) =>
        state.user,
    );

  if (!user) {
    return null;
  }

  if (
    user.role ===
    "food_merchant"
  ) {
    return (
      <MerchantDashboard
        type="Food"
        workspace="Restaurant Workspace"
        description="Track restaurant orders, sales and daily operations."
        stats={[
          {
            label:
              "Today's orders",

            value: "48",

            helper:
              "Orders received",

            trend:
              "+12% today",

            icon:
              UtensilsCrossed,
          },

          {
            label:
              "Preparing",

            value: "9",

            helper:
              "Active orders",

            icon:
              Clock3,
          },

          {
            label:
              "Revenue",

            value:
              "Rs 38,420",

            helper:
              "Today's gross sales",

            icon:
              CircleDollarSign,
          },

          {
            label:
              "Payout",

            value:
              "Rs 31,890",

            helper:
              "Estimated settlement",

            icon:
              CircleDollarSign,
          },
        ]}
        attention={[
          [
            "Pending orders",
            "8",
          ],

          [
            "New reviews",
            "4",
          ],

          [
            "Payout pending",
            "1",
          ],
        ]}
      />
    );
  }

  if (
    user.role ===
    "grocery_merchant"
  ) {
    return (
      <MerchantDashboard
        type="Grocery"
        workspace="Grocery Workspace"
        description="Monitor grocery orders, inventory and store performance."
        stats={[
          {
            label:
              "Today's orders",

            value: "61",

            helper:
              "Orders received",

            trend:
              "+9.3% today",

            icon:
              ShoppingBasket,
          },

          {
            label:
              "Processing",

            value: "13",

            helper:
              "Active orders",

            icon:
              Clock3,
          },

          {
            label:
              "Revenue",

            value:
              "Rs 72,850",

            helper:
              "Today's gross sales",

            icon:
              CircleDollarSign,
          },

          {
            label:
              "Payout",

            value:
              "Rs 65,565",

            helper:
              "Estimated settlement",

            icon:
              CircleDollarSign,
          },
        ]}
        attention={[
          [
            "Low stock products",
            "12",
          ],

          [
            "Substitutions",
            "5",
          ],

          [
            "Payout pending",
            "1",
          ],
        ]}
      />
    );
  }

  if (
    user.role ===
    "pharmacy_merchant"
  ) {
    return (
      <MerchantDashboard
        type="Pharmacy"
        workspace="Pharmacy Workspace"
        description="Monitor prescriptions, pharmacy orders and daily revenue."
        stats={[
          {
            label:
              "Today's orders",

            value: "36",

            helper:
              "Orders received",

            trend:
              "+6.5% today",

            icon: Store,
          },

          {
            label:
              "Prescriptions",

            value: "11",

            helper:
              "Need review",

            icon:
              Clock3,
          },

          {
            label:
              "Revenue",

            value:
              "Rs 46,230",

            helper:
              "Today's gross sales",

            icon:
              CircleDollarSign,
          },

          {
            label:
              "Payout",

            value:
              "Rs 41,607",

            helper:
              "Estimated settlement",

            icon:
              CircleDollarSign,
          },
        ]}
        attention={[
          [
            "Prescription reviews",
            "11",
          ],

          [
            "Low stock items",
            "7",
          ],

          [
            "Payout pending",
            "1",
          ],
        ]}
      />
    );
  }

  if (
    user.role ===
    "services_merchant"
  ) {
    return (
      <MerchantDashboard
        type="Services"
        workspace="Services Workspace"
        description="Track bookings, staff activity and service revenue."
        stats={[
          {
            label:
              "Today's bookings",

            value: "27",

            helper:
              "Bookings received",

            trend:
              "+14% today",

            icon: Store,
          },

          {
            label:
              "In progress",

            value: "8",

            helper:
              "Active jobs",

            icon:
              Clock3,
          },

          {
            label:
              "Revenue",

            value:
              "Rs 54,600",

            helper:
              "Today's gross sales",

            icon:
              CircleDollarSign,
          },

          {
            label:
              "Payout",

            value:
              "Rs 46,410",

            helper:
              "Estimated settlement",

            icon:
              CircleDollarSign,
          },
        ]}
        attention={[
          [
            "New bookings",
            "6",
          ],

          [
            "Staff unavailable",
            "2",
          ],

          [
            "Payout pending",
            "1",
          ],
        ]}
      />
    );
  }

  return (
    <AdminDashboard />
  );
}

function AdminDashboard() {
  const stats: StatCard[] =
    [
      {
        label:
          "Active rides",

        value: "128",

        helper:
          "Live across regions",

        trend:
          "+8.4% today",

        icon: Bike,
      },

      {
        label:
          "Active drivers",

        value: "642",

        helper:
          "Across regions",

        icon: Users,
      },

      {
        label:
          "Merchants",

        value: "384",

        helper:
          "Approved partners",

        icon: Store,
      },

      {
        label:
          "Food orders",

        value: "726",

        helper: "Today",

        icon:
          UtensilsCrossed,
      },

      {
        label:
          "Grocery orders",

        value: "418",

        helper: "Today",

        icon:
          ShoppingBasket,
      },

      {
        label:
          "Safari revenue",

        value:
          "Rs 428K",

        helper:
          "Platform earnings",

        trend:
          "+9.7% today",

        icon:
          CircleDollarSign,
      },
    ];

  return (
    <div>
      <DashboardHeading
        eyebrow="Safari Control Center"
        title="Dashboard"
        description="Overview of Safari operations across rides and all marketplace services."
        showRegion
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        {stats.map(
          (stat) => (
            <ModernStatCard
              key={stat.label}
              {...stat}
            />
          ),
        )}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.65fr_1fr]">
        <AnalyticsCard
          title="Operations overview"
          description="Real analytics will populate this area when Safari API integration starts."
        />

        <AttentionCard
          title="Pending actions"
          rows={[
            [
              "Merchant applications",
              "14",
            ],

            [
              "Driver applications",
              "8",
            ],

            [
              "Pharmacy verification",
              "2",
            ],

            [
              "Open disputes",
              "6",
            ],
          ]}
        />
      </div>
    </div>
  );
}

function MerchantDashboard({
  type,
  workspace,
  description,
  stats,
  attention,
}: {
  type: string;

  workspace: string;

  description: string;

  stats: StatCard[];

  attention:
    Array<[string, string]>;
}) {
  return (
    <div>
      <DashboardHeading
        eyebrow={workspace}
        title={`${type} Dashboard`}
        description={description}
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(
          (stat) => (
            <ModernStatCard
              key={stat.label}
              {...stat}
            />
          ),
        )}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <AnalyticsCard
          title="Business performance"
          description="Live analytics will populate this workspace after Safari API integration."
        />

        <AttentionCard
          title="Needs attention"
          rows={attention}
        />
      </div>
    </div>
  );
}

function DashboardHeading({
  eyebrow,
  title,
  description,
  showRegion = false,
}: {
  eyebrow: string;

  title: string;

  description: string;

  showRegion?: boolean;
}) {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <div className="text-[12px] font-bold text-safari-600 dark:text-safari-400">
          {eyebrow}
        </div>

        <h1 className="mt-1.5 text-[30px] font-extrabold tracking-[-0.035em] text-[var(--safari-text-strong)]">
          {title}
        </h1>

        <p className="mt-1.5 text-[13px] leading-6 text-[var(--safari-text-secondary)]">
          {description}
        </p>
      </div>

      <div className="flex items-center gap-2">
        {showRegion && (
          <select className="safari-select w-auto min-w-[120px]">
            <option>
              All regions
            </option>

            <option>
              Pakistan
            </option>

            <option>
              Germany
            </option>
          </select>
        )}

        <select className="safari-select w-auto min-w-[105px]">
          <option>
            Today
          </option>

          <option>
            7 days
          </option>

          <option>
            30 days
          </option>
        </select>
      </div>
    </div>
  );
}

function ModernStatCard({
  label,
  value,
  helper,
  trend,
  icon: Icon,
}: StatCard) {
  return (
    <article className="safari-stat-card group">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-safari-50 text-safari-600 transition duration-200 group-hover:bg-safari-100 dark:bg-safari-500/10 dark:text-safari-400 dark:group-hover:bg-safari-500/15">
          <Icon
            size={18}
            strokeWidth={1.9}
          />
        </div>

        {trend && (
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
            {trend}
          </span>
        )}
      </div>

      <div className="mt-6">
        <div className="text-[25px] font-extrabold tracking-[-0.025em] text-[var(--safari-text-strong)]">
          {value}
        </div>

        <div className="mt-1 text-[13px] font-semibold text-[var(--safari-text)]">
          {label}
        </div>

        <div className="mt-2 text-[11px] text-[var(--safari-muted)]">
          {helper}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-safari-500 to-emerald-400 transition-transform duration-300 group-hover:scale-x-100" />
    </article>
  );
}

function AnalyticsCard({
  title,
  description,
}: {
  title: string;

  description: string;
}) {
  return (
    <section className="safari-card p-5 sm:p-6">
      <h2 className="text-[15px] font-bold text-[var(--safari-text-strong)]">
        {title}
      </h2>

      <p className="mt-1 text-[12px] text-[var(--safari-text-secondary)]">
        {description}
      </p>

      <div className="mt-6 flex min-h-[285px] items-center justify-center overflow-hidden rounded-2xl border border-[var(--safari-border-soft)] bg-[var(--safari-surface-soft)]">
        <div className="relative text-center">
          <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-safari-500/[0.04] blur-2xl" />

          <div className="relative mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-safari-500/10 bg-safari-50 text-safari-600 shadow-sm dark:bg-safari-500/10 dark:text-safari-400">
            <CircleDollarSign
              size={22}
            />
          </div>

          <div className="relative mt-4 text-[13px] font-bold text-[var(--safari-text-strong)]">
            Analytics ready
          </div>

          <div className="relative mt-1 text-[11px] text-[var(--safari-muted)]">
            Backend data will
            replace demo metrics.
          </div>
        </div>
      </div>
    </section>
  );
}

function AttentionCard({
  title,
  rows,
}: {
  title: string;

  rows:
    Array<[string, string]>;
}) {
  return (
    <section className="safari-card p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-[15px] font-bold text-[var(--safari-text-strong)]">
          {title}
        </h2>

        <span className="h-2 w-2 rounded-full bg-safari-500 shadow-[0_0_0_5px_rgba(16,185,129,0.08)]" />
      </div>

      <div className="mt-6 space-y-3">
        {rows.map(
          ([label, value]) => (
            <div
              key={label}
              className="group flex min-h-[56px] items-center justify-between gap-4 rounded-xl border border-[var(--safari-border-soft)] bg-[var(--safari-surface-soft)] px-4 transition duration-200 hover:-translate-y-[1px] hover:border-safari-500/20 hover:bg-[var(--safari-surface-hover)]"
            >
              <span className="text-[12px] font-medium text-[var(--safari-text-secondary)]">
                {label}
              </span>

              <span className="min-w-8 rounded-lg bg-safari-50 px-2.5 py-1 text-center text-[11px] font-bold text-safari-700 dark:bg-safari-500/10 dark:text-safari-400">
                {value}
              </span>
            </div>
          ),
        )}
      </div>
    </section>
  );
}