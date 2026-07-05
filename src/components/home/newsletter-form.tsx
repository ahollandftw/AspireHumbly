"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "homepage" }),
      });
      setStatus("success");
      form.reset();
    } catch {
      setStatus("idle");
    }
  }

  return (
    <section className="bg-neutral-50 py-24">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight uppercase md:text-4xl">
          Stay in the Loop
        </h2>
        <p className="mt-4 text-neutral-500">
          Early access to drops. Exclusive offers. Zero spam.
        </p>
        {status === "success" ? (
          <p className="mt-8 text-sm font-medium text-green-600">
            You&apos;re on the list.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <input
              name="email"
              type="email"
              placeholder="Your email"
              required
              className="flex-1 border border-neutral-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-black px-8 py-3 text-xs tracking-widest text-white uppercase disabled:opacity-50"
            >
              {status === "loading" ? "..." : "Subscribe"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
