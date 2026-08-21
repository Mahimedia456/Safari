# Safari Phase 04 — Drivers, Vehicles, Documents and Verification

## Run SQL in order

If not already executed:

1. `sql/phase02_auth_profiles.sql`
2. `sql/phase03_passenger_profiles_addresses_settings.sql`

Then:

3. `sql/phase04_drivers_vehicles_documents.sql`

## Seed

```powershell
cd E:\Safari\backend
npm install
npm run seed
npm run dev
```

All seeded accounts use:

`password: safarimobile`

Drivers:

- driver1@safari.com / +923101111111 — Approved
- driver2@safari.com / +923102222222 — Under review
- driver3@safari.com / +923103333333 — Submitted

## Driver APIs

- GET `/api/v1/drivers/me`
- PATCH `/api/v1/drivers/me`
- POST `/api/v1/drivers/submit`
- POST `/api/v1/drivers/vehicles`
- PATCH `/api/v1/drivers/vehicles/:vehicleId`
- DELETE `/api/v1/drivers/vehicles/:vehicleId`
- POST `/api/v1/drivers/documents`
- PATCH `/api/v1/drivers/availability`

## Admin Driver Verification APIs

- GET `/api/v1/admin/drivers`
- GET `/api/v1/admin/drivers/:driverId`
- PATCH `/api/v1/admin/drivers/:driverId/status`
- PATCH `/api/v1/admin/drivers/:driverId/vehicles/:vehicleId/status`
- PATCH `/api/v1/admin/drivers/:driverId/documents/:documentId/status`

Storage uploads themselves are intentionally left for the later Storage phase.
Phase 04 stores document metadata and verification state.
