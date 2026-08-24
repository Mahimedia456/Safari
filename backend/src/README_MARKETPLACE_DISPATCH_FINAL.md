# Safari Marketplace Dispatch Final

This coordinated revision implements:

## Ride
- Safari Bike
- Safari Rickshaw
- Safari Go (car)
- Safari Premium (car)
- Go/Premium are not valid for Bike/Rickshaw.
- Safari calculates a suggested fare.
- Nearby eligible driver receives a ride request.
- Driver enters "Your fare" and submits an offer.
- Passenger sees multiple driver offers and accepts one.
- Database RPC accepts exactly one offer atomically.
- Ride then continues through live driver tracking/status flow.

## Food / Grocery / Pharmacy
- Passenger order is stored in the real backend order tables.
- Merchant/Admin sees the same order in the matching Admin module.
- Once merchant/admin marks `ready_for_pickup`, SQL trigger creates a fixed delivery job.
- Driver Home has separate Food / Grocery / Pharmacy tabs.
- Driver accepts a delivery; there is NO fare entry.
- Driver status:
  accepted -> at_pickup -> picked_up -> on_the_way -> delivered
- Source order status follows delivery status.
- Completion returns passenger flow to Home in the existing completion routing.

## Services
- Mobile checkout now calls `/services/bookings`.
- The booking is stored in `service_bookings`.
- Admin Services pages already consume `/admin/services/bookings`, so the same booking appears there.
- Tracking polls backend booking state rather than running a fake local demo timeline.
- Completed service returns to passenger Home.

## Apply
1. Run `safari_marketplace_dispatch_final.sql` in Supabase SQL Editor.
2. Replace backend `src`.
3. Replace mobile `src`.
4. Replace admin `src`.
5. Build/test backend and admin.
6. Test ride bidding with two driver accounts if possible.
