# Safari Phase 02 — Auth, Profiles and Roles

1. Run `sql/phase02_auth_profiles.sql` in Supabase SQL Editor.
2. Copy `.env.example` to `.env` and add your real server-side Supabase values.
3. `npm install`
4. `npm run seed`
5. `npm run dev`
6. Test:
   - GET `/api/v1/health`
   - POST `/api/v1/auth/admin/login`
   - GET `/api/v1/auth/me` with Bearer token

Seed accounts:
- admin@safari.com
- food@safari.com
- grocery@safari.com
- pharmacy@safari.com
- services@safari.com

Use `SEED_ADMIN_PASSWORD` for the admin account.
Merchant demo password is `SafariDemo@123`.

Do not place the Supabase secret key in mobile or admin frontend code.
