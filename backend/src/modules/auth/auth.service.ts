import {
  createHash,
} from "node:crypto";

import {
  supabaseAdmin,
  supabasePublic,
} from "../../lib/supabase.js";

import {
  consumeResetToken,
  createAndSendOtp,
  issueResetToken,
  markChallengeConsumed,
  verifyOtp,
} from "./otp.service.js";

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
  const normalized =
    phone.trim().replace(/[\s()-]/g, "");

  if (!/^\+[1-9]\d{7,14}$/.test(normalized)) {
    throw new Error(
      "Use a valid international phone number such as +923001234567.",
    );
  }

  return normalized;
}

function normalizeEmail(email?: string) {
  const normalized =
    email?.trim().toLowerCase();

  return normalized || undefined;
}

function mobileIdentityEmail(phone: string) {
  const digest = createHash("sha256")
    .update(phone)
    .digest("hex")
    .slice(0, 40);

  return `mobile-${digest}@auth.safari.internal`;
}

function merchantTypeFromRole(
  role: MerchantRegisterInput["role"],
) {
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

async function getProfileByPhone(
  phoneInput: string,
) {
  const phone = normalizePhone(phoneInput);

  const { data, error } = await supabaseAdmin
    .from("profiles")
    .select(
      "id,full_name,email,phone,account_type,app_mode,admin_role,merchant_type,status,country_code,is_onboarded,avatar_url,average_rating,rating_count,created_at,updated_at",
    )
    .eq("phone", phone)
    .maybeSingle();

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

function assertMobileProfile(
  profile: Awaited<ReturnType<typeof getProfile>>,
) {
  if (
    ![
      "passenger",
      "driver",
      "delivery_partner",
    ].includes(profile.account_type)
  ) {
    throw new Error(
      "This account is not a Safari mobile account.",
    );
  }

  if (profile.status === "pending") {
    throw new Error(
      "Verify your WhatsApp number before signing in.",
    );
  }

  if (
    ["suspended", "blocked"].includes(
      profile.status,
    )
  ) {
    throw new Error(
      "This Safari account is currently unavailable.",
    );
  }
}

function assertControlCenterProfile(
  profile: Awaited<ReturnType<typeof getProfile>>,
) {
  if (
    !["administration", "merchant"].includes(
      profile.account_type,
    )
  ) {
    throw new Error(
      "This account does not have Safari Control Center access.",
    );
  }

  if (
    ["suspended", "blocked"].includes(
      profile.status,
    )
  ) {
    throw new Error(
      "This Safari Control Center account is currently unavailable.",
    );
  }
}

async function authEmailForMobileProfile(
  profile: Awaited<ReturnType<typeof getProfile>>,
) {
  const { data, error } =
    await supabaseAdmin.auth.admin.getUserById(
      profile.id,
    );

  if (error || !data.user) {
    throw new Error(
      "Safari authentication account was not found.",
    );
  }

  const email = data.user.email;

  if (!email) {
    throw new Error(
      "This older Safari account needs to be recreated with the new WhatsApp login flow.",
    );
  }

  return email;
}

export async function registerMobile(
  input: MobileRegisterInput,
) {
  const phone = normalizePhone(input.phone);
  const email = normalizeEmail(input.email);

  const existing =
    await getProfileByPhone(phone);

  if (existing) {
    if (existing.status === "pending") {
      const { error } =
        await supabaseAdmin.auth.admin.updateUserById(
          existing.id,
          {
            password: input.password,
            email_confirm: true,
            user_metadata: {
              full_name: input.fullName.trim(),
              email: email ?? null,
              phone,
              account_type: input.mode,
              app_mode: input.mode,
              country_code: input.countryCode,
              is_mobile_phone_auth: true,
            },
          },
        );

      if (error) throw new Error(error.message);

      await supabaseAdmin
        .from("profiles")
        .update({
          full_name: input.fullName.trim(),
          email: email ?? existing.email,
          phone,
          account_type: input.mode,
          app_mode: input.mode,
          country_code: input.countryCode,
          status: "pending",
          updated_at: new Date().toISOString(),
        })
        .eq("id", existing.id);

      const challenge = await createAndSendOtp(
        phone,
        "signup",
        {
          userId: existing.id,
        },
      );

      return {
        userId: existing.id,
        phone,
        verificationRequired: true,
        otpChannel: "whatsapp",
        expiresAt: challenge.expiresAt,
      };
    }

    throw new Error(
      "A Safari account already exists for this phone number. Sign in instead.",
    );
  }

  const internalEmail =
    mobileIdentityEmail(phone);

  const { data, error } =
    await supabaseAdmin.auth.admin.createUser({
      email: internalEmail,
      password: input.password,
      email_confirm: true,
      user_metadata: {
        full_name: input.fullName.trim(),
        email: email ?? null,
        phone,
        account_type: input.mode,
        app_mode: input.mode,
        country_code: input.countryCode,
        is_mobile_phone_auth: true,
      },
    });

  if (error || !data.user) {
    throw new Error(
      error?.message ??
        "Safari could not create the mobile account.",
    );
  }

  await supabaseAdmin
    .from("profiles")
    .update({
      full_name: input.fullName.trim(),
      email: email ?? null,
      phone,
      account_type: input.mode,
      app_mode: input.mode,
      country_code: input.countryCode,
      status: "pending",
      updated_at: new Date().toISOString(),
    })
    .eq("id", data.user.id);

  try {
    const challenge = await createAndSendOtp(
      phone,
      "signup",
      {
        userId: data.user.id,
      },
    );

    return {
      userId: data.user.id,
      phone,
      verificationRequired: true,
      otpChannel: "whatsapp",
      expiresAt: challenge.expiresAt,
    };
  } catch (error) {
    await supabaseAdmin.auth.admin.deleteUser(
      data.user.id,
    );

    throw error;
  }
}

export async function resendMobileOtp(
  phoneInput: string,
) {
  const phone = normalizePhone(phoneInput);

  const profile =
    await getProfileByPhone(phone);

  if (!profile) {
    throw new Error(
      "Safari account was not found for this phone number.",
    );
  }

  if (profile.status !== "pending") {
    throw new Error(
      "This Safari phone number is already verified.",
    );
  }

  const challenge = await createAndSendOtp(
    phone,
    "signup",
    {
      userId: profile.id,
    },
  );

  return {
    phone,
    otpChannel: "whatsapp",
    expiresAt: challenge.expiresAt,
    message:
      "Safari verification code sent on WhatsApp.",
  };
}

export async function verifyMobileOtp(
  phoneInput: string,
  token: string,
) {
  const phone = normalizePhone(phoneInput);

  const challenge = await verifyOtp(
    phone,
    "signup",
    token,
  );

  const profile =
    await getProfileByPhone(phone);

  if (!profile) {
    throw new Error(
      "Safari account was not found.",
    );
  }

  await supabaseAdmin
    .from("profiles")
    .update({
      status: "active",
      updated_at: new Date().toISOString(),
    })
    .eq("id", profile.id);

  await markChallengeConsumed(
    challenge.id,
  );

  const verifiedProfile =
    await getProfile(profile.id);

  return {
    verified: true,
    phone,
    profile: verifiedProfile,
  };
}

export async function loginMobile(
  phoneInput: string,
  password: string,
) {
  const phone = normalizePhone(phoneInput);

  const profile =
    await getProfileByPhone(phone);

  if (!profile) {
    throw new Error(
      "Incorrect Safari phone number or password.",
    );
  }

  assertMobileProfile(profile);

  const authEmail =
    await authEmailForMobileProfile(profile);

  const { data, error } =
    await supabasePublic.auth.signInWithPassword({
      email: authEmail,
      password,
    });

  if (
    error ||
    !data.session ||
    !data.user
  ) {
    throw new Error(
      "Incorrect Safari phone number or password.",
    );
  }

  const latestProfile =
    await getProfile(data.user.id);

  assertMobileProfile(latestProfile);

  return {
    ...sessionPayload(data.session),
    profile: latestProfile,
  };
}

export async function loginAdmin(
  emailInput: string,
  password: string,
) {
  const email =
    normalizeEmail(emailInput);

  if (!email) {
    throw new Error(
      "Enter your Safari Control Center email.",
    );
  }

  const { data, error } =
    await supabasePublic.auth.signInWithPassword({
      email,
      password,
    });

  if (
    error ||
    !data.session ||
    !data.user
  ) {
    throw new Error(
      error?.message ??
        "Could not sign in to Safari Control Center.",
    );
  }

  const profile =
    await getProfile(data.user.id);

  assertControlCenterProfile(profile);

  return {
    ...sessionPayload(data.session),
    profile,
  };
}

export async function registerMerchant(
  input: MerchantRegisterInput,
) {
  const merchantType =
    merchantTypeFromRole(input.role);

  const email =
    normalizeEmail(input.email);

  if (!email) {
    throw new Error(
      "Enter a valid merchant email address.",
    );
  }

  const { data, error } =
    await supabasePublic.auth.signUp({
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
    emailConfirmationRequired:
      !data.session,
    session: data.session
      ? sessionPayload(data.session)
      : null,
    profile:
      data.user && data.session
        ? await getProfile(data.user.id)
        : null,
  };
}

export async function refreshSession(
  refreshToken: string,
) {
  const { data, error } =
    await supabasePublic.auth.refreshSession({
      refresh_token: refreshToken,
    });

  if (
    error ||
    !data.session ||
    !data.user
  ) {
    throw new Error(
      error?.message ??
        "Safari session could not be refreshed.",
    );
  }

  const profile =
    await getProfile(data.user.id);

  if (
    ["suspended", "blocked"].includes(
      profile.status,
    )
  ) {
    throw new Error(
      "This Safari account is currently unavailable.",
    );
  }

  return {
    ...sessionPayload(data.session),
    profile,
  };
}

export async function getCurrentProfile(
  userId: string,
) {
  const profile =
    await getProfile(userId);

  if (
    ["suspended", "blocked"].includes(
      profile.status,
    )
  ) {
    throw new Error(
      "This Safari account is currently unavailable.",
    );
  }

  return profile;
}

export async function sendPasswordResetOtp(
  phoneInput: string,
) {
  const phone = normalizePhone(phoneInput);

  const profile =
    await getProfileByPhone(phone);

  if (!profile) {
    // Account existence is checked server-side for the reset flow.
    throw new Error(
      "Safari account was not found for this phone number.",
    );
  }

  assertMobileProfile(profile);

  const challenge =
    await createAndSendOtp(
      phone,
      "forgot_password",
      {
        userId: profile.id,
      },
    );

  return {
    phone,
    otpChannel: "whatsapp",
    expiresAt: challenge.expiresAt,
    message:
      "Safari password reset code sent on WhatsApp.",
  };
}

export async function verifyPasswordResetOtp(
  phoneInput: string,
  token: string,
) {
  const phone = normalizePhone(phoneInput);

  const challenge = await verifyOtp(
    phone,
    "forgot_password",
    token,
  );

  const profile =
    await getProfileByPhone(phone);

  if (!profile) {
    throw new Error(
      "Safari account was not found.",
    );
  }

  assertMobileProfile(profile);

  const resetToken =
    await issueResetToken(challenge.id);

  return {
    resetAccessToken: resetToken,
    userId: profile.id,
    phone,
  };
}

export async function resetMobilePassword(
  resetAccessToken: string,
  newPassword: string,
) {
  const challenge =
    await consumeResetToken(
      resetAccessToken,
    );

  const userId =
    challenge.metadata?.userId;

  if (
    !userId ||
    typeof userId !== "string"
  ) {
    throw new Error(
      "Safari password reset session is invalid.",
    );
  }

  const profile =
    await getProfile(userId);

  assertMobileProfile(profile);

  const { error } =
    await supabaseAdmin.auth.admin.updateUserById(
      userId,
      {
        password: newPassword,
      },
    );

  if (error) throw new Error(error.message);

  await markChallengeConsumed(
    challenge.id,
  );

  return {
    message:
      "Safari password updated successfully.",
  };
}
