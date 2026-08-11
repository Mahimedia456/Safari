import {
  Link,
} from "react-router-dom";

import ServiceBookingTable from "../../components/services/ServiceBookingTable";
import ServicesStats from "../../components/services/ServicesStats";

import { useServicesStore } from "../../store/servicesStore";

export default function ServicesDashboardPage() {
  const bookings =
    useServicesStore(
      (state) =>
        state.bookings,
    );

  const staff =
    useServicesStore(
      (state) =>
        state.staff,
    );

  return (
    <div>
      <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-sm font-semibold text-safari-600 dark:text-safari-400">
            Safari Services
          </div>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
            Services Management
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Manage service bookings,
            professionals,
            availability and service
            coverage.
          </p>
        </div>

        <Link
          to="/services/bookings"
          className="safari-secondary-button"
        >
          View Bookings
        </Link>
      </div>

      <ServicesStats
        bookings={bookings}
        staff={staff}
      />

      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-950 dark:text-white">
            Recent bookings
          </h2>

          <Link
            to="/services/bookings"
            className="text-sm font-semibold text-safari-600 dark:text-safari-400"
          >
            View all
          </Link>
        </div>

        <ServiceBookingTable
          bookings={bookings}
        />
      </div>
    </div>
  );
}