begin;

-- ---------------------------------------------------------------------------
-- Phase 03: passenger profile, saved addresses, preferences, emergency contacts
-- Safe to run after Phase 02.
-- ---------------------------------------------------------------------------

-- Extend profiles with passenger-facing fields.
alter table public.profiles
  add column if not exists date_of_birth date,
  add column if not exists gender text,
  add column if not exists preferred_language text not null default 'en',
  add column if not exists marketing_opt_in boolean not null default false,
  add column if not exists last_seen_at timestamptz;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'profiles_gender_check'
  ) then
    alter table public.profiles
      add constraint profiles_gender_check
      check (
        gender is null
        or gender in ('male', 'female', 'other', 'prefer_not_to_say')
      );
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'profiles_preferred_language_check'
  ) then
    alter table public.profiles
      add constraint profiles_preferred_language_check
      check (preferred_language in ('en', 'ur', 'de'));
  end if;
end $$;

create table if not exists public.saved_addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,

  label text not null,
  address_line text not null,
  city text not null,
  area text,
  postal_code text,
  country_code text not null default 'PK',
  latitude double precision,
  longitude double precision,

  instructions text,
  is_default boolean not null default false,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint saved_addresses_label_length
    check (char_length(label) between 1 and 40),

  constraint saved_addresses_country_check
    check (country_code in ('PK', 'DE'))
);

create index if not exists saved_addresses_user_id_idx
  on public.saved_addresses(user_id);

create index if not exists saved_addresses_user_default_idx
  on public.saved_addresses(user_id, is_default);

create table if not exists public.user_preferences (
  user_id uuid primary key references public.profiles(id) on delete cascade,

  theme text not null default 'system',
  language text not null default 'en',

  ride_updates boolean not null default true,
  order_updates boolean not null default true,
  promotion_notifications boolean not null default true,
  email_notifications boolean not null default true,
  sms_notifications boolean not null default true,

  location_permission text not null default 'ask',
  analytics_opt_in boolean not null default true,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint user_preferences_theme_check
    check (theme in ('system', 'light', 'dark')),

  constraint user_preferences_language_check
    check (language in ('en', 'ur', 'de')),

  constraint user_preferences_location_check
    check (location_permission in ('ask', 'allowed', 'denied'))
);

create table if not exists public.emergency_contacts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,

  name text not null,
  phone text not null,
  relationship text,
  is_primary boolean not null default false,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists emergency_contacts_user_id_idx
  on public.emergency_contacts(user_id);

-- One default address per user.
create unique index if not exists saved_addresses_one_default_per_user
  on public.saved_addresses(user_id)
  where is_default = true;

-- One primary emergency contact per user.
create unique index if not exists emergency_contacts_one_primary_per_user
  on public.emergency_contacts(user_id)
  where is_primary = true;

-- Automatically create preferences for every new profile.
create or replace function public.handle_new_profile_preferences()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.user_preferences (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_profile_created_create_preferences
  on public.profiles;

create trigger on_profile_created_create_preferences
after insert
on public.profiles
for each row execute procedure public.handle_new_profile_preferences();

-- Backfill preferences for existing users.
insert into public.user_preferences (user_id)
select id
from public.profiles
on conflict (user_id) do nothing;

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------

alter table public.saved_addresses enable row level security;
alter table public.user_preferences enable row level security;
alter table public.emergency_contacts enable row level security;

drop policy if exists "users can read own saved addresses"
  on public.saved_addresses;

create policy "users can read own saved addresses"
on public.saved_addresses
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "users can read own preferences"
  on public.user_preferences;

create policy "users can read own preferences"
on public.user_preferences
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "users can read own emergency contacts"
  on public.emergency_contacts;

create policy "users can read own emergency contacts"
on public.emergency_contacts
for select
to authenticated
using (auth.uid() = user_id);

grant select on public.saved_addresses to authenticated;
grant select on public.user_preferences to authenticated;
grant select on public.emergency_contacts to authenticated;

-- Business writes remain backend-only through the server secret/service role.

commit;
