import {
  Star,
} from "lucide-react";

import { useFoodStore } from "../../store/foodStore";

export default function FoodReviewsPage() {
  const reviews =
    useFoodStore(
      (state) =>
        state.reviews,
    );

  return (
    <div>
      <div className="mb-7">
        <div className="text-sm font-semibold text-safari-600 dark:text-safari-400">
          Safari Food
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

                  <div className="mt-2 flex gap-1">
                    {Array.from({
                      length: 5,
                    }).map(
                      (
                        _,
                        index,
                      ) => (
                        <Star
                          key={
                            index
                          }
                          size={15}
                          className={
                            index <
                            review.rating
                              ? "fill-current text-amber-500"
                              : "text-slate-300 dark:text-slate-700"
                          }
                        />
                      ),
                    )}
                  </div>
                </div>

                <div className="text-xs text-slate-400">
                  {new Date(
                    review.createdAt,
                  ).toLocaleDateString()}
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {
                  review.comment
                }
              </p>
            </article>
          ),
        )}
      </div>
    </div>
  );
}