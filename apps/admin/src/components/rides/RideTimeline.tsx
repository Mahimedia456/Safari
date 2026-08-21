import {
  Clock3,
} from "lucide-react";

import type {
  Ride,
} from "../../types/ride";

type Props = {
  ride: Ride;
};

function formatDateTime(
  value?: string | null,
) {
  if (!value) {
    return "—";
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime(),
    )
  ) {
    return "—";
  }

  return new Intl.DateTimeFormat(
    "en-PK",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
  ).format(date);
}

function formatStatus(
  status?: string | null,
) {
  if (!status) {
    return "Ride activity";
  }

  return status
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase(),
    );
}

export default function RideTimeline({
  ride,
}: Props) {
  const timeline =
    ride.timeline ?? [];

  return (
    <section className="safari-card p-5">
      <div className="mb-5">
        <h2 className="text-base font-extrabold text-[var(--safari-text-strong)]">
          Ride Timeline
        </h2>

        <p className="mt-1 text-xs text-[var(--safari-muted)]">
          Status history and ride
          activity
        </p>
      </div>

      {timeline.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[var(--safari-border)] px-5 py-10 text-center">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-safari-500/10 text-safari-600 dark:text-safari-400">
            <Clock3 size={19} />
          </div>

          <p className="mt-3 text-sm font-semibold text-[var(--safari-text-strong)]">
            No timeline activity
          </p>

          <p className="mt-1 text-xs text-[var(--safari-muted)]">
            Ride events will appear
            here as the trip
            progresses.
          </p>
        </div>
      ) : (
        <div className="space-y-0">
          {timeline.map(
            (
              entry,
              index,
            ) => {
              const title =
                entry.title?.trim() ||
                formatStatus(
                  entry.status,
                );

              return (
                <div
                  key={
                    entry.id ??
                    entry.createdAt ??
                    `${entry.status ?? "event"}-${index}`
                  }
                  className="relative flex gap-4 pb-6 last:pb-0"
                >
                  {index !==
                  timeline.length -
                    1 ? (
                    <div className="absolute left-[15px] top-8 h-[calc(100%-20px)] w-px bg-[var(--safari-border)]" />
                  ) : null}

                  <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-safari-500/10 text-safari-600 dark:text-safari-400">
                    <Clock3
                      size={14}
                    />
                  </div>

                  <div className="min-w-0 flex-1 pt-0.5">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-[var(--safari-text-strong)]">
                          {title}
                        </p>

                        {entry.description ? (
                          <p className="mt-1 text-xs leading-5 text-[var(--safari-muted)]">
                            {
                              entry.description
                            }
                          </p>
                        ) : null}
                      </div>

                      <span className="shrink-0 text-[11px] font-medium text-[var(--safari-muted)]">
                        {formatDateTime(
                          entry.createdAt,
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              );
            },
          )}
        </div>
      )}
    </section>
  );
}