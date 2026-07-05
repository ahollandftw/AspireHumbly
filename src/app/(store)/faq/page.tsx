import type { Metadata } from "next";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Aspire Humbly orders, sizing, and products.",
};

const faqs = [
  {
    q: "How long does shipping take?",
    a: "Tees typically ship within 5–9 business days. Hoodies take 7–12 business days. All items are made to order.",
  },
  {
    q: "What is your return policy?",
    a: "We accept returns for defective or damaged items within 30 days. Contact support@aspirehumbly.com to start a return.",
  },
  {
    q: "How do the tees fit?",
    a: "Most tees run true to size with a relaxed fit. Oversized styles are noted on the product page — size down for a regular fit.",
  },
  {
    q: "Are your products print-on-demand?",
    a: "Yes. Every piece is made to order, which reduces waste and ensures fresh quality on every order.",
  },
  {
    q: "Do you offer international shipping?",
    a: "We currently ship to the US and Canada. International expansion is coming soon.",
  },
  {
    q: "How do I track my order?",
    a: "You'll receive a tracking number via email once your order ships. You can also use our order tracking page.",
  },
  {
    q: "Can I use a discount code?",
    a: "Yes. Enter your code at checkout or in your cart. One code per order.",
  },
  {
    q: "How do I care for my apparel?",
    a: "Machine wash cold, inside out. Tumble dry low or hang dry. Do not bleach or iron directly on prints.",
  },
];

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight uppercase">FAQ</h1>
      <p className="mt-4 text-neutral-500">Everything you need to know about Aspire Humbly.</p>

      <Accordion.Root type="single" collapsible className="mt-12 space-y-2">
        {faqs.map((faq, i) => (
          <Accordion.Item
            key={i}
            value={`item-${i}`}
            className="border border-neutral-200"
          >
            <Accordion.Trigger className="group flex w-full items-center justify-between px-6 py-4 text-left text-sm font-medium">
              {faq.q}
              <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-data-[state=open]:rotate-180" />
            </Accordion.Trigger>
            <Accordion.Content className="px-6 pb-4 text-sm text-neutral-600">
              {faq.a}
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  );
}
