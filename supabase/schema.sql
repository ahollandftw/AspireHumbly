-- Aspire Humbly — Supabase schema
-- Run this in: Supabase Dashboard → SQL Editor → New query

-- Orders
create table if not exists public.orders (
  id text primary key,
  email text not null,
  items jsonb not null default '[]'::jsonb,
  subtotal integer not null default 0,
  discount integer not null default 0,
  shipping integer not null default 0,
  donation jsonb,
  total integer not null default 0,
  status text not null default 'pending'
    check (status in ('pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled')),
  fulfillment_status text,
  tracking_number text,
  tracking_url text,
  stripe_session_id text,
  printful_order_id integer,
  shipping_address jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists orders_email_idx on public.orders (email);
create index if not exists orders_status_idx on public.orders (status);
create index if not exists orders_created_at_idx on public.orders (created_at desc);

-- Email subscribers
create table if not exists public.subscribers (
  id text primary key,
  email text not null unique,
  phone text,
  source text not null default 'website',
  created_at timestamptz not null default now()
);

create index if not exists subscribers_email_idx on public.subscribers (email);

-- Contact form submissions
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  created_at timestamptz not null default now()
);

-- Discount codes (optional — can also stay in code)
create table if not exists public.discount_codes (
  code text primary key,
  type text not null check (type in ('percentage', 'fixed')),
  value integer not null,
  min_order integer,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Seed default discount codes
insert into public.discount_codes (code, type, value, min_order, active)
values
  ('HUMBLE10', 'percentage', 10, null, true),
  ('WELCOME15', 'percentage', 15, 5000, true)
on conflict (code) do nothing;

-- Row Level Security
alter table public.orders enable row level security;
alter table public.subscribers enable row level security;
alter table public.contact_messages enable row level security;
alter table public.discount_codes enable row level security;

-- Service role bypasses RLS. These policies allow controlled public access:

-- Newsletter signup (insert only)
create policy "Anyone can subscribe"
  on public.subscribers
  for insert
  to anon, authenticated
  with check (true);

-- Contact form (insert only)
create policy "Anyone can submit contact"
  on public.contact_messages
  for insert
  to anon, authenticated
  with check (true);

-- Active discount codes readable by anyone (for checkout validation via client if needed)
create policy "Anyone can read active discounts"
  on public.discount_codes
  for select
  to anon, authenticated
  using (active = true);

-- Orders: no public policies — server uses service role key for all order operations
