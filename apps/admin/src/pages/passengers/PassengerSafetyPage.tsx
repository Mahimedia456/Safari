import PassengerFlagTable from "../../components/passengers/PassengerFlagTable";

import {
  getPassengerPermissions,
} from "../../config/passengerPermissions";

import {
  useAuthStore,
} from "../../store/authStore";

import {
  usePassengerStore,
} from "../../store/passengerStore";

export default function PassengerSafetyPage() {
  const user =
    useAuthStore(
      (state) =>
        state.user,
    );

  const flags =
    (usePassengerStore(
      (state) =>
        state.flags,
    ) ?? []);

  if (!user) {
    return null;
  }

  const permissions =
    getPassengerPermissions(
      user.role,
    );

  return (
    <div>
      <div className="mb-7">
        <div className="text-sm font-semibold text-safari-600">
          Trust & Safety
        </div>

        <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
          Passenger Safety Flags
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Review suspicious activity,
          policy violations and customer
          safety cases.
        </p>
      </div>

      <PassengerFlagTable
        flags={flags}
        canManage={
          permissions.manageSafety
        }
      />
    </div>
  );
}