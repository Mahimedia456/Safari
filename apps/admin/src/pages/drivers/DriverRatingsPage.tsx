import {
  Star,
} from "lucide-react";

import {
  useDriverStore,
} from "../../store/driverStore";

export default function DriverRatingsPage() {
  const ratings =
    useDriverStore(
      (state) =>
        state.ratings,
    );

  const drivers =
    useDriverStore(
      (state) =>
        state.drivers,
    );

  return (
    <div>
      <div className="mb-7">
        <div className="text-sm font-semibold text-safari-600">
          Driver Quality
        </div>

        <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
          Driver Ratings
        </h1>
      </div>

      <div className="space-y-4">
        {(ratings ?? []).map(
          (rating) => {
            const driver =
              drivers.find(
                (item) =>
                  item.id ===
                  rating.driverId,
              );

            return (
              <article
                key={
                  rating.id
                }
                className="safari-card p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">
                      {driver?.fullName ??
                        rating.driverId}
                    </div>

                    <div className="mt-1 text-xs text-slate-400">
                      {
                        rating.passengerName
                      }{" "}
                      ·{" "}
                      {
                        rating.rideId
                      }
                    </div>
                  </div>

                  <div className="flex items-center gap-1 font-bold text-amber-500">
                    <Star
                      size={15}
                      className="fill-current"
                    />

                    {
                      rating.rating
                    }
                  </div>
                </div>

                {rating.comment && (
                  <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
                    {
                      rating.comment
                    }
                  </p>
                )}

                <div className="mt-3 text-xs text-slate-400">
                  {new Date(
                    rating.createdAt,
                  ).toLocaleString()}
                </div>
              </article>
            );
          },
        )}
      </div>
    </div>
  );
}