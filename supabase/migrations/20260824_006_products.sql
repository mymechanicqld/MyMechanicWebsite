-- ============================================================================
-- My Mechanic QLD - Product and service price list
-- ----------------------------------------------------------------------------
-- Run this ONCE in the Supabase SQL editor:
--   https://supabase.com/dashboard/project/depduvjclelykqcnhlsm/sql/new
--
-- Backs the price-list editor at /prices/ in the owner app. The owner reviews
-- the 46 items carried over from his previous inventory app, sets the prices
-- that were never filled in, and adds descriptions. Once he confirms the list,
-- the invoice generator reads from this table so line items can be picked
-- instead of retyped.
--
-- `code` is a stable slug generated from the item's original name. It is the
-- upsert key, so the owner can rename an item without creating a duplicate.
-- Prices are stored INCLUDING GST, matching how his old app displayed them.
-- ============================================================================

create table if not exists public.products (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  code        text not null unique,
  name        text not null,
  description text,
  price       numeric(10,2),          -- inc GST. NULL means "not priced yet".
  active      boolean not null default true,
  sort_order  integer not null default 0
);

create index if not exists products_name_idx on public.products (lower(name));
create index if not exists products_sort_idx on public.products (sort_order, name);

-- Keep updated_at honest without the client having to remember.
create or replace function public.touch_products_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists products_touch_updated_at on public.products;
create trigger products_touch_updated_at
  before update on public.products
  for each row execute function public.touch_products_updated_at();

-- RLS, matching how the rest of the owner app works: the publishable (anon)
-- key may read and write. This is a price list, not customer data, and it sits
-- behind the same trust boundary as calendar_events and invoices already do.
alter table public.products enable row level security;

drop policy if exists "products_all" on public.products;
create policy "products_all" on public.products
  for all to anon, authenticated using (true) with check (true);

-- ============================================================================
-- Done. Open /prices/ in the owner app, review the list, then press Save.
-- ============================================================================
