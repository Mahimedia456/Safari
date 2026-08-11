import {
  MapPin,
} from "lucide-react";

import type {
  SafariStore,
} from "../../types/store";

export default function StoreLocationPanel({
  store,
}: {
  store: SafariStore;
}) {
  return (
    <section className="safari-card p-6">
      <h2
        className="
          text-base
          font-semibold

          text-slate-950

          dark:text-white
        "
      >
        Location
      </h2>

      <div
        className="
          mt-5

          rounded-2xl

          border
          border-slate-100

          bg-slate-50

          p-5

          dark:border-white/[0.06]
          dark:bg-white/[0.02]
        "
      >
        <MapPin
          size={22}
          className="
            text-safari-600

            dark:text-safari-400
          "
        />

        <div
          className="
            mt-4

            text-sm
            font-semibold

            text-slate-900

            dark:text-white
          "
        >
          {store.address}
        </div>

        <div
          className="
            mt-1

            text-sm

            text-slate-500
          "
        >
          {store.city},{" "}
          {store.country}
        </div>

        <div
          className="
            mt-4

            text-xs

            text-slate-400
          "
        >
          Lat: {store.latitude}
          <br />
          Lng: {store.longitude}
        </div>
      </div>
    </section>
  );
}