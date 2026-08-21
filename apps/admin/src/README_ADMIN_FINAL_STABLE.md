# Safari Admin — Final Stabilization Pass

This package was built from the latest uploaded admin `src`.

Key changes:

- Passenger and Driver runtime `.filter/.map` crashes removed.
- Passenger and Driver stores now normalize real backend API records to the existing UI contract.
- Driver applications are derived from real driver onboarding status.
- Passenger Safety/Support initialize as safe empty API-ready modules instead of undefined state.
- Ride store normalizes real `/admin/rides` API records to the existing UI.
- Grocery and Pharmacy no longer initialize from dummy data; their order views load from real Commerce admin APIs.
- Services no longer initializes from dummy data; bookings load from the real Services Marketplace admin APIs.
- Central `AdminDataBootstrap` loads the main API modules after authenticated layout mount.
- Admin Dashboard uses real analytics store/backend values instead of hard-coded platform counts.
- Sidebar is compact: one entry per module.
- Current module sub-navigation is rendered horizontally in the Topbar.
- Germany pricing/region routes and pages are removed from the final package.
- Visible operations are Pakistan-only.

Notes:

Some catalog-management pages (e.g. Grocery product/category CRUD, Pharmacy product catalog, service staff/areas/promotions) now intentionally show empty states rather than fake data when there is no corresponding backend list endpoint yet. This prevents the admin from presenting mock records as real database data.
