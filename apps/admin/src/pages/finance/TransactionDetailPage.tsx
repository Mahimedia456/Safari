import {
  ArrowLeft,
} from "lucide-react";

import {
  Link,
  Navigate,
  useParams,
} from "react-router-dom";

import TransactionStatusBadge from "../../components/finance/TransactionStatusBadge";

import {
  useFinanceStore,
} from "../../store/financeStore";

export default function TransactionDetailPage() {
  const {
    transactionId,
  } = useParams();

  const transaction =
    useFinanceStore(
      (state) =>
        state.transactions.find(
          (item) =>
            item.id ===
            transactionId,
        ),
    );

  if (!transaction) {
    return (
      <Navigate
        to="/finance/transactions"
        replace
      />
    );
  }

  const symbol =
    transaction.currency ===
    "EUR"
      ? "€"
      : "Rs ";

  return (
    <div>
      <Link
        to="/finance/transactions"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-safari-600"
      >
        <ArrowLeft size={16} />
        Transactions
      </Link>

      <div className="mt-5">
        <TransactionStatusBadge
          status={
            transaction.status
          }
        />

        <h1 className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">
          {transaction.id}
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          {
            transaction.referenceId
          }
        </p>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="safari-card p-6">
          <h2 className="font-semibold text-slate-950 dark:text-white">
            Transaction
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Item
              label="Module"
              value={
                transaction.module
              }
            />

            <Item
              label="Type"
              value={
                transaction.type
              }
            />

            <Item
              label="Region"
              value={
                transaction.region
              }
            />

            <Item
              label="Payment"
              value={
                transaction.paymentMethod
              }
            />

            <Item
              label="Customer"
              value={
                transaction.customerName ??
                "-"
              }
            />

            <Item
              label="Partner"
              value={
                transaction.partnerName ??
                "-"
              }
            />
          </div>
        </section>

        <section className="safari-card p-6">
          <h2 className="font-semibold text-slate-950 dark:text-white">
            Financial Breakdown
          </h2>

          <div className="mt-5 space-y-3">
            <Row
              label="Gross"
              value={`${symbol}${transaction.grossAmount.toLocaleString()}`}
            />

            <Row
              label="Safari Commission"
              value={`${symbol}${transaction.commissionAmount.toLocaleString()}`}
            />

            <Row
              label="Partner Amount"
              value={`${symbol}${transaction.partnerAmount.toLocaleString()}`}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

function Item({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-100 p-4 capitalize dark:border-white/[0.06]">
      <div className="text-xs text-slate-400">
        {label}
      </div>

      <div className="mt-2 font-semibold text-slate-900 dark:text-white">
        {value}
      </div>
    </div>
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
    <div className="flex justify-between border-b border-slate-100 py-3 dark:border-white/[0.06]">
      <span className="text-sm text-slate-500">
        {label}
      </span>

      <span className="font-bold text-slate-900 dark:text-white">
        {value}
      </span>
    </div>
  );
}