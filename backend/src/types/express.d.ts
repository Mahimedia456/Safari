import type { User } from "@supabase/supabase-js";

declare global {
  namespace Express {
    interface Request {
      authUser?: User;
      accessToken?: string;
      profile?: {
        id: string;
        full_name: string | null;
        email: string | null;
        phone: string | null;
        account_type: string;
        app_mode: string | null;
        admin_role: string | null;
        merchant_type: string | null;
        status: string;
        country_code: string;
        is_onboarded: boolean;
        avatar_url: string | null;
      };
    }
  }
}

export {};
