-- ============================================================================
-- Automatic "likely DIY" check on new inquiries (October 2026)
-- ============================================================================
-- A Cloudflare Worker (owner-app/cloudflare/triage) checks each new inquiry
-- within about a minute of it arriving, using Cloudflare's Clef-flash
-- decision model, and records how likely it is that the customer is supplying
-- their own parts and only wants them fitted. The owner app labels inquiries
-- that score 0.6 or more as "Likely DIY".
--
-- Additive only: three nullable columns, nothing existing is changed.
-- Safe to run more than once.
--
-- Apply via the Supabase SQL editor at:
--   https://supabase.com/dashboard/project/depduvjclelykqcnhlsm/sql/new
-- ============================================================================

alter table public.quote_submissions
  add column if not exists ai_diy_score  real,
  add column if not exists ai_checked_at timestamptz,
  add column if not exists ai_model      text;

comment on column public.quote_submissions.ai_diy_score is
  'Clef-flash probability (0 to 1) that the customer supplies their own parts and only wants them fitted. Null until checked.';
comment on column public.quote_submissions.ai_checked_at is
  'When the automatic DIY check ran. Null means not checked yet.';
comment on column public.quote_submissions.ai_model is
  'Model that produced ai_diy_score, e.g. @cf/cloudflare/clef-flash.';

-- The Worker looks for recent unchecked rows every minute.
create index if not exists quote_submissions_ai_unchecked_idx
  on public.quote_submissions (created_at)
  where ai_checked_at is null;

-- Ask the API to see the new columns straight away.
notify pgrst, 'reload schema';

-- Check: the columns exist and nothing has been checked yet.
select count(*) as total,
       count(*) filter (where ai_checked_at is null) as unchecked
from public.quote_submissions;
