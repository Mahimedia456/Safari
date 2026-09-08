-- Safari V12 delivery_jobs schema diagnostic.
-- V12 runtime intentionally does NOT depend on delivery_jobs.estimated_total.

select
  column_name,
  data_type,
  is_nullable
from information_schema.columns
where table_schema = 'public'
  and table_name = 'delivery_jobs'
order by ordinal_position;

notify pgrst, 'reload schema';
