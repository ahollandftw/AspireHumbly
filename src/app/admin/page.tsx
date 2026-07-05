import { getOrders, getSubscribers, isUsingSupabase } from "@/lib/db";
import { getAllProducts } from "@/lib/products";
import { isStripeConfigured } from "@/lib/stripe";
import { isPrintfulConfigured } from "@/lib/printful";
import { isSupabaseConfigured, hasSupabaseServiceRole } from "@/lib/supabase";

export default async function AdminDashboard() {
  const orders = await getOrders();
  const subscribers = await getSubscribers();
  const products = getAllProducts();

  const stats = [
    { label: "Products", value: products.length },
    { label: "Orders", value: orders.length },
    { label: "Subscribers", value: subscribers.length },
    {
      label: "Revenue",
      value: `$${(orders.reduce((s, o) => s + o.total, 0) / 100).toFixed(2)}`,
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight uppercase">Dashboard</h1>
      <p className="mt-2 text-neutral-500">Aspire Humbly store overview</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="border border-neutral-200 bg-white p-6">
            <p className="text-xs tracking-widest text-neutral-500 uppercase">
              {stat.label}
            </p>
            <p className="mt-2 text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="text-lg font-bold tracking-tight uppercase">Integrations</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="border border-neutral-200 bg-white p-4">
            <p className="text-sm font-medium">Stripe</p>
            <p className={`mt-1 text-xs ${isStripeConfigured() ? "text-green-600" : "text-neutral-400"}`}>
              {isStripeConfigured() ? "Connected" : "Not configured"}
            </p>
          </div>
          <div className="border border-neutral-200 bg-white p-4">
            <p className="text-sm font-medium">Printful</p>
            <p className={`mt-1 text-xs ${isPrintfulConfigured() ? "text-green-600" : "text-neutral-400"}`}>
              {isPrintfulConfigured() ? "Connected" : "Not configured"}
            </p>
          </div>
          <div className="border border-neutral-200 bg-white p-4">
            <p className="text-sm font-medium">Supabase</p>
            <p className={`mt-1 text-xs ${isUsingSupabase() ? "text-green-600" : "text-neutral-400"}`}>
              {isUsingSupabase()
                ? hasSupabaseServiceRole()
                  ? "Connected (full access)"
                  : "Connected (limited — add service role for orders)"
                : isSupabaseConfigured()
                  ? "Keys set — add service role key"
                  : "Not configured — using local JSON"}
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-lg font-bold tracking-tight uppercase">Recent Orders</h2>
        {orders.length === 0 ? (
          <p className="mt-4 text-sm text-neutral-500">No orders yet.</p>
        ) : (
          <div className="mt-4 overflow-x-auto border border-neutral-200 bg-white">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50">
                  <th className="px-4 py-3 font-medium">Order</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Total</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(-5).reverse().map((order) => (
                  <tr key={order.id} className="border-b border-neutral-100">
                    <td className="px-4 py-3">{order.id}</td>
                    <td className="px-4 py-3">{order.email}</td>
                    <td className="px-4 py-3">${(order.total / 100).toFixed(2)}</td>
                    <td className="px-4 py-3 capitalize">{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
