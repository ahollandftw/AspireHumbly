import { NextResponse } from "next/server";
import { saveSubscriber } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { email, phone, source = "website" } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    await saveSubscriber({
      id: `sub_${Date.now()}`,
      email,
      phone,
      source,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
