import { NextResponse } from "next/server";
import { saveContactMessage } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 });
    }

    await saveContactMessage({ name, email, subject, message });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
