-- ============================================================================
-- "Started it themselves" check on new inquiries (October 2026)
-- ============================================================================
-- Adds a second automatic check next to migration 010's "own parts" check.
-- The triage Worker (owner-app/cloudflare/triage) asks Clef-flash both
-- questions in one call and stores this one here: how likely it is that the
-- customer has already started the repair themselves and wants a mechanic to
-- finish it. The owner app labels 0.8 and above "Likely DIY".
--
-- Additive only: one nullable column. Inquiries from the last 48 hours are
-- re-checked automatically once it exists. Safe to run more than once.
--
-- Apply via the Supabase SQL editor at:
--   https://supabase.com/dashboard/project/depduvjclelykqcnhlsm/sql/new
-- ============================================================================

alter table public.quote_submissions
  add column if not exists ai_started_score real;

comment on column public.quote_submissions.ai_started_score is
  'Clef-flash probability (0 to 1) that the customer already started the repair themselves and wants it finished. Null until checked.';

notify pgrst, 'reload schema';

select count(*) filter (where ai_started_score is null) as not_yet_checked
from public.quote_submissions
where created_at > now() - interval '48 hours';
