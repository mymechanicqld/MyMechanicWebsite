-- ============================================================================
-- Quote form simplification (May 2026)
-- ============================================================================
-- The public quote form now mirrors the field set from the original
-- mymechanicqld.com.au site exactly:
--   Name, Phone, Email, Rego, Suburb, How can we help?, Privacy consent.
--
-- Vehicle make/model/year, service_needed and preferred_time are no longer
-- collected from the form. We leave those columns in place (nullable) so
-- historical rows still display correctly in the dashboard.
--
-- Two new columns:
--   vehicle_rego      text     -- the customer's licence plate
--   consent_privacy   boolean  -- whether they ticked the privacy consent
--
-- Apply via the Supabase SQL editor at:
--   https://supabase.com/dashboard/project/tzxaewbadjursnhsokmg/sql/new
-- ============================================================================

alter table public.quote_submissions
  add column if not exists vehicle_rego    text,
  add column if not exists consent_privacy boolean not null default false;

-- Index the rego column so the dashboard can search/filter by plate later.
create index if not exists quote_submissions_vehicle_rego_idx
  on public.quote_submissions (vehicle_rego)
  where vehicle_rego is not null;
