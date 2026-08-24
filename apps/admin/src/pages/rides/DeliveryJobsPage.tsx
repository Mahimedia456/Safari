import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  adminDispatchService,
  type AdminDeliveryJob,
} from "../../services/dispatchService";

import { useAuthStore } from "../../store/authStore";

export default function DeliveryJobsPage() {
  const token = useAuthStore((state) => state.accessToken);

  const [jobs, setJobs] = useState<AdminDeliveryJob[]>([]);
  const [type, setType] = useState<"all" | "food" | "grocery" | "pharmacy">("all");

  useEffect(() => {
    if (!token) return;

    void adminDispatchService
      .deliveryJobs(token)
      .then((data) => setJobs(data.jobs ?? []));
  }, [token]);

  const visible = useMemo(
    () =>
      type === "all"
        ? jobs
        : jobs.filter((job) => job.job_type === type),
    [jobs, type],
  );

  return (
    <div>
      <div className="mb-7">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-500">
          Delivery operations
        </p>
        <h1 className="mt-2 text-3xl font-black text-white">
          Delivery jobs
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Food, Grocery and Pharmacy deliveries are fixed-fee jobs. Drivers accept or decline; no fare bidding.
        </p>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        {(["all", "food", "grocery", "pharmacy"] as const).map((item) => (
          <button
            type="button"
            key={item}
            onClick={() => setType(item)}
            className={`rounded-xl border px-4 py-2 text-sm font-bold capitalize ${
              item === type
                ? "border-emerald-500 bg-emerald-500/15 text-emerald-400"
                : "border-white/10 text-slate-300"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-white/[0.04] text-xs uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-5 py-4">Type</th>
                <th className="px-5 py-4">Pickup</th>
                <th className="px-5 py-4">Customer</th>
                <th className="px-5 py-4">Delivery fee</th>
                <th className="px-5 py-4">Driver</th>
                <th className="px-5 py-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {visible.map((job) => (
                <tr
                  key={job.id}
                  className="border-t border-white/10 text-sm text-slate-200"
                >
                  <td className="px-5 py-4 font-black capitalize">
                    {job.job_type}
                  </td>
                  <td className="px-5 py-4">
                    <div className="font-semibold">{job.pickup_name}</div>
                    <div className="mt-1 max-w-[260px] text-xs text-slate-500">
                      {job.pickup_address ?? "—"}
                    </div>
                  </td>
                  <td className="px-5 py-4 max-w-[280px]">
                    {job.dropoff_address}
                  </td>
                  <td className="px-5 py-4 font-black">
                    {job.currency_code}{" "}
                    {Number(job.delivery_fee).toLocaleString("en-PK")}
                  </td>
                  <td className="px-5 py-4">
                    {job.driver_id ? "Assigned" : "Waiting"}
                  </td>
                  <td className="px-5 py-4 capitalize">
                    {job.status.replaceAll("_", " ")}
                  </td>
                </tr>
              ))}

              {visible.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-14 text-center text-sm text-slate-500"
                  >
                    No delivery jobs in this filter.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
