# Safari Phase 16-18

## SQL

Run after Phase 15:

1. `sql/phase16_storage_media.sql`
2. `sql/phase17_admin_analytics_operations.sql`
3. `sql/phase18_final_hardening.sql`

Then:

```powershell
cd E:\Safari\backend
npm install
npm run seed
npm run dev
```

In another terminal:

```powershell
cd E:\Safari\backend
npm run qa:smoke
```

## Phase 16 — Storage

Buckets:

- `avatars` — private
- `driver-documents` — private
- `prescriptions` — private
- `merchant-media` — public
- `service-media` — public

APIs:

- POST `/api/v1/storage/upload-plan`
- POST `/api/v1/storage/:assetId/complete`
- GET `/api/v1/storage/:assetId/url`
- DELETE `/api/v1/storage/:assetId`

## Phase 17 — Admin Analytics / Operations

- GET `/api/v1/admin/analytics/dashboard`
- GET `/api/v1/admin/analytics/daily`
- GET `/api/v1/admin/analytics/incidents`
- POST `/api/v1/admin/analytics/incidents`
- PATCH `/api/v1/admin/analytics/incidents/:incidentId`

## Phase 18 — Final integration hardening

- database indexes
- updated_at triggers
- non-negative wallet constraints
- security headers
- basic write rate limiting
- readiness endpoint:
  - GET `/api/v1/system/ready`
- QA smoke script

## Next

The next dedicated pass is Auth + ENV finalization across:

- `E:\Safari\backend`
- `E:\Safari\apps\mobile`
- `E:\Safari\apps\admin`

That pass will normalize Supabase/API variables and finish login/session handling end-to-end.
