SAFARI V12 — DELIVERY SCHEMA + SHARED CURRENT LOCATION
=======================================================

APPLY
-----
Merge this ZIP into:
  E:\Safari

Apply it on top of the current V9 OpenStreetMap + V10 + V11 project.

V12 does NOT overwrite:
- SafariMap.tsx
- app.json / app.config.js
- package.json / package-lock.json
- .env or secrets

FIX 1 — delivery_jobs estimated_total error
-------------------------------------------
V11 attempted to insert delivery_jobs.estimated_total, but the deployed
delivery_jobs table does not have that column.

V12 removes that DB dependency completely.

Order totals remain on:
- food_orders.total
- commerce_orders.total

delivery_jobs keeps the courier/delivery information including delivery_fee.

No schema migration is required for the runtime fix. Restart backend after merge.

Optional schema inspection:
  SAFARI_V12_DELIVERY_JOBS_SCHEMA_CHECK.sql

FIX 2 — CURRENT LOCATION IS NO LONGER DEPENDENT ON RIDE
--------------------------------------------------------
Before V12:
Food/Grocery/Pharmacy checkout read useRideStore().pickup.
So their delivery location only existed after the customer had opened Ride.

V12 adds one shared passenger GPS store:
  apps/mobile/src/store/passengerLocationStore.ts

It is used by:
- Passenger Home
- Ride
- Food
- Grocery
- Pharmacy
- Services

Behavior:
- Passenger Home starts a current-location fetch after login.
- Current GPS point is cached for 5 minutes.
- Concurrent screens share one in-flight request.
- Tap the current-location row to refresh.
- Ride pickup consumes the same shared point.
- Food/Grocery/Pharmacy checkout resolves GPS even if Ride was never opened.
- Orders send delivery address + latitude + longitude to backend.
- Services Schedule auto-fills current GPS address.
- Services booking sends latitude + longitude when current location is used.
- If customer manually types a different service address, current GPS coords
  are not falsely attached to that custom address.

TEST
----
1. Restart backend.
2. Restart Expo/Metro.
3. Open app and DO NOT open Ride.
4. Open Food -> current location should appear.
5. Place Food order.
6. Repeat Grocery and Pharmacy.
7. Open Services -> Schedule -> current address should auto-fill.
8. Confirm booking.
9. delivery_jobs must create without estimated_total schema error.

COMMANDS
--------
Backend:
  cd E:\Safari\backend
  npm run build
  npm run dev

Mobile:
  cd E:\Safari\apps\mobile
  npx tsc --noEmit
  npx expo start -c

If Android location permission was denied previously, enable location permission
for Expo Go / Safari development client in Android Settings and retry.
