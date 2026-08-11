import {
  useMemo,
  useState,
} from "react";

import {
  Calculator,
} from "lucide-react";

import {
  usePricingStore,
} from "../../store/pricingStore";

import type {
  PricingRegion,
  PricingRideType,
} from "../../types/pricing";

export default function FareCalculator() {
  const calculateFare =
    usePricingStore(
      (state) =>
        state.calculateFare,
    );

  const [
    region,
    setRegion,
  ] =
    useState<PricingRegion>(
      "Pakistan",
    );

  const [
    rideType,
    setRideType,
  ] =
    useState<PricingRideType>(
      "economy",
    );

  const [
    distanceKm,
    setDistanceKm,
  ] = useState(10);

  const [
    durationMinutes,
    setDurationMinutes,
  ] = useState(25);

  const [
    waitingMinutes,
    setWaitingMinutes,
  ] = useState(0);

  const [
    surgeMultiplier,
    setSurgeMultiplier,
  ] = useState(1);

  const result =
    useMemo(
      () =>
        calculateFare({
          region,
          rideType,
          distanceKm,
          durationMinutes,
          waitingMinutes,
          surgeMultiplier,
        }),
      [
        calculateFare,
        region,
        rideType,
        distanceKm,
        durationMinutes,
        waitingMinutes,
        surgeMultiplier,
      ],
    );

  const symbol =
    result?.currency ===
    "EUR"
      ? "€"
      : "Rs ";

  return (
    <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
      <section className="safari-card p-6">
        <div className="flex items-center gap-3">
          <Calculator className="text-safari-600" />

          <h2 className="text-xl font-bold text-slate-950 dark:text-white">
            Fare Input
          </h2>
        </div>

        <div className="mt-6 space-y-4">
          <label>
            <span className="text-xs font-semibold text-slate-500">
              Region
            </span>

            <select
              value={region}
              onChange={(
                event,
              ) =>
                setRegion(
                  event.target
                    .value as PricingRegion,
                )
              }
              className="safari-input mt-2"
            >
              <option value="Pakistan">
                Pakistan
              </option>

              <option value="Germany">
                Germany
              </option>
            </select>
          </label>

          <label>
            <span className="text-xs font-semibold text-slate-500">
              Ride type
            </span>

            <select
              value={
                rideType
              }
              onChange={(
                event,
              ) =>
                setRideType(
                  event.target
                    .value as PricingRideType,
                )
              }
              className="safari-input mt-2"
            >
              <option value="bike">
                Bike
              </option>

              <option value="economy">
                Economy
              </option>

              <option value="comfort">
                Comfort
              </option>

              <option value="premium">
                Premium
              </option>
            </select>
          </label>

          <Field
            label="Distance KM"
            value={distanceKm}
            onChange={
              setDistanceKm
            }
          />

          <Field
            label="Duration minutes"
            value={
              durationMinutes
            }
            onChange={
              setDurationMinutes
            }
          />

          <Field
            label="Waiting minutes"
            value={
              waitingMinutes
            }
            onChange={
              setWaitingMinutes
            }
          />

          <Field
            label="Surge multiplier"
            value={
              surgeMultiplier
            }
            step={0.1}
            onChange={
              setSurgeMultiplier
            }
          />
        </div>
      </section>

      <section className="safari-card p-6">
        <h2 className="text-xl font-bold text-slate-950 dark:text-white">
          Fare Breakdown
        </h2>

        {!result ? (
          <div className="mt-8 rounded-xl bg-amber-50 p-4 text-sm text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
            Selected ride type is not
            enabled for this region.
          </div>
        ) : (
          <>
            <div className="mt-6 space-y-3">
              <Row
                label="Base Fare"
                value={`${symbol}${result.baseFare.toFixed(2)}`}
              />

              <Row
                label="Distance Fare"
                value={`${symbol}${result.distanceFare.toFixed(2)}`}
              />

              <Row
                label="Time Fare"
                value={`${symbol}${result.durationFare.toFixed(2)}`}
              />

              <Row
                label="Waiting Fare"
                value={`${symbol}${result.waitingFare.toFixed(2)}`}
              />

              <Row
                label="Booking Fee"
                value={`${symbol}${result.bookingFee.toFixed(2)}`}
              />

              <Row
                label="Subtotal"
                value={`${symbol}${result.subtotal.toFixed(2)}`}
              />

              <Row
                label="Surge"
                value={`${symbol}${result.surgeAmount.toFixed(2)}`}
              />
            </div>

            <div className="mt-6 rounded-2xl bg-safari-50 p-5 dark:bg-safari-500/10">
              <div className="text-xs font-semibold uppercase tracking-wider text-safari-600 dark:text-safari-400">
                Final Fare
              </div>

              <div className="mt-2 text-4xl font-bold text-slate-950 dark:text-white">
                {symbol}
                {result.finalFare.toFixed(
                  2,
                )}
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

function Field({
  label,
  value,
  step = 1,
  onChange,
}: {
  label: string;
  value: number;
  step?: number;

  onChange: (
    value: number,
  ) => void;
}) {
  return (
    <label>
      <span className="text-xs font-semibold text-slate-500">
        {label}
      </span>

      <input
        type="number"
        min="0"
        step={step}
        value={value}
        onChange={(
          event,
        ) =>
          onChange(
            Number(
              event.target
                .value,
            ),
          )
        }
        className="safari-input mt-2"
      />
    </label>
  );
}

function Row({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex justify-between border-b border-slate-100 pb-3 text-sm dark:border-white/[0.06]">
      <span className="text-slate-500">
        {label}
      </span>

      <span className="font-semibold text-slate-900 dark:text-white">
        {value}
      </span>
    </div>
  );
}