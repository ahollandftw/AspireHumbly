"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal } =
    useCartStore();
  const total = subtotal();
  const discountAmount = useCartStore((s) => s.discountAmount);
  const finalTotal = Math.max(0, total - discountAmount);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent side="right" className="flex w-full flex-col p-0 sm:max-w-md">
        <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
          <h2 className="text-sm font-medium tracking-widest uppercase">
            Cart ({items.length})
          </h2>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6">
            <p className="text-neutral-500">Your cart is empty</p>
            <Button variant="outline" className="mt-4" onClick={closeCart} asChild>
              <Link href="/collections">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <ul className="space-y-6">
                {items.map((item) => (
                  <li
                    key={`${item.productId}-${item.color}-${item.size}`}
                    className="flex gap-4"
                  >
                    <div className="relative h-24 w-20 shrink-0 bg-neutral-100">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <Link
                        href={`/products/${item.slug}`}
                        onClick={closeCart}
                        className="text-sm font-medium hover:underline"
                      >
                        {item.title}
                      </Link>
                      <p className="mt-1 text-xs text-neutral-500">
                        {item.color} / {item.size}
                      </p>
                      <p className="mt-1 text-sm">{formatPrice(item.price)}</p>
                      <div className="mt-2 flex items-center gap-3">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.color,
                              item.size,
                              item.quantity - 1
                            )
                          }
                          className="border border-neutral-300 p-1"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-sm">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.color,
                              item.size,
                              item.quantity + 1
                            )
                          }
                          className="border border-neutral-300 p-1"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() =>
                            removeItem(item.productId, item.color, item.size)
                          }
                          className="ml-auto text-neutral-400 hover:text-black"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-neutral-200 px-6 py-6">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="mt-2 flex justify-between text-sm text-green-600">
                  <span>Discount</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="mt-2 flex justify-between font-medium">
                <span>Total</span>
                <span>{formatPrice(finalTotal)}</span>
              </div>
              <p className="mt-2 text-xs text-neutral-500">
                Shipping calculated at checkout
              </p>
              <Button className="mt-4 w-full" asChild>
                <Link href="/checkout" onClick={closeCart}>
                  Checkout
                </Link>
              </Button>
              <Button variant="outline" className="mt-2 w-full" asChild>
                <Link href="/cart" onClick={closeCart}>
                  View Cart
                </Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
