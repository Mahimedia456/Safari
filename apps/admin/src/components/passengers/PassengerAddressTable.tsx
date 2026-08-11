import {
  Home,
  MapPin,
} from "lucide-react";

import {
  usePassengerStore,
} from "../../store/passengerStore";

import type {
  PassengerAddress,
} from "../../types/passenger";

export default function PassengerAddressTable({
  passengerId,
  addresses,
  canManage,
}: {
  passengerId: string;

  addresses:
    PassengerAddress[];

  canManage: boolean;
}) {
  const setDefault =
    usePassengerStore(
      (state) =>
        state.setDefaultAddress,
    );

  return (
    <div className="safari-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-slate-100 bg-slate-50/70 dark:border-white/[0.06] dark:bg-white/[0.02]">
            <tr>
              {[
                "Label",
                "Address",
                "City",
                "Coordinates",
                "Default",
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
            {addresses.map(
              (address) => (
                <tr
                  key={
                    address.id
                  }
                  className="border-b border-slate-100 last:border-0 dark:border-white/[0.05]"
                >
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
                      {address.label ===
                      "Home" ? (
                        <Home
                          size={15}
                          className="text-safari-600"
                        />
                      ) : (
                        <MapPin
                          size={15}
                          className="text-safari-600"
                        />
                      )}

                      {address.label}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {address.address}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {address.city}
                  </td>

                  <td className="px-5 py-4 text-xs text-slate-400">
                    {address.latitude},{" "}
                    {address.longitude}
                  </td>

                  <td className="px-5 py-4">
                    <button
                      type="button"
                      disabled={
                        !canManage
                      }
                      onClick={() =>
                        setDefault(
                          passengerId,
                          address.id,
                        )
                      }
                      className={[
                        "rounded-full px-3 py-1 text-xs font-semibold",

                        address.default
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                          : "bg-slate-100 text-slate-500 dark:bg-white/[0.06]",

                        !canManage
                          ? "cursor-default opacity-70"
                          : "",
                      ].join(" ")}
                    >
                      {address.default
                        ? "Default"
                        : "Set Default"}
                    </button>
                  </td>
                </tr>
              ),
            )}

            {addresses.length ===
              0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-5 py-14 text-center text-sm text-slate-400"
                >
                  No saved addresses.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}