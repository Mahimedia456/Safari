import { create } from "zustand";

import { apiRequest } from "../services/apiClient";
import type {
  AccountRole,
  AdminUser,
  LoginInput,
  MerchantStoreType,
  RegisterInput,
} from "../types/auth";

const SESSION_KEY = "safari-admin-session-v3";

type ApiProfile = {
  id: string;
  full_name: string | null;
  email: string | null;
  account_type: "administration" | "merchant";
  admin_role: string | null;
  merchant_type: string | null;
  status: "pending" | "active" | "suspended" | "blocked";
};

type SessionPayload = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  expiresAt?: number | null;
  profile: ApiProfile;
};

type StoredSession = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  expiresAt?: number | null;
  user: AdminUser;
};

interface AuthResult {
  success: boolean;
  message: string;
}

interface AuthState {
  user: AdminUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  initialized: boolean;

  initializeAuth: () => Promise<void>;
  login: (input: LoginInput) => Promise<AuthResult>;
  register: (input: RegisterInput) => Promise<AuthResult>;
  refresh: () => Promise<boolean>;
  logout: () => Promise<void>;
}

function roleFromProfile(profile: ApiProfile): AccountRole {
  if (profile.account_type === "administration") {
    return (profile.admin_role ?? "admin") as AccountRole;
  }

  return `${profile.merchant_type ?? "food"}_merchant` as AccountRole;
}

function publicUser(profile: ApiProfile): AdminUser {
  return {
    id: profile.id,
    fullName: profile.full_name ?? "Safari User",
    email: profile.email ?? "",
    accountType: profile.account_type,
    role: roleFromProfile(profile),
    storeType:
      profile.account_type === "merchant"
        ? (profile.merchant_type as MerchantStoreType)
        : undefined,
    status: profile.status,
  };
}

function saveSession(payload: StoredSession) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(payload));
}

function clearStoredSession() {
  localStorage.removeItem(SESSION_KEY);
}

function readSession(): StoredSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as StoredSession) : null;
  } catch {
    clearStoredSession();
    return null;
  }
}

function storePayload(data: SessionPayload): StoredSession {
  return {
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
    expiresIn: data.expiresIn,
    expiresAt: data.expiresAt ?? null,
    user: publicUser(data.profile),
  };
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  initialized: false,

  initializeAuth: async () => {
    const stored = readSession();

    if (!stored) {
      set({ initialized: true });
      return;
    }

    set({
      user: stored.user,
      accessToken: stored.accessToken,
      refreshToken: stored.refreshToken,
    });

    try {
      const data = await apiRequest<{
        profile: ApiProfile;
      }>(
        "/auth/me",
        {},
        stored.accessToken,
      );

      const user = publicUser(data.profile);

      if (["suspended", "blocked"].includes(user.status)) {
        throw new Error("Safari Control Center access is unavailable.");
      }

      saveSession({
        ...stored,
        user,
      });

      set({
        user,
        initialized: true,
      });
    } catch {
      const refreshed = await get().refresh();

      if (!refreshed) {
        clearStoredSession();

        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          initialized: true,
        });
      } else {
        set({ initialized: true });
      }
    }
  },

  login: async ({ email, password }) => {
    try {
      const data = await apiRequest<SessionPayload>(
        "/auth/admin/login",
        {
          method: "POST",
          body: JSON.stringify({
            email: email.trim().toLowerCase(),
            password,
          }),
        },
      );

      const stored = storePayload(data);

      saveSession(stored);

      set({
        user: stored.user,
        accessToken: stored.accessToken,
        refreshToken: stored.refreshToken,
      });

      return {
        success: true,
        message: "Signed in successfully.",
      };
    } catch (error) {
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Could not sign in to Safari Control Center.",
      };
    }
  },

  register: async ({
    fullName,
    email,
    password,
    accountType,
    role,
  }) => {
    if (accountType !== "merchant") {
      return {
        success: false,
        message:
          "Administration accounts are created by an existing Safari super admin.",
      };
    }

    try {
      const data = await apiRequest<{
        emailConfirmationRequired: boolean;
        session: SessionPayload | null;
        profile: ApiProfile | null;
      }>(
        "/auth/admin/register-merchant",
        {
          method: "POST",
          body: JSON.stringify({
            fullName,
            email: email.trim().toLowerCase(),
            password,
            role,
          }),
        },
      );

      if (!data.session || !data.profile) {
        return {
          success: true,
          message:
            "Merchant account created. Complete email confirmation before signing in.",
        };
      }

      const stored = storePayload({
        ...data.session,
        profile: data.profile,
      });

      saveSession(stored);

      set({
        user: stored.user,
        accessToken: stored.accessToken,
        refreshToken: stored.refreshToken,
      });

      return {
        success: true,
        message: "Safari merchant account created successfully.",
      };
    } catch (error) {
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Could not create the Safari merchant account.",
      };
    }
  },

  refresh: async () => {
    const refreshToken = get().refreshToken;

    if (!refreshToken) return false;

    try {
      const data = await apiRequest<SessionPayload>(
        "/auth/refresh",
        {
          method: "POST",
          body: JSON.stringify({ refreshToken }),
        },
      );

      const stored = storePayload(data);

      saveSession(stored);

      set({
        user: stored.user,
        accessToken: stored.accessToken,
        refreshToken: stored.refreshToken,
      });

      return true;
    } catch {
      return false;
    }
  },

  logout: async () => {
    const accessToken = get().accessToken;

    if (accessToken) {
      try {
        await apiRequest<{ message: string }>(
          "/auth/logout",
          { method: "POST" },
          accessToken,
        );
      } catch {
        // Browser session is cleared below even when the backend is offline.
      }
    }

    clearStoredSession();

    set({
      user: null,
      accessToken: null,
      refreshToken: null,
    });
  },
}));
