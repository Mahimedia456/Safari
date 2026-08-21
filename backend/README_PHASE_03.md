# Safari Phase 03 — Passenger Profile + Addresses + Preferences + Admin Passenger Management

Run in order:

1. Phase 02 SQL if not already run:
   `sql/phase02_auth_profiles.sql`

2. Phase 03 SQL:
   `sql/phase03_passenger_profiles_addresses_settings.sql`

3. Ensure backend `.env` contains real Supabase URL and server secret.

4. Run:
   `npm install`
   `npm run seed`
   `npm run dev`

All seeded demo accounts use:
`password: safarimobile`

Admin:
`admin@safari.com`

Passengers:
- passenger1@safari.com / +923001111111
- passenger2@safari.com / +923002222222
- passenger3@safari.com / +923003333333

Phase 03 API:
- GET `/api/v1/passengers/me`
- PATCH `/api/v1/passengers/me`
- GET/POST/PATCH/DELETE `/api/v1/passengers/addresses`
- PATCH `/api/v1/passengers/preferences`
- GET/POST/DELETE `/api/v1/passengers/emergency-contacts`
- GET `/api/v1/admin/passengers`
- GET `/api/v1/admin/passengers/:passengerId`
- PATCH `/api/v1/admin/passengers/:passengerId/status`

Important:
Do not manually INSERT password hashes into Supabase `auth.users` from SQL.
The seed script uses the supported Supabase Admin API.
