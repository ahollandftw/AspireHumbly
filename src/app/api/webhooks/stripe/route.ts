import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { updateOrder, getOrders } from "@/lib/db";
import { confirmPrintfulOrder } from "@/lib/printful";
import type Stripe from "stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!stripe || !sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;

    if (orderId) {
      await updateOrder(orderId, { status: "paid" });

      const orders = await getOrders();
      const order = orders.find((o) => o.id === orderId);

      if (order?.printfulOrderId) {
        try {
          await confirmPrintfulOrder(order.printfulOrderId);
          await updateOrder(orderId, {
            fulfillmentStatus: "confirmed",
            status: "processing",
          });
        } catch (err) {
          console.error("Printful confirm failed:", err);
        }
      }
    }
  }

  return NextResponse.json({ received: true });
}
