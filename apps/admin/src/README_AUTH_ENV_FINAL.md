# Safari Admin / Merchant Auth Final

Environment file included: `.env`

Required variables:

- `VITE_API_URL`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

Never place the Supabase backend secret in Vite environment variables.

Final flow:

- Admin: email + password
- Merchant: email + password
- backend validates Supabase session
- profile account type and role control navigation
- session persists in browser localStorage
- failed access token attempts refresh through the backend
- suspended/blocked accounts cannot continue into the Control Center

Seed password: `safarimobile`
