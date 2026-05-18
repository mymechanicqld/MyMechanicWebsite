-- ============================================================================
-- Seed data: 5 dummy inquiries
-- ============================================================================
-- Run this after the migration. Spread across the last few weeks for a
-- realistic look in the dashboard. Status mix shows the full lifecycle.

insert into public.quote_submissions
  (created_at, full_name, email, phone, suburb, vehicle_make, vehicle_model, vehicle_year, service_needed, symptoms, preferred_time, status, source)
values
  (now() - interval '2 hours',
   'Sarah Whitmore', 'sarah.w@example.com.au', '0411 234 567', 'Bulimba',
   'Mazda', 'CX-5', 2019,
   'Logbook service',
   'Due for 60,000 km service. Hatch handle feels loose too.',
   'Weekday morning preferred',
   'new', 'website'),

  (now() - interval '1 day',
   'Daniel Mata', 'dmata@example.com.au', '0432 887 100', 'Robina',
   'Toyota', 'Hilux SR5', 2021,
   'Brake repair',
   'Front brakes squealing on cold mornings, pedal feels softer than usual.',
   'After 3pm any weekday',
   'contacted', 'website'),

  (now() - interval '3 days',
   'Priya Ramachandran', 'priya.r@example.com.au', '0421 556 901', 'Carindale',
   'Subaru', 'Outback', 2018,
   'Pre-purchase inspection',
   'Buying a used 2017 Forester from a private seller in Wynnum next Tuesday. Need PPI before I pay.',
   'Tue 28th May, mid-morning',
   'quoted', 'website'),

  (now() - interval '1 week',
   'Jake Thomson', 'jakethom@example.com.au', '0407 219 334', 'Springfield',
   'Mazda', '3', 2017,
   'Alternator / starter',
   'Slow crank in the mornings, battery a year old. Suspected alternator.',
   'Weekend morning if possible',
   'booked', 'website'),

  (now() - interval '12 days',
   'Mel Cordova', 'mel.c@example.com.au', '0455 098 712', 'Browns Plains',
   'Hyundai', 'i30', 2016,
   'Logbook service',
   'Service light came on. Last service stamped 14 months ago at the dealer.',
   'Saturday morning',
   'won', 'website');
