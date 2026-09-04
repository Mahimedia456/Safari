Safari Driver + Passenger Full Flow Final
=========================================

Critical fix:
Passenger Driver Offers polling no longer stops when booking updates Zustand.
This was the reason a driver could submit an offer but passenger did not see it.

Ride request:
1. Passenger creates Ride.
2. Matching starts.
3. Passenger map displays ALL matching nearby verified online drivers:
   car = car icon, bike = bike icon, rickshaw = rickshaw icon.
4. Driver gets matching category request only.
5. Driver sends fare.
6. Passenger polling every ~1.4 sec receives fare.
7. Passenger accepts one offer atomically.
8. Driver dashboard detects accepted ride and opens Active Ride automatically.
9. Both sides get live map/status.
10. Both sides have Call and real backend Chat.
11. Phone button opens native Android/iOS dialer with the other party's number.
12. Driver completes lifecycle and passenger proceeds to completion/rating.

Auth:
- Access + refresh token are already encrypted in Expo SecureStore.
- This revision refreshes expired access token from /auth/refresh on app hydration.
- Login survives normal app close/reopen.

Profile:
- Generic /profiles/me PATCH supports both passenger and driver.
- Driver profile card opens working Edit Profile.
- Driver overview refreshes after save.

Android:
- Passenger and driver tab bars now include safe-area bottom inset,
  avoiding Android gesture/navigation bar overlap.

Required DB migration:
Run safari_driver_passenger_full_flow.sql before testing chat.

Local test:
Backend latest source must be running on 192.168.100.27:5000
Mobile .env must point to http://192.168.100.27:5000/api/v1
