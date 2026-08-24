import {
  useEffect,
  useState,
} from "react";

import { RefreshCcw } from "lucide-react";

import {
  adminDispatchService,
  type AdminRideDriverOffer,
} from "../../services/dispatchService";

import { useAuthStore } from "../../store/authStore";

export default function DriverOffersPage() {
  const token = useAuthStore((state) => state.accessToken);

  const [offers, setOffers] = useState<AdminRideDriverOffer[]>([]);
  const [loading, setLoading] = useState(false);

  async function load() {
    if (!token) return;

    setLoading(true);

    try {
      const data = await adminDispatchService.rideOffers(token);
      setOffers(data.offers ?? []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, [token]);

  return (
    <div>
      <div className="mb-7 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-500">
            Ride marketplace
          </p>
          <h1 className="mt-2 text-3xl font-black text-white">
            Driver fare offers
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Drivers bid only on Ride requests. Passenger acceptance decides the final fare.
          </p>
        </div>

        <button
          type="button"
          onClick={() => void load()}
          className="flex h-11 items-center gap-2 rounded-xl border border-white/10 px-4 text-sm font-bold text-white"
        >
          <RefreshCcw size={16} />
          {loading ? "Refreshing" : "Refresh"}
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-white/[0.04] text-xs uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-5 py-4">Ride</th>
                <th className="px-5 py-4">Driver</th>
                <th className="px-5 py-4">Vehicle type</th>
                <th className="px-5 py-4">Suggested</th>
                <th className="px-5 py-4">Driver offer</th>
                <th className="px-5 py-4">ETA</th>
                <th className="px-5 py-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {offers.map((offer) => (
                <tr
                  key={offer.id}
                  className="border-t border-white/10 text-sm text-slate-200"
                >
                  <td className="px-5 py-4">
                    <div className="font-bold">
                      {offer.rides?.ride_number ?? "Safari Ride"}
                    </div>
                    <div className="mt-1 max-w-[260px] text-xs text-slate-500">
                      {offer.rides?.pickup_address ?? "—"} →{" "}
                      {offer.rides?.dropoff_address ?? "—"}
                    </div>
                  </td>

                  <td className="px-5 py-4 font-semibold">
                    {offer.profiles?.full_name ?? "Safari Driver"}
                  </td>

                  <td className="px-5 py-4">
                    {offer.rides?.ride_categories?.name ?? "—"}
                  </td>

                  <td className="px-5 py-4">
                    PKR{" "}
                    {Number(
                      offer.rides?.suggested_fare ?? 0,
                    ).toLocaleString("en-PK")}
                  </td>

                  <td className="px-5 py-4 font-black text-emerald-400">
                    {offer.currency_code}{" "}
                    {Number(offer.offered_fare).toLocaleString("en-PK")}
                  </td>

                  <td className="px-5 py-4">
                    {offer.estimated_pickup_minutes ?? "—"} min
                  </td>

                  <td className="px-5 py-4 capitalize">
                    {offer.offer_status}
                  </td>
                </tr>
              ))}

              {offers.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-14 text-center text-sm text-slate-500"
                  >
                    No driver fare offers yet.
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
