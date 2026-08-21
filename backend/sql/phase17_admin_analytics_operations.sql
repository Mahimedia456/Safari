begin;

-- ============================================================================
-- Safari Phase 17
-- Admin Dashboard + Analytics + Reports + Operations
-- ============================================================================

create table if not exists public.admin_audit_logs (
  id uuid primary key default gen_random_uuid(),

  actor_user_id uuid references public.profiles(id) on delete set null,

  action text not null,
  entity_type text,
  entity_id uuid,

  ip_address text,
  user_agent text,

  metadata jsonb not null default '{}'::jsonb,

  created_at timestamptz not null default now()
);

create index if not exists admin_audit_logs_actor_idx
  on public.admin_audit_logs(actor_user_id, created_at desc);

create index if not exists admin_audit_logs_entity_idx
  on public.admin_audit_logs(entity_type, entity_id, created_at desc);

create table if not exists public.platform_daily_metrics (
  metric_date date primary key,

  passenger_count integer not null default 0,
  driver_count integer not null default 0,
  merchant_count integer not null default 0,

  rides_created integer not null default 0,
  rides_completed integer not null default 0,
  rides_cancelled integer not null default 0,

  food_orders integer not null default 0,
  grocery_orders integer not null default 0,
  pharmacy_orders integer not null default 0,
  service_bookings integer not null default 0,

  gross_order_value numeric(16,2) not null default 0,
  ride_gmv numeric(16,2) not null default 0,
  commerce_gmv numeric(16,2) not null default 0,
  services_gmv numeric(16,2) not null default 0,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.operations_incidents (
  id uuid primary key default gen_random_uuid(),

  incident_type text not null
    check (
      incident_type in (
        'ride',
        'driver',
        'passenger',
        'merchant',
        'order',
        'payment',
        'system'
      )
    ),

  severity text not null default 'medium'
    check (severity in ('low','medium','high','critical')),

  title text not null,
  description text,

  entity_type text,
  entity_id uuid,

  status text not null default 'open'
    check (status in ('open','investigating','resolved','dismissed')),

  assigned_admin_id uuid references public.profiles(id) on delete set null,

  resolved_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists operations_incidents_status_idx
  on public.operations_incidents(status, severity, created_at desc);

alter table public.admin_audit_logs enable row level security;
alter table public.platform_daily_metrics enable row level security;
alter table public.operations_incidents enable row level security;

-- These tables are intentionally backend/admin-only. No authenticated grants.
revoke all on public.admin_audit_logs from authenticated;
revoke all on public.platform_daily_metrics from authenticated;
revoke all on public.operations_incidents from authenticated;

commit;
