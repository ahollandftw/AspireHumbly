import type { Order, Subscriber, ShippingAddress, CartItem, DonationBreakdown } from "@/types";
import { createServerSupabaseClient } from "@/lib/supabase";

interface OrderRow {
  id: string;
  email: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  donation: DonationBreakdown | null;
  total: number;
  status: Order["status"];
  fulfillment_status: string | null;
  tracking_number: string | null;
  tracking_url: string | null;
  stripe_session_id: string | null;
  printful_order_id: number | null;
  shipping_address: ShippingAddress;
  created_at: string;
}

interface SubscriberRow {
  id: string;
  email: string;
  phone: string | null;
  source: string;
  created_at: string;
}

function rowToOrder(row: OrderRow): Order {
  return {
    id: row.id,
    email: row.email,
    items: row.items,
    subtotal: row.subtotal,
    discount: row.discount,
    shipping: row.shipping,
    donation: row.donation ?? undefined,
    total: row.total,
    status: row.status,
    fulfillmentStatus: row.fulfillment_status ?? undefined,
    trackingNumber: row.tracking_number ?? undefined,
    trackingUrl: row.tracking_url ?? undefined,
    stripeSessionId: row.stripe_session_id ?? undefined,
    printfulOrderId: row.printful_order_id ?? undefined,
    shippingAddress: row.shipping_address,
    createdAt: row.created_at,
  };
}

function orderToRow(order: Order): OrderRow {
  return {
    id: order.id,
    email: order.email,
    items: order.items,
    subtotal: order.subtotal,
    discount: order.discount,
    shipping: order.shipping,
    donation: order.donation ?? null,
    total: order.total,
    status: order.status,
    fulfillment_status: order.fulfillmentStatus ?? null,
    tracking_number: order.trackingNumber ?? null,
    tracking_url: order.trackingUrl ?? null,
    stripe_session_id: order.stripeSessionId ?? null,
    printful_order_id: order.printfulOrderId ?? null,
    shipping_address: order.shippingAddress,
    created_at: order.createdAt,
  };
}

function rowToSubscriber(row: SubscriberRow): Subscriber {
  return {
    id: row.id,
    email: row.email,
    phone: row.phone ?? undefined,
    source: row.source,
    createdAt: row.created_at,
  };
}

export async function supabaseGetOrders(): Promise<Order[]> {
  const client = createServerSupabaseClient();
  if (!client) return [];

  const { data, error } = await client
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase getOrders error:", error);
    return [];
  }

  return (data as OrderRow[]).map(rowToOrder);
}

export async function supabaseSaveOrder(order: Order): Promise<void> {
  const client = createServerSupabaseClient();
  if (!client) throw new Error("Supabase not configured");

  const row = orderToRow(order);
  const { error } = await client.from("orders").insert(row);

  if (error) {
    console.error("Supabase saveOrder error:", error);
    throw error;
  }
}

export async function supabaseGetOrderById(id: string): Promise<Order | undefined> {
  const client = createServerSupabaseClient();
  if (!client) return undefined;

  const { data, error } = await client
    .from("orders")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return undefined;
  return rowToOrder(data as OrderRow);
}

export async function supabaseUpdateOrder(
  id: string,
  updates: Partial<Order>
): Promise<Order | null> {
  const client = createServerSupabaseClient();
  if (!client) return null;

  const existing = await supabaseGetOrderById(id);
  if (!existing) return null;

  const merged = { ...existing, ...updates };
  const row: Partial<OrderRow> = {
    status: merged.status,
    fulfillment_status: merged.fulfillmentStatus ?? null,
    tracking_number: merged.trackingNumber ?? null,
    tracking_url: merged.trackingUrl ?? null,
    stripe_session_id: merged.stripeSessionId ?? null,
    printful_order_id: merged.printfulOrderId ?? null,
  };

  const { data, error } = await client
    .from("orders")
    .update(row)
    .eq("id", id)
    .select()
    .single();

  if (error || !data) {
    console.error("Supabase updateOrder error:", error);
    return null;
  }

  return rowToOrder(data as OrderRow);
}

export async function supabaseGetSubscribers(): Promise<Subscriber[]> {
  const client = createServerSupabaseClient();
  if (!client) return [];

  const { data, error } = await client
    .from("subscribers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase getSubscribers error:", error);
    return [];
  }

  return (data as SubscriberRow[]).map(rowToSubscriber);
}

export async function supabaseSaveSubscriber(subscriber: Subscriber): Promise<void> {
  const client = createServerSupabaseClient();
  if (!client) throw new Error("Supabase not configured");

  const { error } = await client.from("subscribers").upsert(
    {
      id: subscriber.id,
      email: subscriber.email,
      phone: subscriber.phone ?? null,
      source: subscriber.source,
      created_at: subscriber.createdAt,
    },
    { onConflict: "email", ignoreDuplicates: true }
  );

  if (error) {
    console.error("Supabase saveSubscriber error:", error);
    throw error;
  }
}

export async function supabaseSaveContactMessage(message: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<void> {
  const client = createServerSupabaseClient();
  if (!client) throw new Error("Supabase not configured");

  const { error } = await client.from("contact_messages").insert(message);

  if (error) {
    console.error("Supabase saveContactMessage error:", error);
    throw error;
  }
}

export async function supabaseHealthCheck(): Promise<{
  connected: boolean;
  error?: string;
}> {
  const client = createServerSupabaseClient();
  if (!client) {
    return { connected: false, error: "Missing SUPABASE_SERVICE_ROLE_KEY or anon key" };
  }

  const table = process.env.SUPABASE_SERVICE_ROLE_KEY ? "orders" : "subscribers";
  const { error } = await client.from(table).select("id").limit(1);

  if (error) {
    return { connected: false, error: error.message };
  }

  return { connected: true };
}
