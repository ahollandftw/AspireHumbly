# Supabase setup for Aspire Humbly

Project URL: `https://fimhfsbwovjgdibftdkx.supabase.co`

## 1. Run the database schema

1. Open [Supabase Dashboard](https://supabase.com/dashboard/project/fimhfsbwovjgdibftdkx)
2. Go to **SQL Editor** → **New query**
3. Paste the contents of `supabase/schema.sql`
4. Click **Run**

This creates `orders`, `subscribers`, `contact_messages`, and `discount_codes` tables.

## 2. Get your API keys

1. In Supabase Dashboard → **Project Settings** → **API**
2. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY` (keep secret — server only)

## 3. Configure environment variables

Add to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://fimhfsbwovjgdibftdkx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

For **Vercel**, add the same variables in Project Settings → Environment Variables.

## 4. Verify connection

Restart the dev server, then visit `/admin` — Supabase should show **Connected**.

Or call: `GET /api/supabase/health`

## Tables

| Table | Purpose |
|-------|---------|
| `orders` | Checkout orders, fulfillment, tracking |
| `subscribers` | Newsletter & email popup signups |
| `contact_messages` | Contact form submissions |
| `discount_codes` | Promo codes (optional DB-backed) |

Server API routes use the **service role** key. Falls back to local `data/*.json` if Supabase is not configured.
