"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "@/components/brand/logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const shopLinks = [
  { href: "/mens", label: "Men's" },
  { href: "/womens", label: "Women's" },
  { href: "/new-arrivals", label: "New Arrivals" },
  { href: "/best-sellers", label: "Best Sellers" },
  { href: "/collections", label: "Collections" },
];

const supportLinks = [
  { href: "/contact", label: "Contact" },
  { href: "/size-guide", label: "Size Guide" },
  { href: "/shipping-returns", label: "Shipping & Returns" },
  { href: "/faq", label: "FAQ" },
  { href: "/track-order", label: "Order Tracking" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "footer" }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <footer className="border-t border-neutral-200 bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo variant="full" size="sm" className="items-start [&_span]:text-white [&_svg]:text-white" />
            <p className="mt-6 text-sm leading-relaxed text-neutral-400">
              Premium apparel for those building quietly and moving with purpose.
            </p>
            <div className="mt-6 flex gap-4 text-sm text-neutral-400">
              <a href="https://instagram.com/aspirehumbly" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
                Instagram
              </a>
              <a href="https://twitter.com/aspirehumbly" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
                X
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-medium tracking-widest uppercase">Shop</h3>
            <ul className="mt-4 space-y-3">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-neutral-400 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium tracking-widest uppercase">Support</h3>
            <ul className="mt-4 space-y-3">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-neutral-400 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium tracking-widest uppercase">Newsletter</h3>
            <p className="mt-4 text-sm text-neutral-400">
              Get early access to drops and exclusive offers.
            </p>
            <form onSubmit={handleSubscribe} className="mt-4 flex flex-col gap-2">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-neutral-700 bg-neutral-900 text-white placeholder:text-neutral-500"
              />
              <Button type="submit" disabled={status === "loading"} className="bg-white text-black hover:bg-neutral-200">
                {status === "loading" ? "Subscribing..." : status === "success" ? "Subscribed!" : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-neutral-800 pt-8 sm:flex-row">
          <p className="text-xs text-neutral-500">
            &copy; {new Date().getFullYear()} Aspire Humbly. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-neutral-500">
            <Link href="/about" className="hover:text-white">About</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
            <span>aspirehumbly.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
