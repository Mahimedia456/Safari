import {
  PackageCheck,
  PackageX,
} from "lucide-react";

import {
  useGroceryStore,
} from "../../store/groceryStore";

import type {
  GroceryProduct,
} from "../../types/grocery";

type Props = {
  products: GroceryProduct[];

  canManage: boolean;
};

export default function GroceryProductTable({
  products,
  canManage,
}: Props) {
  const toggleAvailability =
    useGroceryStore(
      (state) =>
        state.toggleProductAvailability,
    );

  return (
    <div className="safari-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead
            className="
              border-b
              border-slate-100
              bg-slate-50/70

              dark:border-white/[0.06]
              dark:bg-white/[0.02]
            "
          >
            <tr>
              {[
                "Product",
                "SKU",
                "Unit",
                "Price",
                "Stock",
                "Substitution",
                "Availability",
              ].map(
                (label) => (
                  <th
                    key={label}
                    className="
                      whitespace-nowrap
                      px-5 py-4
                      text-left
                      text-[11px]
                      font-bold
                      uppercase
                      tracking-wider
                      text-slate-400
                    "
                  >
                    {label}
                  </th>
                ),
              )}
            </tr>
          </thead>

          <tbody>
            {products.map(
              (product) => {
                const lowStock =
                  product.stock <=
                  product.lowStockThreshold;

                return (
                  <tr
                    key={
                      product.id
                    }
                    className="
                      border-b
                      border-slate-100

                      transition

                      last:border-0

                      hover:bg-slate-50/50

                      dark:border-white/[0.05]
                      dark:hover:bg-white/[0.02]
                    "
                  >
                    <td className="px-5 py-4">
                      <div
                        className="
                          font-semibold
                          text-slate-900

                          dark:text-white
                        "
                      >
                        {
                          product.name
                        }
                      </div>

                      <div
                        className="
                          mt-1
                          text-xs
                          text-slate-400
                        "
                      >
                        {product.id}
                      </div>
                    </td>

                    <td
                      className="
                        px-5 py-4
                        text-sm
                        text-slate-500
                      "
                    >
                      {product.sku}
                    </td>

                    <td
                      className="
                        whitespace-nowrap
                        px-5 py-4
                        text-sm
                        text-slate-500
                      "
                    >
                      {product.unit}
                    </td>

                    <td
                      className="
                        whitespace-nowrap
                        px-5 py-4
                        font-semibold
                        text-slate-800

                        dark:text-slate-200
                      "
                    >
                      Rs{" "}
                      {product.price.toLocaleString()}
                    </td>

                    <td className="px-5 py-4">
                      <div
                        className={[
                          "font-semibold",

                          lowStock
                            ? "text-red-600 dark:text-red-400"
                            : "text-slate-800 dark:text-slate-200",
                        ].join(
                          " ",
                        )}
                      >
                        {product.stock}
                      </div>

                      {lowStock && (
                        <div
                          className="
                            mt-1
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-wide
                            text-red-500
                          "
                        >
                          Low stock
                        </div>
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className="
                          text-sm
                          text-slate-500
                        "
                      >
                        {product.allowSubstitution
                          ? "Allowed"
                          : "Not allowed"}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <button
                        type="button"
                        disabled={
                          !canManage
                        }
                        onClick={() =>
                          toggleAvailability(
                            product.id,
                          )
                        }
                        className={[
                          "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition",

                          product.available
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                            : "bg-slate-100 text-slate-500 dark:bg-white/[0.06] dark:text-slate-400",

                          canManage
                            ? "cursor-pointer"
                            : "cursor-default opacity-70",
                        ].join(
                          " ",
                        )}
                      >
                        {product.available ? (
                          <PackageCheck
                            size={13}
                          />
                        ) : (
                          <PackageX
                            size={13}
                          />
                        )}

                        {product.available
                          ? "Available"
                          : "Unavailable"}
                      </button>
                    </td>
                  </tr>
                );
              },
            )}

            {products.length ===
              0 && (
              <tr>
                <td
                  colSpan={7}
                  className="
                    px-5 py-16
                    text-center
                    text-sm
                    text-slate-400
                  "
                >
                  No grocery products
                  found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}