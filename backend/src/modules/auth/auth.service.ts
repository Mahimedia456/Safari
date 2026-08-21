import { supabaseAdmin, supabasePublic } from "../../lib/supabase.js";

type MobileRegisterInput = {
  fullName: string;
  phone: string;
  email?: string;
  password: string;
  mode: "passenger" | "driver";
  countryCode: "PK" | "DE";
};

type MerchantRegisterInput = {
  fullName: string;
  email: string;
  password: string;
  role:
    | "food_merchant"
    | "grocery_merchant"
    | "pharmacy_merchant"
    | "services_merchant";
};

function normalizePhone(phone: string) {
  const normalized = phone.trim().replace(/[\s()-]/g, "");

  if (!/^\+[1-9]\d{7,14}$/.test(normalized)) {
    throw new Error(
      "Use a valid international phone number such as +923001234567.",
    );
  }

  return normalized;
}

function normalizeEmail(email?: string) {
  const normalized = email?.trim().toLowerCase();
  return normalized || undefined;
}

function merchantTypeFromRole(role: MerchantRegisterInput["role"]) {
  return role.replace("_merchant", "");
}

async function getProfile(userId: string) {
  const { data, error } = await supabaseAdmin
    .from("profiles")
    .select(
      "id,full_name,email,phone,account_type,app_mode,admin_role,merchant_type,status,country_code,is_onboarded,avatar_url,average_rating,rating_count,created_at,updated_at",
    )
    .eq("id", userId)
    .single();

  if (error) throw new Error(error.message);

  return data;
}

function sessionPayload(session: {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expires_at?: number;
}) {
  return {
    accessToken: session.access_token,
    refreshToken: session.refresh_token,
    expiresIn: session.expires_in,
    expiresAt: session.expires_at ?? null,
  };
}

function assertMobileProfile(profile: Awaited<ReturnType<typeof getProfile>>) {
  if (!["passenger", "driver", "delivery_partner"].includes(profile.account_type)) {
    throw new Error("This account is not a Safari mobile account.");
  }

  if (["suspended", "blocked"].includes(profile.status)) {
    throw new Error("This Safari account is currently unavailable.");
  }
}

function assertControlCenterProfile(
  profile: Awaited<ReturnType<typeof getProfile>>,
) {
  if (!["administration", "merchant"].includes(profile.account_type)) {
    throw new Error("This account does not have Safari Control Center access.");
  }

  if (["suspended", "blocked"].includes(profile.status)) {
    throw new Error("This Safari Control Center account is currently unavailable.");
  }
}

export async function registerMobile(input: MobileRegisterInput) {
  const phone = normalizePhone(input.phone);
  const email = normalizeEmail(input.email);

  const { data, error } = await supabasePublic.auth.signUp({
    phone,
    password: input.password,
    options: {
      data: {
        full_name: input.fullName.trim(),
        email: email ?? null,
        account_type: input.mode,
        app_mode: input.mode,
        country_code: input.countryCode,
      },
    },
  });

  if (error) throw new Error(error.message);

  if (!data.user) {
    throw new Error("Safari could not create the mobile account.");
  }

  if (email) {
    await supabaseAdmin
      .from("profiles")
      .update({
        email,
        updated_at: new Date().toISOString(),
      })
      .eq("id", data.user.id);
  }

  return {
    userId: data.user.id,
    phone,
    verificationRequired: !data.session,
    session: data.session ? sessionPayload(data.session) : null,
    profile:
      data.session
        ? await getProfile(data.user.id)
        : null,
  };
}

export async function resendMobileOtp(phoneInput: string) {
  const phone = normalizePhone(phoneInput);

  const { error } = await supabasePublic.auth.resend({
    type: "sms",
    phone,
  });

  if (error) throw new Error(error.message);

  return {
    phone,
    message: "Safari verification code sent again.",
  };
}

export async function verifyMobileOtp(phoneInput: string, token: string) {
  const phone = normalizePhone(phoneInput);

  const { data, error } = await supabasePublic.auth.verifyOtp({
    phone,
    token,
    type: "sms",
  });

  if (error || !data.session || !data.user) {
    throw new Error(error?.message ?? "Could not verify the Safari OTP.");
  }

  const profile = await getProfile(data.user.id);
  assertMobileProfile(profile);

  return {
    ...sessionPayload(data.session),
    profile,
  };
}

export async function loginMobile(phoneInput: string, password: string) {
  const phone = normalizePhone(phoneInput);

  const { data, error } = await supabasePublic.auth.signInWithPassword({
    phone,
    password,
  });

  if (error || !data.session || !data.user) {
    throw new Error(error?.message ?? "Could not sign in to Safari.");
  }

  const profile = await getProfile(data.user.id);
  assertMobileProfile(profile);

  return {
    ...sessionPayload(data.session),
    profile,
  };
}

export async function loginAdmin(emailInput: string, password: string) {
  const email = normalizeEmail(emailInput);

  if (!email) throw new Error("Enter your Safari Control Center email.");

  const { data, error } = await supabasePublic.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.session || !data.user) {
    throw new Error(
      error?.message ?? "Could not sign in to Safari Control Center.",
    );
  }

  const profile = await getProfile(data.user.id);
  assertControlCenterProfile(profile);

  return {
    ...sessionPayload(data.session),
    profile,
  };
}

export async function registerMerchant(input: MerchantRegisterInput) {
  const merchantType = merchantTypeFromRole(input.role);
  const email = normalizeEmail(input.email);

  if (!email) throw new Error("Enter a valid merchant email address.");

  const { data, error } = await supabasePublic.auth.signUp({
    email,
    password: input.password,
    options: {
      data: {
        full_name: input.fullName.trim(),
        account_type: "merchant",
        merchant_type: merchantType,
        merchant_role: input.role,
        country_code: "PK",
      },
    },
  });

  if (error) throw new Error(error.message);

  return {
    userId: data.user?.id ?? null,
    emailConfirmationRequired: !data.session,
    session: data.session ? sessionPayload(data.session) : null,
    profile:
      data.user && data.session
        ? await getProfile(data.user.id)
        : null,
  };
}

export async function refreshSession(refreshToken: string) {
  const { data, error } = await supabasePublic.auth.refreshSession({
    refresh_token: refreshToken,
  });

  if (error || !data.session || !data.user) {
    throw new Error(error?.message ?? "Safari session could not be refreshed.");
  }

  const profile = await getProfile(data.user.id);

  if (["suspended", "blocked"].includes(profile.status)) {
    throw new Error("This Safari account is currently unavailable.");
  }

  return {
    ...sessionPayload(data.session),
    profile,
  };
}

export async function getCurrentProfile(userId: string) {
  const profile = await getProfile(userId);

  if (["suspended", "blocked"].includes(profile.status)) {
    throw new Error("This Safari account is currently unavailable.");
  }

  return profile;
}

export async function sendPasswordResetOtp(phoneInput: string) {
  const phone = normalizePhone(phoneInput);

  const { error } = await supabasePublic.auth.signInWithOtp({
    phone,
    options: {
      shouldCreateUser: false,
    },
  });

  if (error) throw new Error(error.message);

  return {
    phone,
    message: "Safari password reset code sent.",
  };
}

export async function verifyPasswordResetOtp(
  phoneInput: string,
  token: string,
) {
  const phone = normalizePhone(phoneInput);

  const { data, error } = await supabasePublic.auth.verifyOtp({
    phone,
    token,
    type: "sms",
  });

  if (error || !data.session || !data.user) {
    throw new Error(
      error?.message ?? "Could not verify the Safari reset code.",
    );
  }

  const profile = await getProfile(data.user.id);
  assertMobileProfile(profile);

  return {
    resetAccessToken: data.session.access_token,
    userId: data.user.id,
    phone,
  };
}

export async function resetMobilePassword(
  resetAccessToken: string,
  newPassword: string,
) {
  const { data, error } = await supabaseAdmin.auth.getUser(resetAccessToken);

  if (error || !data.user) {
    throw new Error("Safari password reset session is invalid or expired.");
  }

  const profile = await getProfile(data.user.id);
  assertMobileProfile(profile);

  const { error: updateError } =
    await supabaseAdmin.auth.admin.updateUserById(data.user.id, {
      password: newPassword,
    });

  if (updateError) throw new Error(updateError.message);

  return {
    message: "Safari password updated successfully.",
  };
}
