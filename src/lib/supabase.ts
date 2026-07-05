import { createClient } from "@supabase/supabase-js";

export const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://fimhfsbwovjgdibftdkx.supabase.co";

const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export function isSupabaseConfigured(): boolean {
  return !!supabaseUrl && !!supabaseAnonKey;
}

/** Server-side client — prefers service role, falls back to anon for RLS-allowed writes */
export function createServerSupabaseClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const key = serviceKey || supabaseAnonKey;
  if (!supabaseUrl || !key) return null;
  return createClient(supabaseUrl, key);
}

export function isSupabaseServerConfigured(): boolean {
  return !!supabaseUrl && !!(process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey);
}

export function hasSupabaseServiceRole(): boolean {
  return !!supabaseUrl && !!process.env.SUPABASE_SERVICE_ROLE_KEY;
}
