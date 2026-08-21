begin;

-- ============================================================================
-- Safari Phase 16
-- Supabase Storage + secure media metadata
--
-- Buckets:
--   avatars               public=false
--   driver-documents      public=false
--   prescriptions         public=false
--   merchant-media        public=true
--   service-media         public=true
--
-- Storage object writes are performed through the authenticated Supabase
-- client / backend. Business-critical metadata remains backend-controlled.
-- ============================================================================

create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),

  owner_user_id uuid references public.profiles(id) on delete cascade,

  entity_type text not null
    check (
      entity_type in (
        'profile',
        'driver_document',
        'prescription',
        'restaurant',
        'commerce_store',
        'commerce_product',
        'service_provider',
        'provider_service'
      )
    ),

  entity_id uuid,

  bucket_name text not null,
  object_path text not null,

  original_filename text,
  mime_type text,
  size_bytes bigint,

  visibility text not null default 'private'
    check (visibility in ('private', 'public')),

  status text not null default 'active'
    check (status in ('pending', 'active', 'deleted', 'rejected')),

  checksum text,
  metadata jsonb not null default '{}'::jsonb,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  unique(bucket_name, object_path)
);

create index if not exists media_assets_owner_idx
  on public.media_assets(owner_user_id, created_at desc);

create index if not exists media_assets_entity_idx
  on public.media_assets(entity_type, entity_id);

alter table public.media_assets enable row level security;

drop policy if exists "owners can read own media assets"
  on public.media_assets;

create policy "owners can read own media assets"
on public.media_assets
for select
to authenticated
using (owner_user_id = auth.uid());

grant select on public.media_assets to authenticated;

-- ---------------------------------------------------------------------------
-- Storage buckets
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  (
    'avatars',
    'avatars',
    false,
    5242880,
    array['image/jpeg','image/png','image/webp']
  ),
  (
    'driver-documents',
    'driver-documents',
    false,
    10485760,
    array['image/jpeg','image/png','image/webp','application/pdf']
  ),
  (
    'prescriptions',
    'prescriptions',
    false,
    10485760,
    array['image/jpeg','image/png','image/webp','application/pdf']
  ),
  (
    'merchant-media',
    'merchant-media',
    true,
    15728640,
    array['image/jpeg','image/png','image/webp']
  ),
  (
    'service-media',
    'service-media',
    true,
    15728640,
    array['image/jpeg','image/png','image/webp']
  )
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- ---------------------------------------------------------------------------
-- Storage RLS
-- Object path convention for private user-owned buckets:
--   <auth.uid()>/<entity>/<filename>
-- ---------------------------------------------------------------------------

drop policy if exists "users can upload own avatars"
  on storage.objects;

create policy "users can upload own avatars"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "users can read own avatars"
  on storage.objects;

create policy "users can read own avatars"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "users can update own avatars"
  on storage.objects;

create policy "users can update own avatars"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = auth.uid()::text
)
with check (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "users can delete own avatars"
  on storage.objects;

create policy "users can delete own avatars"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "drivers can upload own documents"
  on storage.objects;

create policy "drivers can upload own documents"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'driver-documents'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "drivers can read own documents"
  on storage.objects;

create policy "drivers can read own documents"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'driver-documents'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "drivers can delete own documents"
  on storage.objects;

create policy "drivers can delete own documents"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'driver-documents'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "users can upload own prescriptions"
  on storage.objects;

create policy "users can upload own prescriptions"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'prescriptions'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "users can read own prescriptions"
  on storage.objects;

create policy "users can read own prescriptions"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'prescriptions'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "users can delete own prescriptions"
  on storage.objects;

create policy "users can delete own prescriptions"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'prescriptions'
  and (storage.foldername(name))[1] = auth.uid()::text
);

-- Public merchant/service media can be read by everyone.
drop policy if exists "public can read merchant media"
  on storage.objects;

create policy "public can read merchant media"
on storage.objects
for select
to public
using (bucket_id = 'merchant-media');

drop policy if exists "public can read service media"
  on storage.objects;

create policy "public can read service media"
on storage.objects
for select
to public
using (bucket_id = 'service-media');

commit;
