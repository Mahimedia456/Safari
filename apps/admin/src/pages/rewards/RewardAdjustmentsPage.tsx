import {
  useState,
} from "react";

import {
  getRewardsPermissions,
} from "../../config/rewardsPermissions";

import {
  useAuthStore,
} from "../../store/authStore";

import {
  useRewardsStore,
} from "../../store/rewardsStore";

export default function RewardAdjustmentsPage() {
  const user = useAuthStore((state) => state.user);

  const passengers = useRewardsStore(
    (state) => state.passengerRewards,
  );

  const adjustPoints = useRewardsStore(
    (state) => state.adjustPoints,
  );

  const [passengerId, setPassengerId] = useState(
    passengers[0]?.passengerId ?? "",
  );

  const [points, setPoints] = useState(0);

  const [description, setDescription] = useState("");

  if (!user) {
    return null;
  }

  const permissions = getRewardsPermissions(user.role);

  return (
    <div>
      <div className="mb-7">
        <div className="text-sm font-semibold text-safari-600">
          Safari Rewards
        </div>

        <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
          Manual Points Adjustment
        </h1>
      </div>

      <section className="safari-card max-w-2xl p-6">
        <div className="space-y-5">
          <label className="block">
            <span className="text-xs font-semibold text-slate-500">
              Passenger
            </span>

            <select
              value={passengerId}
              disabled={!permissions.adjustPoints}
              onChange={(event) =>
                setPassengerId(event.target.value)
              }
              className="safari-input mt-2"
            >
              {(passengers ?? []).map((passenger) => (
                <option
                  key={passenger.passengerId}
                  value={passenger.passengerId}
                >
                  {passenger.passengerName} · {passenger.passengerId}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-xs font-semibold text-slate-500">
              Points
            </span>

            <input
              type="number"
              value={points}
              disabled={!permissions.adjustPoints}
              onChange={(event) =>
                setPoints(Number(event.target.value))
              }
              className="safari-input mt-2"
              placeholder="Positive to credit, negative to debit"
            />
          </label>

          <label className="block">
            <span className="text-xs font-semibold text-slate-500">
              Reason
            </span>

            <textarea
              rows={4}
              value={description}
              disabled={!permissions.adjustPoints}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white p-4 text-sm outline-none focus:border-safari-500 dark:border-white/10 dark:bg-[#151719] dark:text-white"
            />
          </label>

          <button
            type="button"
            disabled={
              !permissions.adjustPoints ||
              !passengerId ||
              points === 0 ||
              !description.trim()
            }
            onClick={() => {
              adjustPoints(
                passengerId,
                points,
                description.trim(),
              );

              setPoints(0);
              setDescription("");
            }}
            className="h-11 rounded-xl bg-safari-600 px-5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Apply Adjustment
          </button>
        </div>
      </section>
    </div>
  );
}