import type {
  SafariStore,
} from "../../types/store";

export default function StoreHoursPanel({
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
        Opening hours
      </h2>

      <div className="mt-5 space-y-2">
        {store.openingHours.map(
          (item) => (
            <div
              key={
                item.day
              }
              className="
                flex
                items-center
                justify-between

                rounded-xl

                border
                border-slate-100

                px-4 py-3

                dark:border-white/[0.06]
              "
            >
              <span
                className="
                  text-sm
                  font-medium

                  text-slate-700

                  dark:text-slate-200
                "
              >
                {item.day}
              </span>

              <span
                className="
                  text-sm

                  text-slate-500

                  dark:text-slate-400
                "
              >
                {item.enabled
                  ? `${item.open} – ${item.close}`
                  : "Closed"}
              </span>
            </div>
          ),
        )}
      </div>
    </section>
  );
}