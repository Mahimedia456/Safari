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
  countryCode: "PK";
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

type MobileProfile = Awaited<
  ReturnType<typeof getProfile>
>;

function normalizePhone(
  phone: string,
) {
  const normalized =
    phone
      .trim()
      .replace(
        /[\s()-]/g,
        "",
      );

  if (
    !/^\+92\d{10}$/.test(
      normalized,
    )
  ) {
    throw new Error(
      "Use a valid Pakistan phone number such as +923001234567.",
    );
  }

  return normalized;
}

function normalizeEmail(
  email?: string,
) {
  const normalized =
    email
      ?.trim()
      .toLowerCase();

  return normalized ||
    undefined;
}

/**
 * Safari mobile authentication intentionally does NOT use
 * Supabase Phone Auth / SMS.
 *
 * The phone number is converted to a deterministic internal
 * email identity. Supabase handles password/session security,
 * while Safari verifies the real phone through WhatsApp OTP.
 */
function internalEmailForPhone(
  phone: string,
) {
  const digits =
    phone.replace(
      /\D/g,
      "",
    );

  return `phone-${digits}@auth.safari.app`;
}

function merchantTypeFromRole(
  role: MerchantRegisterInput["role"],
) {
  return role.replace(
    "_merchant",
    "",
  );
}

async function getProfile(
  userId: string,
) {
  const {
    data,
    error,
  } =
    await supabaseAdmin
      .from("profiles")
      .select(
        "id,full_name,email,phone,account_type,app_mode,admin_role,merchant_type,status,country_code,is_onboarded,avatar_url,average_rating,rating_count,created_at,updated_at",
      )
      .eq(
        "id",
        userId,
      )
      .single();

  if (error) {
    throw new Error(
      error.message,
    );
  }

  return data;
}

async function getProfileByPhone(
  phone: string,
) {
  const {
    data,
    error,
  } =
    await supabaseAdmin
      .from("profiles")
      .select(
        "id,full_name,email,phone,account_type,app_mode,admin_role,merchant_type,status,country_code,is_onboarded,avatar_url,average_rating,rating_count,created_at,updated_at",
      )
      .eq(
        "phone",
        phone,
      )
      .maybeSingle();

  if (error) {
    throw new Error(
      error.message,
    );
  }

  return data;
}

function sessionPayload(
  session: {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    expires_at?: number;
  },
) {
  return {
    accessToken:
      session.access_token,
    refreshToken:
      session.refresh_token,
    expiresIn:
      session.expires_in,
    expiresAt:
      session.expires_at ??
      null,
  };
}

function assertMobileProfile(
  profile: MobileProfile,
) {
  if (
    ![
      "passenger",
      "driver",
      "delivery_partner",
    ].includes(
      profile.account_type,
    )
  ) {
    throw new Error(
      "This account is not a Safari mobile account.",
    );
  }

  if (
    [
      "suspended",
      "blocked",
    ].includes(
      profile.status,
    )
  ) {
    throw new Error(
      "This Safari account is currently unavailable.",
    );
  }
}

function assertControlCenterProfile(
  profile: MobileProfile,
) {
  if (
    ![
      "administration",
      "merchant",
    ].includes(
      profile.account_type,
    )
  ) {
    throw new Error(
      "This account does not have Safari Control Center access.",
    );
  }

  if (
    [
      "suspended",
      "blocked",
    ].includes(
      profile.status,
    )
  ) {
    throw new Error(
      "This Safari Control Center account is currently unavailable.",
    );
  }
}

async function mobileUserIsVerified(
  userId: string,
) {
  const {
    data,
    error,
  } =
    await supabaseAdmin
      .auth
      .admin
      .getUserById(
        userId,
      );

  if (
    error ||
    !data.user
  ) {
    throw new Error(
      error?.message ??
        "Safari mobile account could not be loaded.",
    );
  }

  return (
    data.user
      .user_metadata
      ?.safari_phone_verified ===
    true
  );
}

async function markMobileUserVerified(
  userId: string,
) {
  const {
    data: current,
    error: readError,
  } =
    await supabaseAdmin
      .auth
      .admin
      .getUserById(
        userId,
      );

  if (
    readError ||
    !current.user
  ) {
    throw new Error(
      readError?.message ??
        "Safari mobile account could not be loaded.",
    );
  }

  const {
    error,
  } =
    await supabaseAdmin
      .auth
      .admin
      .updateUserById(
        userId,
        {
          user_metadata: {
            ...current.user
              .user_metadata,
            safari_phone_verified:
              true,
            safari_phone_verified_at:
              new Date()
                .toISOString(),
          },
        },
      );

  if (error) {
    throw new Error(
      error.message,
    );
  }
}

async function upsertMobileProfile(
  userId: string,
  input: MobileRegisterInput,
  phone: string,
  email?: string,
) {
  const {
    error,
  } =
    await supabaseAdmin
      .from("profiles")
      .upsert(
        {
          id: userId,
          full_name:
            input.fullName
              .trim(),
          email:
            email ?? null,
          phone,
          account_type:
            input.mode,
          app_mode:
            input.mode,
          status: "active",
          country_code:
            "PK",
          is_onboarded:
            false,
          updated_at:
            new Date()
              .toISOString(),
        },
        {
          onConflict: "id",
        },
      );

  if (error) {
    throw new Error(
      error.message,
    );
  }
}


async function ensureMobileDriverProfile(
  userId: string,
  mode: "passenger" | "driver",
) {
  if (mode !== "driver") return;

  const { data: existing, error: findError } =
    await supabaseAdmin
      .from("driver_profiles")
      .select("user_id")
      .eq("user_id", userId)
      .maybeSingle();

  if (findError) {
    throw new Error(findError.message);
  }

  if (existing) return;

  const { error } =
    await supabaseAdmin
      .from("driver_profiles")
      .insert({
        user_id: userId,
        onboarding_status: "draft",
        verification_status: "not_submitted",
        is_online: false,
        is_available: false,
        driving_experience_years: 0,
      });

  if (error) {
    throw new Error(error.message);
  }
}

export async function registerMobile(
  input: MobileRegisterInput,
) {
  const phone =
    normalizePhone(
      input.phone,
    );

  const email =
    normalizeEmail(
      input.email,
    );

  const internalEmail =
    internalEmailForPhone(
      phone,
    );

  const existingProfile =
    await getProfileByPhone(
      phone,
    );

  let userId:
    | string
    | null =
    existingProfile?.id ??
    null;

  if (userId) {
    const alreadyVerified =
      await mobileUserIsVerified(
        userId,
      );

    if (
      alreadyVerified
    ) {
      throw new Error(
        "A Safari account already exists for this phone number. Sign in instead.",
      );
    }

    const {
      error:
        updateError,
    } =
      await supabaseAdmin
        .auth
        .admin
        .updateUserById(
          userId,
          {
            password:
              input.password,
            user_metadata: {
              full_name:
                input.fullName
                  .trim(),
              contact_email:
                email ?? null,
              phone,
              account_type:
                input.mode,
              app_mode:
                input.mode,
              country_code:
                "PK",
              safari_phone_verified:
                false,
            },
          },
        );

    if (
      updateError
    ) {
      throw new Error(
        updateError.message,
      );
    }

    await upsertMobileProfile(
      userId,
      input,
      phone,
      email,
    );
  } else {
    const {
      data,
      error,
    } =
      await supabaseAdmin
        .auth
        .admin
        .createUser({
          email:
            internalEmail,
          password:
            input.password,
          email_confirm:
            true,
          user_metadata: {
            full_name:
              input.fullName
                .trim(),
            contact_email:
              email ?? null,
            phone,
            account_type:
              input.mode,
            app_mode:
              input.mode,
            country_code:
              "PK",
            safari_phone_verified:
              false,
          },
        });

    if (
      error ||
      !data.user
    ) {
      throw new Error(
        error?.message ??
          "Safari could not create the mobile account.",
      );
    }

    userId =
      data.user.id;

    try {
      await upsertMobileProfile(
        userId,
        input,
        phone,
        email,
      );
    } catch (profileError) {
      await supabaseAdmin
        .auth
        .admin
        .deleteUser(
          userId,
        );

      throw profileError;
    }
  }

  if (!userId) {
    throw new Error("Safari mobile account could not be created.");
  }

  await ensureMobileDriverProfile(
    userId,
    input.mode,
  );

  const otp =
    await createAndSendOtp(
      phone,
      "signup",
      {
        userId,
        mode:
          input.mode,
      },
    );

  return {
    userId,
    phone,
    verificationRequired:
      true,
    otpChannel:
      "whatsapp" as const,
    expiresAt:
      otp.expiresAt,
  };
}

export async function resendMobileOtp(
  phoneInput: string,
) {
  const phone =
    normalizePhone(
      phoneInput,
    );

  const profile =
    await getProfileByPhone(
      phone,
    );

  if (!profile) {
    throw new Error(
      "No Safari account is waiting for verification for this phone number.",
    );
  }

  if (
    await mobileUserIsVerified(
      profile.id,
    )
  ) {
    throw new Error(
      "This Safari phone number is already verified. Sign in instead.",
    );
  }

  const otp =
    await createAndSendOtp(
      phone,
      "signup",
      {
        userId:
          profile.id,
      },
    );

  return {
    phone,
    message:
      "Safari verification code sent again on WhatsApp.",
    otpChannel:
      "whatsapp" as const,
    expiresAt:
      otp.expiresAt,
  };
}

export async function verifyMobileOtp(
  phoneInput: string,
  token: string,
) {
  const phone =
    normalizePhone(
      phoneInput,
    );

  const challenge =
    await verifyOtp(
      phone,
      "signup",
      token,
    );

  const profile =
    await getProfileByPhone(
      phone,
    );

  if (!profile) {
    throw new Error(
      "Safari account was not found for this verification request.",
    );
  }

  const challengeUserId =
    typeof challenge
      .metadata
      ?.userId ===
    "string"
      ? challenge
          .metadata
          .userId
      : null;

  if (
    challengeUserId &&
    challengeUserId !==
      profile.id
  ) {
    throw new Error(
      "Safari verification request does not match this account.",
    );
  }

  await markMobileUserVerified(
    profile.id,
  );

  await markChallengeConsumed(
    challenge.id,
  );

  const verifiedProfile =
    await getProfile(
      profile.id,
    );

  assertMobileProfile(
    verifiedProfile,
  );

  return {
    verified: true,
    phone,
    profile:
      verifiedProfile,
  };
}

export async function loginMobile(
  phoneInput: string,
  password: string,
) {
  const phone =
    normalizePhone(
      phoneInput,
    );

  const internalEmail =
    internalEmailForPhone(
      phone,
    );

  const {
    data,
    error,
  } =
    await supabasePublic
      .auth
      .signInWithPassword({
        email:
          internalEmail,
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

  if (
    data.user
      .user_metadata
      ?.safari_phone_verified !==
    true
  ) {
    throw new Error(
      "Verify your Safari phone number on WhatsApp before signing in.",
    );
  }

  const profile =
    await getProfile(
      data.user.id,
    );

  assertMobileProfile(
    profile,
  );

  return {
    ...sessionPayload(
      data.session,
    ),
    profile,
  };
}

export async function loginAdmin(
  emailInput: string,
  password: string,
) {
  const email =
    normalizeEmail(
      emailInput,
    );

  if (!email) {
    throw new Error(
      "Enter your Safari Control Center email.",
    );
  }

  const {
    data,
    error,
  } =
    await supabasePublic
      .auth
      .signInWithPassword({
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
    await getProfile(
      data.user.id,
    );

  assertControlCenterProfile(
    profile,
  );

  return {
    ...sessionPayload(
      data.session,
    ),
    profile,
  };
}

export async function registerMerchant(
  input: MerchantRegisterInput,
) {
  const merchantType =
    merchantTypeFromRole(
      input.role,
    );

  const email =
    normalizeEmail(
      input.email,
    );

  if (!email) {
    throw new Error(
      "Enter a valid merchant email address.",
    );
  }

  const {
    data,
    error,
  } =
    await supabasePublic
      .auth
      .signUp({
        email,
        password:
          input.password,
        options: {
          data: {
            full_name:
              input.fullName
                .trim(),
            account_type:
              "merchant",
            merchant_type:
              merchantType,
            merchant_role:
              input.role,
            country_code:
              "PK",
          },
        },
      });

  if (error) {
    throw new Error(
      error.message,
    );
  }

  return {
    userId:
      data.user?.id ??
      null,
    emailConfirmationRequired:
      !data.session,
    session:
      data.session
        ? sessionPayload(
            data.session,
          )
        : null,
    profile:
      data.user &&
      data.session
        ? await getProfile(
            data.user.id,
          )
        : null,
  };
}

export async function refreshSession(
  refreshToken: string,
) {
  const {
    data,
    error,
  } =
    await supabasePublic
      .auth
      .refreshSession({
        refresh_token:
          refreshToken,
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
    await getProfile(
      data.user.id,
    );

  if (
    [
      "suspended",
      "blocked",
    ].includes(
      profile.status,
    )
  ) {
    throw new Error(
      "This Safari account is currently unavailable.",
    );
  }

  return {
    ...sessionPayload(
      data.session,
    ),
    profile,
  };
}

export async function getCurrentProfile(
  userId: string,
) {
  const profile =
    await getProfile(
      userId,
    );

  if (
    [
      "suspended",
      "blocked",
    ].includes(
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
  const phone =
    normalizePhone(
      phoneInput,
    );

  const profile =
    await getProfileByPhone(
      phone,
    );

  if (!profile) {
    throw new Error(
      "No Safari account exists for this phone number.",
    );
  }

  assertMobileProfile(
    profile,
  );

  const otp =
    await createAndSendOtp(
      phone,
      "forgot_password",
      {
        userId:
          profile.id,
      },
    );

  return {
    phone,
    message:
      "Safari password reset code sent on WhatsApp.",
    otpChannel:
      "whatsapp" as const,
    expiresAt:
      otp.expiresAt,
  };
}

export async function verifyPasswordResetOtp(
  phoneInput: string,
  token: string,
) {
  const phone =
    normalizePhone(
      phoneInput,
    );

  const challenge =
    await verifyOtp(
      phone,
      "forgot_password",
      token,
    );

  const profile =
    await getProfileByPhone(
      phone,
    );

  if (!profile) {
    throw new Error(
      "Safari account was not found for this password reset.",
    );
  }

  const challengeUserId =
    typeof challenge
      .metadata
      ?.userId ===
    "string"
      ? challenge
          .metadata
          .userId
      : null;

  if (
    challengeUserId &&
    challengeUserId !==
      profile.id
  ) {
    throw new Error(
      "Safari password reset request does not match this account.",
    );
  }

  const resetAccessToken =
    await issueResetToken(
      challenge.id,
    );

  return {
    resetAccessToken,
    userId:
      profile.id,
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

  const phone =
    normalizePhone(
      challenge.phone,
    );

  const profile =
    await getProfileByPhone(
      phone,
    );

  if (!profile) {
    throw new Error(
      "Safari password reset account could not be found.",
    );
  }

  assertMobileProfile(
    profile,
  );

  const {
    error,
  } =
    await supabaseAdmin
      .auth
      .admin
      .updateUserById(
        profile.id,
        {
          password:
            newPassword,
        },
      );

  if (error) {
    throw new Error(
      error.message,
    );
  }

  await markChallengeConsumed(
    challenge.id,
  );

  return {
    message:
      "Safari password updated successfully.",
  };
}
