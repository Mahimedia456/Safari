# Safari Ride Tracking Integration

Implemented server-side support:
- driver matching offers
- notifications table rows for driver ride offers
- passenger notification on driver acceptance
- passenger notifications on driver arriving/arrived/in-progress/completed
- driver location storage
- ride tracking points/history
- realtime publication preparation

Run:
`sql/ride_tracking_notifications_final.sql`

The mobile currently uses authenticated API polling every ~2-3 seconds for ride state.
Map rendering is MapLibre + OpenStreetMap raster tiles; no Google Maps billing is required.

For true OS push notifications while the app is backgrounded/closed, add Expo Notifications/FCM
delivery as a separate release step. In-app ride request refresh is already wired.
