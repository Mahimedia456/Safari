import {
  useServicesStore,
} from "../../store/servicesStore";

import type {
  ServiceCatalogItem,
} from "../../types/services";

export default function ServiceCatalogTable({
  services,
  canManage,
}: {
  services:
    ServiceCatalogItem[];

  canManage: boolean;
}) {
  const toggleService =
    useServicesStore(
      (state) =>
        state.toggleService,
    );

  return (
    <div className="safari-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-slate-100 bg-slate-50/70 dark:border-white/[0.06] dark:bg-white/[0.02]">
            <tr>
              {[
                "Service",
                "Price",
                "Duration",
                "Home Service",
                "Status",
              ].map(
                (label) => (
                  <th
                    key={label}
                    className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400"
                  >
                    {label}
                  </th>
                ),
              )}
            </tr>
          </thead>

          <tbody>
            {services.map(
              (service) => (
                <tr
                  key={
                    service.id
                  }
                  className="border-b border-slate-100 last:border-0 dark:border-white/[0.05]"
                >
                  <td className="px-5 py-4">
                    <div className="font-semibold text-slate-900 dark:text-white">
                      {
                        service.name
                      }
                    </div>

                    <div className="mt-1 max-w-md text-xs text-slate-400">
                      {
                        service.description
                      }
                    </div>
                  </td>

                  <td className="px-5 py-4 font-semibold text-slate-800 dark:text-slate-200">
                    Rs{" "}
                    {service.price.toLocaleString()}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {
                      service.durationMinutes
                    }{" "}
                    min
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {service.homeService
                      ? "Yes"
                      : "No"}
                  </td>

                  <td className="px-5 py-4">
                    <button
                      type="button"
                      disabled={
                        !canManage
                      }
                      onClick={() =>
                        toggleService(
                          service.id,
                        )
                      }
                      className={[
                        "rounded-full px-3 py-1 text-xs font-semibold",

                        service.active
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                          : "bg-slate-100 text-slate-500 dark:bg-white/[0.06]",
                      ].join(
                        " ",
                      )}
                    >
                      {service.active
                        ? "Active"
                        : "Inactive"}
                    </button>
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}