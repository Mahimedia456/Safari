import {
  ChevronRight,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import type {
  SafariMarket,
} from "../../types/region";

import RegionStatusBadge from "./RegionStatusBadge";

export default function RegionTable({
  regions,
}: {
  regions: SafariMarket[];
}) {
  return (
    <div className="safari-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-slate-100 bg-slate-50/70 dark:border-white/[0.06] dark:bg-white/[0.02]">
            <tr>
              {[
                "Market",
                "Code",
                "Currency",
                "Cities",
                "Services",
                "Ride Types",
                "Status",
                "",
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
            {regions.map(
              (region) => (
                <tr
                  key={region.id}
                  className="border-b border-slate-100 last:border-0 dark:border-white/[0.05]"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">
                        {
                          region.flagEmoji
                        }
                      </div>

                      <div>
                        <div className="font-semibold text-slate-900 dark:text-white">
                          {region.name}
                        </div>

                        <div className="mt-1 text-xs text-slate-400">
                          {region.id}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 font-semibold text-slate-600 dark:text-slate-300">
                    {region.code}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {region.currency}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {
                      region.activeCities.length
                    }
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {
                      (region.services ?? []).filter(
                        (item) =>
                          item.enabled,
                      ).length
                    }
                    /
                    {
                      region.services.length
                    }
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {
                      (region.rides ?? []).filter(
                        (item) =>
                          item.enabled,
                      ).length
                    }
                    /
                    {region.rides.length}
                  </td>

                  <td className="px-5 py-4">
                    <RegionStatusBadge
                      status={
                        region.status
                      }
                    />
                  </td>

                  <td className="px-5 py-4">
                    <Link
                      to={`/regions/${region.code.toLowerCase()}`}
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-safari-50 hover:text-safari-600 dark:hover:bg-safari-500/10"
                    >
                      <ChevronRight
                        size={17}
                      />
                    </Link>
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