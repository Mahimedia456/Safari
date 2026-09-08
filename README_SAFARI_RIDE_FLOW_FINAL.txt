

=== 2026-09-08 DEADLOCK-SAFE SUPABASE V2 ===
The previous migration could deadlock at DROP TRIGGER on public.rides.
Use SAFARI_RIDE_FLOW_FINAL_SUPABASE.sql from this V2 package.
For the admin relationship error only, you may first run:
SAFARI_FIX_RIDES_SERVICE_CITIES_DEADLOCK_SAFE.sql
Stop backend/admin/mobile polling while the FK migration runs.
Final FK verification must return exactly one rides -> service_cities FK: rides_city_id_fkey on {city_id}.
Safari - Ride Flow + Supabase + Services Recovery FINAL
Date: 2026-09-07

APPLY LOCATION
--------------
Extract/merge this ZIP into your Safari monorepo root:
  E:\Safari

It contains only changed/new files under:
  apps/mobile
  apps/admin
  backend
plus the canonical Supabase SQL at repository root.
It does NOT contain node_modules/vendor and does not delete your package files.

MANDATORY SUPABASE STEP
-----------------------
1. Open Supabase -> SQL Editor.
2. Run SAFARI_RIDE_FLOW_FINAL_SUPABASE.sql as ONE script.
3. At the end, the verification query MUST return exactly ONE row:
     constraint_name: rides_city_id_fkey
     source_columns: {city_id}
4. If it returns more than one row, do NOT consider the schema fixed.
5. The script sends NOTIFY pgrst reload schema/config, so PostgREST refreshes its relationship cache.

WHAT THIS FIXES
---------------
- Removes duplicate rides -> service_cities FK edges causing:
  Could not embed because more than one relationship was found for 'rides' and 'service_cities'
- Admin rides list/detail no longer uses ambiguous rides/service_cities embedding.
- Mobile auth remains phone + password with WhatsApp OTP signup/reset flow.
- Splash -> walkthrough -> login/signup flow; no region/language selection in normal flow.
- Correct Pakistan Safari logo variant in light/dark mode.
- Removes Pakistan label below dashboard header.
- Where to? hero is Safari green in both themes.
- Passenger ride destination/place search through backend Google Places/geocoding.
- Road route/directions through backend Google Maps when configured.
- Driver matching/offers, accept offer, assigned driver, to-pickup, arrived, PIN, in-trip, complete.
- Real driver location updates during ride lifecycle.
- Native phone dialer via tel: for call actions.
- Google Maps navigation for pickup/destination.
- Ride chat uses /api/v1/chat/rides/:rideId and persists ride_messages.
- Completed ride receipt and passenger rating use API data, no demo driver/fare data.
- Food/Grocery/Pharmacy/Services main flows restored to API-backed versions.

GOOGLE MAPS
-----------
Backend environment should contain:
  GOOGLE_MAPS_API_KEY=<your server-side Google Maps key>
Enable the Google APIs required by your account/configuration for Places and Directions.
Do not hard-code the key in the mobile application.

AFTER MERGE
-----------
Backend:
  cd E:\Safari\backend
  npm install
  npm run build
  npm run dev

Admin:
  cd E:\Safari\apps\admin
  npm install
  npm run build

Mobile:
  cd E:\Safari\apps\mobile
  npm install
  npx tsc --noEmit
  npx expo run:android

NOTE
----
The uploaded mobile ZIP did not include package.json/tsconfig.json, so those files are intentionally not supplied/replaced here. Keep the real files already present in E:\Safari\apps\mobile.

QA PERFORMED IN THIS SESSION
----------------------------
All 879 TS/TSX source files in the assembled mobile/backend/admin worktree were parsed with the TypeScript parser: 0 syntax errors.
A full backend npm build could not complete in this sandbox because the uploaded backend node_modules is incomplete (missing @types/node); this is an environment/dependency snapshot issue, not a TypeScript parse failure.
