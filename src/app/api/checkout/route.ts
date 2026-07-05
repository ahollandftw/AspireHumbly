import { NextResponse } from "next/server";
import { stripe, isStripeConfigured } from "@/lib/stripe";
import { generateOrderId, saveOrder, updateOrder } from "@/lib/db";
import { createPrintfulOrder, isPrintfulConfigured } from "@/lib/printful";
import type { CartItem, ShippingAddress } from "@/types";

interface CheckoutBody {
  items: CartItem[];
  email: string;
  shippingAddress: ShippingAddress;
  discountCode?: string | null;
  discountAmount?: number;
}

const SHIPPING_CENTS = 599;

export async function POST(request: Request) {
  try {
    const body: CheckoutBody = await request.json();
    const { items, email, shippingAddress, discountCode, discountAmount = 0 } = body;

    if (!items?.length) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
    const total = Math.max(0, subtotal - discountAmount) + SHIPPING_CENTS;
    const orderId = generateOrderId();

    const order = {
      id: orderId,
      email,
      items,
      subtotal,
      discount: discountAmount,
      shipping: SHIPPING_CENTS,
      total,
      status: "pending" as const,
      createdAt: new Date().toISOString(),
      shippingAddress,
    };

    if (isStripeConfigured() && stripe) {
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        customer_email: email,
        line_items: [
          ...items.map((item) => ({
            price_data: {
              currency: "usd",
              product_data: {
                name: item.title,
                description: `${item.color} / ${item.size}`,
                images: [item.image],
              },
              unit_amount: item.price,
            },
            quantity: item.quantity,
          })),
          {
            price_data: {
              currency: "usd",
              product_data: { name: "Shipping" },
              unit_amount: SHIPPING_CENTS,
            },
            quantity: 1,
          },
        ],
        discounts: discountAmount > 0
          ? undefined
          : undefined,
        metadata: {
          orderId,
          discountCode: discountCode || "",
        },
        success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?order=${orderId}`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart`,
      });

      await saveOrder({ ...order, stripeSessionId: session.id });
      return NextResponse.json({ url: session.url });
    }

    await saveOrder({ ...order, status: "paid" });

    if (isPrintfulConfigured()) {
      try {
        const printfulItems = items
          .filter((i) => i.printfulVariantId)
          .map((i) => ({
            variant_id: i.printfulVariantId!,
            quantity: i.quantity,
          }));

        if (printfulItems.length > 0) {
          const printfulOrder = await createPrintfulOrder({
            external_id: orderId,
            recipient: {
              name: shippingAddress.name,
              address1: shippingAddress.line1,
              address2: shippingAddress.line2,
              city: shippingAddress.city,
              state_code: shippingAddress.state,
              country_code: shippingAddress.country,
              zip: shippingAddress.postalCode,
              email,
            },
            items: printfulItems,
          });
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const pfId = (printfulOrder as any)?.result?.id;
          if (pfId) {
            await updateOrder(orderId, {
              status: "processing",
              printfulOrderId: pfId,
              fulfillmentStatus: "submitted",
            });
          }
        }
      } catch (err) {
        console.error("Printful order failed:", err);
      }
    }

    return NextResponse.json({ demo: true, orderId });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
