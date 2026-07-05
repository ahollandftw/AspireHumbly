"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";

export default function CheckoutPage() {
  const { items, subtotal, discountAmount, discountCode, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const total = Math.max(0, subtotal() - discountAmount);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const shippingAddress = {
      name: form.get("name") as string,
      line1: form.get("line1") as string,
      line2: (form.get("line2") as string) || undefined,
      city: form.get("city") as string,
      state: form.get("state") as string,
      postalCode: form.get("postalCode") as string,
      country: form.get("country") as string,
    };
    const email = form.get("email") as string;

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          email,
          shippingAddress,
          discountCode,
          discountAmount,
        }),
      });
      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else if (data.demo) {
        clearCart();
        window.location.href = `/checkout/success?demo=true&order=${data.orderId}`;
      } else {
        setError(data.error || "Checkout failed");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="text-3xl font-bold tracking-tight uppercase">Checkout</h1>
        <p className="mt-4 text-neutral-500">Your cart is empty.</p>
        <Button className="mt-8" asChild>
          <Link href="/collections">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight uppercase">Checkout</h1>
      <form onSubmit={handleSubmit} className="mt-12 grid gap-12 lg:grid-cols-[1fr_400px]">
        <div className="space-y-8">
          <div>
            <h2 className="text-sm font-medium tracking-widest uppercase">Contact</h2>
            <div className="mt-4">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required className="mt-2" />
            </div>
          </div>

          <div>
            <h2 className="text-sm font-medium tracking-widest uppercase">Shipping Address</h2>
            <div className="mt-4 grid gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" required className="mt-2" />
              </div>
              <div>
                <Label htmlFor="line1">Address</Label>
                <Input id="line1" name="line1" required className="mt-2" />
              </div>
              <div>
                <Label htmlFor="line2">Apartment, suite, etc. (optional)</Label>
                <Input id="line2" name="line2" className="mt-2" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" required className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input id="state" name="state" required className="mt-2" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="postalCode">ZIP Code</Label>
                  <Input id="postalCode" name="postalCode" required className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" name="country" defaultValue="US" required className="mt-2" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-fit border border-neutral-200 p-8">
          <h2 className="text-sm font-medium tracking-widest uppercase">Order Summary</h2>
          <ul className="mt-6 space-y-4">
            {items.map((item) => (
              <li key={`${item.productId}-${item.color}-${item.size}`} className="flex justify-between text-sm">
                <span>
                  {item.title} × {item.quantity}
                </span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 space-y-2 border-t border-neutral-200 pt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-500">Subtotal</span>
              <span>{formatPrice(subtotal())}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-{formatPrice(discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-neutral-500">Shipping</span>
              <span>{formatPrice(599)}</span>
            </div>
            <div className="flex justify-between pt-2 font-medium">
              <span>Total</span>
              <span>{formatPrice(total + 599)}</span>
            </div>
          </div>
          {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
          <Button type="submit" className="mt-6 w-full" disabled={loading}>
            {loading ? "Processing..." : "Pay Now"}
          </Button>
          <p className="mt-4 text-center text-xs text-neutral-400">
            Secure checkout powered by Stripe
          </p>
        </div>
      </form>
    </div>
  );
}
