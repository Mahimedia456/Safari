import {
  Search,
} from "lucide-react";

import type {
  MerchantStatus,
  MerchantType,
} from "../../types/merchant";

export interface MerchantFilterState {
  search: string;

  status:
    | "all"
    | MerchantStatus;

  type:
    | "all"
    | MerchantType;

  country: string;
}

interface Props {
  filters:
    MerchantFilterState;

  onChange: (
    filters:
      MerchantFilterState,
  ) => void;
}

export default function MerchantFilters({
  filters,
  onChange,
}: Props) {
  return (
    <div
      className="
        safari-card

        mt-6

        grid
        grid-cols-1
        gap-3

        p-4

        md:grid-cols-2
        xl:grid-cols-[1.6fr_1fr_1fr_1fr]
      "
    >
      <div className="relative">
        <Search
          size={17}
          className="
            absolute
            left-4
            top-1/2

            -translate-y-1/2

            text-slate-400
          "
        />

        <input
          value={
            filters.search
          }
          onChange={(
            event,
          ) =>
            onChange({
              ...filters,

              search:
                event.target
                  .value,
            })
          }
          className="safari-input pl-11"
          placeholder="Search merchant, owner, email..."
        />
      </div>

      <select
        className="safari-input"
        value={
          filters.status
        }
        onChange={(
          event,
        ) =>
          onChange({
            ...filters,

            status:
              event.target
                .value as MerchantFilterState["status"],
          })
        }
      >
        <option value="all">
          All statuses
        </option>

        <option value="pending">
          Pending
        </option>

        <option value="approved">
          Approved
        </option>

        <option value="rejected">
          Rejected
        </option>

        <option value="suspended">
          Suspended
        </option>
      </select>

      <select
        className="safari-input"
        value={
          filters.type
        }
        onChange={(
          event,
        ) =>
          onChange({
            ...filters,

            type:
              event.target
                .value as MerchantFilterState["type"],
          })
        }
      >
        <option value="all">
          All business types
        </option>

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

      <select
        className="safari-input"
        value={
          filters.country
        }
        onChange={(
          event,
        ) =>
          onChange({
            ...filters,

            country:
              event.target
                .value,
          })
        }
      >
        <option value="all">
          All countries
        </option>

        <option value="Pakistan">
          Pakistan
        </option>

        <option value="Germany">
          Germany
        </option>
      </select>
    </div>
  );
}