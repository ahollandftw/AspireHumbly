import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getOrderById } from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import { HABITAT_PARTNER_NAME } from "@/lib/donations";

interface Props {
  searchParams: Promise<{ demo?: string; order?: string }>;
}

export default async function CheckoutSuccessPage({ searchParams }: Props) {
  const { demo, order: orderId } = await searchParams;
  const order = orderId ? await getOrderById(orderId) : undefined;

  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="text-3xl font-bold tracking-tight uppercase">Order Confirmed</h1>
      <p className="mt-4 text-neutral-500">
        Thank you for your order. You&apos;ll receive a confirmation email shortly.
      </p>
      {orderId && (
        <p className="mt-2 text-sm text-neutral-400">
          Order ID: {orderId}
          {demo && " (Demo mode)"}
        </p>
      )}
      {order?.donation && order.donation.total > 0 && (
        <p className="mt-6 text-sm text-neutral-600">
          Your order includes a {formatPrice(order.donation.total)} donation to{" "}
          {HABITAT_PARTNER_NAME}. Thank you for giving back.
        </p>
      )}
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
        <Button asChild>
          <Link href="/track-order">Track Order</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/collections">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  );
}
