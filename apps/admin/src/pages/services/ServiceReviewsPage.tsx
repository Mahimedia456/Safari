import {
  Star,
} from "lucide-react";

import { useServicesStore } from "../../store/servicesStore";

export default function ServiceReviewsPage() {
  const reviews =
    useServicesStore(
      (state) =>
        state.reviews,
    );

  return (
    <div>
      <div className="mb-7">
        <div className="text-sm font-semibold text-safari-600 dark:text-safari-400">
          Safari Services
        </div>

        <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
          Reviews
        </h1>
      </div>

      <div className="space-y-4">
        {(reviews ?? []).map(
          (review) => (
            <article
              key={
                review.id
              }
              className="safari-card p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">
                    {
                      review.customerName
                    }
                  </div>

                  {review.staffName && (
                    <div className="mt-1 text-xs text-slate-400">
                      Service by{" "}
                      {
                        review.staffName
                      }
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1 text-amber-500">
                  <Star
                    size={15}
                    className="fill-current"
                  />

                  <span className="text-sm font-bold">
                    {
                      review.rating
                    }
                  </span>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {review.comment}
              </p>

              <div className="mt-3 text-xs text-slate-400">
                {new Date(
                  review.createdAt,
                ).toLocaleString()}
              </div>
            </article>
          ),
        )}
      </div>
    </div>
  );
}