-- ============================================================================
-- CRM policies: allow anon UPDATE + DELETE on quote_submissions
-- ============================================================================
-- The dashboard at dashboard/index.html needs to mutate records:
--   - Change status (kanban drag-drop, dropdown in detail drawer)
--   - Save notes
--   - Archive (soft delete by setting status = 'archived')
--
-- The publishable key is obfuscated in the HTML file, but more importantly:
-- the dashboard is for owner/operator use, not customers. If you later expose
-- a customer-facing portal, tighten these policies (e.g. require auth).

drop policy if exists "public_can_update" on public.quote_submissions;
create policy "public_can_update"
  on public.quote_submissions
  for update
  to anon, authenticated
  using (true)
  with check (true);

drop policy if exists "public_can_delete" on public.quote_submissions;
create policy "public_can_delete"
  on public.quote_submissions
  for delete
  to anon, authenticated
  using (true);

-- Add a column for soft-delete / archive tracking that doesn't lose data
-- (status='archived' already does this, this is just metadata)
alter table public.quote_submissions
  add column if not exists updated_at timestamptz not null default now();

-- Auto-update updated_at on any row change
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists quote_submissions_set_updated_at on public.quote_submissions;
create trigger quote_submissions_set_updated_at
  before update on public.quote_submissions
  for each row execute function public.set_updated_at();
