import { NextResponse } from "next/server";
import { stripe, isStripeConfigured } from "@/lib/stripe";

export async function GET() {
  if (!isStripeConfigured()) {
    return NextResponse.json({
      connected: false,
      message:
        "Add STRIPE_SECRET_KEY and NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY to .env.local",
    });
  }

  try {
    const account = await stripe!.accounts.retrieve();
    return NextResponse.json({
      connected: true,
      mode: process.env.STRIPE_SECRET_KEY?.startsWith("sk_live_")
        ? "live"
        : "test",
      accountId: account.id,
      webhookConfigured: !!process.env.STRIPE_WEBHOOK_SECRET,
      message: "Stripe connected",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({
      connected: false,
      message: `Stripe key invalid: ${message}`,
    });
  }
}
