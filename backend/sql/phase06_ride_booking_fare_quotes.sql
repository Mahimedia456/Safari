begin;

-- ============================================================================
-- Safari Phase 06
-- Fare Quotes and Ride Booking
-- ============================================================================

create table if not exists public.ride_quotes (
  id uuid primary key default gen_random_uuid(),

  passenger_id uuid not null references public.profiles(id) on delete cascade,
  city_id uuid not null references public.service_cities(id) on delete restrict,
  ride_category_id uuid not null references public.ride_categories(id) on delete restrict,

  pickup_address text not null,
  pickup_latitude double precision not null,
  pickup_longitude double precision not null,

  dropoff_address text not null,
  dropoff_latitude double precision not null,
  dropoff_longitude double precision not null,

  estimated_distance_km numeric(10,2) not null,
  estimated_duration_minutes numeric(10,2) not null,

  currency_code text not null,

  base_fare numeric(12,2) not null,
  distance_fare numeric(12,2) not null,
  time_fare numeric(12,2) not null,
  booking_fee numeric(12,2) not null,
  surge_multiplier numeric(6,2) not null default 1.00,
  subtotal numeric(12,2) not null,
  estimated_total numeric(12,2) not null,

  payment_method text not null default 'cash'
    check (payment_method in ('cash', 'wallet', 'card')),

  quote_status text not null default 'active'
    check (quote_status in ('active', 'used', 'expired', 'cancelled')),

  expires_at timestamptz not null,

  created_at timestamptz not null default now()
);

create index if not exists ride_quotes_passenger_idx
  on public.ride_quotes(passenger_id, created_at desc);

create index if not exists ride_quotes_expiry_idx
  on public.ride_quotes(quote_status, expires_at);

create table if not exists public.rides (
  id uuid primary key default gen_random_uuid(),

  passenger_id uuid not null references public.profiles(id) on delete restrict,
  driver_id uuid references public.profiles(id) on delete set null,
  vehicle_id uuid references public.driver_vehicles(id) on delete set null,

  quote_id uuid references public.ride_quotes(id) on delete set null,
  city_id uuid not null references public.service_cities(id) on delete restrict,
  ride_category_id uuid not null references public.ride_categories(id) on delete restrict,

  ride_number text not null unique,

  ride_status text not null default 'requested'
    check (
      ride_status in (
        'requested',
        'searching',
        'driver_assigned',
        'driver_arriving',
        'driver_arrived',
        'in_progress',
        'completed',
        'cancelled_by_passenger',
        'cancelled_by_driver',
        'cancelled_by_admin',
        'expired'
      )
    ),

  booking_type text not null default 'now'
    check (booking_type in ('now', 'scheduled')),

  scheduled_for timestamptz,

  pickup_address text not null,
  pickup_latitude double precision not null,
  pickup_longitude double precision not null,

  dropoff_address text not null,
  dropoff_latitude double precision not null,
  dropoff_longitude double precision not null,

  pickup_note text,

  estimated_distance_km numeric(10,2) not null,
  estimated_duration_minutes numeric(10,2) not null,

  currency_code text not null,
  estimated_fare numeric(12,2) not null,
  final_fare numeric(12,2),

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

  passenger_cancel_reason text,
  driver_cancel_reason text,
  admin_cancel_reason text,

  requested_at timestamptz not null default now(),
  accepted_at timestamptz,
  driver_arrived_at timestamptz,
  started_at timestamptz,
  completed_at timestamptz,
  cancelled_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists rides_passenger_idx
  on public.rides(passenger_id, created_at desc);

create index if not exists rides_driver_idx
  on public.rides(driver_id, created_at desc);

create index if not exists rides_status_idx
  on public.rides(ride_status, requested_at desc);

create index if not exists rides_city_status_idx
  on public.rides(city_id, ride_status, requested_at desc);

create table if not exists public.ride_status_events (
  id uuid primary key default gen_random_uuid(),
  ride_id uuid not null references public.rides(id) on delete cascade,

  from_status text,
  to_status text not null,

  actor_type text not null
    check (actor_type in ('passenger', 'driver', 'admin', 'system')),

  actor_user_id uuid references public.profiles(id) on delete set null,

  note text,

  created_at timestamptz not null default now()
);

create index if not exists ride_status_events_ride_idx
  on public.ride_status_events(ride_id, created_at asc);

-- ---------------------------------------------------------------------------
-- Sequence-based ride number helper
-- ---------------------------------------------------------------------------

create sequence if not exists public.safari_ride_number_seq start 100001;

create or replace function public.generate_safari_ride_number()
returns text
language sql
as $$
  select 'SAF-' || to_char(now(), 'YYMMDD') || '-' ||
         lpad(nextval('public.safari_ride_number_seq')::text, 6, '0');
$$;

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------

alter table public.ride_quotes enable row level security;
alter table public.rides enable row level security;
alter table public.ride_status_events enable row level security;

drop policy if exists "passengers can read own ride quotes"
  on public.ride_quotes;

create policy "passengers can read own ride quotes"
on public.ride_quotes
for select
to authenticated
using (auth.uid() = passenger_id);

drop policy if exists "users can read own rides"
  on public.rides;

create policy "users can read own rides"
on public.rides
for select
to authenticated
using (
  auth.uid() = passenger_id
  or auth.uid() = driver_id
);

drop policy if exists "users can read own ride status events"
  on public.ride_status_events;

create policy "users can read own ride status events"
on public.ride_status_events
for select
to authenticated
using (
  exists (
    select 1
    from public.rides r
    where r.id = ride_status_events.ride_id
      and (
        r.passenger_id = auth.uid()
        or r.driver_id = auth.uid()
      )
  )
);

grant select on public.ride_quotes to authenticated;
grant select on public.rides to authenticated;
grant select on public.ride_status_events to authenticated;

commit;
