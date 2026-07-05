-- Add Habitat for Humanity donation tracking to existing orders table
alter table public.orders
  add column if not exists donation jsonb;
