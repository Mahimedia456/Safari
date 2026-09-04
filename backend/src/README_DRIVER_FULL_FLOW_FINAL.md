Safari Driver Full Flow Final
=============================

Fixed driver registration/backend:
- mode=driver now always creates driver_profiles automatically.
- /drivers/me no longer fails just because driver_profiles was missing.
- Vehicle create validates:
  Car -> Safari Go or Safari Premium
  Bike -> Safari Bike
  Rickshaw -> Safari Rickshaw
- First vehicle automatically becomes primary.
- Duplicate registration plate produces a readable error.
- Driver can only go online after driver approval + verified vehicle.

Mobile:
- Driver login checks verification:
  approved+verified -> Driver Dashboard
  otherwise -> Driver Onboarding
- Removed demo dashboard bypass.
- Vehicle screen is API-backed create/update, no static driverData.
- Driver profile is API-backed and logout works.
- Driver verification screen reads real backend state.
- Existing work tabs / fare offers / active ride / delivery / services
  from Universal Live Tracking revision are preserved.

Two-device test driver:
Phone: +923122510436
Password after SQL: safarimobile

Run SQL first:
approve_driver_923122510436.sql

Then:
Backend: npm run dev
Mobile: npx expo start -c

Test:
Phone A -> passenger account -> request Safari Go.
Phone B -> login +923122510436 / safarimobile -> go Online.
Driver receives Ride request -> enters fare -> Passenger accepts -> Driver active ride.
