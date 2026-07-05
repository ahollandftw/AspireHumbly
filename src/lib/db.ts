import { promises as fs } from "fs";
import path from "path";
import type { Order, Subscriber } from "@/types";
import { isSupabaseServerConfigured } from "@/lib/supabase";
import {
  supabaseGetOrders,
  supabaseSaveOrder,
  supabaseGetOrderById,
  supabaseUpdateOrder,
  supabaseGetSubscribers,
  supabaseSaveSubscriber,
  supabaseSaveContactMessage,
} from "@/lib/supabase-db";

const DATA_DIR = path.join(process.cwd(), "data");

function useSupabase(): boolean {
  return isSupabaseServerConfigured();
}

async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

async function readJson<T>(filename: string, fallback: T): Promise<T> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch {
    return fallback;
  }
}

async function writeJson<T>(filename: string, data: T): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(path.join(DATA_DIR, filename), JSON.stringify(data, null, 2));
}

export async function getOrders(): Promise<Order[]> {
  if (useSupabase()) return supabaseGetOrders();
  return readJson<Order[]>("orders.json", []);
}

export async function saveOrder(order: Order): Promise<void> {
  if (useSupabase()) {
    await supabaseSaveOrder(order);
    return;
  }
  const orders = await getOrders();
  orders.push(order);
  await writeJson("orders.json", orders);
}

export async function getOrderById(id: string): Promise<Order | undefined> {
  if (useSupabase()) return supabaseGetOrderById(id);
  const orders = await readJson<Order[]>("orders.json", []);
  return orders.find((o) => o.id === id);
}

export async function updateOrder(
  id: string,
  updates: Partial<Order>
): Promise<Order | null> {
  if (useSupabase()) return supabaseUpdateOrder(id, updates);

  const orders = await readJson<Order[]>("orders.json", []);
  const index = orders.findIndex((o) => o.id === id);
  if (index === -1) return null;
  orders[index] = { ...orders[index], ...updates };
  await writeJson("orders.json", orders);
  return orders[index];
}

export async function getSubscribers(): Promise<Subscriber[]> {
  if (useSupabase()) return supabaseGetSubscribers();
  return readJson<Subscriber[]>("subscribers.json", []);
}

export async function saveSubscriber(subscriber: Subscriber): Promise<void> {
  if (useSupabase()) {
    await supabaseSaveSubscriber(subscriber);
    return;
  }
  const subscribers = await readJson<Subscriber[]>("subscribers.json", []);
  if (subscribers.some((s) => s.email === subscriber.email)) return;
  subscribers.push(subscriber);
  await writeJson("subscribers.json", subscribers);
}

export async function saveContactMessage(message: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<void> {
  if (useSupabase()) {
    await supabaseSaveContactMessage(message);
    return;
  }
  console.log("Contact form submission (local):", message);
}

export function generateOrderId(): string {
  return `AH-${Date.now().toString(36).toUpperCase()}`;
}

export function isUsingSupabase(): boolean {
  return useSupabase();
}
