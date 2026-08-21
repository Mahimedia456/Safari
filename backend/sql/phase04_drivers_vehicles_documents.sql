begin;

-- ============================================================================
-- Safari Phase 04
-- Driver profiles, vehicles, documents and verification workflow
-- Safe to run after Phase 02 + Phase 03.
-- ============================================================================

create table if not exists public.driver_profiles (
  user_id uuid primary key references public.profiles(id) on delete cascade,

  onboarding_status text not null default 'draft'
    check (
      onboarding_status in (
        'draft',
        'submitted',
        'under_review',
        'approved',
        'rejected',
        'suspended'
      )
    ),

  verification_status text not null default 'pending'
    check (
      verification_status in (
        'pending',
        'in_review',
        'verified',
        'rejected',
        'expired'
      )
    ),

  driving_experience_years integer not null default 0
    check (driving_experience_years between 0 and 70),

  cnic_number text,
  national_id_number text,
  driving_license_number text,
  driving_license_expiry date,

  home_city text,
  operating_city text,
  service_region text,

  emergency_contact_name text,
  emergency_contact_phone text,

  is_online boolean not null default false,
  is_available boolean not null default false,

  approval_note text,
  rejection_reason text,

  approved_at timestamptz,
  approved_by uuid references public.profiles(id) on delete set null,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists driver_profiles_license_unique
  on public.driver_profiles(driving_license_number)
  where driving_license_number is not null;

create index if not exists driver_profiles_status_idx
  on public.driver_profiles(onboarding_status, verification_status);

create index if not exists driver_profiles_city_idx
  on public.driver_profiles(operating_city);

create table if not exists public.driver_vehicles (
  id uuid primary key default gen_random_uuid(),
  driver_id uuid not null references public.profiles(id) on delete cascade,

  make text not null,
  model text not null,
  year integer not null
    check (year between 1990 and 2100),

  color text not null,
  plate_number text not null,
  vehicle_type text not null default 'car'
    check (
      vehicle_type in (
        'car',
        'bike',
        'rickshaw',
        'van'
      )
    ),

  ride_category text not null default 'economy'
    check (
      ride_category in (
        'economy',
        'comfort',
        'premium',
        'bike',
        'rickshaw',
        'xl'
      )
    ),

  seats integer not null default 4
    check (seats between 1 and 12),

  registration_number text,
  registration_expiry date,
  insurance_number text,
  insurance_expiry date,

  verification_status text not null default 'pending'
    check (
      verification_status in (
        'pending',
        'in_review',
        'verified',
        'rejected',
        'expired'
      )
    ),

  is_primary boolean not null default false,
  is_active boolean not null default true,

  rejection_reason text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists driver_vehicles_plate_unique
  on public.driver_vehicles(lower(plate_number));

create index if not exists driver_vehicles_driver_idx
  on public.driver_vehicles(driver_id);

create unique index if not exists driver_vehicles_one_primary
  on public.driver_vehicles(driver_id)
  where is_primary = true and is_active = true;

create table if not exists public.driver_documents (
  id uuid primary key default gen_random_uuid(),
  driver_id uuid not null references public.profiles(id) on delete cascade,
  vehicle_id uuid references public.driver_vehicles(id) on delete cascade,

  document_type text not null
    check (
      document_type in (
        'profile_photo',
        'cnic_front',
        'cnic_back',
        'national_id_front',
        'national_id_back',
        'driving_license_front',
        'driving_license_back',
        'vehicle_registration_front',
        'vehicle_registration_back',
        'vehicle_insurance',
        'vehicle_photo_front',
        'vehicle_photo_back',
        'vehicle_photo_left',
        'vehicle_photo_right',
        'police_clearance',
        'other'
      )
    ),

  storage_bucket text not null default 'driver-documents',
  storage_path text not null,

  status text not null default 'pending'
    check (
      status in (
        'pending',
        'in_review',
        'verified',
        'rejected',
        'expired'
      )
    ),

  expiry_date date,
  rejection_reason text,

  reviewed_at timestamptz,
  reviewed_by uuid references public.profiles(id) on delete set null,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists driver_documents_driver_idx
  on public.driver_documents(driver_id);

create index if not exists driver_documents_vehicle_idx
  on public.driver_documents(vehicle_id);

create index if not exists driver_documents_status_idx
  on public.driver_documents(status);

create table if not exists public.driver_verification_events (
  id uuid primary key default gen_random_uuid(),
  driver_id uuid not null references public.profiles(id) on delete cascade,
  vehicle_id uuid references public.driver_vehicles(id) on delete set null,
  document_id uuid references public.driver_documents(id) on delete set null,

  event_type text not null
    check (
      event_type in (
        'submitted',
        'moved_to_review',
        'document_verified',
        'document_rejected',
        'vehicle_verified',
        'vehicle_rejected',
        'driver_approved',
        'driver_rejected',
        'driver_suspended',
        'driver_reactivated'
      )
    ),

  note text,
  actor_user_id uuid references public.profiles(id) on delete set null,

  created_at timestamptz not null default now()
);

create index if not exists driver_verification_events_driver_idx
  on public.driver_verification_events(driver_id, created_at desc);

-- ---------------------------------------------------------------------------
-- Helper trigger: auto-create driver profile for driver accounts.
-- ---------------------------------------------------------------------------

create or replace function public.ensure_driver_profile()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.account_type = 'driver' then
    insert into public.driver_profiles (user_id)
    values (new.id)
    on conflict (user_id) do nothing;
  end if;

  return new;
end;
$$;

drop trigger if exists on_profile_create_driver_profile
  on public.profiles;

create trigger on_profile_create_driver_profile
after insert or update of account_type
on public.profiles
for each row execute procedure public.ensure_driver_profile();

insert into public.driver_profiles (user_id)
select id
from public.profiles
where account_type = 'driver'
on conflict (user_id) do nothing;

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------

alter table public.driver_profiles enable row level security;
alter table public.driver_vehicles enable row level security;
alter table public.driver_documents enable row level security;
alter table public.driver_verification_events enable row level security;

drop policy if exists "drivers can read own driver profile"
  on public.driver_profiles;

create policy "drivers can read own driver profile"
on public.driver_profiles
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "drivers can read own vehicles"
  on public.driver_vehicles;

create policy "drivers can read own vehicles"
on public.driver_vehicles
for select
to authenticated
using (auth.uid() = driver_id);

drop policy if exists "drivers can read own documents"
  on public.driver_documents;

create policy "drivers can read own documents"
on public.driver_documents
for select
to authenticated
using (auth.uid() = driver_id);

drop policy if exists "drivers can read own verification events"
  on public.driver_verification_events;

create policy "drivers can read own verification events"
on public.driver_verification_events
for select
to authenticated
using (auth.uid() = driver_id);

grant select on public.driver_profiles to authenticated;
grant select on public.driver_vehicles to authenticated;
grant select on public.driver_documents to authenticated;
grant select on public.driver_verification_events to authenticated;

-- Writes intentionally remain backend-only using the Safari server secret.

commit;
