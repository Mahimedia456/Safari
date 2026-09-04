Safari Active Ride Final
========================

This package was built from the uploaded current mobile app folder and backend src.

Passenger:
- Active ride polls live ride/location every ~1.8 sec.
- Before trip: road route = driver live GPS -> pickup.
- During trip: road route = driver live GPS -> destination.
- No fake straight pickup/dropoff route is drawn.
- Arrival screen exposes passenger's 4-digit start PIN.
- Driver card shows real accepted fare/vehicle.
- Call opens native phone dialer.
- Chat keeps the existing /ride-chat route.
- ETA and distance come from the road route endpoint.

Driver:
- Active ride now uses real Expo Location GPS.
- Driver location publishing remains active.
- Road route = current GPS -> pickup, then current GPS -> destination.
- Professional map + navigation card + passenger card + call/chat.
- driver_assigned -> Navigate to pickup.
- driver_arriving -> I've arrived.
- driver_arrived -> 4 digit PIN is required.
- Wrong PIN returns backend error and trip cannot start.
- Correct PIN -> in_progress.
- in_progress -> Complete trip.
- Actual pickup/drop coordinates are sent with status transition.
- Completed trip returns Driver Home.

Backend:
- Driver active endpoint does not expose start_otp.
- Passenger receives start_otp only while status=driver_arrived.
- Active payload includes vehicle_type/category for correct map icon.
- Final fare uses agreed_fare first, estimated_fare only as fallback.
- PIN request validation is exactly four digits.

Apply:
1. Copy app/ into E:\Safari\apps\mobile\src\app
2. Copy components/ride/SafariMap.tsx into E:\Safari\apps\mobile\src\components\ride
3. Copy backend files into E:\Safari\backend\src
4. Run optional SQL indexes.
5. Restart backend and Metro.
