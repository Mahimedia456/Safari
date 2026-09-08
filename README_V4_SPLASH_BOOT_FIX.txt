Safari V4 - Splash / bootstrap freeze fix

Merge this ZIP into E:\Safari.

Fixes:
- Native splash no longer waits indefinitely for auth API validation.
- App preferences bootstrap has a 1.8 second UI fallback.
- Stored auth session is restored locally first, then validated in background.
- API requests have a 20 second abort timeout instead of hanging forever.
- Custom expo-video splash has a 4.2 second hard completion fallback.
- Root route consistently opens /(public)/splash.
- Region/language routing is not restored.

After merge:
cd E:\Safari\apps\mobile
npx tsc --noEmit
npx expo start -c

If app.json/native dependencies changed (e.g. react-native-maps), rebuild:
npx expo run:android
