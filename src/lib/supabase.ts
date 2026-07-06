import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const DEFAULT_SUPABASE_URL = "https://fimhfsbwovjgdibftdkx.supabase.co";

function cleanEnv(value?: string): string | undefined {
  if (!value) return undefined;
  return value.trim().replace(/^["']|["']$/g, "");
}

function isValidSupabaseUrl(url?: string): boolean {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return (
      (parsed.protocol === "http:" || parsed.protocol === "https:") &&
      parsed.hostname.endsWith(".supabase.co")
    );
  } catch {
    return false;
  }
}

export function resolveSupabaseUrl(): string | null {
  const envUrl = cleanEnv(process.env.NEXT_PUBLIC_SUPABASE_URL);
  if (isValidSupabaseUrl(envUrl)) return envUrl!;
  if (isValidSupabaseUrl(DEFAULT_SUPABASE_URL)) return DEFAULT_SUPABASE_URL;
  return null;
}

function resolveAnonKey(): string | undefined {
  return cleanEnv(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

let browserClient: SupabaseClient | null = null;

export function getSupabaseBrowserClient(): SupabaseClient | null {
  const url = resolveSupabaseUrl();
  const key = resolveAnonKey();
  if (!url || !key) return null;
  if (!browserClient) {
    try {
      browserClient = createClient(url, key);
    } catch {
      return null;
    }
  }
  return browserClient;
}

export function isSupabaseConfigured(): boolean {
  return !!resolveSupabaseUrl() && !!resolveAnonKey();
}

/** Server-side client — prefers service role, falls back to anon for RLS-allowed writes */
export function createServerSupabaseClient(): SupabaseClient | null {
  const url = resolveSupabaseUrl();
  const serviceKey = cleanEnv(process.env.SUPABASE_SERVICE_ROLE_KEY);
  const key = serviceKey || resolveAnonKey();
  if (!url || !key) return null;

  try {
    return createClient(url, key);
  } catch (error) {
    console.error("Failed to create Supabase client:", error);
    return null;
  }
}

export function isSupabaseServerConfigured(): boolean {
  return (
    !!resolveSupabaseUrl() &&
    !!(cleanEnv(process.env.SUPABASE_SERVICE_ROLE_KEY) || resolveAnonKey())
  );
}

export function hasSupabaseServiceRole(): boolean {
  return !!resolveSupabaseUrl() && !!cleanEnv(process.env.SUPABASE_SERVICE_ROLE_KEY);
}
