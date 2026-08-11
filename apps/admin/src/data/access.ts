import type {
  AccessRole,
  AdminUser,
} from "../types/access";

export const dummyAccessRoles: AccessRole[] = [
  {
    id: "ROLE-SUPER-ADMIN",

    role: "super_admin",

    name: "Super Admin",

    description:
      "Full unrestricted Safari platform access.",

    system: true,

    permissions: [
      {
        module: "dashboard",
        actions: ["view"],
      },
      {
        module: "rides",
        actions: [
          "view",
          "create",
          "edit",
          "delete",
          "approve",
          "reject",
          "manage",
        ],
      },
      {
        module: "pricing",
        actions: [
          "view",
          "edit",
          "manage",
        ],
      },
      {
        module: "drivers",
        actions: [
          "view",
          "create",
          "edit",
          "approve",
          "reject",
          "suspend",
          "manage",
        ],
      },
      {
        module: "passengers",
        actions: [
          "view",
          "edit",
          "suspend",
          "manage",
        ],
      },
      {
        module: "merchants",
        actions: [
          "view",
          "create",
          "edit",
          "approve",
          "reject",
          "suspend",
          "manage",
        ],
      },
      {
        module: "stores",
        actions: [
          "view",
          "create",
          "edit",
          "delete",
          "manage",
        ],
      },
      {
        module: "food",
        actions: [
          "view",
          "edit",
          "refund",
          "manage",
        ],
      },
      {
        module: "grocery",
        actions: [
          "view",
          "edit",
          "refund",
          "manage",
        ],
      },
      {
        module: "pharmacy",
        actions: [
          "view",
          "edit",
          "approve",
          "reject",
          "refund",
          "manage",
        ],
      },
      {
        module: "services",
        actions: [
          "view",
          "edit",
          "refund",
          "manage",
        ],
      },
      {
        module: "rewards",
        actions: [
          "view",
          "create",
          "edit",
          "delete",
          "manage",
        ],
      },
      {
        module: "finance",
        actions: [
          "view",
          "edit",
          "refund",
          "payout",
          "export",
          "manage",
        ],
      },
      {
        module: "regions",
        actions: [
          "view",
          "edit",
          "manage",
        ],
      },
      {
        module: "roles",
        actions: [
          "view",
          "create",
          "edit",
          "delete",
          "manage",
        ],
      },
      {
        module: "settings",
        actions: [
          "view",
          "edit",
          "manage",
        ],
      },
    ],

    createdAt:
      "2026-01-01T09:00:00",

    updatedAt:
      "2026-07-27T09:00:00",
  },

  {
    id: "ROLE-ADMIN",

    role: "admin",

    name: "Admin",

    description:
      "Platform administration without unrestricted super admin controls.",

    system: true,

    permissions: [
      {
        module: "dashboard",
        actions: ["view"],
      },
      {
        module: "rides",
        actions: [
          "view",
          "edit",
          "approve",
          "reject",
          "manage",
        ],
      },
      {
        module: "pricing",
        actions: [
          "view",
          "edit",
        ],
      },
      {
        module: "drivers",
        actions: [
          "view",
          "edit",
          "approve",
          "reject",
          "suspend",
        ],
      },
      {
        module: "passengers",
        actions: [
          "view",
          "edit",
          "suspend",
        ],
      },
      {
        module: "merchants",
        actions: [
          "view",
          "edit",
          "approve",
          "reject",
          "suspend",
        ],
      },
      {
        module: "stores",
        actions: [
          "view",
          "create",
          "edit",
        ],
      },
      {
        module: "food",
        actions: [
          "view",
          "edit",
          "refund",
        ],
      },
      {
        module: "grocery",
        actions: [
          "view",
          "edit",
          "refund",
        ],
      },
      {
        module: "pharmacy",
        actions: [
          "view",
          "edit",
          "approve",
          "reject",
          "refund",
        ],
      },
      {
        module: "services",
        actions: [
          "view",
          "edit",
          "refund",
        ],
      },
      {
        module: "rewards",
        actions: [
          "view",
          "create",
          "edit",
        ],
      },
      {
        module: "finance",
        actions: [
          "view",
          "refund",
          "payout",
          "export",
        ],
      },
      {
        module: "regions",
        actions: [
          "view",
          "edit",
        ],
      },
      {
        module: "roles",
        actions: ["view"],
      },
      {
        module: "settings",
        actions: [
          "view",
          "edit",
        ],
      },
    ],

    createdAt:
      "2026-01-01T09:00:00",

    updatedAt:
      "2026-07-27T09:00:00",
  },

  {
    id: "ROLE-OPERATIONS",

    role: "operations_manager",

    name: "Operations Manager",

    description:
      "Ride, driver, passenger, merchant and operational controls.",

    system: true,

    permissions: [
      {
        module: "dashboard",
        actions: ["view"],
      },
      {
        module: "rides",
        actions: [
          "view",
          "edit",
          "manage",
        ],
      },
      {
        module: "pricing",
        actions: [
          "view",
          "edit",
        ],
      },
      {
        module: "drivers",
        actions: [
          "view",
          "edit",
          "approve",
          "reject",
          "suspend",
        ],
      },
      {
        module: "passengers",
        actions: [
          "view",
          "edit",
          "suspend",
        ],
      },
      {
        module: "merchants",
        actions: [
          "view",
          "approve",
          "reject",
        ],
      },
      {
        module: "stores",
        actions: [
          "view",
          "edit",
        ],
      },
      {
        module: "regions",
        actions: [
          "view",
          "edit",
        ],
      },
      {
        module: "finance",
        actions: ["view"],
      },
    ],

    createdAt:
      "2026-01-01T09:00:00",

    updatedAt:
      "2026-07-27T09:00:00",
  },

  {
    id: "ROLE-FINANCE",

    role: "finance_manager",

    name: "Finance Manager",

    description:
      "Revenue, commission, wallet, payout and settlement access.",

    system: true,

    permissions: [
      {
        module: "dashboard",
        actions: ["view"],
      },
      {
        module: "finance",
        actions: [
          "view",
          "edit",
          "refund",
          "payout",
          "export",
          "manage",
        ],
      },
      {
        module: "pricing",
        actions: [
          "view",
          "edit",
        ],
      },
      {
        module: "drivers",
        actions: ["view"],
      },
      {
        module: "passengers",
        actions: ["view"],
      },
      {
        module: "regions",
        actions: ["view"],
      },
    ],

    createdAt:
      "2026-01-01T09:00:00",

    updatedAt:
      "2026-07-27T09:00:00",
  },

  {
    id: "ROLE-SUPPORT",

    role: "support",

    name: "Support",

    description:
      "Customer support, ride incidents and read-only operational access.",

    system: true,

    permissions: [
      {
        module: "dashboard",
        actions: ["view"],
      },
      {
        module: "rides",
        actions: ["view"],
      },
      {
        module: "drivers",
        actions: ["view"],
      },
      {
        module: "passengers",
        actions: ["view"],
      },
      {
        module: "food",
        actions: ["view"],
      },
      {
        module: "grocery",
        actions: ["view"],
      },
      {
        module: "pharmacy",
        actions: ["view"],
      },
      {
        module: "services",
        actions: ["view"],
      },
      {
        module: "merchants",
        actions: ["view"],
      },
      {
        module: "stores",
        actions: ["view"],
      },
      {
        module: "finance",
        actions: ["view"],
      },
      {
        module: "regions",
        actions: ["view"],
      },
    ],

    createdAt:
      "2026-01-01T09:00:00",

    updatedAt:
      "2026-07-27T09:00:00",
  },
];

export const dummyAdminUsers: AdminUser[] = [
  {
    id: "ADM-1001",

    fullName:
      "Safari Super Admin",

    email:
      "superadmin@safari.com",

    phone:
      "+92 300 0000001",

    role: "super_admin",

    status: "active",

    regionScope: "all",

    lastLoginAt:
      "2026-07-27T11:40:00",

    createdAt:
      "2026-01-01T09:00:00",
  },

  {
    id: "ADM-1002",

    fullName:
      "Platform Admin",

    email:
      "admin@safari.com",

    phone:
      "+92 300 0000002",

    role: "admin",

    status: "active",

    regionScope: "all",

    lastLoginAt:
      "2026-07-27T10:30:00",

    createdAt:
      "2026-02-01T09:00:00",
  },

  {
    id: "ADM-1003",

    fullName:
      "Pakistan Operations",

    email:
      "operations@safari.com",

    role:
      "operations_manager",

    status: "active",

    regionScope:
      "Pakistan",

    lastLoginAt:
      "2026-07-27T09:45:00",

    createdAt:
      "2026-03-12T12:00:00",
  },

  {
    id: "ADM-1004",

    fullName:
      "Finance Team",

    email:
      "finance@safari.com",

    role:
      "finance_manager",

    status: "active",

    regionScope: "all",

    lastLoginAt:
      "2026-07-26T17:30:00",

    createdAt:
      "2026-03-15T11:00:00",
  },

  {
    id: "ADM-1005",

    fullName:
      "Customer Support",

    email:
      "support@safari.com",

    role: "support",

    status: "active",

    regionScope: "all",

    lastLoginAt:
      "2026-07-27T11:15:00",

    createdAt:
      "2026-04-01T10:00:00",
  },
];