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
--   3) Focused repair only: canonical rides.city_id -> service_cities.id FK.
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
