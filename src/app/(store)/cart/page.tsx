"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import { useState } from "react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, setDiscount, discountCode, discountAmount } =
    useCartStore();
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const total = subtotal();
  const finalTotal = Math.max(0, total - discountAmount);

  async function applyDiscount(e: React.FormEvent) {
    e.preventDefault();
    setCodeError("");
    const res = await fetch("/api/discount", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, subtotal: total }),
    });
    const data = await res.json();
    if (data.valid) {
      setDiscount(data.code, data.discountAmount);
    } else {
      setCodeError(data.message || "Invalid code");
    }
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="text-3xl font-bold tracking-tight uppercase">Your Cart</h1>
        <p className="mt-4 text-neutral-500">Your cart is empty.</p>
        <Button className="mt-8" asChild>
          <Link href="/collections">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight uppercase md:text-4xl">Your Cart</h1>
      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_400px]">
        <div className="space-y-8">
          {items.map((item) => (
            <div
              key={`${item.productId}-${item.color}-${item.size}`}
              className="flex gap-6 border-b border-neutral-200 pb-8"
            >
              <div className="relative h-32 w-24 shrink-0 bg-neutral-100">
                <Image src={item.image} alt={item.title} fill className="object-cover" sizes="96px" />
              </div>
              <div className="flex flex-1 flex-col">
                <Link href={`/products/${item.slug}`} className="font-medium hover:underline">
                  {item.title}
                </Link>
                <p className="mt-1 text-sm text-neutral-500">
                  {item.color} / {item.size}
                </p>
                <p className="mt-2">{formatPrice(item.price)}</p>
                <div className="mt-auto flex items-center gap-3 pt-4">
                  <button
                    onClick={() => updateQuantity(item.productId, item.color, item.size, item.quantity - 1)}
                    className="border border-neutral-300 p-1.5"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.productId, item.color, item.size, item.quantity + 1)}
                    className="border border-neutral-300 p-1.5"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => removeItem(item.productId, item.color, item.size)}
                    className="ml-auto text-neutral-400 hover:text-black"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="h-fit border border-neutral-200 p-8">
          <h2 className="text-sm font-medium tracking-widest uppercase">Order Summary</h2>
          <div className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-500">Subtotal</span>
              <span>{formatPrice(total)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount ({discountCode})</span>
                <span>-{formatPrice(discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-neutral-500">Shipping</span>
              <span className="text-neutral-500">Calculated at checkout</span>
            </div>
            <div className="flex justify-between border-t border-neutral-200 pt-3 text-base font-medium">
              <span>Total</span>
              <span>{formatPrice(finalTotal)}</span>
            </div>
          </div>

          <form onSubmit={applyDiscount} className="mt-6 flex gap-2">
            <Input
              placeholder="Discount code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <Button type="submit" variant="outline" size="sm">
              Apply
            </Button>
          </form>
          {codeError && <p className="mt-2 text-xs text-red-500">{codeError}</p>}

          <Button className="mt-6 w-full" asChild>
            <Link href="/checkout">Checkout</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
