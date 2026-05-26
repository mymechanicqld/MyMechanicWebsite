-- ============================================================================
-- Quote form redesign (May 2026)
-- ============================================================================
-- The public quote form now collects additional fields inspired by a
-- competitor's structured booking form:
--
--   - service_needed   (re-enabled, was collected in v1 then dropped in v3)
--   - vehicle_make     (re-enabled, same story)
--   - preferred_time   (re-enabled, same story)
--   - preferred_date   (NEW column, native date picker on the form)
--
-- vehicle_make, service_needed and preferred_time already exist from
-- migration 001. Only preferred_date needs to be added.
--
-- The symptoms column remains nullable (was already nullable from 001).
-- It is now explicitly optional on the form because the service dropdown
-- captures intent.
--
-- Apply via the Supabase SQL editor at:
--   https://supabase.com/dashboard/project/depduvjclelykqcnhlsm/sql/new
-- ============================================================================

alter table public.quote_submissions
  add column if not exists preferred_date date;

-- Index for dashboard date-range filtering
create index if not exists quote_submissions_preferred_date_idx
  on public.quote_submissions (preferred_date)
  where preferred_date is not null;
