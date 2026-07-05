"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface OrderStatus {
  id: string;
  status: string;
  fulfillmentStatus?: string;
  trackingNumber?: string;
  trackingUrl?: string;
  createdAt: string;
}

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [order, setOrder] = useState<OrderStatus | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleTrack(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const res = await fetch(
        `/api/orders/track?orderId=${encodeURIComponent(orderId)}&email=${encodeURIComponent(email)}`
      );
      const data = await res.json();
      if (data.order) {
        setOrder(data.order);
      } else {
        setError(data.error || "Order not found");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight uppercase">Track Order</h1>
      <p className="mt-2 text-neutral-500">
        Enter your order ID and email to check your order status.
      </p>

      <form onSubmit={handleTrack} className="mt-8 space-y-4">
        <div>
          <Label htmlFor="orderId">Order ID</Label>
          <Input
            id="orderId"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="AH-XXXXXXXX"
            required
            className="mt-2"
          />
        </div>
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
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Searching..." : "Track Order"}
        </Button>
      </form>

      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

      {order && (
        <div className="mt-8 border border-neutral-200 p-6">
          <h2 className="font-medium">Order {order.id}</h2>
          <p className="mt-2 text-sm text-neutral-500">
            Placed on {new Date(order.createdAt).toLocaleDateString()}
          </p>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-500">Status</span>
              <span className="capitalize">{order.status}</span>
            </div>
            {order.fulfillmentStatus && (
              <div className="flex justify-between">
                <span className="text-neutral-500">Fulfillment</span>
                <span className="capitalize">{order.fulfillmentStatus}</span>
              </div>
            )}
            {order.trackingNumber && (
              <div className="flex justify-between">
                <span className="text-neutral-500">Tracking</span>
                {order.trackingUrl ? (
                  <a href={order.trackingUrl} target="_blank" rel="noopener noreferrer" className="underline">
                    {order.trackingNumber}
                  </a>
                ) : (
                  <span>{order.trackingNumber}</span>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
