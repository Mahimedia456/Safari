-- Safari: canonicalize service_bookings -> provider_services relationship.
--
-- Runtime backend V10 no longer depends on PostgREST embedding for this
-- relationship, so the app/backend works even before this maintenance script
-- is run. This script only cleans the Supabase schema so future direct embeds
-- are unambiguous.
--
-- Recommended: temporarily stop the Safari backend/admin before running.

set lock_timeout = '8s';
set statement_timeout = '60s';

do $$
declare
  service_attnum smallint;
  target_attnum smallint;
  keep_oid oid;
  item record;
begin
  select a.attnum
    into service_attnum
  from pg_attribute a
  where a.attrelid = 'public.service_bookings'::regclass
    and a.attname = 'service_id'
    and not a.attisdropped;

  select a.attnum
    into target_attnum
  from pg_attribute a
  where a.attrelid = 'public.provider_services'::regclass
    and a.attname = 'id'
    and not a.attisdropped;

  if service_attnum is null then
    raise exception 'public.service_bookings.service_id does not exist';
  end if;

  if target_attnum is null then
    raise exception 'public.provider_services.id does not exist';
  end if;

  -- Prefer an existing canonical service_id -> id FK.
  select c.oid
    into keep_oid
  from pg_constraint c
  where c.contype = 'f'
    and c.conrelid = 'public.service_bookings'::regclass
    and c.confrelid = 'public.provider_services'::regclass
    and c.conkey = array[service_attnum]::smallint[]
    and c.confkey = array[target_attnum]::smallint[]
  order by
    (c.conname = 'service_bookings_service_id_fkey') desc,
    c.oid
  limit 1;

  -- Remove every other service_bookings -> provider_services FK.
  for item in
    select c.oid, c.conname
    from pg_constraint c
    where c.contype = 'f'
      and c.conrelid = 'public.service_bookings'::regclass
      and c.confrelid = 'public.provider_services'::regclass
      and (keep_oid is null or c.oid <> keep_oid)
  loop
    execute format(
      'alter table public.service_bookings drop constraint %I',
      item.conname
    );
  end loop;

  -- If no canonical relationship existed, create it.
  if keep_oid is null then
    alter table public.service_bookings
      add constraint service_bookings_service_id_fkey
      foreign key (service_id)
      references public.provider_services(id);
  end if;
end
$$;

notify pgrst, 'reload schema';

-- Verification: this must return exactly ONE row.
select
  c.conname as constraint_name,
  array_agg(sa.attname order by src.ordinality) as source_columns,
  array_agg(ta.attname order by src.ordinality) as target_columns
from pg_constraint c
join lateral unnest(c.conkey) with ordinality src(attnum, ordinality)
  on true
join pg_attribute sa
  on sa.attrelid = c.conrelid
 and sa.attnum = src.attnum
join lateral unnest(c.confkey) with ordinality tgt(attnum, ordinality)
  on tgt.ordinality = src.ordinality
join pg_attribute ta
  on ta.attrelid = c.confrelid
 and ta.attnum = tgt.attnum
where c.contype = 'f'
  and c.conrelid = 'public.service_bookings'::regclass
  and c.confrelid = 'public.provider_services'::regclass
group by c.conname
order by c.conname;

reset lock_timeout;
reset statement_timeout;
