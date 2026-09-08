SAFARI V10 — RIDE SESSION / PIN / CANCEL / SERVICE RELATIONSHIP FIX
====================================================================

BASE
----
Built against the latest uploaded:
- mobile(5).zip
- backend(3).zip

This patch DOES NOT overwrite SafariMap.tsx or the V9 OpenStreetMap work.

FIXED
-----
1. Passenger start PIN
   - A 4-digit start PIN is generated as soon as the passenger accepts a driver.
   - Passenger active-ride API exposes it only before trip start.
   - Driver active-ride API still does NOT expose the PIN.
   - Passenger Active Ride screen displays a dedicated "YOUR START PIN" card.
   - Driver must enter the passenger's PIN before changing the ride to in_progress.

2. Passenger cancel ride
   - Active ride screen now has Cancel ride before trip start.
   - Uses the existing backend passenger cancellation endpoint.
   - Cancellation reason is recorded.
   - If a driver is already assigned, backend releases that driver immediately.

3. Driver cancel ride
   - Driver Active Ride screen now has Cancel ride before trip start.
   - Uses the existing driver cancellation endpoint.
   - Driver becomes available again after cancellation.

4. App close / reopen ride restore
   - Passenger dashboard asks backend for the current ride on mount.
   - requested/searching -> Driver Matching
   - driver_assigned/driver_arriving/driver_arrived/in_progress -> Active Ride
   - freshly completed -> completion flow
   - Driver dashboard restores an active ride even if the local dashboard initially says offline.
   - Matching screen can reuse a restored searching ride instead of creating it again.

5. Safari ride category unavailable
   - Matching backend no longer depends on the ride_categories embedded relation shape.
   - It reads rides.ride_category_id and resolves the category explicitly.
   - Fixes repeated:
       Safari ride category is unavailable.
     warnings from nearby-driver polling.

6. Duplicate React keys
   - Passenger driver offers are deduplicated by offer ID.
   - Nearby drivers are deduplicated by driver ID.
   - Restored searching rides are not restarted, preventing duplicate matching invitations.

7. service_bookings -> provider_services ambiguity
   - Runtime backend no longer embeds provider_services/service_providers from service_bookings.
   - Booking rows are fetched first and related provider/service records are hydrated explicitly.
   - Applied to:
       Passenger service bookings
       Passenger activity
       Service booking detail/tracking data
       Worker service jobs
       Admin service bookings
       Unified merchant order index
   - Therefore this runtime error no longer depends on PostgREST FK disambiguation:
       Could not embed because more than one relationship was found for
       'service_bookings' and 'provider_services'

8. Optional Supabase schema cleanup
   - SAFARI_FIX_SERVICE_BOOKINGS_PROVIDER_SERVICES.sql
   - Runtime V10 does not require this SQL to stop the embed error.
   - Run it later to canonicalize service_bookings.service_id ->
     provider_services.id and clean duplicate FKs.
   - Stop backend/admin before running it.

APPLY
-----
Extract/merge this ZIP into:

  E:\Safari

It contains only changed files. It intentionally does not include package.json,
package-lock.json, app.json, app.config.js, or SafariMap.tsx.

BACKEND
-------
cd E:\Safari\backend
npm install
npm run build
npm run dev

MOBILE
------
cd E:\Safari\apps\mobile
npx tsc --noEmit
npx expo start -c

V9 OpenStreetMap remains the visible map.

RIDE TEST
---------
Passenger:
1. Login.
2. Request ride.
3. Driver submits offer.
4. Passenger accepts.
5. Passenger Active Ride must show the 4-digit PIN.
6. Close Safari completely and open again.
7. Safari must restore the active ride.
8. Before trip start passenger can cancel.
9. Call/chat remain available.

Driver:
1. Accepted ride opens Active Ride.
2. Driver can cancel before trip starts.
3. Driver marks heading to pickup.
4. Driver marks arrived.
5. Driver enters passenger PIN.
6. Trip starts only with the correct PIN.
7. In-progress ride cannot be cancelled from the normal pre-trip button.
8. Complete trip normally.

SERVICES TEST
-------------
Open:
  Passenger -> Services -> My bookings

The backend should no longer throw the service_bookings/provider_services
relationship ambiguity error.

VALIDATION PERFORMED
--------------------
- All 14 changed TS/TSX files passed TypeScript syntax transpilation with 0 errors.
- Full mobile source scan: 432 TS/TSX files, 0 syntax errors.
- Static scan confirms no service_bookings -> provider_services embedded query
  remains in the patched backend module tree.
- Full dependency type/build validation could not be completed inside the
  packaging environment because npm dependency installation timed out; run the
  commands above in E:\Safari for final project-level validation.
