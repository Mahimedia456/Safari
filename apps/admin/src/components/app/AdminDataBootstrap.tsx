import {
  useEffect,
  type PropsWithChildren,
} from "react";

import {
  useAnalyticsStore,
} from "../../store/analyticsStore";
import {
  useDriverStore,
} from "../../store/driverStore";
import {
  useFoodStore,
} from "../../store/foodStore";
import {
  useGroceryStore,
} from "../../store/groceryStore";
import {
  useMerchantStore,
} from "../../store/merchantStore";
import {
  usePassengerStore,
} from "../../store/passengerStore";
import {
  usePharmacyStore,
} from "../../store/pharmacyStore";
import {
  useRideStore,
} from "../../store/rideStore";
import {
  useServicesStore,
} from "../../store/servicesStore";

export default function AdminDataBootstrap({
  children,
}: PropsWithChildren) {
  useEffect(() => {
    const jobs = [
      useAnalyticsStore
        .getState()
        .loadDashboard(),
      useDriverStore
        .getState()
        .load(),
      usePassengerStore
        .getState()
        .load(),
      useRideStore
        .getState()
        .loadRides(),
      useRideStore
        .getState()
        .loadCatalog(),
      useFoodStore
        .getState()
        .loadRestaurants(),
      useFoodStore
        .getState()
        .loadOrders(),
      useGroceryStore
        .getState()
        .load(),
      usePharmacyStore
        .getState()
        .load(),
      useServicesStore
        .getState()
        .load(),
      useMerchantStore
        .getState()
        .loadMerchants(),
      useMerchantStore
        .getState()
        .loadOrders(),
    ];

    void Promise.allSettled(
      jobs,
    );
  }, []);

  return <>{children}</>;
}
