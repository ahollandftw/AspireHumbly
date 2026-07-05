const PRINTFUL_API = "https://api.printful.com";

interface PrintfulConfig {
  apiKey: string;
}

function getConfig(): PrintfulConfig | null {
  const apiKey = process.env.PRINTFUL_API_KEY;
  if (!apiKey) return null;
  return { apiKey };
}

async function printfulFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const config = getConfig();
  if (!config) throw new Error("Printful API key not configured");

  const res = await fetch(`${PRINTFUL_API}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Printful API error: ${res.status} - ${error}`);
  }

  return res.json();
}

export function isPrintfulConfigured(): boolean {
  return !!process.env.PRINTFUL_API_KEY;
}

export async function getPrintfulProducts() {
  return printfulFetch("/store/products");
}

export async function getPrintfulProduct(id: number) {
  return printfulFetch(`/store/products/${id}`);
}

export async function createPrintfulOrder(order: {
  recipient: {
    name: string;
    address1: string;
    address2?: string;
    city: string;
    state_code: string;
    country_code: string;
    zip: string;
    email: string;
  };
  items: Array<{
    variant_id: number;
    quantity: number;
  }>;
  external_id?: string;
}) {
  return printfulFetch("/orders", {
    method: "POST",
    body: JSON.stringify(order),
  });
}

export async function getPrintfulShippingRates(params: {
  recipient: {
    country_code: string;
    state_code?: string;
    city?: string;
    zip?: string;
  };
  items: Array<{ variant_id: number; quantity: number }>;
}) {
  return printfulFetch("/shipping/rates", {
    method: "POST",
    body: JSON.stringify(params),
  });
}

export async function confirmPrintfulOrder(orderId: number) {
  return printfulFetch(`/orders/${orderId}/confirm`, { method: "POST" });
}

export async function getPrintfulOrder(orderId: number) {
  return printfulFetch(`/orders/${orderId}`);
}

export async function syncPrintfulProducts() {
  if (!isPrintfulConfigured()) {
    return { synced: false, message: "Printful not configured" };
  }
  const data = await getPrintfulProducts();
  return { synced: true, data };
}
