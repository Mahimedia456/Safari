import PassengerSupportTable from "../../components/passengers/PassengerSupportTable";

import {
  getPassengerPermissions,
} from "../../config/passengerPermissions";

import {
  useAuthStore,
} from "../../store/authStore";

import {
  usePassengerStore,
} from "../../store/passengerStore";

export default function PassengerSupportPage() {
  const user =
    useAuthStore(
      (state) =>
        state.user,
    );

  const cases =
    usePassengerStore(
      (state) =>
        state.supportCases,
    );

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
          Customer Support
        </div>

        <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
          Passenger Support Cases
        </h1>
      </div>

      <PassengerSupportTable
        cases={cases}
        canManage={
          permissions.manageSupport
        }
      />
    </div>
  );
}