begin;

-- ============================================================================
-- Safari Phase 09
-- Trip completion financial receipt + passenger/driver rating
-- ============================================================================

create table if not exists public.ride_receipts (
  id uuid primary key default gen_random_uuid(),
  ride_id uuid not null unique references public.rides(id) on delete cascade,

  passenger_id uuid not null references public.profiles(id) on delete restrict,
  driver_id uuid references public.profiles(id) on delete set null,

  currency_code text not null,

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

  payment_method text not null
    check (payment_method in ('cash', 'wallet', 'card')),

  payment_status text not null
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

  issued_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists ride_receipts_passenger_idx
  on public.ride_receipts(passenger_id, issued_at desc);

create index if not exists ride_receipts_driver_idx
  on public.ride_receipts(driver_id, issued_at desc);

create table if not exists public.ride_ratings (
  id uuid primary key default gen_random_uuid(),
  ride_id uuid not null references public.rides(id) on delete cascade,

  reviewer_id uuid not null references public.profiles(id) on delete cascade,
  reviewee_id uuid not null references public.profiles(id) on delete cascade,

  reviewer_type text not null
    check (reviewer_type in ('passenger', 'driver')),

  rating smallint not null
    check (rating between 1 and 5),

  comment text,

  tags text[] not null default '{}',

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  unique (ride_id, reviewer_id)
);

create index if not exists ride_ratings_reviewee_idx
  on public.ride_ratings(reviewee_id, created_at desc);

alter table public.profiles
  add column if not exists average_rating numeric(4,2) not null default 5.00,
  add column if not exists rating_count integer not null default 0;

create or replace function public.refresh_user_rating(target_user_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  avg_value numeric(4,2);
  count_value integer;
begin
  select
    coalesce(round(avg(rating)::numeric, 2), 5.00),
    count(*)::integer
  into avg_value, count_value
  from public.ride_ratings
  where reviewee_id = target_user_id;

  update public.profiles
  set
    average_rating = avg_value,
    rating_count = count_value,
    updated_at = now()
  where id = target_user_id;
end;
$$;

create or replace function public.after_ride_rating_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  perform public.refresh_user_rating(coalesce(new.reviewee_id, old.reviewee_id));
  return coalesce(new, old);
end;
$$;

drop trigger if exists ride_rating_refresh_user
  on public.ride_ratings;

create trigger ride_rating_refresh_user
after insert or update or delete
on public.ride_ratings
for each row execute procedure public.after_ride_rating_change();

alter table public.ride_receipts enable row level security;
alter table public.ride_ratings enable row level security;

drop policy if exists "ride participants can read receipt"
  on public.ride_receipts;

create policy "ride participants can read receipt"
on public.ride_receipts
for select
to authenticated
using (
  auth.uid() = passenger_id
  or auth.uid() = driver_id
);

drop policy if exists "ride participants can read ratings"
  on public.ride_ratings;

create policy "ride participants can read ratings"
on public.ride_ratings
for select
to authenticated
using (
  auth.uid() = reviewer_id
  or auth.uid() = reviewee_id
);

grant select on public.ride_receipts to authenticated;
grant select on public.ride_ratings to authenticated;

commit;
