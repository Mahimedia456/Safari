begin;

create extension if not exists pgcrypto;

create table if not exists public.auth_otp_challenges (
  id uuid primary key default gen_random_uuid(),
  phone text not null,
  purpose text not null,
  otp_hash text not null,
  attempts integer not null default 0,
  max_attempts integer not null default 5,
  expires_at timestamptz not null,
  verified_at timestamptz,
  consumed_at timestamptz,
  reset_token_hash text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.auth_otp_challenges
  add column if not exists phone text,
  add column if not exists purpose text,
  add column if not exists otp_hash text,
  add column if not exists attempts integer not null default 0,
  add column if not exists max_attempts integer not null default 5,
  add column if not exists expires_at timestamptz,
  add column if not exists verified_at timestamptz,
  add column if not exists consumed_at timestamptz,
  add column if not exists reset_token_hash text,
  add column if not exists metadata jsonb not null default '{}'::jsonb,
  add column if not exists created_at timestamptz not null default now();

create index if not exists auth_otp_challenges_phone_purpose_created_idx
  on public.auth_otp_challenges(phone, purpose, created_at desc);

create index if not exists auth_otp_challenges_reset_token_hash_idx
  on public.auth_otp_challenges(reset_token_hash)
  where reset_token_hash is not null;

-- Safari mobile uses one Pakistan phone number per profile.
create unique index if not exists profiles_phone_unique_idx
  on public.profiles(phone)
  where phone is not null;

notify pgrst, 'reload schema';

commit;
