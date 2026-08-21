begin;

-- ============================================================================
-- Safari Phase 13
-- Unified Orders + Merchant Management
-- ============================================================================

create table if not exists public.merchant_profiles (
  user_id uuid primary key references public.profiles(id) on delete cascade,

  merchant_type text not null
    check (merchant_type in ('food', 'grocery', 'pharmacy', 'services')),

  business_name text,
  legal_name text,
  registration_number text,
  tax_number text,

  support_phone text,
  support_email text,

  verification_status text not null default 'pending'
    check (
      verification_status in (
        'pending',
        'in_review',
        'verified',
        'rejected',
        'suspended'
      )
    ),

  commission_percent numeric(6,2) not null default 15.00
    check (commission_percent between 0 and 100),

  payout_status text not null default 'enabled'
    check (payout_status in ('enabled', 'paused')),

  approved_at timestamptz,
  approved_by uuid references public.profiles(id) on delete set null,
  rejection_reason text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists merchant_profiles_type_idx
  on public.merchant_profiles(merchant_type, verification_status);

insert into public.merchant_profiles (
  user_id,
  merchant_type,
  business_name,
  verification_status
)
select
  id,
  merchant_type,
  full_name,
  'verified'
from public.profiles
where account_type = 'merchant'
  and merchant_type is not null
on conflict (user_id) do nothing;

create table if not exists public.order_index (
  id uuid primary key default gen_random_uuid(),

  source_type text not null
    check (source_type in ('food', 'grocery', 'pharmacy', 'services')),

  source_id uuid not null,
  order_number text not null,

  customer_id uuid not null references public.profiles(id) on delete restrict,
  merchant_user_id uuid references public.profiles(id) on delete set null,

  status text not null,

  currency_code text not null default 'PKR',
  total numeric(12,2),

  payment_method text,
  payment_status text,

  placed_at timestamptz,
  completed_at timestamptz,
  cancelled_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  unique (source_type, source_id)
);

create index if not exists order_index_customer_idx
  on public.order_index(customer_id, created_at desc);

create index if not exists order_index_merchant_idx
  on public.order_index(merchant_user_id, created_at desc);

create index if not exists order_index_status_idx
  on public.order_index(source_type, status, created_at desc);

alter table public.merchant_profiles enable row level security;
alter table public.order_index enable row level security;

drop policy if exists "merchant can read own merchant profile"
  on public.merchant_profiles;

create policy "merchant can read own merchant profile"
on public.merchant_profiles
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "customers can read own order index"
  on public.order_index;

create policy "customers can read own order index"
on public.order_index
for select
to authenticated
using (auth.uid() = customer_id);

drop policy if exists "merchants can read own order index"
  on public.order_index;

create policy "merchants can read own order index"
on public.order_index
for select
to authenticated
using (auth.uid() = merchant_user_id);

grant select on public.merchant_profiles to authenticated;
grant select on public.order_index to authenticated;

commit;
