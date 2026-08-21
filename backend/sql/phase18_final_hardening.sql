begin;

-- ============================================================================
-- Safari Phase 18
-- Final integration hardening, schema consistency and QA helpers
-- ============================================================================

-- Prevent negative financial aggregates even if an upstream bug occurs.
alter table public.wallet_accounts
  drop constraint if exists wallet_accounts_available_balance_nonnegative;

alter table public.wallet_accounts
  add constraint wallet_accounts_available_balance_nonnegative
  check (available_balance >= 0);

alter table public.wallet_accounts
  drop constraint if exists wallet_accounts_pending_balance_nonnegative;

alter table public.wallet_accounts
  add constraint wallet_accounts_pending_balance_nonnegative
  check (pending_balance >= 0);

-- Indexes used heavily by the integrated app.
create index if not exists profiles_account_type_status_idx
  on public.profiles(account_type, status);

create index if not exists rides_active_passenger_idx
  on public.rides(passenger_id, ride_status, created_at desc);

create index if not exists rides_active_driver_idx
  on public.rides(driver_id, ride_status, created_at desc);

create index if not exists notifications_unread_idx
  on public.notifications(user_id, created_at desc)
  where is_read = false;

create index if not exists food_orders_status_idx
  on public.food_orders(status, created_at desc);

create index if not exists commerce_orders_type_status_idx
  on public.commerce_orders(order_type, status, created_at desc);

create index if not exists service_bookings_status_idx
  on public.service_bookings(booking_status, created_at desc);

-- Generic updated_at helper.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Apply updated_at triggers to key mutable tables.
do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'profiles',
    'driver_profiles',
    'driver_vehicles',
    'user_preferences',
    'ride_pricing_rules',
    'rides',
    'driver_locations',
    'food_restaurants',
    'food_menu_sections',
    'food_menu_items',
    'food_orders',
    'commerce_stores',
    'commerce_products',
    'commerce_orders',
    'service_providers',
    'provider_services',
    'service_bookings',
    'merchant_profiles',
    'wallet_accounts',
    'payment_records',
    'device_tokens',
    'media_assets',
    'operations_incidents'
  ]
  loop
    execute format(
      'drop trigger if exists set_updated_at_%I on public.%I',
      table_name,
      table_name
    );

    execute format(
      'create trigger set_updated_at_%I
       before update on public.%I
       for each row execute procedure public.set_updated_at()',
      table_name,
      table_name
    );
  end loop;
end $$;

-- Helpful health/security view for backend diagnostics.
create or replace view public.safari_schema_health as
select
  (select count(*) from public.profiles) as profiles,
  (select count(*) from public.rides) as rides,
  (select count(*) from public.food_orders) as food_orders,
  (select count(*) from public.commerce_orders) as commerce_orders,
  (select count(*) from public.service_bookings) as service_bookings,
  (select count(*) from public.notifications) as notifications,
  now() as checked_at;

revoke all on public.safari_schema_health from anon, authenticated;

commit;
