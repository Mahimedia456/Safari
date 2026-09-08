-- ============================================================================
-- Safari - Ride Flow / Supabase Repair V2 (DEADLOCK SAFE)
-- Date: 2026-09-08
-- Run in Supabase -> SQL Editor.
--
-- Fixes:
--   1) PostgREST relationship ambiguity:
--      "Could not embed because more than one relationship was found for
--       'rides' and 'service_cities'"
--   2) Avoids the previous deadlock caused by holding a service_cities FK lock
--      and then trying to DROP/CREATE a trigger on rides in the same transaction.
--   3) Ensures ride chat, receipts, ratings and offer-accept RPC exist.
--
-- IMPORTANT BEFORE RUNNING:
--   - Stop the Safari backend dev server for this migration.
--   - Close/stop admin and mobile screens that are continuously polling rides.
--   - This migration never terminates sessions automatically.
--   - If a lock cannot be acquired within 15 seconds it fails fast with a
--     lock-timeout instead of waiting into a deadlock. Retry after traffic stops.
-- ============================================================================

-- --------------------------------------------------------------------------
-- PRECHECK
-- --------------------------------------------------------------------------
do $$
begin
  if to_regclass('public.rides') is null then
    raise exception 'Missing public.rides. Run the Safari ride schema first.';
  end if;
  if to_regclass('public.service_cities') is null then
    raise exception 'Missing public.service_cities. Run the Safari city schema first.';
  end if;
end
$$;

-- --------------------------------------------------------------------------
-- PHASE A - rides columns + compatibility trigger.
-- IMPORTANT: no service_cities relation lock is taken in this transaction.
-- --------------------------------------------------------------------------
begin;
set local lock_timeout = '15s';
set local statement_timeout = '120s';

create extension if not exists pgcrypto;

alter table public.rides
  add column if not exists city_id uuid;

do $$
begin
  if exists (
    select 1
      from information_schema.columns
     where table_schema = 'public'
       and table_name = 'rides'
       and column_name = 'service_city_id'
  ) then
    update public.rides
       set city_id = service_city_id
     where city_id is null
       and service_city_id is not null;

    execute $fn$
      create or replace function public.safari_sync_ride_city_columns()
      returns trigger
      language plpgsql
      set search_path = public
      as $body$
      begin
        if new.city_id is null and new.service_city_id is not null then
          new.city_id := new.service_city_id;
        elsif new.city_id is not null then
          new.service_city_id := new.city_id;
        end if;
        return new;
      end
      $body$
    $fn$;

    -- Do NOT DROP the trigger. DROP TRIGGER was the deadlock point in V1.
    -- CREATE only when it does not already exist. CREATE/REPLACE FUNCTION above
    -- updates the function implementation used by an existing trigger.
    if not exists (
      select 1
      from pg_trigger
      where tgrelid = 'public.rides'::regclass
        and tgname = 'trg_safari_sync_ride_city_columns'
        and not tgisinternal
    ) then
      execute $trg$
        create trigger trg_safari_sync_ride_city_columns
        before insert or update of city_id, service_city_id
        on public.rides
        for each row
        execute function public.safari_sync_ride_city_columns()
      $trg$;
    end if;
  end if;
end
$$;

commit;

-- --------------------------------------------------------------------------
-- PHASE B - canonical FK repair.
-- Lock order is deterministic: rides FIRST, then service_cities.
-- This prevents the lock inversion that caused SQLSTATE 40P01.
-- --------------------------------------------------------------------------
begin;
set local lock_timeout = '15s';
set local statement_timeout = '120s';

-- Prevent two copies of this Safari migration from running simultaneously.
select pg_advisory_xact_lock(hashtextextended('safari:rides-city-fk-repair', 0));

-- Acquire the strongest rides lock FIRST. Existing SELECTs are allowed to
-- finish before this succeeds; while waiting we hold no service_cities lock.
lock table public.rides in access exclusive mode;
lock table public.service_cities in share row exclusive mode;

do $$
declare
  fk record;
begin
  for fk in
    select c.conname
      from pg_constraint c
     where c.contype = 'f'
       and c.conrelid = 'public.rides'::regclass
       and c.confrelid = 'public.service_cities'::regclass
  loop
    execute format('alter table public.rides drop constraint %I', fk.conname);
  end loop;
end
$$;

alter table public.rides
  add constraint rides_city_id_fkey
  foreign key (city_id)
  references public.service_cities(id)
  on update cascade
  on delete restrict
  not valid;

commit;

-- Indexes after the FK transaction so the high-level table locks are released.
create index if not exists rides_city_id_idx
  on public.rides(city_id);
create index if not exists rides_created_at_idx
  on public.rides(created_at desc);
create index if not exists rides_status_created_at_idx
  on public.rides(ride_status, created_at desc);

begin;
set local lock_timeout = '15s';
set local statement_timeout = '120s';

-- --------------------------------------------------------------------------
-- 2) Ride chat persistence used by /api/v1/chat/rides/:rideId
-- --------------------------------------------------------------------------
create table if not exists public.ride_messages (
  id uuid primary key default gen_random_uuid(),
  ride_id uuid not null references public.rides(id) on delete cascade,
  sender_id uuid not null references public.profiles(id) on delete cascade,
  message text not null check (char_length(trim(message)) between 1 and 1000),
  created_at timestamptz not null default now(),
  read_at timestamptz null
);

-- Bring an older/partial chat table up to the current API contract.
alter table public.ride_messages
  add column if not exists ride_id uuid,
  add column if not exists sender_id uuid,
  add column if not exists message text,
  add column if not exists created_at timestamptz default now(),
  add column if not exists read_at timestamptz;

create index if not exists ride_messages_ride_created_idx
  on public.ride_messages(ride_id, created_at asc);

create index if not exists ride_messages_sender_idx
  on public.ride_messages(sender_id);

-- --------------------------------------------------------------------------
-- 3) Completed ride receipt + rating persistence
-- --------------------------------------------------------------------------
create table if not exists public.ride_receipts (
  id uuid primary key default gen_random_uuid(),
  ride_id uuid not null references public.rides(id) on delete cascade,
  passenger_id uuid not null references public.profiles(id) on delete cascade,
  driver_id uuid null references public.profiles(id) on delete set null,
  currency_code text not null default 'PKR',
  base_fare numeric(12,2) not null default 0,
  distance_fare numeric(12,2) not null default 0,
  time_fare numeric(12,2) not null default 0,
  booking_fee numeric(12,2) not null default 0,
  waiting_fee numeric(12,2) not null default 0,
  surge_amount numeric(12,2) not null default 0,
  discount_amount numeric(12,2) not null default 0,
  tip_amount numeric(12,2) not null default 0,
  subtotal numeric(12,2) not null default 0,
  total numeric(12,2) not null default 0,
  payment_method text not null default 'cash',
  payment_status text not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Bring an older/partial receipt table up to the current API contract.
alter table public.ride_receipts
  add column if not exists ride_id uuid,
  add column if not exists passenger_id uuid,
  add column if not exists driver_id uuid,
  add column if not exists currency_code text default 'PKR',
  add column if not exists base_fare numeric(12,2) default 0,
  add column if not exists distance_fare numeric(12,2) default 0,
  add column if not exists time_fare numeric(12,2) default 0,
  add column if not exists booking_fee numeric(12,2) default 0,
  add column if not exists waiting_fee numeric(12,2) default 0,
  add column if not exists surge_amount numeric(12,2) default 0,
  add column if not exists discount_amount numeric(12,2) default 0,
  add column if not exists tip_amount numeric(12,2) default 0,
  add column if not exists subtotal numeric(12,2) default 0,
  add column if not exists total numeric(12,2) default 0,
  add column if not exists payment_method text default 'cash',
  add column if not exists payment_status text default 'pending',
  add column if not exists created_at timestamptz default now(),
  add column if not exists updated_at timestamptz default now();

-- One receipt per ride. Remove accidental duplicates before enforcing it.
delete from public.ride_receipts a
using public.ride_receipts b
where a.ride_id = b.ride_id
  and a.ride_id is not null
  and a.ctid < b.ctid;

create unique index if not exists ride_receipts_ride_id_uidx
  on public.ride_receipts(ride_id);

create table if not exists public.ride_ratings (
  id uuid primary key default gen_random_uuid(),
  ride_id uuid not null references public.rides(id) on delete cascade,
  reviewer_id uuid not null references public.profiles(id) on delete cascade,
  reviewee_id uuid not null references public.profiles(id) on delete cascade,
  reviewer_type text not null check (reviewer_type in ('passenger','driver')),
  rating smallint not null check (rating between 1 and 5),
  comment text null,
  tags text[] not null default '{}'::text[],
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Bring an older/partial ratings table up to the current API contract.
alter table public.ride_ratings
  add column if not exists ride_id uuid,
  add column if not exists reviewer_id uuid,
  add column if not exists reviewee_id uuid,
  add column if not exists reviewer_type text,
  add column if not exists rating smallint,
  add column if not exists comment text,
  add column if not exists tags text[] default '{}'::text[],
  add column if not exists created_at timestamptz default now(),
  add column if not exists updated_at timestamptz default now();

delete from public.ride_ratings a
using public.ride_ratings b
where a.ride_id = b.ride_id
  and a.reviewer_id = b.reviewer_id
  and a.ride_id is not null
  and a.reviewer_id is not null
  and a.ctid < b.ctid;

create unique index if not exists ride_ratings_ride_reviewer_uidx
  on public.ride_ratings(ride_id, reviewer_id);

create index if not exists ride_ratings_reviewee_idx
  on public.ride_ratings(reviewee_id, created_at desc);

commit;

begin;
set local lock_timeout = '15s';
set local statement_timeout = '120s';

-- --------------------------------------------------------------------------
-- 4) Atomic passenger acceptance of a driver's negotiated fare offer
-- --------------------------------------------------------------------------
create or replace function public.accept_safari_driver_offer(
  p_offer_id uuid,
  p_passenger_id uuid,
  p_ride_id uuid
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_offer public.ride_driver_offers%rowtype;
  v_ride public.rides%rowtype;
  v_now timestamptz := now();
begin
  select * into v_ride
    from public.rides
   where id = p_ride_id
     and passenger_id = p_passenger_id
   for update;

  if not found then
    raise exception 'Safari ride not found.';
  end if;

  -- Idempotent mobile retry after a temporary network interruption.
  if v_ride.ride_status = 'driver_assigned' and v_ride.driver_id is not null then
    return v_ride.id;
  end if;

  if v_ride.ride_status not in ('requested', 'searching') then
    raise exception 'This Safari ride is no longer accepting driver offers.';
  end if;

  select * into v_offer
    from public.ride_driver_offers
   where id = p_offer_id
     and ride_id = p_ride_id
   for update;

  if not found then
    raise exception 'This driver offer does not belong to this Safari ride.';
  end if;

  if v_offer.offer_status <> 'pending' then
    raise exception 'This Safari driver offer is no longer pending.';
  end if;

  if v_offer.expires_at is not null and v_offer.expires_at <= v_now then
    update public.ride_driver_offers
       set offer_status = 'expired',
           responded_at = v_now,
           updated_at = v_now
     where id = v_offer.id;
    raise exception 'This Safari driver offer has expired.';
  end if;

  update public.rides
     set driver_id = v_offer.driver_id,
         vehicle_id = v_offer.vehicle_id,
         agreed_fare = v_offer.offered_fare,
         ride_status = 'driver_assigned',
         updated_at = v_now
   where id = p_ride_id
     and passenger_id = p_passenger_id
     and ride_status in ('requested','searching');

  if not found then
    raise exception 'Safari could not assign this driver.';
  end if;

  update public.ride_driver_offers
     set offer_status = case when id = p_offer_id then 'accepted' else 'rejected' end,
         responded_at = v_now,
         updated_at = v_now
   where ride_id = p_ride_id
     and offer_status = 'pending';

  update public.ride_match_requests
     set match_status = case when driver_id = v_offer.driver_id then 'accepted' else 'rejected' end,
         responded_at = coalesce(responded_at, v_now),
         updated_at = v_now
   where ride_id = p_ride_id
     and match_status in ('offered','accepted');

  insert into public.ride_status_events(
    ride_id, from_status, to_status, actor_type, actor_user_id, note
  ) values (
    p_ride_id,
    v_ride.ride_status,
    'driver_assigned',
    'passenger',
    p_passenger_id,
    'Passenger accepted a driver fare offer.'
  );

  return p_ride_id;
end;
$$;

revoke all on function public.accept_safari_driver_offer(uuid,uuid,uuid) from public;
grant execute on function public.accept_safari_driver_offer(uuid,uuid,uuid) to service_role;

commit;


-- --------------------------------------------------------------------------
-- PostgREST cache refresh
-- --------------------------------------------------------------------------
notify pgrst, 'reload schema';
notify pgrst, 'reload config';

-- ============================================================================
-- VERIFICATION A
-- MUST RETURN EXACTLY ONE ROW:
--   rides_city_id_fkey | {city_id}
-- ============================================================================
select
  c.conname as constraint_name,
  array_agg(a.attname order by u.ordinality) as source_columns,
  pg_get_constraintdef(c.oid) as definition
from pg_constraint c
cross join lateral unnest(c.conkey) with ordinality as u(attnum, ordinality)
join pg_attribute a
  on a.attrelid = c.conrelid
 and a.attnum = u.attnum
where c.contype = 'f'
  and c.conrelid = 'public.rides'::regclass
  and c.confrelid = 'public.service_cities'::regclass
group by c.oid, c.conname
order by c.conname;

-- ============================================================================
-- VERIFICATION B
-- MUST RETURN fk_count = 1.
-- ============================================================================
select count(*)::int as fk_count
from pg_constraint c
where c.contype = 'f'
  and c.conrelid = 'public.rides'::regclass
  and c.confrelid = 'public.service_cities'::regclass;

-- ============================================================================
-- OPTIONAL LOCK DIAGNOSTIC (run separately only if PHASE A/B reports
-- "canceling statement due to lock timeout"). This query does NOT kill anyone.
-- ============================================================================
-- select
--   a.pid,
--   a.usename,
--   a.application_name,
--   a.state,
--   a.query_start,
--   l.relation::regclass as relation,
--   l.mode,
--   l.granted,
--   left(a.query, 300) as query
-- from pg_locks l
-- join pg_stat_activity a on a.pid = l.pid
-- where l.relation in ('public.rides'::regclass, 'public.service_cities'::regclass)
--   and a.pid <> pg_backend_pid()
-- order by l.granted, a.query_start;
