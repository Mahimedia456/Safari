begin;

-- ============================================================================
-- Safari Phase 07
-- Driver Matching + Accept / Reject
-- ============================================================================

create table if not exists public.ride_match_requests (
  id uuid primary key default gen_random_uuid(),

  ride_id uuid not null references public.rides(id) on delete cascade,
  driver_id uuid not null references public.profiles(id) on delete cascade,
  vehicle_id uuid references public.driver_vehicles(id) on delete set null,

  match_status text not null default 'offered'
    check (
      match_status in (
        'offered',
        'accepted',
        'rejected',
        'expired',
        'cancelled'
      )
    ),

  distance_to_pickup_km numeric(10,2),
  estimated_pickup_minutes integer,

  offered_at timestamptz not null default now(),
  expires_at timestamptz not null,
  responded_at timestamptz,

  rejection_reason text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  unique (ride_id, driver_id)
);

create index if not exists ride_match_requests_ride_idx
  on public.ride_match_requests(ride_id, match_status, offered_at desc);

create index if not exists ride_match_requests_driver_idx
  on public.ride_match_requests(driver_id, match_status, offered_at desc);

alter table public.rides
  add column if not exists matching_started_at timestamptz,
  add column if not exists matching_attempts integer not null default 0,
  add column if not exists matched_at timestamptz;

create table if not exists public.driver_match_preferences (
  driver_id uuid primary key references public.profiles(id) on delete cascade,

  max_pickup_distance_km numeric(8,2) not null default 8,
  auto_accept boolean not null default false,

  accepts_economy boolean not null default true,
  accepts_comfort boolean not null default true,
  accepts_premium boolean not null default true,
  accepts_bike boolean not null default true,
  accepts_rickshaw boolean not null default true,
  accepts_xl boolean not null default true,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into public.driver_match_preferences (driver_id)
select id
from public.profiles
where account_type = 'driver'
on conflict (driver_id) do nothing;

create or replace function public.ensure_driver_match_preferences()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.account_type = 'driver' then
    insert into public.driver_match_preferences (driver_id)
    values (new.id)
    on conflict (driver_id) do nothing;
  end if;

  return new;
end;
$$;

drop trigger if exists on_profile_create_driver_match_preferences
  on public.profiles;

create trigger on_profile_create_driver_match_preferences
after insert or update of account_type
on public.profiles
for each row execute procedure public.ensure_driver_match_preferences();

alter table public.ride_match_requests enable row level security;
alter table public.driver_match_preferences enable row level security;

drop policy if exists "drivers can read own ride match requests"
  on public.ride_match_requests;

create policy "drivers can read own ride match requests"
on public.ride_match_requests
for select
to authenticated
using (auth.uid() = driver_id);

drop policy if exists "passengers can read match requests for own rides"
  on public.ride_match_requests;

create policy "passengers can read match requests for own rides"
on public.ride_match_requests
for select
to authenticated
using (
  exists (
    select 1
    from public.rides r
    where r.id = ride_match_requests.ride_id
      and r.passenger_id = auth.uid()
  )
);

drop policy if exists "drivers can read own match preferences"
  on public.driver_match_preferences;

create policy "drivers can read own match preferences"
on public.driver_match_preferences
for select
to authenticated
using (auth.uid() = driver_id);

grant select on public.ride_match_requests to authenticated;
grant select on public.driver_match_preferences to authenticated;

commit;
