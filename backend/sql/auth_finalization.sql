begin;

create unique index if not exists profiles_email_unique
  on public.profiles(lower(email))
  where email is not null;

create unique index if not exists profiles_phone_unique
  on public.profiles(phone)
  where phone is not null;

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  metadata jsonb;
  resolved_account_type text;
begin
  metadata := coalesce(new.raw_user_meta_data, '{}'::jsonb);

  resolved_account_type :=
    coalesce(
      nullif(metadata ->> 'account_type', ''),
      'passenger'
    );

  insert into public.profiles (
    id,
    full_name,
    email,
    phone,
    account_type,
    app_mode,
    admin_role,
    merchant_type,
    status,
    country_code,
    is_onboarded
  )
  values (
    new.id,
    nullif(metadata ->> 'full_name', ''),
    coalesce(new.email, nullif(metadata ->> 'email', '')),
    new.phone,
    resolved_account_type,
    case
      when resolved_account_type in ('passenger', 'driver')
      then coalesce(nullif(metadata ->> 'app_mode', ''), resolved_account_type)
      else null
    end,
    nullif(metadata ->> 'admin_role', ''),
    nullif(metadata ->> 'merchant_type', ''),
    case
      when resolved_account_type = 'merchant' then 'pending'
      else 'active'
    end,
    coalesce(nullif(metadata ->> 'country_code', ''), 'PK'),
    false
  )
  on conflict (id) do update
  set
    full_name = coalesce(excluded.full_name, public.profiles.full_name),
    email = coalesce(excluded.email, public.profiles.email),
    phone = coalesce(excluded.phone, public.profiles.phone),
    account_type = excluded.account_type,
    app_mode = coalesce(excluded.app_mode, public.profiles.app_mode),
    admin_role = coalesce(excluded.admin_role, public.profiles.admin_role),
    merchant_type = coalesce(excluded.merchant_type, public.profiles.merchant_type),
    country_code = excluded.country_code,
    updated_at = now();

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert or update of raw_user_meta_data, email, phone
on auth.users
for each row execute procedure public.handle_new_auth_user();

alter table public.profiles enable row level security;

drop policy if exists "authenticated can read own profile"
  on public.profiles;

create policy "authenticated can read own profile"
on public.profiles
for select
to authenticated
using (auth.uid() = id);

grant select on public.profiles to authenticated;

commit;
