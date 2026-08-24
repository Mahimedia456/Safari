
Safari Universal Live Tracking Final
====================================

Passenger:
- Ride: Places search -> map -> quotes -> Cash -> driver fare offers -> live ride.
- Food/Grocery/Pharmacy: merchant pickup and customer delivery are shown on real dark Leaflet map.
- Delivery driver coordinates come from driver_locations every ~2.5 seconds.
- Delivered -> rating -> Home.
- Services: professional assignment, on-the-way live map, arrived, in progress, completed -> rating -> Home.

Driver:
- Separate Rides, Food, Grocery, Pharmacy, Services tabs.
- Ride: driver sends fare offer; passenger accepts.
- Delivery: accepted -> at pickup -> picked up -> on the way -> delivered.
- Services: assigned -> on the way -> arrived -> in progress -> completed.
- Location publisher updates driver_locations while active.

Database:
Run safari_universal_live_tracking_final.sql AFTER the earlier marketplace SQL.
