begin;

-- ============================================================================
-- Safari Phase 14
-- Wallet, Payments and Transactions
-- ============================================================================

create table if not exists public.wallet_accounts (
  user_id uuid primary key references public.profiles(id) on delete cascade,

  currency_code text not null default 'PKR',
  available_balance numeric(14,2) not null default 0,
  pending_balance numeric(14,2) not null default 0,

  status text not null default 'active'
    check (status in ('active', 'frozen', 'closed')),

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into public.wallet_accounts (user_id)
select id
from public.profiles
where account_type in ('passenger', 'driver', 'merchant')
on conflict (user_id) do nothing;

create table if not exists public.wallet_transactions (
  id uuid primary key default gen_random_uuid(),

  wallet_user_id uuid not null references public.profiles(id) on delete cascade,

  transaction_type text not null
    check (
      transaction_type in (
        'credit',
        'debit',
        'hold',
        'release',
        'refund',
        'payout',
        'adjustment'
      )
    ),

  source_type text
    check (
      source_type is null
      or source_type in (
        'ride',
        'food',
        'grocery',
        'pharmacy',
        'services',
        'topup',
        'admin'
      )
    ),

  source_id uuid,

  amount numeric(14,2) not null check (amount >= 0),
  currency_code text not null default 'PKR',

  status text not null default 'completed'
    check (status in ('pending', 'completed', 'failed', 'reversed')),

  description text,
  reference text,

  balance_after numeric(14,2),

  created_at timestamptz not null default now()
);

create index if not exists wallet_transactions_user_idx
  on public.wallet_transactions(wallet_user_id, created_at desc);

create index if not exists wallet_transactions_source_idx
  on public.wallet_transactions(source_type, source_id);

create table if not exists public.payment_records (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null references public.profiles(id) on delete restrict,

  source_type text not null
    check (
      source_type in (
        'ride',
        'food',
        'grocery',
        'pharmacy',
        'services'
      )
    ),

  source_id uuid not null,

  amount numeric(14,2) not null check (amount >= 0),
  currency_code text not null default 'PKR',

  payment_method text not null
    check (payment_method in ('cash', 'wallet', 'card')),

  payment_status text not null default 'pending'
    check (
      payment_status in (
        'pending',
        'authorized',
        'paid',
        'failed',
        'refunded',
        'cash_due'
      )
    ),

  provider text,
  provider_reference text,

  authorized_at timestamptz,
  paid_at timestamptz,
  refunded_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  unique (source_type, source_id)
);

create index if not exists payment_records_user_idx
  on public.payment_records(user_id, created_at desc);

create table if not exists public.merchant_ledger_entries (
  id uuid primary key default gen_random_uuid(),

  merchant_user_id uuid not null references public.profiles(id) on delete cascade,

  source_type text not null
    check (source_type in ('food', 'grocery', 'pharmacy', 'services')),

  source_id uuid not null,

  gross_amount numeric(14,2) not null default 0,
  commission_amount numeric(14,2) not null default 0,
  net_amount numeric(14,2) not null default 0,

  currency_code text not null default 'PKR',

  settlement_status text not null default 'pending'
    check (settlement_status in ('pending', 'settled', 'held', 'reversed')),

  settled_at timestamptz,

  created_at timestamptz not null default now(),

  unique (source_type, source_id, merchant_user_id)
);

create index if not exists merchant_ledger_user_idx
  on public.merchant_ledger_entries(merchant_user_id, created_at desc);

alter table public.wallet_accounts enable row level security;
alter table public.wallet_transactions enable row level security;
alter table public.payment_records enable row level security;
alter table public.merchant_ledger_entries enable row level security;

drop policy if exists "users can read own wallet"
  on public.wallet_accounts;

create policy "users can read own wallet"
on public.wallet_accounts
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "users can read own wallet transactions"
  on public.wallet_transactions;

create policy "users can read own wallet transactions"
on public.wallet_transactions
for select
to authenticated
using (auth.uid() = wallet_user_id);

drop policy if exists "users can read own payments"
  on public.payment_records;

create policy "users can read own payments"
on public.payment_records
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "merchants can read own ledger"
  on public.merchant_ledger_entries;

create policy "merchants can read own ledger"
on public.merchant_ledger_entries
for select
to authenticated
using (auth.uid() = merchant_user_id);

grant select on public.wallet_accounts to authenticated;
grant select on public.wallet_transactions to authenticated;
grant select on public.payment_records to authenticated;
grant select on public.merchant_ledger_entries to authenticated;

commit;
