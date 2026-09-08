SAFARI V7 — SDK 57 GOOGLE MAP DEVELOPMENT BUILD FIX
====================================================

IMPORTANT DISCOVERY FROM THE USER'S CURRENT mobile(5).zip
---------------------------------------------------------
The project is NOT Expo SDK 54 anymore.

It currently uses:
- expo ~57.0.20
- react-native 0.86.3
- react-native-maps 1.27.2
- expo-dev-client ~57.0.18

As of September 2026, Expo SDK 57 + react-native-maps 1.27.2 has an open
Android Expo Go issue where the map surface appears black while the Google
logo remains visible.

That symptom cannot be repaired by changing SafariMap.tsx while continuing
to run the native map inside Expo Go.

USE A DEVELOPMENT BUILD
-----------------------
This is still Expo. It gives you Metro/Fast Refresh like Expo development,
but it uses Safari's own native Android binary and Safari's own Google Maps
API key.

1. Put this in apps/mobile/.env:

   GOOGLE_MAPS_ANDROID_API_KEY=YOUR_ANDROID_MAPS_KEY

2. Google Cloud:
   - Enable Maps SDK for Android
   - Credential application restriction: Android apps
   - Package: com.safari.mobile
   - SHA-1: your DEBUG signing SHA-1

3. Install exact SDK-compatible package:

   cd E:\Safari\apps\mobile
   npx expo install react-native-maps

4. Create native project:

   npx expo prebuild --platform android

5. Print/check SHA-1:

   powershell -ExecutionPolicy Bypass -File .\scripts\verify-google-map-dev-build.ps1

6. After adding the SHA-1 to Google Cloud, rebuild:

   adb uninstall com.safari.mobile
   npx expo run:android

7. For later daily coding you do NOT rebuild each edit.
   Start Metro for the existing development client:

   npx expo start --dev-client -c

WHY APP.JSON CHANGED
--------------------
The old app.json still contained:
  PASTE_YOUR_ANDROID_GOOGLE_MAPS_KEY_HERE

V7 removes that placeholder.

SDK 57's documented react-native-maps configuration uses the
react-native-maps config plugin. app.config.js now injects:

  androidGoogleMapsApiKey

from:
  GOOGLE_MAPS_ANDROID_API_KEY

SafariMap.tsx uses:
  PROVIDER_GOOGLE

in the development/release binary.

BACKEND
-------
No backend change is needed for this black-tile symptom.

Backend Google Places/Directions can continue using:
  GOOGLE_MAPS_API_KEY

Prefer a separate server-side Google key for backend web services.

DO NOT TEST THIS FIX WITH:
  npx expo start --go

Use:
  npx expo run:android

Then for normal subsequent JS/TS development:
  npx expo start --dev-client -c
