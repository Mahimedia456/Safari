# Safari Admin — Phase 02

Replaces localStorage demo authentication with the Safari backend.

Added:
- backend API client
- real Supabase-backed admin/merchant login
- token persistence and refresh
- `/auth/me` session verification
- existing light/dark theme preserved
- existing route and role guards preserved

Set:
`VITE_API_URL=http://localhost:5000`

Seed admin:
`admin@safari.com`
Password: use `SEED_ADMIN_PASSWORD` from backend `.env`

Demo merchants use:
`SafariDemo@123`
