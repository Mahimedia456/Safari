-- Safari V11 — optional legacy delivery-trigger cleanup
-- Purpose: V11 creates delivery_jobs directly in the backend when a Food,
-- Grocery, or Pharmacy order is placed. Old database triggers that also
-- create delivery_jobs on ready_for_pickup can create duplicate jobs.
--
-- This script is intentionally conservative: it only drops non-internal
-- triggers on food_orders / commerce_orders whose trigger FUNCTION source
-- explicitly references BOTH "delivery_jobs" and "ready_for_pickup".
--
-- Recommended: stop the Safari backend/admin briefly before running.

begin;

set local lock_timeout = '10s';
set local statement_timeout = '30s';

-- Show candidates first in the SQL result stream.
select
  n.nspname as schema_name,
  c.relname as table_name,
  t.tgname as trigger_name,
  p.proname as function_name
from pg_trigger t
join pg_class c on c.oid = t.tgrelid
join pg_namespace n on n.oid = c.relnamespace
join pg_proc p on p.oid = t.tgfoid
where not t.tgisinternal
  and n.nspname = 'public'
  and c.relname in ('food_orders', 'commerce_orders')
  and lower(pg_get_functiondef(p.oid)) like '%delivery_jobs%'
  and lower(pg_get_functiondef(p.oid)) like '%ready_for_pickup%'
order by c.relname, t.tgname;

-- Drop only the legacy delivery-job trigger(s) identified above.
do $$
declare
  r record;
begin
  for r in
    select
      n.nspname as schema_name,
      c.relname as table_name,
      t.tgname as trigger_name
    from pg_trigger t
    join pg_class c on c.oid = t.tgrelid
    join pg_namespace n on n.oid = c.relnamespace
    join pg_proc p on p.oid = t.tgfoid
    where not t.tgisinternal
      and n.nspname = 'public'
      and c.relname in ('food_orders', 'commerce_orders')
      and lower(pg_get_functiondef(p.oid)) like '%delivery_jobs%'
      and lower(pg_get_functiondef(p.oid)) like '%ready_for_pickup%'
  loop
    execute format(
      'drop trigger if exists %I on %I.%I',
      r.trigger_name,
      r.schema_name,
      r.table_name
    );
  end loop;
end
$$;

commit;

notify pgrst, 'reload schema';

-- Verification: should normally return zero rows after cleanup.
select
  n.nspname as schema_name,
  c.relname as table_name,
  t.tgname as trigger_name,
  p.proname as function_name
from pg_trigger t
join pg_class c on c.oid = t.tgrelid
join pg_namespace n on n.oid = c.relnamespace
join pg_proc p on p.oid = t.tgfoid
where not t.tgisinternal
  and n.nspname = 'public'
  and c.relname in ('food_orders', 'commerce_orders')
  and lower(pg_get_functiondef(p.oid)) like '%delivery_jobs%'
  and lower(pg_get_functiondef(p.oid)) like '%ready_for_pickup%'
order by c.relname, t.tgname;
