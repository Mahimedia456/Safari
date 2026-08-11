import { create } from "zustand";

import type {
  AdminUser,
  LoginInput,
  MerchantStoreType,
  RegisterInput,
  StoredAdminUser,
} from "../types/auth";

const USERS_KEY =
  "safari-admin-users";

const SESSION_KEY =
  "safari-admin-session";

interface AuthResult {
  success: boolean;
  message: string;
}

interface AuthState {
  user: AdminUser | null;

  initialized: boolean;

  initializeAuth: () => void;

  login: (
    input: LoginInput,
  ) => AuthResult;

  register: (
    input: RegisterInput,
  ) => AuthResult;

  logout: () => void;
}

const DEMO_USERS: StoredAdminUser[] =
  [
    {
      id: "demo-super-admin",

      fullName:
        "Safari Super Admin",

      email:
        "admin@safari.com",

      password:
        "12345678",

      accountType:
        "administration",

      role:
        "super_admin",
    },

    {
      id:
        "demo-food-merchant",

      fullName:
        "Food Merchant Demo",

      email:
        "food@safari.com",

      password:
        "12345678",

      accountType:
        "merchant",

      role:
        "food_merchant",

      storeType: "food",
    },

    {
      id:
        "demo-grocery-merchant",

      fullName:
        "Grocery Merchant Demo",

      email:
        "grocery@safari.com",

      password:
        "12345678",

      accountType:
        "merchant",

      role:
        "grocery_merchant",

      storeType: "grocery",
    },

    {
      id:
        "demo-pharmacy-merchant",

      fullName:
        "Pharmacy Merchant Demo",

      email:
        "pharmacy@safari.com",

      password:
        "12345678",

      accountType:
        "merchant",

      role:
        "pharmacy_merchant",

      storeType:
        "pharmacy",
    },

    {
      id:
        "demo-services-merchant",

      fullName:
        "Services Merchant Demo",

      email:
        "services@safari.com",

      password:
        "12345678",

      accountType:
        "merchant",

      role:
        "services_merchant",

      storeType:
        "services",
    },
  ];

function normalizeEmail(
  value: string,
) {
  return value
    .trim()
    .toLowerCase();
}

function readUsers(): StoredAdminUser[] {
  try {
    const raw =
      localStorage.getItem(
        USERS_KEY,
      );

    if (!raw) {
      return [];
    }

    const parsed: unknown =
      JSON.parse(raw);

    if (
      !Array.isArray(parsed)
    ) {
      return [];
    }

    return parsed as StoredAdminUser[];
  } catch {
    return [];
  }
}

function saveUsers(
  users: StoredAdminUser[],
) {
  localStorage.setItem(
    USERS_KEY,
    JSON.stringify(users),
  );
}

function seedDemoUsers() {
  const users =
    readUsers();

  const merged = [
    ...users,
  ];

  DEMO_USERS.forEach(
    (demoUser) => {
      const index =
        merged.findIndex(
          (item) =>
            normalizeEmail(
              item.email,
            ) ===
            normalizeEmail(
              demoUser.email,
            ),
        );

      /*
       * Keep demo accounts consistent
       * while allowing normal registered
       * accounts to remain untouched.
       */
      if (index >= 0) {
        merged[index] =
          demoUser;
      } else {
        merged.push(
          demoUser,
        );
      }
    },
  );

  saveUsers(merged);
}

function resolveStoreType(
  role: RegisterInput["role"],
): MerchantStoreType | undefined {
  switch (role) {
    case "food_merchant":
      return "food";

    case "grocery_merchant":
      return "grocery";

    case "pharmacy_merchant":
      return "pharmacy";

    case "services_merchant":
      return "services";

    default:
      return undefined;
  }
}

function publicUser(
  user: StoredAdminUser,
): AdminUser {
  return {
    id: user.id,

    fullName:
      user.fullName,

    email:
      user.email,

    accountType:
      user.accountType,

    role:
      user.role,

    storeType:
      user.storeType,
  };
}

export const useAuthStore =
  create<AuthState>(
    (set) => ({
      user: null,

      initialized: false,

      initializeAuth: () => {
        seedDemoUsers();

        try {
          const raw =
            localStorage.getItem(
              SESSION_KEY,
            );

          if (!raw) {
            set({
              user: null,
              initialized: true,
            });

            return;
          }

          const parsed: unknown =
            JSON.parse(raw);

          if (
            !parsed ||
            typeof parsed !==
              "object"
          ) {
            throw new Error(
              "Invalid session.",
            );
          }

          set({
            user:
              parsed as AdminUser,

            initialized: true,
          });
        } catch {
          localStorage.removeItem(
            SESSION_KEY,
          );

          set({
            user: null,
            initialized: true,
          });
        }
      },

      login: ({
        email,
        password,
      }) => {
        const users =
          readUsers();

        const found =
          users.find(
            (item) =>
              normalizeEmail(
                item.email,
              ) ===
              normalizeEmail(
                email,
              ),
          );

        if (!found) {
          return {
            success: false,

            message:
              "No Safari account was found with this email.",
          };
        }

        if (
          found.password !==
          password
        ) {
          return {
            success: false,

            message:
              "The password you entered is incorrect.",
          };
        }

        const sessionUser =
          publicUser(found);

        localStorage.setItem(
          SESSION_KEY,
          JSON.stringify(
            sessionUser,
          ),
        );

        set({
          user:
            sessionUser,
        });

        return {
          success: true,

          message:
            "Signed in successfully.",
        };
      },

      register: ({
        fullName,
        email,
        password,
        accountType,
        role,
        storeType,
      }) => {
        const users =
          readUsers();

        const normalizedEmail =
          normalizeEmail(
            email,
          );

        const exists =
          users.some(
            (item) =>
              normalizeEmail(
                item.email,
              ) ===
              normalizedEmail,
          );

        if (exists) {
          return {
            success: false,

            message:
              "An account already exists with this email.",
          };
        }

        const resolvedStoreType =
          accountType ===
          "merchant"
            ? storeType ??
              resolveStoreType(
                role,
              )
            : undefined;

        const newUser: StoredAdminUser =
          {
            id:
              crypto.randomUUID(),

            fullName:
              fullName.trim(),

            email:
              normalizedEmail,

            password,

            accountType,

            role,

            storeType:
              resolvedStoreType,
          };

        saveUsers([
          ...users,
          newUser,
        ]);

        const sessionUser =
          publicUser(
            newUser,
          );

        localStorage.setItem(
          SESSION_KEY,
          JSON.stringify(
            sessionUser,
          ),
        );

        set({
          user:
            sessionUser,
        });

        return {
          success: true,

          message:
            "Safari account created successfully.",
        };
      },

      logout: () => {
        localStorage.removeItem(
          SESSION_KEY,
        );

        set({
          user: null,
        });
      },
    }),
  );