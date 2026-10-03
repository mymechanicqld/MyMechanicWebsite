-- ============================================================================
-- Group the quote-form services into categories (October 2026)
-- ============================================================================
-- The public form now groups services under four categories. The chosen
-- option still goes into `service_needed` exactly as before, so the owner app,
-- dashboard and email assistant keep reading it unchanged. This adds one
-- column alongside it holding the group.
--
-- Additive only. No existing column is altered and no existing row is
-- changed: older inquiries simply have service_category = null.
-- Safe to run more than once.
--
-- Until this runs, the website retries the insert without the column, so no
-- lead is lost (see OPTIONAL_COLUMNS in app/actions.ts).
--
-- Apply via the Supabase SQL editor at:
--   https://supabase.com/dashboard/project/depduvjclelykqcnhlsm/sql/new
-- ============================================================================

alter table public.quote_submissions
  add column if not exists service_category text;

-- Values match SERVICE_CATEGORIES in lib/quote-services.ts. The public form
-- inserts with the anon key, so the database guards the value as well.
do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'quote_submissions_service_category_check'
  ) then
    alter table public.quote_submissions
      add constraint quote_submissions_service_category_check
      check (service_category is null or service_category in (
        'standard-servicing', 'diagnosis', 'pre-purchase-inspection', 'maintenance'
      ));
  end if;
end $$;

comment on column public.quote_submissions.service_category is
  'Group of service_needed chosen on the public form. Null for inquiries made before Oct 2026.';

-- Ask the API to see the new column straight away.
notify pgrst, 'reload schema';

-- Check: every existing row should still be there, with a null category.
select count(*) as total,
       count(*) filter (where service_category is null) as without_category
from public.quote_submissions;
