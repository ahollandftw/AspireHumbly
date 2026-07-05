import { getOrders } from "@/lib/db";
import { formatPrice } from "@/lib/utils";

export default async function AdminOrdersPage() {
  const orders = await getOrders();

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight uppercase">Orders</h1>
      <p className="mt-2 text-sm text-neutral-500">
        View order status and fulfillment tracking from Printful webhooks.
      </p>

      {orders.length === 0 ? (
        <p className="mt-8 text-neutral-500">No orders yet.</p>
      ) : (
        <div className="mt-8 overflow-x-auto border border-neutral-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50">
                <th className="px-4 py-3 font-medium">Order ID</th>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Items</th>
                <th className="px-4 py-3 font-medium">Donation</th>
                <th className="px-4 py-3 font-medium">Total</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Fulfillment</th>
                <th className="px-4 py-3 font-medium">Tracking</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-neutral-100">
                  <td className="px-4 py-3 font-mono text-xs">{order.id}</td>
                  <td className="px-4 py-3">{order.email}</td>
                  <td className="px-4 py-3">{order.items.length}</td>
                  <td className="px-4 py-3">
                    {order.donation?.total
                      ? formatPrice(order.donation.total)
                      : "—"}
                  </td>
                  <td className="px-4 py-3">{formatPrice(order.total)}</td>
                  <td className="px-4 py-3 capitalize">{order.status}</td>
                  <td className="px-4 py-3 capitalize">
                    {order.fulfillmentStatus || "—"}
                  </td>
                  <td className="px-4 py-3">
                    {order.trackingNumber ? (
                      <a
                        href={order.trackingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        {order.trackingNumber}
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
