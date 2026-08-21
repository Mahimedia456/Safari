# Safari Auth + ENV Final Pass

## 1. Supabase SQL

Run this once in Supabase SQL Editor after Phase 18:

`sql/auth_finalization.sql`

It finalizes the auth.users -> profiles trigger, profile indexes and RLS.

## 2. Backend ENV

A working development `.env` is included in this ZIP.

Keep `SUPABASE_SECRET_KEY` ONLY in `E:\Safari\backend\.env`.
Never copy it into mobile, admin, website or Git.

## 3. Mobile authentication

Registration:

Phone + password + optional email -> phone OTP -> profile/session.

Login:

Phone + password.

Forgot password:

Phone -> SMS OTP -> new password.

Supabase Dashboard must have Phone Auth enabled and a supported SMS provider configured for real OTP delivery.

## 4. Admin / merchant authentication

Email + password -> backend -> Supabase -> profile role -> protected Control Center.

Seed credentials:

- admin@safari.com / safarimobile
- food@safari.com / safarimobile
- grocery@safari.com / safarimobile
- pharmacy@safari.com / safarimobile
- services@safari.com / safarimobile

## 5. Run

```powershell
cd E:\Safari
npm run dev
```

Or backend only:

```powershell
cd E:\Safari\backend
npm install
npm run seed
npm run dev
```

## 6. Android emulator vs physical phone

Android emulator uses:

`EXPO_PUBLIC_API_URL=http://10.0.2.2:5000`

For a physical phone, replace it in `apps/mobile/.env` with your PC LAN IP, for example:

`EXPO_PUBLIC_API_URL=http://192.168.1.20:5000`

Both devices must be on the same network and Windows Firewall must allow port 5000.
