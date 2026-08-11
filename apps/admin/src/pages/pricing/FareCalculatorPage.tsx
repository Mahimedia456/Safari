import FareCalculator from "../../components/pricing/FareCalculator";

export default function FareCalculatorPage() {
  return (
    <div>
      <div className="mb-7">
        <div className="text-sm font-semibold text-safari-600">
          Fare Engine
        </div>

        <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
          Fare Calculator
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Test current fare rules
          before connecting the mobile
          application API.
        </p>
      </div>

      <FareCalculator />
    </div>
  );
}