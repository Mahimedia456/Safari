# Safari Phase 05-06

## Phase 05
Ride Catalog + Pricing + Service Areas

## Phase 06
Fare Quotes + Passenger Ride Booking

Run SQL in this order:

1. phase02_auth_profiles.sql
2. phase03_passenger_profiles_addresses_settings.sql
3. phase04_drivers_vehicles_documents.sql
4. phase05_ride_catalog_pricing_service_areas.sql
5. phase06_ride_booking_fare_quotes.sql

If 02-04 are already applied, only run 05 and 06.

Then:

```powershell
cd E:\Safari\backend
npm install
npm run seed
npm run dev
```

All seeded accounts use:

`safarimobile`

Phase 05-06 API:

Passenger:
- GET `/api/v1/rides/catalog`
- POST `/api/v1/rides/quotes`
- POST `/api/v1/rides`
- GET `/api/v1/rides`
- GET `/api/v1/rides/:rideId`
- POST `/api/v1/rides/:rideId/cancel`

Admin:
- GET `/api/v1/admin/rides/catalog`
- PATCH `/api/v1/admin/rides/pricing/:pricingId`
- GET `/api/v1/admin/rides`
- GET `/api/v1/admin/rides/:rideId`

Important:
Fare quotes currently use a deterministic Haversine-based route estimate so the backend is fully testable without a paid maps provider. A maps/routing provider can replace this calculation later without changing the public API contract.
