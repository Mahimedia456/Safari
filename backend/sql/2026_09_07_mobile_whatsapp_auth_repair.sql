-- Safari mobile WhatsApp authentication repair
-- Idempotent Supabase/Postgres migration.

create extension if not exists pgcrypto;

create table if not exists public.auth_otp_challenges (
  id uuid primary key default gen_random_uuid(),
  phone text not null,
  purpose text not null check (purpose in ('signup', 'forgot_password')),
  otp_hash text not null,
  attempts integer not null default 0,
  max_attempts integer not null default 5,
  expires_at timestamptz not null,
  verified_at timestamptz null,
  consumed_at timestamptz null,
  reset_token_hash text null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
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
  add column if not exists created_at timestamptz not null default now(),
  add column if not exists updated_at timestamptz not null default now();

create index if not exists auth_otp_challenges_phone_purpose_created_idx
  on public.auth_otp_challenges (phone, purpose, created_at desc);

create index if not exists auth_otp_challenges_reset_token_idx
  on public.auth_otp_challenges (reset_token_hash)
  where reset_token_hash is not null;

alter table public.auth_otp_challenges enable row level security;

create table if not exists public.whatsapp_webhook_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null,
  phone_number_id text null,
  whatsapp_business_account_id text null,
  message_id text null,
  status text null,
  recipient_id text null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists whatsapp_webhook_events_message_idx
  on public.whatsapp_webhook_events (message_id, created_at desc);

create index if not exists whatsapp_webhook_events_created_idx
  on public.whatsapp_webhook_events (created_at desc);

alter table public.whatsapp_webhook_events enable row level security;
