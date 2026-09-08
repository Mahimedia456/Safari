SAFARI V9 — OPENSTREETMAP + DARK MODE
=========================================

VISIBLE MAP
-----------
Safari's visible mobile map is now:
  OpenStreetMap tiles
  + Leaflet
  + react-native-webview

There is NO Google Maps SDK dependency in SafariMap.tsx.

LIGHT MODE
----------
Uses the normal OpenStreetMap tile appearance.

DARK MODE
---------
Uses the SAME OpenStreetMap tile source and applies a dark raster
transformation in the WebView.

This means dark mode still shows OpenStreetMap data and does not require:
- Google Maps billing
- Google Maps API key
- MapTiler API key
- CARTO API key

BACKEND
-------
NO backend files are changed by this patch.

Keep the existing backend exactly as it is:
- ride APIs
- Places/search
- geocoding
- directions
- fares
- matching
- live ride state
- chat
- receipts
- ratings

If your backend Google web-service key is currently working for Places/
Directions, it continues to work. If it later fails because Google billing
is unavailable, Safari's existing backend fallback providers remain a
separate concern from the visible OpenStreetMap.

SCREENS COVERED AUTOMATICALLY
-----------------------------
All these existing screens already consume the central SafariMap component:
- Passenger Ride Home
- Confirm Route
- Ride Options
- Driver Matching
- Passenger Active Ride
- Driver Active Ride
- Delivery Tracking
- Service Tracking
- Active Delivery
- Active Service
- Passenger map wrapper components

GOOGLE NATIVE CONFIG
--------------------
V9 removes Google Maps keys/config from app.json/app.config.js.
The GOOGLE_MAPS_ANDROID_API_KEY line may remain in .env, but the visible
mobile map no longer reads or needs it.

react-native-maps may remain installed in package.json for now; V9 does not
import it anywhere in SafariMap. You can remove that dependency later after
final QA if no other source file imports it.

RUN
---
This implementation works in Expo Go because react-native-webview is already
part of the current Safari dependency set.

From:
  E:\Safari\apps\mobile

Run:
  npx expo start -c

No Android Google Maps SHA-1, billing setup or native rebuild is required
for this OpenStreetMap map implementation.

PRODUCTION NOTE
---------------
The patch uses OpenStreetMap's public raster tile service for development
and low-volume testing with attribution. Before a high-volume production
launch, use an OSM-compatible hosted tile provider or your own tile service
that complies with its production usage terms.
