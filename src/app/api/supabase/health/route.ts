import { NextResponse } from "next/server";
import { supabaseHealthCheck } from "@/lib/supabase-db";
import { isSupabaseConfigured } from "@/lib/supabase";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!isSupabaseConfigured()) {
    return NextResponse.json({
      connected: false,
      url: url || null,
      message: "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY",
    });
  }

  const health = await supabaseHealthCheck();

  return NextResponse.json({
    connected: health.connected,
    url,
    error: health.error,
    message: health.connected
      ? "Supabase connected and schema ready"
      : health.error?.includes("relation")
        ? "Connected but tables missing — run supabase/schema.sql in SQL Editor"
        : health.error,
  });
}
