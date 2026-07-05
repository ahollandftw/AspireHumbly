"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Search, ShoppingBag, Heart, User, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/mens", label: "Men's" },
  { href: "/womens", label: "Women's" },
  { href: "/new-arrivals", label: "New Arrivals" },
  { href: "/best-sellers", label: "Best Sellers" },
  { href: "/collections", label: "Collections" },
  { href: "/about", label: "About" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const itemCount = useCartStore((s) => s.itemCount());
  const openCart = useCartStore((s) => s.openCart);
  const wishlistCount = useWishlistStore((s) => s.items.length);

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        <button
          className="lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        <Link href="/" className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
          <Logo variant="monogram" size="sm" />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-medium tracking-widest text-neutral-700 uppercase transition-colors hover:text-black"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Search"
            className="hidden sm:block"
          >
            <Search className="h-5 w-5" />
          </button>
          <Link href="/account" aria-label="Account">
            <User className="h-5 w-5" />
          </Link>
          <Link href="/account" className="relative" aria-label="Wishlist">
            <Heart className="h-5 w-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center bg-black text-[10px] text-white">
                {wishlistCount}
              </span>
            )}
          </Link>
          <button
            onClick={openCart}
            className="relative"
            aria-label="Open cart"
          >
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center bg-black text-[10px] text-white">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-neutral-200 px-4 py-4 lg:px-8">
          <form action="/mens" method="get" className="mx-auto flex max-w-xl gap-2">
            <input
              name="search"
              type="search"
              placeholder="Search products..."
              className="flex-1 border border-neutral-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              autoFocus
            />
            <button
              type="submit"
              className="bg-black px-6 py-2 text-xs tracking-widest text-white uppercase"
            >
              Search
            </button>
          </form>
        </div>
      )}

      <div
        className={cn(
          "fixed inset-0 top-16 z-30 bg-white lg:hidden",
          mobileOpen ? "block" : "hidden"
        )}
      >
        <nav className="flex flex-col p-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="border-b border-neutral-100 py-4 text-lg font-medium tracking-widest uppercase"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
