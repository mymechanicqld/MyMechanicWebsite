-- ============================================================================
-- Quote submissions table for My Mechanic QLD
-- ============================================================================
-- Stores every customer quote-request form submission so we have a permanent
-- record beyond the email notification (which can be lost, deleted, etc.).
--
-- RLS policy:
--   - Anyone can INSERT (the public form submits via the publishable key)
--   - Anyone can SELECT (the dashboard reads with the same key)
--   - Only the service role can UPDATE / DELETE
--
-- If you want the dashboard locked down later, swap the SELECT policy for one
-- that requires authentication, and use Supabase magic-link auth on the
-- dashboard.

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
-- Tighten this later by adding auth — see migration comment above.
drop policy if exists "public_can_select" on public.quote_submissions;
create policy "public_can_select"
  on public.quote_submissions
  for select
  to anon, authenticated
  using (true);

-- Only the service role can UPDATE or DELETE
-- (anon and authenticated have no policies for these, so they're blocked by RLS)
