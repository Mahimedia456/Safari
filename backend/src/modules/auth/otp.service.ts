import {
  createHmac,
  randomInt,
  randomUUID,
  timingSafeEqual,
} from "node:crypto";

import { env } from "../../config/env.js";
import { supabaseAdmin } from "../../lib/supabase.js";
import { sendWhatsAppOtp } from "../whatsapp/whatsapp.service.js";

export type OtpPurpose =
  | "signup"
  | "forgot_password";

function normalizePhone(phone: string) {
  const normalized = phone.trim().replace(/[\s()-]/g, "");

  if (!/^\+[1-9]\d{7,14}$/.test(normalized)) {
    throw new Error(
      "Use a valid international phone number such as +923001234567.",
    );
  }

  return normalized;
}

function otpHash(
  phone: string,
  purpose: OtpPurpose,
  otp: string,
) {
  return createHmac("sha256", env.AUTH_OTP_PEPPER)
    .update(`${phone}:${purpose}:${otp}`)
    .digest("hex");
}

function resetTokenHash(token: string) {
  return createHmac(
    "sha256",
    env.AUTH_RESET_TOKEN_PEPPER,
  )
    .update(token)
    .digest("hex");
}

function secureEqualHex(left: string, right: string) {
  const a = Buffer.from(left, "hex");
  const b = Buffer.from(right, "hex");

  return (
    a.length === b.length &&
    timingSafeEqual(a, b)
  );
}

async function enforceSendRateLimit(
  phone: string,
  purpose: OtpPurpose,
) {
  const tenMinutesAgo = new Date(
    Date.now() - 10 * 60 * 1000,
  ).toISOString();

  const { count, error } = await supabaseAdmin
    .from("auth_otp_challenges")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("phone", phone)
    .eq("purpose", purpose)
    .gte("created_at", tenMinutesAgo);

  if (error) throw new Error(error.message);

  if (
    (count ?? 0) >=
    env.AUTH_OTP_MAX_SENDS_PER_10_MINUTES
  ) {
    throw new Error(
      "Too many Safari verification codes were requested. Try again in a few minutes.",
    );
  }
}

export async function createAndSendOtp(
  phoneInput: string,
  purpose: OtpPurpose,
  metadata: Record<string, unknown> = {},
) {
  const phone = normalizePhone(phoneInput);

  await enforceSendRateLimit(phone, purpose);

  const otp = String(randomInt(100000, 1000000));

  const expiresAt = new Date(
    Date.now() +
      env.AUTH_OTP_TTL_SECONDS * 1000,
  ).toISOString();

  await supabaseAdmin
    .from("auth_otp_challenges")
    .update({
      consumed_at: new Date().toISOString(),
    })
    .eq("phone", phone)
    .eq("purpose", purpose)
    .is("consumed_at", null);

  const { data: challenge, error } =
    await supabaseAdmin
      .from("auth_otp_challenges")
      .insert({
        phone,
        purpose,
        otp_hash: otpHash(phone, purpose, otp),
        max_attempts: env.AUTH_OTP_MAX_ATTEMPTS,
        expires_at: expiresAt,
        metadata,
      })
      .select("*")
      .single();

  if (error) throw new Error(error.message);

  try {
    const meta = await sendWhatsAppOtp(phone, otp);

    return {
      challengeId: challenge.id,
      phone,
      expiresAt,
      metaMessageId:
        meta?.messages?.[0]?.id ?? null,
    };
  } catch (error) {
    await supabaseAdmin
      .from("auth_otp_challenges")
      .update({
        consumed_at: new Date().toISOString(),
      })
      .eq("id", challenge.id);

    throw error;
  }
}

export async function verifyOtp(
  phoneInput: string,
  purpose: OtpPurpose,
  token: string,
) {
  const phone = normalizePhone(phoneInput);

  const { data: challenge, error } =
    await supabaseAdmin
      .from("auth_otp_challenges")
      .select("*")
      .eq("phone", phone)
      .eq("purpose", purpose)
      .is("consumed_at", null)
      .order("created_at", {
        ascending: false,
      })
      .limit(1)
      .maybeSingle();

  if (error) throw new Error(error.message);

  if (!challenge) {
    throw new Error(
      "No active Safari verification code was found. Request a new code.",
    );
  }

  if (
    new Date(challenge.expires_at).getTime() <=
    Date.now()
  ) {
    await supabaseAdmin
      .from("auth_otp_challenges")
      .update({
        consumed_at: new Date().toISOString(),
      })
      .eq("id", challenge.id);

    throw new Error(
      "Safari verification code has expired. Request a new code.",
    );
  }

  if (
    Number(challenge.attempts) >=
    Number(challenge.max_attempts)
  ) {
    throw new Error(
      "Too many incorrect Safari verification attempts. Request a new code.",
    );
  }

  const expected = challenge.otp_hash;
  const received = otpHash(phone, purpose, token);

  if (!secureEqualHex(expected, received)) {
    const attempts =
      Number(challenge.attempts) + 1;

    await supabaseAdmin
      .from("auth_otp_challenges")
      .update({
        attempts,
        consumed_at:
          attempts >= Number(challenge.max_attempts)
            ? new Date().toISOString()
            : null,
      })
      .eq("id", challenge.id);

    throw new Error(
      "The Safari verification code is incorrect.",
    );
  }

  const now = new Date().toISOString();

  const { data: verified, error: updateError } =
    await supabaseAdmin
      .from("auth_otp_challenges")
      .update({
        verified_at: now,
      })
      .eq("id", challenge.id)
      .select("*")
      .single();

  if (updateError)
    throw new Error(updateError.message);

  return verified;
}

export async function issueResetToken(
  challengeId: string,
) {
  const token = randomUUID() + randomUUID();

  const { error } = await supabaseAdmin
    .from("auth_otp_challenges")
    .update({
      reset_token_hash: resetTokenHash(token),
    })
    .eq("id", challengeId)
    .eq("purpose", "forgot_password")
    .not("verified_at", "is", null);

  if (error) throw new Error(error.message);

  return token;
}

export async function consumeResetToken(
  token: string,
) {
  const hash = resetTokenHash(token);

  const { data: challenge, error } =
    await supabaseAdmin
      .from("auth_otp_challenges")
      .select("*")
      .eq("purpose", "forgot_password")
      .eq("reset_token_hash", hash)
      .is("consumed_at", null)
      .not("verified_at", "is", null)
      .order("created_at", {
        ascending: false,
      })
      .limit(1)
      .maybeSingle();

  if (error) throw new Error(error.message);

  if (!challenge) {
    throw new Error(
      "Safari password reset session is invalid or expired.",
    );
  }

  if (
    new Date(challenge.expires_at).getTime() <=
    Date.now()
  ) {
    throw new Error(
      "Safari password reset session has expired.",
    );
  }

  return challenge;
}

export async function markChallengeConsumed(
  challengeId: string,
) {
  const { error } = await supabaseAdmin
    .from("auth_otp_challenges")
    .update({
      consumed_at: new Date().toISOString(),
    })
    .eq("id", challengeId);

  if (error) throw new Error(error.message);
}
