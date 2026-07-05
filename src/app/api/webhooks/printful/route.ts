import { NextResponse } from "next/server";
import { updateOrder, getOrders } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, data } = body;

    if (type === "package_shipped" || type === "order_updated") {
      const externalId = data?.order?.external_id;
      const trackingNumber = data?.shipment?.tracking_number;
      const trackingUrl = data?.shipment?.tracking_url;

      if (externalId) {
        const orders = await getOrders();
        const order = orders.find((o) => o.id === externalId);
        if (order) {
          await updateOrder(externalId, {
            status: "shipped",
            fulfillmentStatus: type,
            trackingNumber,
            trackingUrl,
          });
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Printful webhook error:", error);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}
