begin;

-- ============================================================================
-- Safari Phase 11
-- Grocery + Pharmacy marketplaces
-- ============================================================================

create table if not exists public.commerce_stores (
  id uuid primary key default gen_random_uuid(),

  merchant_user_id uuid not null references public.profiles(id) on delete restrict,
  city_id uuid not null references public.service_cities(id) on delete restrict,

  store_type text not null
    check (store_type in ('grocery', 'pharmacy')),

  name text not null,
  slug text not null unique,
  description text,

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
  estimated_delivery_max integer not null default 45,

  is_featured boolean not null default false,
  is_open boolean not null default true,
  is_active boolean not null default true,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists commerce_stores_type_city_idx
  on public.commerce_stores(store_type, city_id, is_active, is_open);

create index if not exists commerce_stores_merchant_idx
  on public.commerce_stores(merchant_user_id);

create table if not exists public.commerce_categories (
  id uuid primary key default gen_random_uuid(),

  store_type text not null
    check (store_type in ('grocery', 'pharmacy')),

  name text not null,
  slug text not null,
  icon_key text,
  sort_order integer not null default 0,
  is_active boolean not null default true,

  created_at timestamptz not null default now(),

  unique (store_type, slug)
);

create table if not exists public.commerce_products (
  id uuid primary key default gen_random_uuid(),

  store_id uuid not null references public.commerce_stores(id) on delete cascade,
  category_id uuid references public.commerce_categories(id) on delete set null,

  sku text,
  name text not null,
  description text,

  unit_label text,
  image_url text,

  price numeric(12,2) not null check (price >= 0),
  compare_at_price numeric(12,2),

  stock_quantity integer not null default 0,
  low_stock_threshold integer not null default 5,

  requires_prescription boolean not null default false,
  age_restricted boolean not null default false,

  is_featured boolean not null default false,
  is_available boolean not null default true,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists commerce_products_store_idx
  on public.commerce_products(store_id, is_available);

create index if not exists commerce_products_category_idx
  on public.commerce_products(category_id);

create table if not exists public.commerce_orders (
  id uuid primary key default gen_random_uuid(),

  order_number text not null unique,

  passenger_id uuid not null references public.profiles(id) on delete restrict,
  store_id uuid not null references public.commerce_stores(id) on delete restrict,

  order_type text not null
    check (order_type in ('grocery', 'pharmacy')),

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

  prescription_status text not null default 'not_required'
    check (
      prescription_status in (
        'not_required',
        'required',
        'uploaded',
        'under_review',
        'approved',
        'rejected'
      )
    ),

  prescription_storage_path text,

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

create index if not exists commerce_orders_passenger_idx
  on public.commerce_orders(passenger_id, created_at desc);

create index if not exists commerce_orders_store_idx
  on public.commerce_orders(store_id, status, created_at desc);

create table if not exists public.commerce_order_items (
  id uuid primary key default gen_random_uuid(),

  order_id uuid not null references public.commerce_orders(id) on delete cascade,
  product_id uuid references public.commerce_products(id) on delete set null,

  product_name text not null,
  unit_label text,
  unit_price numeric(12,2) not null,
  quantity integer not null check (quantity between 1 and 99),
  line_total numeric(12,2) not null,

  note text,

  created_at timestamptz not null default now()
);

create index if not exists commerce_order_items_order_idx
  on public.commerce_order_items(order_id);

create table if not exists public.commerce_order_status_events (
  id uuid primary key default gen_random_uuid(),

  order_id uuid not null references public.commerce_orders(id) on delete cascade,

  from_status text,
  to_status text not null,

  actor_type text not null
    check (actor_type in ('customer', 'merchant', 'admin', 'system')),

  actor_user_id uuid references public.profiles(id) on delete set null,
  note text,

  created_at timestamptz not null default now()
);

create index if not exists commerce_order_status_events_order_idx
  on public.commerce_order_status_events(order_id, created_at asc);

create sequence if not exists public.safari_commerce_order_number_seq start 300001;

create or replace function public.generate_safari_commerce_order_number(
  prefix text
)
returns text
language sql
as $$
  select prefix || '-' || to_char(now(), 'YYMMDD') || '-' ||
         lpad(nextval('public.safari_commerce_order_number_seq')::text, 6, '0');
$$;

alter table public.commerce_stores enable row level security;
alter table public.commerce_categories enable row level security;
alter table public.commerce_products enable row level security;
alter table public.commerce_orders enable row level security;
alter table public.commerce_order_items enable row level security;
alter table public.commerce_order_status_events enable row level security;

drop policy if exists "authenticated can read active commerce stores"
  on public.commerce_stores;

create policy "authenticated can read active commerce stores"
on public.commerce_stores
for select
to authenticated
using (is_active = true);

drop policy if exists "authenticated can read active commerce categories"
  on public.commerce_categories;

create policy "authenticated can read active commerce categories"
on public.commerce_categories
for select
to authenticated
using (is_active = true);

drop policy if exists "authenticated can read available commerce products"
  on public.commerce_products;

create policy "authenticated can read available commerce products"
on public.commerce_products
for select
to authenticated
using (is_available = true);

drop policy if exists "customers can read own commerce orders"
  on public.commerce_orders;

create policy "customers can read own commerce orders"
on public.commerce_orders
for select
to authenticated
using (auth.uid() = passenger_id);

drop policy if exists "customers can read own commerce order items"
  on public.commerce_order_items;

create policy "customers can read own commerce order items"
on public.commerce_order_items
for select
to authenticated
using (
  exists (
    select 1
    from public.commerce_orders o
    where o.id = commerce_order_items.order_id
      and o.passenger_id = auth.uid()
  )
);

drop policy if exists "customers can read own commerce order events"
  on public.commerce_order_status_events;

create policy "customers can read own commerce order events"
on public.commerce_order_status_events
for select
to authenticated
using (
  exists (
    select 1
    from public.commerce_orders o
    where o.id = commerce_order_status_events.order_id
      and o.passenger_id = auth.uid()
  )
);

grant select on public.commerce_stores to authenticated;
grant select on public.commerce_categories to authenticated;
grant select on public.commerce_products to authenticated;
grant select on public.commerce_orders to authenticated;
grant select on public.commerce_order_items to authenticated;
grant select on public.commerce_order_status_events to authenticated;

commit;
