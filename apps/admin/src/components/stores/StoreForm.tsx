import {
  useState,
} from "react";

import type {
  FormEvent,
} from "react";

import {
  defaultOpeningHours,
} from "../../data/stores";

import type {
  StoreFormInput,
  StoreOpeningHours,
  StoreType,
} from "../../types/store";

interface Props {
  initialValue?: StoreFormInput;

  submitLabel: string;

  onSubmit: (
    value:
      StoreFormInput,
  ) => void;
}

const merchants = [
  {
    id: "MER-1001",
    name:
      "Burger District",
    type: "food",
  },

  {
    id: "MER-1002",
    name: "Fresh Basket",
    type: "grocery",
  },

  {
    id: "MER-1003",
    name:
      "HealthFirst Pharmacy",
    type: "pharmacy",
  },

  {
    id: "MER-1004",
    name:
      "Sparkle Home Services",
    type: "services",
  },

  {
    id: "MER-1007",
    name:
      "Berlin Bites",
    type: "food",
  },
] as const;

export default function StoreForm({
  initialValue,
  submitLabel,
  onSubmit,
}: Props) {
  const [
    merchantId,
    setMerchantId,
  ] = useState(
    initialValue
      ?.merchantId ||
      merchants[0].id,
  );

  const [
    merchantName,
    setMerchantName,
  ] = useState(
    initialValue
      ?.merchantName ||
      merchants[0].name,
  );

  const [name, setName] =
    useState(
      initialValue?.name ||
        "",
    );

  const [type, setType] =
    useState<StoreType>(
      initialValue?.type ||
        "food",
    );

  const [email, setEmail] =
    useState(
      initialValue?.email ||
        "",
    );

  const [phone, setPhone] =
    useState(
      initialValue?.phone ||
        "",
    );

  const [
    country,
    setCountry,
  ] = useState(
    initialValue?.country ||
      "Pakistan",
  );

  const [city, setCity] =
    useState(
      initialValue?.city ||
        "",
    );

  const [
    address,
    setAddress,
  ] = useState(
    initialValue?.address ||
      "",
  );

  const [
    latitude,
    setLatitude,
  ] = useState(
    initialValue?.latitude ??
      31.5204,
  );

  const [
    longitude,
    setLongitude,
  ] = useState(
    initialValue?.longitude ??
      74.3587,
  );

  const [
    commission,
    setCommission,
  ] = useState(
    initialValue
      ?.commissionPercentage ??
      10,
  );

  const [
    minimumOrder,
    setMinimumOrder,
  ] = useState(
    initialValue
      ?.minimumOrder ??
      0,
  );

  const [
    deliveryRadius,
    setDeliveryRadius,
  ] = useState(
    initialValue
      ?.deliveryRadiusKm ??
      5,
  );

  const [
    openingHours,
  ] = useState<
    StoreOpeningHours[]
  >(
    initialValue
      ?.openingHours ||
      defaultOpeningHours,
  );

  const [error, setError] =
    useState("");

  const handleMerchant =
    (
      nextMerchantId:
        string,
    ) => {
      const merchant =
        merchants.find(
          (item) =>
            item.id ===
            nextMerchantId,
        );

      if (!merchant) {
        return;
      }

      setMerchantId(
        merchant.id,
      );

      setMerchantName(
        merchant.name,
      );

      setType(
        merchant.type,
      );
    };

  const handleSubmit = (
    event:
      FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setError("");

    if (!name.trim()) {
      setError(
        "Store name is required.",
      );

      return;
    }

    if (!city.trim()) {
      setError(
        "City is required.",
      );

      return;
    }

    if (
      commission < 0 ||
      commission > 100
    ) {
      setError(
        "Commission must be between 0 and 100.",
      );

      return;
    }

    onSubmit({
      merchantId,

      merchantName,

      name:
        name.trim(),

      type,

      email:
        email.trim(),

      phone:
        phone.trim(),

      country,

      city:
        city.trim(),

      address:
        address.trim(),

      latitude,

      longitude,

      commissionPercentage:
        commission,

      minimumOrder,

      deliveryRadiusKm:
        deliveryRadius,

      openingHours,
    });
  };

  return (
    <form
      onSubmit={
        handleSubmit
      }
      className="space-y-6"
    >
      <section className="safari-card p-6">
        <h2
          className="
            text-base
            font-semibold

            text-slate-950

            dark:text-white
          "
        >
          Store information
        </h2>

        <div
          className="
            mt-5

            grid
            grid-cols-1
            gap-5

            md:grid-cols-2
          "
        >
          <Field
            label="Merchant"
          >
            <select
              className="safari-input"
              value={
                merchantId
              }
              onChange={(
                event,
              ) =>
                handleMerchant(
                  event.target
                    .value,
                )
              }
            >
              {(merchants ?? []).map(
                (merchant) => (
                  <option
                    key={
                      merchant.id
                    }
                    value={
                      merchant.id
                    }
                  >
                    {
                      merchant.name
                    }
                  </option>
                ),
              )}
            </select>
          </Field>

          <Field
            label="Store type"
          >
            <select
              value={type}
              onChange={(
                event,
              ) =>
                setType(
                  event.target
                    .value as StoreType,
                )
              }
              className="safari-input"
            >
              <option value="food">
                Food
              </option>

              <option value="grocery">
                Grocery
              </option>

              <option value="pharmacy">
                Pharmacy
              </option>

              <option value="services">
                Services
              </option>
            </select>
          </Field>

          <Field
            label="Store name"
          >
            <input
              className="safari-input"
              value={name}
              onChange={(
                event,
              ) =>
                setName(
                  event.target
                    .value,
                )
              }
              placeholder="Store name"
            />
          </Field>

          <Field
            label="Email"
          >
            <input
              type="email"
              className="safari-input"
              value={email}
              onChange={(
                event,
              ) =>
                setEmail(
                  event.target
                    .value,
                )
              }
            />
          </Field>

          <Field
            label="Phone"
          >
            <input
              className="safari-input"
              value={phone}
              onChange={(
                event,
              ) =>
                setPhone(
                  event.target
                    .value,
                )
              }
            />
          </Field>

          <Field
            label="Country"
          >
            <select
              className="safari-input"
              value={country}
              onChange={(
                event,
              ) =>
                setCountry(
                  event.target
                    .value,
                )
              }
            >
              <option value="Pakistan">
                Pakistan
              </option>
            </select>
          </Field>

          <Field
            label="City"
          >
            <input
              className="safari-input"
              value={city}
              onChange={(
                event,
              ) =>
                setCity(
                  event.target
                    .value,
                )
              }
            />
          </Field>

          <Field
            label="Address"
          >
            <input
              className="safari-input"
              value={address}
              onChange={(
                event,
              ) =>
                setAddress(
                  event.target
                    .value,
                )
              }
            />
          </Field>
        </div>
      </section>

      <section className="safari-card p-6">
        <h2
          className="
            text-base
            font-semibold

            text-slate-950

            dark:text-white
          "
        >
          Commercial settings
        </h2>

        <div
          className="
            mt-5

            grid
            grid-cols-1
            gap-5

            md:grid-cols-3
          "
        >
          <Field
            label="Safari Commission %"
          >
            <input
              type="number"
              min="0"
              max="100"
              step="0.1"
              className="safari-input"
              value={
                commission
              }
              onChange={(
                event,
              ) =>
                setCommission(
                  Number(
                    event.target
                      .value,
                  ),
                )
              }
            />
          </Field>

          <Field
            label="Minimum Order"
          >
            <input
              type="number"
              min="0"
              className="safari-input"
              value={
                minimumOrder
              }
              onChange={(
                event,
              ) =>
                setMinimumOrder(
                  Number(
                    event.target
                      .value,
                  ),
                )
              }
            />
          </Field>

          <Field
            label="Service / Delivery Radius KM"
          >
            <input
              type="number"
              min="0"
              step="0.5"
              className="safari-input"
              value={
                deliveryRadius
              }
              onChange={(
                event,
              ) =>
                setDeliveryRadius(
                  Number(
                    event.target
                      .value,
                  ),
                )
              }
            />
          </Field>
        </div>
      </section>

      <section className="safari-card p-6">
        <h2
          className="
            text-base
            font-semibold

            text-slate-950

            dark:text-white
          "
        >
          Location
        </h2>

        <div
          className="
            mt-5

            grid
            grid-cols-1
            gap-5

            md:grid-cols-2
          "
        >
          <Field
            label="Latitude"
          >
            <input
              type="number"
              step="0.000001"
              className="safari-input"
              value={
                latitude
              }
              onChange={(
                event,
              ) =>
                setLatitude(
                  Number(
                    event.target
                      .value,
                  ),
                )
              }
            />
          </Field>

          <Field
            label="Longitude"
          >
            <input
              type="number"
              step="0.000001"
              className="safari-input"
              value={
                longitude
              }
              onChange={(
                event,
              ) =>
                setLongitude(
                  Number(
                    event.target
                      .value,
                  ),
                )
              }
            />
          </Field>
        </div>
      </section>

      {error && (
        <div
          className="
            rounded-xl

            border
            border-red-200

            bg-red-50

            p-4

            text-sm
            text-red-700

            dark:border-red-500/20
            dark:bg-red-500/10
            dark:text-red-300
          "
        >
          {error}
        </div>
      )}

      <div
        className="
          flex
          justify-end
        "
      >
        <button
          type="submit"
          className="
            inline-flex h-11
            items-center
            justify-center

            rounded-xl

            bg-safari-600

            px-6

            text-sm
            font-semibold

            text-white

            hover:bg-safari-700
          "
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;

  children:
    React.ReactNode;
}) {
  return (
    <label>
      <div
        className="
          mb-2

          text-sm
          font-medium

          text-slate-700

          dark:text-slate-200
        "
      >
        {label}
      </div>

      {children}
    </label>
  );
}