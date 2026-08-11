import type {
  Ride,
} from "../../types/ride";

type Props = {
  ride: Ride;
};

export default function RideTimeline({
  ride,
}: Props) {
  return (
    <section className="safari-card p-6">
      <h2 className="text-base font-semibold text-slate-950 dark:text-white">
        Ride Timeline
      </h2>

      <div className="mt-6">
        {ride.timeline.map(
          (
            entry,
            index,
          ) => {
            const isLast =
              index ===
              ride.timeline.length -
                1;

            return (
              <div
                key={entry.id}
                className="relative flex gap-4"
              >
                <div className="relative flex w-4 justify-center">
                  <div className="mt-1.5 h-2.5 w-2.5 rounded-full bg-safari-500" />

                  {!isLast && (
                    <div className="absolute bottom-0 top-4 w-px bg-slate-200 dark:bg-white/10" />
                  )}
                </div>

                <div className="pb-6">
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">
                    {
                      entry.title
                    }
                  </div>

                  {entry.description && (
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {
                        entry.description
                      }
                    </p>
                  )}

                  <div className="mt-2 text-xs text-slate-400">
                    {new Date(
                      entry.createdAt,
                    ).toLocaleString()}
                  </div>
                </div>
              </div>
            );
          },
        )}
      </div>
    </section>
  );
}