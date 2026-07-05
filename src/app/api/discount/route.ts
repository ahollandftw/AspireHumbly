import { NextResponse } from "next/server";
import { validateDiscountCode } from "@/lib/products";

export async function POST(request: Request) {
  const { code, subtotal } = await request.json();

  if (!code) {
    return NextResponse.json({ valid: false, message: "Enter a discount code" });
  }

  const discount = validateDiscountCode(code);
  if (!discount) {
    return NextResponse.json({ valid: false, message: "Invalid discount code" });
  }

  if (discount.minOrder && subtotal < discount.minOrder) {
    return NextResponse.json({
      valid: false,
      message: `Minimum order of $${(discount.minOrder / 100).toFixed(2)} required`,
    });
  }

  let discountAmount = 0;
  if (discount.type === "percentage") {
    discountAmount = Math.round(subtotal * (discount.value / 100));
  } else {
    discountAmount = discount.value;
  }

  return NextResponse.json({
    valid: true,
    code: discount.code,
    discountAmount,
  });
}
