import type {
  Merchant,
} from "../../types/merchant";

export default function MerchantActivityPanel({
  merchant,
}: {
  merchant: Merchant;
}) {
  return (
    <div className="safari-card p-6">
      <h2
        className="
          text-base
          font-semibold

          text-slate-950

          dark:text-white
        "
      >
        Activity
      </h2>

      <div className="mt-5 space-y-5">
        {merchant.activities.map(
          (activity) => (
            <div
              key={
                activity.id
              }
              className="
                relative

                border-l-2
                border-safari-100

                pl-5

                dark:border-safari-500/20
              "
            >
              <div
                className="
                  absolute
                  -left-[5px]
                  top-1

                  h-2 w-2

                  rounded-full

                  bg-safari-500
                "
              />

              <div
                className="
                  text-sm
                  font-semibold

                  text-slate-900

                  dark:text-white
                "
              >
                {
                  activity.title
                }
              </div>

              <p
                className="
                  mt-1

                  text-sm

                  text-slate-500

                  dark:text-slate-400
                "
              >
                {
                  activity.description
                }
              </p>

              <div
                className="
                  mt-2

                  text-xs

                  text-slate-400
                "
              >
                {new Date(
                  activity.createdAt,
                ).toLocaleString()}
              </div>
            </div>
          ),
        )}

        {merchant.activities.length ===
          0 && (
          <div
            className="
              text-sm
              text-slate-400
            "
          >
            No activity recorded.
          </div>
        )}
      </div>
    </div>
  );
}