begin;

create extension if not exists pgcrypto;

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  notification_type text not null,
  title text not null,
  body text,
  data jsonb not null default '{}'::jsonb,
  is_read boolean not null default false,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists notifications_user_created_idx
  on public.notifications(user_id, created_at desc);

create table if not exists public.driver_locations (
  driver_id uuid primary key references public.profiles(id) on delete cascade,
  ride_id uuid references public.rides(id) on delete set null,
  latitude double precision not null,
  longitude double precision not null,
  heading double precision,
  speed_kph double precision,
  accuracy_meters double precision,
  is_online boolean not null default true,
  recorded_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ride_tracking_points (
  id uuid primary key default gen_random_uuid(),
  ride_id uuid not null references public.rides(id) on delete cascade,
  driver_id uuid not null references public.profiles(id) on delete cascade,
  latitude double precision not null,
  longitude double precision not null,
  heading double precision,
  speed_kph double precision,
  accuracy_meters double precision,
  recorded_at timestamptz not null default now()
);

create index if not exists ride_tracking_points_ride_recorded_idx
  on public.ride_tracking_points(ride_id, recorded_at desc);

create index if not exists driver_locations_ride_idx
  on public.driver_locations(ride_id);

alter table public.rides
  add column if not exists last_driver_location_at timestamptz,
  add column if not exists driver_arrival_eta_minutes integer,
  add column if not exists driver_distance_to_pickup_km numeric(10,2);

-- Realtime publication is useful later if you switch from polling to Supabase Realtime.
do $$
begin
  if exists (
    select 1
    from pg_publication
    where pubname = 'supabase_realtime'
  ) then
    begin
      alter publication supabase_realtime add table public.driver_locations;
    exception
      when duplicate_object then null;
    end;

    begin
      alter publication supabase_realtime add table public.rides;
    exception
      when duplicate_object then null;
    end;

    begin
      alter publication supabase_realtime add table public.notifications;
    exception
      when duplicate_object then null;
    end;
  end if;
end $$;

notify pgrst, 'reload schema';

commit;
