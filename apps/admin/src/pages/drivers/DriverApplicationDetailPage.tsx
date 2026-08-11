import {
  ArrowLeft,
  Check,
  Mail,
  MapPin,
  Phone,
  X,
} from "lucide-react";

import {
  useState,
} from "react";

import {
  Link,
  Navigate,
  useParams,
} from "react-router-dom";

import {
  getDriverPermissions,
} from "../../config/driverPermissions";

import {
  useAuthStore,
} from "../../store/authStore";

import {
  useDriverStore,
} from "../../store/driverStore";

export default function DriverApplicationDetailPage() {
  const {
    applicationId,
  } = useParams();

  const user =
    useAuthStore(
      (state) =>
        state.user,
    );

  const application =
    useDriverStore(
      (state) =>
        state.applications.find(
          (item) =>
            item.id ===
            applicationId,
        ),
    );

  const setStatus =
    useDriverStore(
      (state) =>
        state.setApplicationStatus,
    );

  const [
    notes,
    setNotes,
  ] = useState(
    application?.reviewNotes ??
      "",
  );

  if (!application) {
    return (
      <Navigate
        to="/drivers/applications"
        replace
      />
    );
  }

  if (!user) {
    return null;
  }

  const permissions =
    getDriverPermissions(
      user.role,
    );

  return (
    <div>
      <Link
        to="/drivers/applications"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-safari-600"
      >
        <ArrowLeft
          size={16}
        />

        Applications
      </Link>

      <div className="mt-5">
        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold capitalize text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
          {application.status.replaceAll(
            "_",
            " ",
          )}
        </span>

        <h1 className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">
          {
            application.applicantName
          }
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          {application.id}
        </p>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <section className="safari-card p-6">
          <h2 className="text-base font-semibold text-slate-950 dark:text-white">
            Application
          </h2>

          <div className="mt-5 space-y-4">
            <Info
              icon={Mail}
              label="Email"
              value={
                application.email
              }
            />

            <Info
              icon={Phone}
              label="Phone"
              value={
                application.phone
              }
            />

            <Info
              icon={MapPin}
              label="Region"
              value={`${application.city}, ${application.region}`}
            />

            <Info
              icon={MapPin}
              label="Vehicle"
              value={
                application.vehicleType
              }
            />
          </div>
        </section>

        <section className="safari-card p-6">
          <h2 className="text-base font-semibold text-slate-950 dark:text-white">
            Review
          </h2>

          <textarea
            rows={6}
            value={notes}
            onChange={(
              event,
            ) =>
              setNotes(
                event.target.value,
              )
            }
            placeholder="Review notes..."
            className="mt-5 w-full resize-none rounded-xl border border-slate-200 bg-white p-4 text-sm outline-none focus:border-safari-500 dark:border-white/10 dark:bg-[#151719] dark:text-white"
          />

          {permissions.reviewApplications &&
            ![
              "approved",
              "rejected",
            ].includes(
              application.status,
            ) && (
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setStatus(
                      application.id,
                      "approved",
                      notes,
                    )
                  }
                  className="inline-flex h-10 items-center gap-2 rounded-xl bg-safari-600 px-4 text-sm font-semibold text-white"
                >
                  <Check
                    size={16}
                  />

                  Approve
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setStatus(
                      application.id,
                      "rejected",
                      notes,
                    )
                  }
                  className="inline-flex h-10 items-center gap-2 rounded-xl border border-red-200 px-4 text-sm font-semibold text-red-600 dark:border-red-500/20 dark:text-red-400"
                >
                  <X
                    size={16}
                  />

                  Reject
                </button>
              </div>
            )}
        </section>
      </div>
    </div>
  );
}

function Info({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Mail;

  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-100 p-4 dark:border-white/[0.06]">
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Icon size={14} />

        {label}
      </div>

      <div className="mt-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
        {value}
      </div>
    </div>
  );
}