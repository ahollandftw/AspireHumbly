"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useWishlistStore } from "@/store/wishlist";
import { formatPrice } from "@/lib/utils";

interface User {
  email: string;
}

export default function AccountPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);
  const wishlist = useWishlistStore((s) => s.items);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("ah-user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  function handleAuth(e: React.FormEvent) {
    e.preventDefault();
    const u = { email };
    localStorage.setItem("ah-user", JSON.stringify(u));
    setUser(u);
  }

  function handleSignOut() {
    localStorage.removeItem("ah-user");
    setUser(null);
  }

  if (!mounted) return null;

  if (user) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight uppercase">My Account</h1>
        <p className="mt-2 text-neutral-500">{user.email}</p>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <Link
            href="/track-order"
            className="border border-neutral-200 p-6 transition-colors hover:border-black"
          >
            <h2 className="font-medium tracking-widest uppercase">Orders</h2>
            <p className="mt-2 text-sm text-neutral-500">Track and view order history</p>
          </Link>
          <div className="border border-neutral-200 p-6">
            <h2 className="font-medium tracking-widest uppercase">Wishlist</h2>
            <p className="mt-2 text-sm text-neutral-500">{wishlist.length} saved items</p>
          </div>
        </div>

        {wishlist.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold tracking-tight uppercase">Wishlist</h2>
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
              {wishlist.map((item) => (
                <Link key={item.productId} href={`/products/${item.slug}`}>
                  <div className="relative aspect-[3/4] bg-neutral-100">
                    <Image src={item.image} alt={item.title} fill className="object-cover" sizes="200px" />
                  </div>
                  <p className="mt-2 text-sm">{item.title}</p>
                  <p className="text-sm text-neutral-500">{formatPrice(item.price)}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <Button variant="outline" className="mt-8" onClick={handleSignOut}>
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight uppercase">
        {mode === "login" ? "Sign In" : "Create Account"}
      </h1>
      <p className="mt-2 text-neutral-500">
        Track orders, save favorites, and get exclusive access.
      </p>

      <form onSubmit={handleAuth} className="mt-8 space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-2"
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-2"
          />
        </div>
        <Button type="submit" className="w-full">
          {mode === "login" ? "Sign In" : "Create Account"}
        </Button>
      </form>

      <button
        onClick={() => setMode(mode === "login" ? "register" : "login")}
        className="mt-4 w-full text-center text-sm text-neutral-500 underline"
      >
        {mode === "login"
          ? "Don't have an account? Create one"
          : "Already have an account? Sign in"}
      </button>
    </div>
  );
}
