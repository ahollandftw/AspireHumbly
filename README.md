# Aspire Humbly

Premium motivational apparel ecommerce store for [aspirehumbly.com](https://aspirehumbly.com).

## Stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS** + Radix UI primitives
- **Zustand** — persistent cart & wishlist
- **Stripe** — checkout & payments
- **Printful** — print-on-demand fulfillment
- **Supabase** — optional production database

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

| Page | Route |
|------|-------|
| Home | `/` |
| Men's / Women's | `/mens`, `/womens` |
| New Arrivals / Best Sellers | `/new-arrivals`, `/best-sellers` |
| Collections | `/collections`, `/collections/[slug]` |
| Product Detail | `/products/[slug]` |
| Cart / Checkout | `/cart`, `/checkout` |
| About / Contact / FAQ | `/about`, `/contact`, `/faq` |
| Size Guide / Shipping | `/size-guide`, `/shipping-returns` |
| Account / Track Order | `/account`, `/track-order` |
| Admin Dashboard | `/admin` |

## Integrations

### Stripe
1. Add keys to `.env.local`
2. Set webhook endpoint: `https://yourdomain.com/api/webhooks/stripe`
3. Listen for `checkout.session.completed`

### Printful
1. Add `PRINTFUL_API_KEY` to `.env.local`
2. Map `printfulVariantId` on product variants in `src/data/products.ts`
3. Set webhook: `https://yourdomain.com/api/webhooks/printful`
4. Sync products via Admin → Products → Sync from Printful

### Supabase
1. Run `supabase/schema.sql` in your [Supabase SQL Editor](https://supabase.com/dashboard/project/fimhfsbwovjgdibftdkx/sql)
2. Add keys from **Project Settings → API** to `.env.local`
3. Verify at `/api/supabase/health` or check `/admin` dashboard

Project URL: `https://fimhfsbwovjgdibftdkx.supabase.co`

See `supabase/README.md` for full setup.

## Discount Codes

Try `HUMBLE10` (10% off) or `WELCOME15` (15% off, $50+ orders).

## Deploy

Deploy to [Vercel](https://vercel.com):

```bash
npm run build
```

Set environment variables in the Vercel dashboard.

## Project Structure

```
src/
  app/
    (store)/          # Customer-facing pages
    admin/            # Admin dashboard
    api/              # API routes (checkout, webhooks, newsletter)
  components/         # UI, layout, product components
  data/               # Product & collection seed data
  lib/                # Stripe, Printful, DB utilities
  store/              # Zustand stores
data/                 # Local JSON store (orders, subscribers)
```
