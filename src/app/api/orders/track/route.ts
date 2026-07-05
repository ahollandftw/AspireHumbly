import { NextResponse } from "next/server";
import { getOrderById } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get("orderId");
  const email = searchParams.get("email");

  if (!orderId || !email) {
    return NextResponse.json({ error: "Order ID and email required" }, { status: 400 });
  }

  const order = await getOrderById(orderId);

  if (!order || order.email.toLowerCase() !== email.toLowerCase()) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  return NextResponse.json({
    order: {
      id: order.id,
      status: order.status,
      fulfillmentStatus: order.fulfillmentStatus,
      trackingNumber: order.trackingNumber,
      trackingUrl: order.trackingUrl,
      createdAt: order.createdAt,
    },
  });
}
