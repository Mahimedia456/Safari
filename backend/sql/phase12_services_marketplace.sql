begin;

-- ============================================================================
-- Safari Phase 12
-- Services Marketplace
-- ============================================================================

create table if not exists public.service_categories (
  id uuid primary key default gen_random_uuid(),

  name text not null,
  slug text not null unique,
  description text,
  icon_key text,

  sort_order integer not null default 0,
  is_active boolean not null default true,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.service_providers (
  id uuid primary key default gen_random_uuid(),

  merchant_user_id uuid not null references public.profiles(id) on delete restrict,
  city_id uuid not null references public.service_cities(id) on delete restrict,

  business_name text not null,
  slug text not null unique,
  description text,

  logo_url text,
  cover_url text,

  phone text,
  address text,

  rating numeric(4,2) not null default 5.00,
  rating_count integer not null default 0,

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

  is_featured boolean not null default false,
  is_active boolean not null default true,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists service_providers_city_idx
  on public.service_providers(city_id, is_active, verification_status);

create index if not exists service_providers_merchant_idx
  on public.service_providers(merchant_user_id);

create table if not exists public.provider_services (
  id uuid primary key default gen_random_uuid(),

  provider_id uuid not null references public.service_providers(id) on delete cascade,
  category_id uuid not null references public.service_categories(id) on delete restrict,

  name text not null,
  description text,

  pricing_type text not null default 'fixed'
    check (pricing_type in ('fixed', 'starting_from', 'hourly', 'quote')),

  price numeric(12,2),
  currency_code text not null default 'PKR',

  duration_minutes integer,
  image_url text,

  is_featured boolean not null default false,
  is_available boolean not null default true,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists provider_services_provider_idx
  on public.provider_services(provider_id, is_available);

create index if not exists provider_services_category_idx
  on public.provider_services(category_id);

create table if not exists public.service_bookings (
  id uuid primary key default gen_random_uuid(),

  booking_number text not null unique,

  customer_id uuid not null references public.profiles(id) on delete restrict,
  provider_id uuid not null references public.service_providers(id) on delete restrict,
  service_id uuid not null references public.provider_services(id) on delete restrict,

  booking_status text not null default 'requested'
    check (
      booking_status in (
        'requested',
        'confirmed',
        'professional_assigned',
        'on_the_way',
        'in_progress',
        'completed',
        'cancelled_by_customer',
        'cancelled_by_provider',
        'cancelled_by_admin'
      )
    ),

  scheduled_for timestamptz,

  service_address_id uuid references public.saved_addresses(id) on delete set null,
  service_address text not null,
  latitude double precision,
  longitude double precision,

  customer_note text,

  currency_code text not null default 'PKR',
  estimated_total numeric(12,2),
  final_total numeric(12,2),

  payment_method text not null default 'cash'
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

  requested_at timestamptz not null default now(),
  confirmed_at timestamptz,
  started_at timestamptz,
  completed_at timestamptz,
  cancelled_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists service_bookings_customer_idx
  on public.service_bookings(customer_id, created_at desc);

create index if not exists service_bookings_provider_idx
  on public.service_bookings(provider_id, booking_status, created_at desc);

create table if not exists public.service_booking_events (
  id uuid primary key default gen_random_uuid(),

  booking_id uuid not null references public.service_bookings(id) on delete cascade,

  from_status text,
  to_status text not null,

  actor_type text not null
    check (actor_type in ('customer', 'provider', 'admin', 'system')),

  actor_user_id uuid references public.profiles(id) on delete set null,
  note text,

  created_at timestamptz not null default now()
);

create index if not exists service_booking_events_booking_idx
  on public.service_booking_events(booking_id, created_at asc);

create sequence if not exists public.safari_service_booking_number_seq start 400001;

create or replace function public.generate_safari_service_booking_number()
returns text
language sql
as $$
  select 'SSV-' || to_char(now(), 'YYMMDD') || '-' ||
         lpad(nextval('public.safari_service_booking_number_seq')::text, 6, '0');
$$;

alter table public.service_categories enable row level security;
alter table public.service_providers enable row level security;
alter table public.provider_services enable row level security;
alter table public.service_bookings enable row level security;
alter table public.service_booking_events enable row level security;

drop policy if exists "authenticated can read active service categories"
  on public.service_categories;

create policy "authenticated can read active service categories"
on public.service_categories
for select
to authenticated
using (is_active = true);

drop policy if exists "authenticated can read verified service providers"
  on public.service_providers;

create policy "authenticated can read verified service providers"
on public.service_providers
for select
to authenticated
using (
  is_active = true
  and verification_status = 'verified'
);

drop policy if exists "authenticated can read available provider services"
  on public.provider_services;

create policy "authenticated can read available provider services"
on public.provider_services
for select
to authenticated
using (is_available = true);

drop policy if exists "customers can read own service bookings"
  on public.service_bookings;

create policy "customers can read own service bookings"
on public.service_bookings
for select
to authenticated
using (auth.uid() = customer_id);

drop policy if exists "customers can read own service booking events"
  on public.service_booking_events;

create policy "customers can read own service booking events"
on public.service_booking_events
for select
to authenticated
using (
  exists (
    select 1
    from public.service_bookings b
    where b.id = service_booking_events.booking_id
      and b.customer_id = auth.uid()
  )
);

grant select on public.service_categories to authenticated;
grant select on public.service_providers to authenticated;
grant select on public.provider_services to authenticated;
grant select on public.service_bookings to authenticated;
grant select on public.service_booking_events to authenticated;

commit;
