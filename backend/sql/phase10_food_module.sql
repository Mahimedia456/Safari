begin;

-- ============================================================================
-- Safari Phase 10
-- Food marketplace: restaurants, menus, cart checkout/orders, merchant workflow
-- ============================================================================

create table if not exists public.food_restaurants (
  id uuid primary key default gen_random_uuid(),

  merchant_user_id uuid not null references public.profiles(id) on delete restrict,
  city_id uuid not null references public.service_cities(id) on delete restrict,

  name text not null,
  slug text not null unique,
  description text,
  cuisine text not null,

  logo_url text,
  cover_url text,

  address text not null,
  latitude double precision,
  longitude double precision,

  phone text,

  rating numeric(4,2) not null default 5.00,
  rating_count integer not null default 0,

  minimum_order numeric(12,2) not null default 0,
  delivery_fee numeric(12,2) not null default 0,
  estimated_delivery_min integer not null default 25,
  estimated_delivery_max integer not null default 40,

  is_featured boolean not null default false,
  is_open boolean not null default true,
  is_active boolean not null default true,

  opening_time time,
  closing_time time,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists food_restaurants_city_idx
  on public.food_restaurants(city_id, is_active, is_open);

create index if not exists food_restaurants_merchant_idx
  on public.food_restaurants(merchant_user_id);

create table if not exists public.food_menu_sections (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.food_restaurants(id) on delete cascade,

  name text not null,
  description text,
  sort_order integer not null default 0,
  is_active boolean not null default true,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  unique (restaurant_id, name)
);

create index if not exists food_menu_sections_restaurant_idx
  on public.food_menu_sections(restaurant_id, sort_order);

create table if not exists public.food_menu_items (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.food_restaurants(id) on delete cascade,
  section_id uuid references public.food_menu_sections(id) on delete set null,

  name text not null,
  description text,

  price numeric(12,2) not null check (price >= 0),
  compare_at_price numeric(12,2),

  image_url text,

  is_vegetarian boolean not null default false,
  is_popular boolean not null default false,
  is_available boolean not null default true,

  preparation_minutes integer not null default 15,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists food_menu_items_restaurant_idx
  on public.food_menu_items(restaurant_id, is_available);

create index if not exists food_menu_items_section_idx
  on public.food_menu_items(section_id);

create table if not exists public.food_orders (
  id uuid primary key default gen_random_uuid(),

  order_number text not null unique,

  passenger_id uuid not null references public.profiles(id) on delete restrict,
  restaurant_id uuid not null references public.food_restaurants(id) on delete restrict,

  delivery_address_id uuid references public.saved_addresses(id) on delete set null,

  delivery_address text not null,
  delivery_latitude double precision,
  delivery_longitude double precision,

  status text not null default 'placed'
    check (
      status in (
        'placed',
        'confirmed',
        'preparing',
        'ready_for_pickup',
        'picked_up',
        'on_the_way',
        'delivered',
        'cancelled_by_customer',
        'cancelled_by_merchant',
        'cancelled_by_admin'
      )
    ),

  currency_code text not null default 'PKR',

  items_subtotal numeric(12,2) not null default 0,
  delivery_fee numeric(12,2) not null default 0,
  service_fee numeric(12,2) not null default 0,
  discount_amount numeric(12,2) not null default 0,
  total numeric(12,2) not null default 0,

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

  customer_note text,

  placed_at timestamptz not null default now(),
  confirmed_at timestamptz,
  delivered_at timestamptz,
  cancelled_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists food_orders_passenger_idx
  on public.food_orders(passenger_id, created_at desc);

create index if not exists food_orders_restaurant_idx
  on public.food_orders(restaurant_id, status, created_at desc);

create table if not exists public.food_order_items (
  id uuid primary key default gen_random_uuid(),

  order_id uuid not null references public.food_orders(id) on delete cascade,
  menu_item_id uuid references public.food_menu_items(id) on delete set null,

  item_name text not null,
  unit_price numeric(12,2) not null,
  quantity integer not null check (quantity between 1 and 99),
  line_total numeric(12,2) not null,

  note text,

  created_at timestamptz not null default now()
);

create index if not exists food_order_items_order_idx
  on public.food_order_items(order_id);

create table if not exists public.food_order_status_events (
  id uuid primary key default gen_random_uuid(),

  order_id uuid not null references public.food_orders(id) on delete cascade,

  from_status text,
  to_status text not null,

  actor_type text not null
    check (actor_type in ('customer', 'merchant', 'admin', 'system')),

  actor_user_id uuid references public.profiles(id) on delete set null,
  note text,

  created_at timestamptz not null default now()
);

create index if not exists food_order_status_events_order_idx
  on public.food_order_status_events(order_id, created_at asc);

create sequence if not exists public.safari_food_order_number_seq start 200001;

create or replace function public.generate_safari_food_order_number()
returns text
language sql
as $$
  select 'SFD-' || to_char(now(), 'YYMMDD') || '-' ||
         lpad(nextval('public.safari_food_order_number_seq')::text, 6, '0');
$$;

alter table public.food_restaurants enable row level security;
alter table public.food_menu_sections enable row level security;
alter table public.food_menu_items enable row level security;
alter table public.food_orders enable row level security;
alter table public.food_order_items enable row level security;
alter table public.food_order_status_events enable row level security;

drop policy if exists "authenticated can read active restaurants"
  on public.food_restaurants;

create policy "authenticated can read active restaurants"
on public.food_restaurants
for select
to authenticated
using (is_active = true);

drop policy if exists "authenticated can read active menu sections"
  on public.food_menu_sections;

create policy "authenticated can read active menu sections"
on public.food_menu_sections
for select
to authenticated
using (is_active = true);

drop policy if exists "authenticated can read available menu items"
  on public.food_menu_items;

create policy "authenticated can read available menu items"
on public.food_menu_items
for select
to authenticated
using (is_available = true);

drop policy if exists "customers can read own food orders"
  on public.food_orders;

create policy "customers can read own food orders"
on public.food_orders
for select
to authenticated
using (auth.uid() = passenger_id);

drop policy if exists "customers can read own food order items"
  on public.food_order_items;

create policy "customers can read own food order items"
on public.food_order_items
for select
to authenticated
using (
  exists (
    select 1
    from public.food_orders o
    where o.id = food_order_items.order_id
      and o.passenger_id = auth.uid()
  )
);

drop policy if exists "customers can read own food order events"
  on public.food_order_status_events;

create policy "customers can read own food order events"
on public.food_order_status_events
for select
to authenticated
using (
  exists (
    select 1
    from public.food_orders o
    where o.id = food_order_status_events.order_id
      and o.passenger_id = auth.uid()
  )
);

grant select on public.food_restaurants to authenticated;
grant select on public.food_menu_sections to authenticated;
grant select on public.food_menu_items to authenticated;
grant select on public.food_orders to authenticated;
grant select on public.food_order_items to authenticated;
grant select on public.food_order_status_events to authenticated;

commit;
