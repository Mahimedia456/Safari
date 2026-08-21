begin;

-- ============================================================================
-- Safari Phase 05
-- Ride Catalog, Pricing and Service Areas
-- ============================================================================

create table if not exists public.service_cities (
  id uuid primary key default gen_random_uuid(),
  country_code text not null default 'PK'
    check (country_code in ('PK', 'DE')),

  city_code text not null,
  name text not null,
  currency_code text not null default 'PKR',
  timezone text not null default 'Asia/Karachi',

  is_active boolean not null default true,

  center_latitude double precision,
  center_longitude double precision,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  unique (country_code, city_code)
);

create index if not exists service_cities_active_idx
  on public.service_cities(country_code, is_active);

create table if not exists public.service_zones (
  id uuid primary key default gen_random_uuid(),
  city_id uuid not null references public.service_cities(id) on delete cascade,

  name text not null,
  code text not null,
  zone_type text not null default 'standard'
    check (zone_type in ('standard', 'airport', 'restricted', 'premium')),

  is_active boolean not null default true,

  -- Phase 05 stores a simple rectangular service boundary.
  -- Production geospatial polygons can be added later without changing API shape.
  min_latitude double precision,
  max_latitude double precision,
  min_longitude double precision,
  max_longitude double precision,

  pickup_allowed boolean not null default true,
  dropoff_allowed boolean not null default true,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  unique (city_id, code)
);

create index if not exists service_zones_city_active_idx
  on public.service_zones(city_id, is_active);

create table if not exists public.ride_categories (
  id uuid primary key default gen_random_uuid(),

  code text not null unique
    check (
      code in (
        'economy',
        'comfort',
        'premium',
        'bike',
        'rickshaw',
        'xl'
      )
    ),

  name text not null,
  description text,

  passenger_capacity integer not null
    check (passenger_capacity between 1 and 12),

  vehicle_type text not null
    check (vehicle_type in ('car', 'bike', 'rickshaw', 'van')),

  sort_order integer not null default 0,
  is_active boolean not null default true,

  icon_key text,
  color_key text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ride_pricing_rules (
  id uuid primary key default gen_random_uuid(),

  city_id uuid not null references public.service_cities(id) on delete cascade,
  ride_category_id uuid not null references public.ride_categories(id) on delete cascade,

  currency_code text not null default 'PKR',

  base_fare numeric(12,2) not null default 0,
  minimum_fare numeric(12,2) not null default 0,
  per_km_rate numeric(12,2) not null default 0,
  per_minute_rate numeric(12,2) not null default 0,
  booking_fee numeric(12,2) not null default 0,

  surge_enabled boolean not null default true,
  default_surge_multiplier numeric(6,2) not null default 1.00
    check (default_surge_multiplier >= 1),

  cancellation_fee numeric(12,2) not null default 0,
  waiting_per_minute_rate numeric(12,2) not null default 0,
  free_waiting_minutes integer not null default 3,

  is_active boolean not null default true,

  effective_from timestamptz not null default now(),
  effective_to timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  unique (city_id, ride_category_id, effective_from)
);

create index if not exists ride_pricing_rules_lookup_idx
  on public.ride_pricing_rules(
    city_id,
    ride_category_id,
    is_active,
    effective_from desc
  );

create table if not exists public.ride_service_settings (
  city_id uuid primary key references public.service_cities(id) on delete cascade,

  max_pickup_radius_km numeric(8,2) not null default 20,
  max_trip_distance_km numeric(8,2) not null default 80,
  max_quote_age_seconds integer not null default 300,

  allow_scheduled_rides boolean not null default true,
  minimum_schedule_lead_minutes integer not null default 30,
  maximum_schedule_days integer not null default 7,

  allow_cash boolean not null default true,
  allow_wallet boolean not null default true,
  allow_card boolean not null default false,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------

alter table public.service_cities enable row level security;
alter table public.service_zones enable row level security;
alter table public.ride_categories enable row level security;
alter table public.ride_pricing_rules enable row level security;
alter table public.ride_service_settings enable row level security;

drop policy if exists "authenticated can read active service cities"
  on public.service_cities;

create policy "authenticated can read active service cities"
on public.service_cities
for select
to authenticated
using (is_active = true);

drop policy if exists "authenticated can read active service zones"
  on public.service_zones;

create policy "authenticated can read active service zones"
on public.service_zones
for select
to authenticated
using (is_active = true);

drop policy if exists "authenticated can read active ride categories"
  on public.ride_categories;

create policy "authenticated can read active ride categories"
on public.ride_categories
for select
to authenticated
using (is_active = true);

drop policy if exists "authenticated can read active ride pricing"
  on public.ride_pricing_rules;

create policy "authenticated can read active ride pricing"
on public.ride_pricing_rules
for select
to authenticated
using (is_active = true);

drop policy if exists "authenticated can read ride service settings"
  on public.ride_service_settings;

create policy "authenticated can read ride service settings"
on public.ride_service_settings
for select
to authenticated
using (true);

grant select on public.service_cities to authenticated;
grant select on public.service_zones to authenticated;
grant select on public.ride_categories to authenticated;
grant select on public.ride_pricing_rules to authenticated;
grant select on public.ride_service_settings to authenticated;

commit;
