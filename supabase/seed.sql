-- ============================================================================
-- My Mechanic QLD -- Demo seed data (12 realistic submissions)
-- ============================================================================
-- Paste this into the Supabase SQL editor AFTER running full-schema.sql:
--   https://supabase.com/dashboard/project/depduvjclelykqcnhlsm/sql/new
--
-- Creates a mix of statuses so every dashboard panel has data to show.
-- Safe to run multiple times (uses random UUIDs each time).
-- ============================================================================

INSERT INTO public.quote_submissions
  (full_name, email, phone, suburb, vehicle_make, vehicle_rego, service_needed,
   symptoms, preferred_date, preferred_time, status, notes, source,
   consent_privacy, created_at, updated_at)
VALUES

  -- 1. NEW (submitted 2 hours ago, no action yet)
  ('Sarah Mitchell', 'sarah.m@gmail.com', '0412 345 678', 'Springwood',
   'Toyota', 'ABC 123', 'brake-repair',
   'Squealing noise when braking at low speed. Gets worse in the morning.',
   (current_date + 7)::date, '7am-10am',
   'new', NULL, 'website', true,
   now() - interval '2 hours', now() - interval '2 hours'),

  -- 2. NEW (26 hours ago, needs attention)
  ('David Patel', 'david.patel@outlook.com', '0478 901 234', 'Browns Plains',
   'Hyundai', '567 XYZ', 'battery-replacement',
   'Car won''t start after sitting overnight. Lights come on but engine just clicks.',
   (current_date + 3)::date, '10am-12pm',
   'new', NULL, 'website', true,
   now() - interval '26 hours', now() - interval '26 hours'),

  -- 3. NEW (52 hours ago, needs urgent attention)
  ('Jessica Lee', 'jess.lee88@gmail.com', '0423 456 789', 'Robina',
   'Mazda', '1AB 2CD', 'brake-repair',
   'Brakes feel spongy and pedal goes almost to the floor.',
   NULL, NULL,
   'new', NULL, 'website', true,
   now() - interval '52 hours', now() - interval '52 hours'),

  -- 4. CONTACTED (replied by phone)
  ('James Nguyen', 'j.nguyen@hotmail.com', '0401 234 567', 'Sunnybank',
   'Mazda', '345 QLD', 'logbook-servicing',
   '60,000 km service due. Want to keep the warranty valid.',
   (current_date + 10)::date, '7am-10am',
   'contacted', 'Spoke on phone. Wants a quote before committing. Will call back tomorrow.',
   'website', true,
   now() - interval '3 days', now() - interval '1 day'),

  -- 5. CONTACTED
  ('Emma Wilson', 'emma.w@icloud.com', '0438 765 432', 'Beenleigh',
   'Toyota', 'EMW 001', 'warning-light-diagnostics',
   'Check engine light came on last week. Car seems to run fine otherwise.',
   (current_date + 8)::date, '12pm-3pm',
   'contacted', 'Emailed quote request details. Waiting for her to confirm date.',
   'website', true,
   now() - interval '4 days', now() - interval '2 days'),

  -- 6. QUOTED (price sent)
  ('Rachel Thompson', 'rachel.t@gmail.com', '0455 678 901', 'Carindale',
   'Ford', 'RAC 456', 'alternator-starter-motor',
   'Slow cranking, battery is new so I think it''s the starter motor.',
   (current_date + 9)::date, '10am-12pm',
   'quoted', 'Quoted $680 for starter motor replacement (Bosch unit). Sent via email.',
   'website', true,
   now() - interval '5 days', now() - interval '2 days'),

  -- 7. QUOTED
  ('Chris Baker', 'chris.baker@yahoo.com.au', '0467 890 123', 'Coomera',
   'Nissan', 'CBK 789', 'steering-suspension',
   'Clunking noise over bumps, especially on the left side. Tyres wearing unevenly.',
   (current_date + 11)::date, '3pm-6pm',
   'quoted', 'Quoted $450 for lower control arm + bushes. Customer comparing prices.',
   'website', true,
   now() - interval '6 days', now() - interval '3 days'),

  -- 8. BOOKED (job scheduled)
  ('Mark O''Brien', 'mark.obrien@bigpond.com', '0412 111 222', 'Logan Central',
   'Holden', 'MOB 321', 'radiator-water-pump',
   'Overheating in traffic. Temperature gauge goes to red after 20 min.',
   (current_date + 4)::date, '7am-10am',
   'booked', 'Radiator replacement + coolant flush. Parts ordered from Bursons.',
   'website', true,
   now() - interval '7 days', now() - interval '1 day'),

  -- 9. BOOKED
  ('Michael Santos', 'msantos@gmail.com', '0499 333 444', 'Nerang',
   'Toyota', 'MJS 555', 'radiator-water-pump',
   'Water pump leaking. Noticed puddle under the car each morning.',
   (current_date + 3)::date, '10am-12pm',
   'booked', 'Water pump + timing belt while we''re in there. Quoted $1,100.',
   'website', true,
   now() - interval '8 days', now() - interval '2 days'),

  -- 10. WON (completed and paid)
  ('Linda Chen', 'linda.chen@gmail.com', '0433 555 666', 'Mount Gravatt',
   'Honda', 'LCD 888', 'pre-purchase-inspection',
   'Looking at buying a 2019 CR-V from a private seller in Wishart.',
   (current_date - 6)::date, '12pm-3pm',
   'won', 'Inspection done at seller''s address. Found minor oil leak, reported to buyer. Paid $220 on the spot.',
   'website', true,
   now() - interval '12 days', now() - interval '5 days'),

  -- 11. WON
  ('Tom Harrison', 'tom.harrison@live.com.au', '0411 777 888', 'Springfield',
   'Subaru', 'TH 9090', 'emergency-breakdown',
   'Broken down on Centenary Motorway near Springfield exit. Car just died.',
   NULL, NULL,
   'won', 'Emergency callout. Alternator failure. Replaced roadside with Bosch unit. Total $780 inc callout fee. Paid via bank transfer.',
   'website', true,
   now() - interval '14 days', now() - interval '8 days'),

  -- 12. LOST
  ('Karen Wright', 'k.wright@outlook.com', '0422 999 000', 'Ipswich',
   'Kia', 'KW 4455', 'logbook-servicing',
   'Need a 40,000 km service. Currently at 39,500 km.',
   (current_date - 4)::date, '3pm-6pm',
   'lost', 'Quoted $380 for logbook service. Customer went with dealership instead.',
   'website', true,
   now() - interval '10 days', now() - interval '6 days');

-- ============================================================================
-- Done. 12 demo submissions seeded across all pipeline statuses.
-- ============================================================================
