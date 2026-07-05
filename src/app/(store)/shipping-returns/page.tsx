import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description: "Shipping, delivery, and return policy for Aspire Humbly orders.",
};

export default function ShippingReturnsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight uppercase">Shipping & Returns</h1>

      <section className="mt-12">
        <h2 className="text-xl font-bold tracking-tight uppercase">Shipping</h2>
        <div className="mt-4 space-y-4 text-neutral-600">
          <p>
            All Aspire Humbly products are made to order through our print-on-demand
            fulfillment partner. This means your order is produced specifically for you,
            reducing waste and ensuring quality.
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>Standard shipping: 5–9 business days (tees)</li>
            <li>Standard shipping: 7–12 business days (hoodies)</li>
            <li>Express shipping available at checkout</li>
            <li>Free shipping on orders over $75</li>
          </ul>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold tracking-tight uppercase">Returns & Exchanges</h2>
        <div className="mt-4 space-y-4 text-neutral-600">
          <p>
            Because items are made to order, we accept returns only for defective or
            damaged products within 30 days of delivery.
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>Contact support@aspirehumbly.com with your order number and photos</li>
            <li>We&apos;ll provide a prepaid return label for eligible items</li>
            <li>Refunds processed within 5–7 business days after inspection</li>
            <li>Exchanges available for size issues on unworn items with tags</li>
          </ul>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold tracking-tight uppercase">Order Tracking</h2>
        <p className="mt-4 text-neutral-600">
          Once your order ships, you&apos;ll receive a tracking number via email. You can also
          track your order on our{" "}
          <a href="/track-order" className="underline">
            order tracking page
          </a>
          .
        </p>
      </section>
    </div>
  );
}
