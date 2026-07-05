import { NextResponse } from "next/server";
import { syncPrintfulProducts, isPrintfulConfigured } from "@/lib/printful";

export async function POST() {
  if (!isPrintfulConfigured()) {
    return NextResponse.json({
      synced: false,
      message: "Configure PRINTFUL_API_KEY to enable product sync",
    });
  }

  try {
    const result = await syncPrintfulProducts();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Printful sync error:", error);
    return NextResponse.json({ error: "Sync failed" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    configured: isPrintfulConfigured(),
    message: "POST to this endpoint to sync products from Printful",
  });
}
