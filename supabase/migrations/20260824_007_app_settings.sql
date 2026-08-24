-- ============================================================================
-- My Mechanic QLD - App settings
-- ----------------------------------------------------------------------------
-- Run this ONCE in the Supabase SQL editor:
--   https://supabase.com/dashboard/project/depduvjclelykqcnhlsm/sql/new
--
-- Backs the Settings page in the owner app. One row, one JSON blob: business
-- details, default prices, invoice defaults and assistant preferences. A single
-- row keeps it simple and means settings follow the owner to any device he
-- opens the app on, instead of living only in one phone's storage.
--
-- The app works without this table (it falls back to the phone's own storage),
-- so nothing breaks if this has not been run yet. It just will not sync.
-- ============================================================================

create table if not exists public.app_settings (
  id         integer primary key default 1,
  updated_at timestamptz not null default now(),
  data       jsonb not null default '{}'::jsonb,
  constraint app_settings_single_row check (id = 1)
);

-- Seed the single row so the app can always upsert against it.
insert into public.app_settings (id, data) values (1, '{}'::jsonb)
  on conflict (id) do nothing;

create or replace function public.touch_app_settings_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists app_settings_touch_updated_at on public.app_settings;
create trigger app_settings_touch_updated_at
  before update on public.app_settings
  for each row execute function public.touch_app_settings_updated_at();

alter table public.app_settings enable row level security;

drop policy if exists "app_settings_all" on public.app_settings;
create policy "app_settings_all" on public.app_settings
  for all to anon, authenticated using (true) with check (true);

-- ============================================================================
-- Done. Settings now follow the owner between devices.
-- ============================================================================
