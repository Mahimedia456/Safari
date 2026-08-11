import PharmacyPrescriptionTable from "../../components/pharmacy/PharmacyPrescriptionTable";

import { usePharmacyStore } from "../../store/pharmacyStore";

export default function PharmacyPrescriptionsPage() {
  const prescriptions =
    usePharmacyStore(
      (state) =>
        state.prescriptions,
    );

  return (
    <div>
      <div className="mb-7">
        <div className="text-sm font-semibold text-safari-600 dark:text-safari-400">
          Safari Pharmacy
        </div>

        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
          Prescriptions
        </h1>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Review uploaded prescriptions
          before dispensing medicines
          requiring authorization.
        </p>
      </div>

      <PharmacyPrescriptionTable
        prescriptions={
          prescriptions
        }
      />
    </div>
  );
}