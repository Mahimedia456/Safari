Safari Ride Flow / API / Supabase V3 - TypeScript Regression Fix
Date: 2026-09-08

PURPOSE
-------
This is cumulative over the previous V2 ride-flow package. It retains the
backend/admin/mobile ride-flow and deadlock-safe Supabase repair files and adds
the mobile source fixes for the reported 70 TypeScript errors in 35 files.

WHAT V3 FIXES
-------------
1. Dispatch contract drift
   - Restores DeliveryJob, DriverRideRequest, ServiceWorkJob,
     PassengerDriverOffer and NearbyRideDriver exports.

2. Passenger API/profile contract drift
   - Strong passenger profile/address/activity types.
   - Restores passengerService.activity(), activityDetail(), updateAddress().

3. Driver contract drift
   - Strong driver profile types.
   - Driver vehicle uses plate_number.
   - Driver documents use real API document fields/statuses.
   - Adds todayEarnings compatibility to DriverState.

4. Services booking contract drift
   - Adds backendBookingId/setBackendBookingId.
   - Restores nested provider_services/service_providers typing.

5. Ride UI compile fixes
   - RideBottomSheet accepts minHeight.
   - React Native StatusBar unsupported backgroundColor props removed.
   - StyleSheet.absoluteFillObject replaced with supported absoluteFill.

6. Map/Supabase missing package compile failures
   - Legacy MapLibre wrappers now use the existing SafariMap implementation.
   - Unused direct mobile Supabase imports removed; current app flow remains
     backend-API based.

7. Bootstrap/profile cleanup
   - Removes impossible rootSegment === "index" comparison.
   - Passenger profile typing fixed; Pakistan badge stays removed.

VALIDATION PERFORMED
--------------------
- Parsed all 432 mobile .ts/.tsx files with TypeScript transpile diagnostics.
- Result: 0 syntax errors.
- Scanned source for the reported missing direct imports/patterns:
  @maplibre/maplibre-react-native, @supabase/supabase-js,
  StyleSheet.absoluteFillObject, rootSegment === "index".
- Result: 0 active source hits.

IMPORTANT
---------
This ZIP intentionally does NOT include apps/mobile/package.json,
package-lock.json, node_modules, or a replacement tsconfig.json. Keep the
working dependency files already present in E:\Safari\apps\mobile.

APPLY
-----
Extract/merge this ZIP into:
  E:\Safari

Then:
  cd E:\Safari\apps\mobile
  npm install
  npx tsc --noEmit

For backend/admin after applying cumulative ride-flow changes:
  cd E:\Safari\backend
  npm install
  npm run build

  cd E:\Safari\apps\admin
  npm install
  npm run build

SUPABASE
--------
Use the deadlock-safe SQL included at package root:
  SAFARI_FIX_RIDES_SERVICE_CITIES_DEADLOCK_SAFE.sql
or the complete:
  SAFARI_RIDE_FLOW_FINAL_SUPABASE.sql

Stop ride-polling backend/admin/mobile sessions before running the FK migration.
