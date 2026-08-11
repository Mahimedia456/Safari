import {
  AlertTriangle,
  BadgePercent,
  Banknote,
  Bell,
  Bike,
  Boxes,
  Calculator,
  CalendarClock,
  CalendarDays,
  CarFront,
  CircleDollarSign,
  ClipboardList,
  Construction,
  FileCheck2,
  Flag,
  Gauge,
  Gift,
  Globe2,
  HeartPulse,
  KeyRound,
  Languages,
  LayoutDashboard,
  LifeBuoy,
  Map,
  MapPinned,
  PackageOpen,
  Percent,
  Pill,
  RadioTower,
  ReceiptText,
  Repeat2,
  Route,
  Scale,
  Settings,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShoppingBasket,
  SlidersHorizontal,
  Smartphone,
  Star,
  Store,
  Tags,
  TrendingUp,
  Upload,
  UserCheck,
  UserPlus,
  Users,
  UsersRound,
  UtensilsCrossed,
  WalletCards,
  Wrench,
  XCircle,
} from "lucide-react";

import type {
  LucideIcon,
} from "lucide-react";

import type {
  AccountRole,
} from "../types/auth";

export interface NavigationItem {
  label: string;

  path: string;

  icon: LucideIcon;
}

export interface NavigationSection {
  title: string;

  items: NavigationItem[];
}

/* ======================================================
   ADMIN
====================================================== */

const adminNavigation: NavigationSection[] = [
  {
    title: "Overview",

    items: [
      {
        label: "Dashboard",
        path: "/",
        icon: LayoutDashboard,
      },
    ],
  },

  {
    title: "Ride Operations",

    items: [
      {
        label: "Ride Dashboard",
        path: "/rides/dashboard",
        icon: Bike,
      },

      {
        label: "All Rides",
        path: "/rides",
        icon: Route,
      },

      {
        label: "Active Rides",
        path: "/rides/active",
        icon: RadioTower,
      },

      {
        label: "Dispatch",
        path: "/rides/dispatch",
        icon: CarFront,
      },

      {
        label: "Scheduled",
        path: "/rides/scheduled",
        icon: CalendarClock,
      },

      {
        label: "Cancelled",
        path: "/rides/cancelled",
        icon: XCircle,
      },

      {
        label: "Incidents",
        path: "/rides/incidents",
        icon: AlertTriangle,
      },
    ],
  },

  {
    title: "Ride Pricing",

    items: [
      {
        label: "Pricing Dashboard",
        path: "/pricing",
        icon: SlidersHorizontal,
      },

      {
        label: "Pakistan Pricing",
        path: "/pricing/pakistan",
        icon: SlidersHorizontal,
      },

      {
        label: "Germany Pricing",
        path: "/pricing/germany",
        icon: SlidersHorizontal,
      },

      {
        label: "Surge Pricing",
        path: "/pricing/surge",
        icon: TrendingUp,
      },

      {
        label: "Driver Commission",
        path: "/pricing/commission",
        icon: Percent,
      },

      {
        label: "Free Ride Program",
        path: "/pricing/free-rides",
        icon: Gift,
      },

      {
        label: "Fare Calculator",
        path: "/pricing/calculator",
        icon: Calculator,
      },
    ],
  },

  {
    title: "Driver Management",

    items: [
      {
        label: "Driver Dashboard",
        path: "/drivers/dashboard",
        icon: CarFront,
      },

      {
        label: "All Drivers",
        path: "/drivers",
        icon: Users,
      },

      {
        label: "Applications",
        path: "/drivers/applications",
        icon: UserPlus,
      },

      {
        label: "Vehicles",
        path: "/drivers/vehicles",
        icon: CarFront,
      },

      {
        label: "Online Drivers",
        path: "/drivers/online",
        icon: RadioTower,
      },

      {
        label: "Suspended",
        path: "/drivers/suspended",
        icon: ShieldAlert,
      },

      {
        label: "Ratings",
        path: "/drivers/ratings",
        icon: Star,
      },

      {
        label: "Driver Wallets",
        path: "/drivers/wallets",
        icon: WalletCards,
      },
    ],
  },

  {
    title: "Passenger Management",

    items: [
      {
        label: "Passenger Dashboard",
        path: "/passengers/dashboard",
        icon: Users,
      },

      {
        label: "All Passengers",
        path: "/passengers",
        icon: Users,
      },

      {
        label: "Active Passengers",
        path: "/passengers/active",
        icon: UserCheck,
      },

      {
        label: "Restricted",
        path: "/passengers/restricted",
        icon: ShieldAlert,
      },

      {
        label: "Passenger Wallets",
        path: "/passengers/wallets",
        icon: WalletCards,
      },

      {
        label: "Safety Flags",
        path: "/passengers/safety",
        icon: AlertTriangle,
      },

      {
        label: "Support Cases",
        path: "/passengers/support",
        icon: LifeBuoy,
      },
    ],
  },

  {
    title: "Marketplace",

    items: [
      {
        label: "Food",
        path: "/food",
        icon: UtensilsCrossed,
      },

      {
        label: "Grocery",
        path: "/grocery",
        icon: ShoppingBasket,
      },

      {
        label: "Pharmacy",
        path: "/pharmacy",
        icon: Pill,
      },

      {
        label: "Services",
        path: "/services",
        icon: Wrench,
      },
    ],
  },

  {
    title: "Partners",

    items: [
      {
        label: "Merchants",
        path: "/merchants",
        icon: Store,
      },

      {
        label: "Merchant Applications",
        path: "/merchants/applications",
        icon: ClipboardList,
      },

      {
        label: "Stores",
        path: "/stores",
        icon: PackageOpen,
      },
    ],
  },

  {
    title: "Rewards",

    items: [
      {
        label: "Rewards Dashboard",
        path: "/rewards",
        icon: Gift,
      },

      {
        label: "Reward Rules",
        path: "/rewards/rules",
        icon: SlidersHorizontal,
      },

      {
        label: "Campaigns",
        path: "/rewards/campaigns",
        icon: BadgePercent,
      },

      {
        label: "Reward Ledger",
        path: "/rewards/ledger",
        icon: ReceiptText,
      },

    
      {
        label: "Referrals",
        path: "/rewards/referrals",
        icon: Users,
      },
    ],
  },

  {
    title: "Finance",

    items: [
      {
        label: "Finance Dashboard",
        path: "/finance",
        icon: CircleDollarSign,
      },

      {
        label: "Transactions",
        path: "/finance/transactions",
        icon: ReceiptText,
      },

      {
        label: "Revenue",
        path: "/finance/revenue",
        icon: TrendingUp,
      },

      {
        label: "Commissions",
        path: "/finance/commissions",
        icon: Percent,
      },

      {
        label: "Driver Payouts",
        path: "/finance/payouts/drivers",
        icon: WalletCards,
      },

      {
        label: "Merchant Payouts",
        path: "/finance/payouts/merchants",
        icon: Banknote,
      },

      {
        label: "Refunds",
        path: "/finance/refunds",
        icon: Repeat2,
      },

      {
        label: "Wallet Ledger",
        path: "/finance/wallet-ledger",
        icon: ReceiptText,
      },

      {
        label: "Settlements",
        path: "/finance/settlements",
        icon: FileCheck2,
      },
    ],
  },

  {
    title: "Region Management",

    items: [
      {
        label: "Region Dashboard",
        path: "/regions/dashboard",
        icon: Globe2,
      },

      {
        label: "All Regions",
        path: "/regions",
        icon: Map,
      },

      {
        label: "Pakistan",
        path: "/regions/pk",
        icon: Globe2,
      },

      {
        label: "Germany",
        path: "/regions/de",
        icon: Globe2,
      },

      {
        label: "PK Localization",
        path: "/regions/pk/localization",
        icon: Languages,
      },

      {
        label: "Regional Support",
        path: "/regions/pk/support",
        icon: LifeBuoy,
      },
    ],
  },

  {
    title: "Access Control",

    items: [
      {
        label: "Access Dashboard",
        path: "/access",
        icon: Shield,
      },

      {
        label: "Roles",
        path: "/access/roles",
        icon: ShieldCheck,
      },

      {
        label: "Permission Matrix",
        path: "/access/permissions",
        icon: KeyRound,
      },

      {
        label: "Admin Users",
        path: "/access/users",
        icon: UsersRound,
      },

      {
        label: "Create Admin User",
        path: "/access/users/create",
        icon: UserPlus,
      },
    ],
  },

  {
    title: "System",

    items: [
      {
        label: "Settings Dashboard",
        path: "/settings",
        icon: Settings,
      },

      {
        label: "General",
        path: "/settings/general",
        icon: Settings,
      },

      {
        label: "Mobile Apps",
        path: "/settings/mobile-apps",
        icon: Smartphone,
      },

      {
        label: "Maintenance",
        path: "/settings/maintenance",
        icon: Construction,
      },

      {
        label: "Authentication",
        path: "/settings/auth",
        icon: KeyRound,
      },

      {
        label: "Payments",
        path: "/settings/payments",
        icon: WalletCards,
      },

      {
        label: "Ride Defaults",
        path: "/settings/rides",
        icon: CarFront,
      },

      {
        label: "Marketplace",
        path: "/settings/marketplace",
        icon: Store,
      },

      {
        label: "Notifications",
        path: "/settings/notifications",
        icon: Bell,
      },

      {
        label: "Uploads",
        path: "/settings/uploads",
        icon: Upload,
      },

      {
        label: "Support & Legal",
        path: "/settings/legal",
        icon: Scale,
      },

      {
        label: "Feature Flags",
        path: "/settings/features",
        icon: Flag,
      },

      {
        label: "Security",
        path: "/settings/security",
        icon: ShieldCheck,
      },

      {
        label: "Audit Logs",
        path: "/settings/audit-logs",
        icon: ReceiptText,
      },
    ],
  },
];

/* ======================================================
   FOOD MERCHANT
====================================================== */

const foodNavigation: NavigationSection[] = [
  {
    title: "Restaurant",

    items: [
      {
        label: "Dashboard",
        path: "/",
        icon: LayoutDashboard,
      },

      {
        label: "Orders",
        path: "/food/orders",
        icon: ClipboardList,
      },

      {
        label: "Menu",
        path: "/food/menu",
        icon: UtensilsCrossed,
      },

      {
        label: "Categories",
        path: "/food/categories",
        icon: Tags,
      },

      {
        label: "Promotions",
        path: "/food/promotions",
        icon: BadgePercent,
      },

      {
        label: "Reviews",
        path: "/food/reviews",
        icon: Star,
      },

      {
        label: "Refunds",
        path: "/food/refunds",
        icon: Repeat2,
      },
    ],
  },

  {
    title: "Finance",

    items: [
      {
        label: "Earnings",
        path: "/merchant/earnings",
        icon: CircleDollarSign,
      },

      {
        label: "Payouts",
        path: "/merchant/payouts",
        icon: Banknote,
      },
    ],
  },

  {
    title: "Business",

    items: [
      {
        label: "Store Settings",
        path: "/merchant/store-settings",
        icon: Settings,
      },
    ],
  },
];

/* ======================================================
   GROCERY MERCHANT
====================================================== */

const groceryNavigation: NavigationSection[] = [
  {
    title: "Grocery Store",

    items: [
      {
        label: "Dashboard",
        path: "/",
        icon: LayoutDashboard,
      },

      {
        label: "Orders",
        path: "/grocery/orders",
        icon: ClipboardList,
      },

      {
        label: "Products",
        path: "/grocery/products",
        icon: ShoppingBasket,
      },

      {
        label: "Categories",
        path: "/grocery/categories",
        icon: Tags,
      },

      {
        label: "Brands",
        path: "/grocery/brands",
        icon: Store,
      },

      {
        label: "Inventory",
        path: "/grocery/inventory",
        icon: Boxes,
      },

      {
        label: "Substitutions",
        path: "/grocery/substitutions",
        icon: Repeat2,
      },

      {
        label: "Promotions",
        path: "/grocery/promotions",
        icon: BadgePercent,
      },

      {
        label: "Refunds",
        path: "/grocery/refunds",
        icon: Repeat2,
      },
    ],
  },

  {
    title: "Finance",

    items: [
      {
        label: "Earnings",
        path: "/merchant/earnings",
        icon: CircleDollarSign,
      },

      {
        label: "Payouts",
        path: "/merchant/payouts",
        icon: Banknote,
      },
    ],
  },

  {
    title: "Business",

    items: [
      {
        label: "Store Settings",
        path: "/merchant/store-settings",
        icon: Settings,
      },
    ],
  },
];

/* ======================================================
   PHARMACY MERCHANT
====================================================== */

const pharmacyNavigation: NavigationSection[] = [
  {
    title: "Pharmacy",

    items: [
      {
        label: "Dashboard",
        path: "/",
        icon: LayoutDashboard,
      },

      {
        label: "Orders",
        path: "/pharmacy/orders",
        icon: ClipboardList,
      },

      {
        label: "Products",
        path: "/pharmacy/products",
        icon: Pill,
      },

      {
        label: "Categories",
        path: "/pharmacy/categories",
        icon: Tags,
      },

      {
        label: "Inventory",
        path: "/pharmacy/inventory",
        icon: Boxes,
      },

      {
        label: "Prescriptions",
        path: "/pharmacy/prescriptions",
        icon: HeartPulse,
      },

      {
        label: "License",
        path: "/pharmacy/license",
        icon: FileCheck2,
      },

      {
        label: "Promotions",
        path: "/pharmacy/promotions",
        icon: BadgePercent,
      },

      {
        label: "Refunds",
        path: "/pharmacy/refunds",
        icon: Repeat2,
      },
    ],
  },

  {
    title: "Finance",

    items: [
      {
        label: "Earnings",
        path: "/merchant/earnings",
        icon: CircleDollarSign,
      },

      {
        label: "Payouts",
        path: "/merchant/payouts",
        icon: Banknote,
      },
    ],
  },

  {
    title: "Business",

    items: [
      {
        label: "Store Settings",
        path: "/merchant/store-settings",
        icon: Settings,
      },
    ],
  },
];

/* ======================================================
   SERVICES MERCHANT
====================================================== */

const servicesNavigation: NavigationSection[] = [
  {
    title: "Service Business",

    items: [
      {
        label: "Dashboard",
        path: "/",
        icon: LayoutDashboard,
      },

      {
        label: "Bookings",
        path: "/services/bookings",
        icon: CalendarDays,
      },

      {
        label: "Services",
        path: "/services/catalog",
        icon: Wrench,
      },

      {
        label: "Categories",
        path: "/services/categories",
        icon: Tags,
      },

      {
        label: "Staff",
        path: "/services/staff",
        icon: Users,
      },

      {
        label: "Availability",
        path: "/services/availability",
        icon: Gauge,
      },

      {
        label: "Service Areas",
        path: "/services/areas",
        icon: MapPinned,
      },

      {
        label: "Reviews",
        path: "/services/reviews",
        icon: Star,
      },

      {
        label: "Promotions",
        path: "/services/promotions",
        icon: BadgePercent,
      },

      {
        label: "Refunds",
        path: "/services/refunds",
        icon: Repeat2,
      },
    ],
  },

  {
    title: "Finance",

    items: [
      {
        label: "Earnings",
        path: "/merchant/earnings",
        icon: CircleDollarSign,
      },

      {
        label: "Payouts",
        path: "/merchant/payouts",
        icon: Banknote,
      },
    ],
  },

  {
    title: "Business",

    items: [
      {
        label: "Business Settings",
        path: "/merchant/store-settings",
        icon: Settings,
      },
    ],
  },
];

/* ======================================================
   OPERATIONS MANAGER
====================================================== */

const operationsNavigation: NavigationSection[] = [
  {
    title: "Overview",

    items: [
      {
        label: "Dashboard",
        path: "/",
        icon: LayoutDashboard,
      },
    ],
  },

  {
    title: "Ride Operations",

    items: [
      {
        label: "Ride Dashboard",
        path: "/rides/dashboard",
        icon: Bike,
      },

      {
        label: "All Rides",
        path: "/rides",
        icon: Route,
      },

      {
        label: "Active Rides",
        path: "/rides/active",
        icon: RadioTower,
      },

      {
        label: "Dispatch",
        path: "/rides/dispatch",
        icon: CarFront,
      },

      {
        label: "Scheduled",
        path: "/rides/scheduled",
        icon: CalendarClock,
      },

      {
        label: "Cancelled",
        path: "/rides/cancelled",
        icon: XCircle,
      },

      {
        label: "Incidents",
        path: "/rides/incidents",
        icon: AlertTriangle,
      },
    ],
  },

  {
    title: "Pricing",

    items: [
      {
        label: "Pricing Overview",
        path: "/pricing",
        icon: SlidersHorizontal,
      },

      {
        label: "Surge Pricing",
        path: "/pricing/surge",
        icon: TrendingUp,
      },

      {
        label: "Fare Calculator",
        path: "/pricing/calculator",
        icon: Calculator,
      },
    ],
  },

  {
    title: "Drivers",

    items: [
      {
        label: "Driver Dashboard",
        path: "/drivers/dashboard",
        icon: CarFront,
      },

      {
        label: "All Drivers",
        path: "/drivers",
        icon: Users,
      },

      {
        label: "Applications",
        path: "/drivers/applications",
        icon: UserPlus,
      },

      {
        label: "Vehicles",
        path: "/drivers/vehicles",
        icon: CarFront,
      },

      {
        label: "Online Drivers",
        path: "/drivers/online",
        icon: RadioTower,
      },

      {
        label: "Suspended",
        path: "/drivers/suspended",
        icon: ShieldAlert,
      },

      {
        label: "Ratings",
        path: "/drivers/ratings",
        icon: Star,
      },
    ],
  },

  {
    title: "Passengers",

    items: [
      {
        label: "Passenger Dashboard",
        path: "/passengers/dashboard",
        icon: Users,
      },

      {
        label: "All Passengers",
        path: "/passengers",
        icon: Users,
      },

      {
        label: "Active Passengers",
        path: "/passengers/active",
        icon: UserCheck,
      },

      {
        label: "Restricted",
        path: "/passengers/restricted",
        icon: ShieldAlert,
      },

      {
        label: "Safety Flags",
        path: "/passengers/safety",
        icon: AlertTriangle,
      },

      {
        label: "Support Cases",
        path: "/passengers/support",
        icon: LifeBuoy,
      },
    ],
  },

  {
    title: "Marketplace",

    items: [
      {
        label: "Food",
        path: "/food",
        icon: UtensilsCrossed,
      },

      {
        label: "Grocery",
        path: "/grocery",
        icon: ShoppingBasket,
      },

      {
        label: "Pharmacy",
        path: "/pharmacy",
        icon: Pill,
      },

      {
        label: "Services",
        path: "/services",
        icon: Wrench,
      },
    ],
  },

  {
    title: "Partners",

    items: [
      {
        label: "Merchants",
        path: "/merchants",
        icon: Store,
      },

      {
        label: "Merchant Applications",
        path: "/merchants/applications",
        icon: ClipboardList,
      },

      {
        label: "Stores",
        path: "/stores",
        icon: PackageOpen,
      },
    ],
  },

  {
    title: "Regions",

    items: [
      {
        label: "Region Overview",
        path: "/regions/dashboard",
        icon: Globe2,
      },

      {
        label: "All Regions",
        path: "/regions",
        icon: Map,
      },

      {
        label: "Pakistan",
        path: "/regions/pk",
        icon: Globe2,
      },

      {
        label: "Germany",
        path: "/regions/de",
        icon: Globe2,
      },
    ],
  },

  {
    title: "Operational Settings",

    items: [
      {
        label: "Ride Defaults",
        path: "/settings/rides",
        icon: CarFront,
      },

      {
        label: "Marketplace Defaults",
        path: "/settings/marketplace",
        icon: Store,
      },
    ],
  },
];

/* ======================================================
   FINANCE MANAGER
====================================================== */

const financeNavigation: NavigationSection[] = [
  {
    title: "Finance",

    items: [
      {
        label: "Finance Dashboard",
        path: "/finance",
        icon: LayoutDashboard,
      },

      {
        label: "Transactions",
        path: "/finance/transactions",
        icon: ReceiptText,
      },

      {
        label: "Revenue",
        path: "/finance/revenue",
        icon: TrendingUp,
      },

      {
        label: "Commissions",
        path: "/finance/commissions",
        icon: Percent,
      },

      {
        label: "Driver Payouts",
        path: "/finance/payouts/drivers",
        icon: WalletCards,
      },

      {
        label: "Merchant Payouts",
        path: "/finance/payouts/merchants",
        icon: Banknote,
      },

      {
        label: "Refunds",
        path: "/finance/refunds",
        icon: Repeat2,
      },

      {
        label: "Wallet Ledger",
        path: "/finance/wallet-ledger",
        icon: ReceiptText,
      },

      {
        label: "Settlements",
        path: "/finance/settlements",
        icon: FileCheck2,
      },
    ],
  },

  {
    title: "Ride Economics",

    items: [
      {
        label: "Pricing",
        path: "/pricing",
        icon: SlidersHorizontal,
      },

      {
        label: "Pakistan Pricing",
        path: "/pricing/pakistan",
        icon: SlidersHorizontal,
      },

      {
        label: "Germany Pricing",
        path: "/pricing/germany",
        icon: SlidersHorizontal,
      },

      {
        label: "Driver Commission",
        path: "/pricing/commission",
        icon: Percent,
      },

      {
        label: "Free Ride Program",
        path: "/pricing/free-rides",
        icon: Gift,
      },

      {
        label: "Fare Calculator",
        path: "/pricing/calculator",
        icon: Calculator,
      },
    ],
  },

  {
    title: "Drivers",

    items: [
      {
        label: "Driver Wallets",
        path: "/drivers/wallets",
        icon: WalletCards,
      },
    ],
  },

  {
    title: "Passengers",

    items: [
      {
        label: "Passenger Wallets",
        path: "/passengers/wallets",
        icon: WalletCards,
      },
    ],
  },

  {
    title: "Regions",

    items: [
      {
        label: "All Regions",
        path: "/regions",
        icon: Globe2,
      },
    ],
  },

  {
    title: "Finance Settings",

    items: [
      {
        label: "Payment Settings",
        path: "/settings/payments",
        icon: WalletCards,
      },

      {
        label: "Audit Logs",
        path: "/settings/audit-logs",
        icon: ShieldCheck,
      },
    ],
  },
];

/* ======================================================
   SUPPORT
====================================================== */

const supportNavigation: NavigationSection[] = [
  {
    title: "Support",

    items: [
      {
        label: "Dashboard",
        path: "/",
        icon: LayoutDashboard,
      },

      {
        label: "Rides",
        path: "/rides",
        icon: Bike,
      },

      {
        label: "Ride Incidents",
        path: "/rides/incidents",
        icon: AlertTriangle,
      },

      {
        label: "Drivers",
        path: "/drivers",
        icon: Users,
      },

      {
        label: "Driver Ratings",
        path: "/drivers/ratings",
        icon: Star,
      },

      {
        label: "Passengers",
        path: "/passengers",
        icon: Users,
      },

      {
        label: "Passenger Safety",
        path: "/passengers/safety",
        icon: ShieldAlert,
      },

      {
        label: "Passenger Cases",
        path: "/passengers/support",
        icon: LifeBuoy,
      },

      {
        label: "Food",
        path: "/food",
        icon: UtensilsCrossed,
      },

      {
        label: "Grocery",
        path: "/grocery",
        icon: ShoppingBasket,
      },

      {
        label: "Pharmacy",
        path: "/pharmacy",
        icon: Pill,
      },

      {
        label: "Services",
        path: "/services",
        icon: Wrench,
      },

      {
        label: "Merchants",
        path: "/merchants",
        icon: Store,
      },

      {
        label: "Stores",
        path: "/stores",
        icon: PackageOpen,
      },
    ],
  },

  {
    title: "Regional Support",

    items: [
      {
        label: "Regions",
        path: "/regions",
        icon: Globe2,
      },

      {
        label: "Pakistan Support",
        path: "/regions/pk/support",
        icon: LifeBuoy,
      },

      {
        label: "Germany Support",
        path: "/regions/de/support",
        icon: LifeBuoy,
      },
    ],
  },
];

/* ======================================================
   EXPORT
====================================================== */

export function getNavigationForRole(
  role: AccountRole,
): NavigationSection[] {
  switch (role) {
    case "super_admin":
    case "admin":
      return adminNavigation;

    case "operations_manager":
      return operationsNavigation;

    case "finance_manager":
      return financeNavigation;

    case "support":
      return supportNavigation;

    case "food_merchant":
      return foodNavigation;

    case "grocery_merchant":
      return groceryNavigation;

    case "pharmacy_merchant":
      return pharmacyNavigation;

    case "services_merchant":
      return servicesNavigation;

    default:
      return [];
  }
}

export function getAllowedPathsForRole(
  role: AccountRole,
): string[] {
  return getNavigationForRole(role)
    .flatMap(
      (section) =>
        section.items,
    )
    .map(
      (item) =>
        item.path,
    );
}

export function canRoleAccessPath(
  role: AccountRole,
  pathname: string,
): boolean {
  if (
    pathname ===
    "/access-denied"
  ) {
    return true;
  }

  const paths =
    getAllowedPathsForRole(
      role,
    );

  return paths.some(
    (path) => {
      if (path === "/") {
        return pathname === "/";
      }

      return (
        pathname === path ||
        pathname.startsWith(
          `${path}/`,
        )
      );
    },
  );
}