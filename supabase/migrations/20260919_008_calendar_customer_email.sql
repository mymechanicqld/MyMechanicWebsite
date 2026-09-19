-- Owner app: store the customer's email on each calendar booking.
--
-- Phone and walk-in bookings never came through the website form, so there
-- was nowhere to keep their email and invoices for those jobs could not be
-- emailed. Safe to run more than once.

alter table public.calendar_events add column if not exists customer_email text;

-- Backfill existing bookings from what we already know, most reliable first.
-- 1. The inquiry the booking was created from.
update public.calendar_events ce
set customer_email = lower(trim(q.email))
from public.quote_submissions q
where ce.customer_email is null
  and ce.submission_id = q.id
  and coalesce(trim(q.email), '') <> '';

-- 2. The newest inquiry for the same rego.
update public.calendar_events ce
set customer_email = src.email
from (
  select distinct on (upper(regexp_replace(vehicle_rego, '\s', '', 'g')))
         upper(regexp_replace(vehicle_rego, '\s', '', 'g')) as rego,
         lower(trim(email)) as email
  from public.quote_submissions
  where coalesce(trim(email), '') <> '' and coalesce(trim(vehicle_rego), '') <> ''
  order by upper(regexp_replace(vehicle_rego, '\s', '', 'g')), created_at desc
) src
where ce.customer_email is null
  and upper(regexp_replace(ce.vehicle_rego, '\s', '', 'g')) = src.rego;

-- 3. The newest invoice for the same rego.
update public.calendar_events ce
set customer_email = src.email
from (
  select distinct on (upper(regexp_replace(vehicle_rego, '\s', '', 'g')))
         upper(regexp_replace(vehicle_rego, '\s', '', 'g')) as rego,
         lower(trim(customer_email)) as email
  from public.invoices
  where coalesce(trim(customer_email), '') <> '' and coalesce(trim(vehicle_rego), '') <> ''
  order by upper(regexp_replace(vehicle_rego, '\s', '', 'g')), created_at desc
) src
where ce.customer_email is null
  and upper(regexp_replace(ce.vehicle_rego, '\s', '', 'g')) = src.rego;

-- Ask the API to see the new column straight away.
notify pgrst, 'reload schema';

-- How many bookings now carry an email.
select count(*) filter (where customer_email is not null) as with_email,
       count(*) as total
from public.calendar_events;
