import {
  ArrowLeft,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import StoreForm from "../../components/stores/StoreForm";

import { useStoreStore } from "../../store/storeStore";

export default function StoreCreatePage() {
  const navigate =
    useNavigate();

  const createStore =
    useStoreStore(
      (state) =>
        state.createStore,
    );

  return (
    <div>
      <Link
        to="/stores"
        className="
          inline-flex
          items-center
          gap-2

          text-sm
          font-medium

          text-slate-500

          hover:text-safari-600
        "
      >
        <ArrowLeft size={16} />

        Stores
      </Link>

      <div className="my-6">
        <div
          className="
            text-sm
            font-semibold

            text-safari-600

            dark:text-safari-400
          "
        >
          Store Management
        </div>

        <h1
          className="
            mt-1

            text-3xl
            font-bold

            text-slate-950

            dark:text-white
          "
        >
          Add Store
        </h1>

        <p
          className="
            mt-2

            text-sm

            text-slate-500
          "
        >
          Create a merchant store and
          assign its individual Safari
          commission.
        </p>
      </div>

      <StoreForm
        submitLabel="Create Store"
        onSubmit={(
          value,
        ) => {
          const store =
            createStore(
              value,
            );

          navigate(
            `/stores/${store.id}`,
          );
        }}
      />
    </div>
  );
}