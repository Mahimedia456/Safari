import type {
  Ride,
} from "../../types/ride";

type Props = {
  ride: Ride;
};

function formatTimelineDate(
  value?: string,
) {
  if (!value) {
    return "Time unavailable";
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime(),
    )
  ) {
    return "Time unavailable";
  }

  return date.toLocaleString();
}

export default function RideTimeline({
  ride,
}: Props) {
  const timeline =
    ride.timeline ?? [];

  return (
    <section className="safari-card p-6">
      <h2 className="text-base font-semibold text-slate-950 dark:text-white">
        Ride Timeline
      </h2>

      <div className="mt-6">
        {timeline.length ===
        0 ? (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-5 text-sm text-slate-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-400">
            No ride timeline
            events are available
            yet.
          </div>
        ) : (
          timeline.map(
            (
              entry,
              index,
            ) => {
              const isLast =
                index ===
                timeline.length -
                  1;

              const title =
                entry.title ??
                entry.status
                  ?.replaceAll(
                    "_",
                    " ",
                  ) ??
                "Ride update";

              return (
                <div
                  key={
                    entry.id ??
                    `${entry.status ?? "ride-event"}-${index}`
                  }
                  className="relative flex gap-4"
                >
                  <div className="relative flex w-4 shrink-0 justify-center">
                    <div className="mt-1.5 h-2.5 w-2.5 rounded-full bg-safari-500" />

                    {!isLast ? (
                      <div className="absolute bottom-0 top-4 w-px bg-slate-200 dark:bg-white/10" />
                    ) : null}
                  </div>

                  <div className="min-w-0 flex-1 pb-6">
                    <div className="text-sm font-semibold capitalize text-slate-900 dark:text-white">
                      {title}
                    </div>

                    {entry.description ? (
                      <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                        {
                          entry.description
                        }
                      </p>
                    ) : null}

                    <div className="mt-2 text-xs text-slate-400">
                      {formatTimelineDate(
                        entry.createdAt,
                      )}
                    </div>
                  </div>
                </div>
              );
            },
          )
        )}
      </div>
    </section>
  );
}