import type { CartItem, DonationBreakdown, DonationOptions } from "@/types";
import { getProductBySlug, getAllProducts } from "@/lib/products";

export const DONATION_PER_SHIRT_CENTS = 100;
export const HABITAT_PARTNER_NAME = "Habitat for Humanity";

export type { DonationBreakdown, DonationOptions };

function resolveCategory(item: CartItem): string | undefined {
  if (item.category) return item.category;
  const bySlug = getProductBySlug(item.slug);
  if (bySlug) return bySlug.category;
  return getAllProducts().find((p) => p.id === item.productId)?.category;
}

export function countShirts(items: CartItem[]): number {
  return items.reduce((sum, item) => {
    const category = resolveCategory(item);
    if (category === "tees") return sum + item.quantity;
    return sum;
  }, 0);
}

export function calculateRoundUpAmount(amountCents: number): number {
  const remainder = amountCents % 100;
  if (remainder === 0) return 0;
  return 100 - remainder;
}

export function calculateDonation(
  items: CartItem[],
  orderSubtotalCents: number,
  shippingCents: number,
  options: DonationOptions
): DonationBreakdown {
  const shirtCount = countShirts(items);
  const baseAmount = shirtCount * DONATION_PER_SHIRT_CENTS;
  const customAmount = Math.max(0, Math.round(options.customAmountCents));

  const preRoundTotal =
    orderSubtotalCents + shippingCents + baseAmount + customAmount;

  const roundUpAmount = options.roundUp
    ? calculateRoundUpAmount(preRoundTotal)
    : 0;

  return {
    shirtCount,
    baseAmount,
    roundUpAmount,
    customAmount,
    total: baseAmount + roundUpAmount + customAmount,
  };
}

export function calculateOrderTotal(
  subtotal: number,
  discount: number,
  shipping: number,
  donation: DonationBreakdown
): number {
  return Math.max(0, subtotal - discount) + shipping + donation.total;
}
