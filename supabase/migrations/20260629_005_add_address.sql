-- ============================================================================
-- Add street address to quote submissions (June 2026)
-- ============================================================================
-- The public /book form now collects a street address so the owner does not
-- have to chase the customer for it before a mobile call-out. It flows through
-- to the owner app (inquiry detail, calendar bookings, invoices, inspections).
--
-- Apply via the Supabase SQL editor at:
--   https://supabase.com/dashboard/project/depduvjclelykqcnhlsm/sql/new
-- ============================================================================

alter table public.quote_submissions
  add column if not exists address text;
