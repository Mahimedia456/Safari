# Safari Admin — Phase 07-08

Added operational integration for:

- active/searching rides
- assigned drivers
- current driver location
- driver matching requests
- ride status history
- tracking-point history
- live ride store
- live ride status indicator

New APIs:
- GET `/api/v1/admin/live-rides`
- GET `/api/v1/admin/live-rides/:rideId/tracking`

The current admin UI can use `useLiveRideStore` for a live operations screen.
