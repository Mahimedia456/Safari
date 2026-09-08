SAFARI V11 — RATING LOOP + ORDER DELIVERY DISPATCH
===================================================

BASELINE
--------
Apply this ZIP after the current V9 OpenStreetMap + V10 ride-session fixes.
This ZIP deliberately does NOT overwrite SafariMap.tsx, app.json, app.config.js,
.env, package.json, package-lock.json, node_modules, or backend dist output.

FIXES
-----
1. Ride rating loop
   - Backend exposes /trip/rides/:rideId/rating-status.
   - Passenger Rating checks whether the ride was already rated.
   - Already-rated completed rides are no longer returned as an active-session
     handoff by tracking.service.
   - Successful rating clears ride state and returns to Passenger Home.

2. Food/Grocery/Pharmacy experience rating loop
   - Correct endpoint is /trip/experiences/:type/:sourceId.
   - Adds /trip/experiences/:type/:sourceId/status.
   - Delivered tracking sends the passenger to rating only when rated=false.
   - Completed local order/service state is cleared after successful rating.

3. Immediate order -> driver dispatch
   - New Food order immediately creates a delivery_jobs row.
   - New Grocery order immediately creates a delivery_jobs row.
   - New Pharmacy order immediately creates a delivery_jobs row.
   - No longer waits for merchant ready_for_pickup before drivers can discover it.
   - Available/verified/online drivers receive a notification fan-out.

4. First-driver-wins acceptance
   - Driver accepts via an atomic conditional UPDATE on delivery_jobs.
   - Driver cannot accept a delivery while an active ride/delivery exists.
   - Accepted driver becomes unavailable until delivery completion.

5. Delivery lifecycle
   available
     -> accepted
     -> at_pickup
     -> picked_up
     -> on_the_way
     -> delivered

   Order status synchronizes to confirmed/picked_up/on_the_way/delivered.
   Cash order payment becomes paid at delivered.
   Driver becomes available again at delivered.

6. App-close/reopen recovery
   - Passenger Home checks /delivery/customer/active after active ride recovery.
   - Restores Food/Grocery/Pharmacy tracking automatically.
   - Driver dashboard checks assigned delivery jobs and restores Active Delivery.
   - Orders created before V11 self-heal: tracking/home creates a missing
     delivery_jobs row when the source order is still active.

7. Driver dashboard
   - Available deliveries are loaded regardless of selected tab.
   - Food/Grocery/Pharmacy tabs show live job-count badges.

OPTIONAL SQL
------------
SAFARI_V11_DELIVERY_TRIGGER_CLEANUP.sql

V11 now creates delivery_jobs directly in backend code. If your old Supabase
schema still has a trigger that creates delivery_jobs only when an order becomes
ready_for_pickup, run the optional cleanup SQL once so it cannot create a second
job later. The SQL only targets trigger functions that explicitly contain both
"delivery_jobs" and "ready_for_pickup".

APPLY
-----
Extract/merge into:
  E:\Safari

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

OpenStreetMap V9 remains unchanged.

TEST
----
Food/Grocery/Pharmacy:
Customer places order
-> driver dashboard receives available job
-> driver accepts
-> passenger sees assigned delivery
-> driver reaches pickup
-> picked up
-> on the way
-> delivered
-> rating screen appears once
-> after rating, Home stays Home and rating does not loop

Reopen test:
- close passenger app during delivery -> reopen -> tracking restored
- close driver app during delivery -> reopen -> Active Delivery restored
