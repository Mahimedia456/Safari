# Safari Phase 07-08

## Phase 07
Driver Matching + Accept / Reject

## Phase 08
Active Ride Lifecycle + Driver Location Tracking

Run SQL in this order if starting from scratch:

1. phase02_auth_profiles.sql
2. phase03_passenger_profiles_addresses_settings.sql
3. phase04_drivers_vehicles_documents.sql
4. phase05_ride_catalog_pricing_service_areas.sql
5. phase06_ride_booking_fare_quotes.sql
6. phase07_driver_matching.sql
7. phase08_active_ride_tracking.sql

If 02-06 already exist, only run 07 and 08.

Then:

```powershell
cd E:\Safari\backend
npm install
npm run seed
npm run dev
```

All seeded accounts:
password = safarimobile

Matching API:
- POST `/api/v1/matching/rides/:rideId/start`
- GET `/api/v1/matching/driver/offers`
- POST `/api/v1/matching/driver/offers/:offerId/accept`
- POST `/api/v1/matching/driver/offers/:offerId/reject`

Tracking API:
- GET `/api/v1/tracking/passenger/active`
- GET `/api/v1/tracking/driver/active`
- POST `/api/v1/tracking/driver/location`
- POST `/api/v1/tracking/driver/rides/:rideId/status`
- POST `/api/v1/tracking/driver/rides/:rideId/cancel`

Admin:
- GET `/api/v1/admin/live-rides`
- GET `/api/v1/admin/live-rides/:rideId/tracking`

Tracking is API/polling compatible now. Supabase Realtime subscriptions can be layered over these same tables in the dedicated realtime phase.
