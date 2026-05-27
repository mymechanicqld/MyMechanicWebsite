-- ============================================================================
-- My Mechanic QLD — Full database schema
-- ============================================================================
-- Run this ONCE in a fresh Supabase project's SQL editor:
--   https://supabase.com/dashboard/project/depduvjclelykqcnhlsm/sql/new
--
-- This combines all 4 migrations into a single file:
--   001 — quote_submissions table, indexes, RLS (INSERT + SELECT)
--   002 — CRM policies (UPDATE + DELETE), updated_at trigger
--   003 — vehicle_rego + consent_privacy columns
--   004 — preferred_date column (form redesign)
-- ============================================================================

-- ── 001: Core table ─────────────────────────────────────────────────────────

create table if not exists public.quote_submissions (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),

  -- Customer
  full_name       text not null,
  email           text not null,
  phone           text,
  suburb          text,

  -- Vehicle
  vehicle_make    text,
  vehicle_model   text,
  vehicle_year    int,

  -- Request
  service_needed  text,
  symptoms        text,
  preferred_time  text,

  -- Ops / triage
  status          text not null default 'new' check (status in ('new', 'contacted', 'quoted', 'booked', 'won', 'lost', 'archived')),
  notes           text,

  -- Audit
  ip_address      text,
  user_agent      text,
  source          text not null default 'website'
);

create index if not exists quote_submissions_created_at_idx
  on public.quote_submissions (created_at desc);

create index if not exists quote_submissions_status_idx
  on public.quote_submissions (status);

-- Row Level Security
alter table public.quote_submissions enable row level security;

-- Anyone with the publishable key can INSERT (the public quote form)
drop policy if exists "public_can_insert" on public.quote_submissions;
create policy "public_can_insert"
  on public.quote_submissions
  for insert
  to anon, authenticated
  with check (true);

-- Anyone with the publishable key can SELECT (the dashboard)
drop policy if exists "public_can_select" on public.quote_submissions;
create policy "public_can_select"
  on public.quote_submissions
  for select
  to anon, authenticated
  using (true);

-- ── 002: CRM policies + updated_at ─────────────────────────────────────────

drop policy if exists "public_can_update" on public.quote_submissions;
create policy "public_can_update"
  on public.quote_submissions
  for update
  to anon, authenticated
  using (true)
  with check (true);

drop policy if exists "public_can_delete" on public.quote_submissions;
create policy "public_can_delete"
  on public.quote_submissions
  for delete
  to anon, authenticated
  using (true);

alter table public.quote_submissions
  add column if not exists updated_at timestamptz not null default now();

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists quote_submissions_set_updated_at on public.quote_submissions;
create trigger quote_submissions_set_updated_at
  before update on public.quote_submissions
  for each row execute function public.set_updated_at();

-- ── 003: Simplified form columns ────────────────────────────────────────────

alter table public.quote_submissions
  add column if not exists vehicle_rego    text,
  add column if not exists consent_privacy boolean not null default false;

create index if not exists quote_submissions_vehicle_rego_idx
  on public.quote_submissions (vehicle_rego)
  where vehicle_rego is not null;

-- ── 004: Form redesign (preferred_date for appointment section) ─────────────

alter table public.quote_submissions
  add column if not exists preferred_date date;

create index if not exists quote_submissions_preferred_date_idx
  on public.quote_submissions (preferred_date)
  where preferred_date is not null;

-- ============================================================================
-- Done. The quote_submissions table is ready for the website form + dashboard.
-- ============================================================================
