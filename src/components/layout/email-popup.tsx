"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function EmailPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  useEffect(() => {
    const dismissed = localStorage.getItem("ah-email-popup-dismissed");
    if (dismissed) return;

    const timer = setTimeout(() => setOpen(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  function handleDismiss() {
    localStorage.setItem("ah-email-popup-dismissed", "true");
    setOpen(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "popup" }),
      });
      setStatus("success");
      localStorage.setItem("ah-email-popup-dismissed", "true");
      setTimeout(() => setOpen(false), 2000);
    } catch {
      setStatus("idle");
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleDismiss()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold tracking-tight uppercase">
            Join the Movement
          </DialogTitle>
        </DialogHeader>
        <p className="text-center text-sm text-neutral-500">
          Get 15% off your first order. Early access to drops. No noise.
        </p>
        {status === "success" ? (
          <p className="py-4 text-center text-sm font-medium text-green-600">
            Welcome to Aspire Humbly.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" className="w-full" disabled={status === "loading"}>
              {status === "loading" ? "Subscribing..." : "Get 15% Off"}
            </Button>
          </form>
        )}
        <button
          onClick={handleDismiss}
          className="mt-2 w-full text-center text-xs text-neutral-400 hover:text-neutral-600"
        >
          No thanks
        </button>
      </DialogContent>
    </Dialog>
  );
}
