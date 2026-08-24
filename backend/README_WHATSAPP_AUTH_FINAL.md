# Safari Pakistan Mobile Auth — WhatsApp Final

This backend no longer uses Supabase SMS/Phone Provider for mobile auth.

## Mobile registration

`POST /api/v1/auth/mobile/register`

1. Validates a Pakistan `+92` phone number.
2. Creates a deterministic internal Supabase email identity:
   `phone-923001234567@auth.safari.app`
3. Stores the user's real phone in Safari `profiles`.
4. Creates a six-digit HMAC-hashed OTP challenge.
5. Sends the OTP using the configured Meta WhatsApp template.
6. Returns the exact contract expected by the Safari mobile app:
   `userId`, `phone`, `verificationRequired`, `otpChannel`, `expiresAt`.

## OTP verification

`POST /api/v1/auth/mobile/verify-otp`

Verifies the Safari challenge, marks the Auth user metadata as phone-verified,
and returns `{ verified, phone, profile }`.

The mobile app then automatically calls `/mobile/login` with the password held
temporarily in memory.

## Login

`POST /api/v1/auth/mobile/login`

Converts the phone to the internal email identity and uses Supabase password
authentication. Login is rejected until WhatsApp phone verification is complete.

## Forgot password

- `/mobile/forgot-password`
- `/mobile/forgot-password/verify`
- `/mobile/reset-password`

All OTP delivery is through WhatsApp. Reset tokens are single-use and expire
15 minutes after OTP verification.

## Required SQL

Run once in Supabase SQL Editor:

`sql/whatsapp_auth_final.sql`

## Deployment

Set the values listed in `ENV_WHATSAPP_AUTH_FINAL.txt` in the Vercel backend
project and redeploy.

Then test:

- `GET /api/v1/health`
- register
- WhatsApp OTP
- verify OTP
- automatic login
- forgot/reset password
