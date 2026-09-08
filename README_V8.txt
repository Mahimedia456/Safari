SAFARI V8 - GOOGLE MAP VERIFIER SCRIPT FIX
============================================

This patch only fixes the PowerShell verifier syntax.

Replace:
apps/mobile/scripts/verify-google-map-dev-build.ps1

Run from:
E:\Safari\apps\mobile

Command:
powershell -ExecutionPolicy Bypass -File .\scripts\verify-google-map-dev-build.ps1

Also use:
npx expo-doctor

instead of:
npx expo doctor

IMPORTANT:
A valid API key + SHA-1 is not enough if Google Cloud billing is inactive.
The project must be linked to an active Cloud Billing account for Google Maps Platform.
