"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatPrice } from "@/lib/utils";
import {
  calculateDonation,
  countShirts,
  HABITAT_PARTNER_NAME,
  DONATION_PER_SHIRT_CENTS,
  type DonationOptions,
  type DonationBreakdown,
} from "@/lib/donations";
import type { CartItem } from "@/types";

interface DonationSectionProps {
  items: CartItem[];
  subtotalCents: number;
  discountCents: number;
  shippingCents: number;
  onChange: (options: DonationOptions, breakdown: DonationBreakdown) => void;
}

export function DonationSection({
  items,
  subtotalCents,
  discountCents,
  shippingCents,
  onChange,
}: DonationSectionProps) {
  const [roundUp, setRoundUp] = useState(false);
  const [customDollars, setCustomDollars] = useState("");

  const shirtCount = countShirts(items);
  const orderSubtotal = Math.max(0, subtotalCents - discountCents);
  const customAmountCents = Math.round(parseFloat(customDollars || "0") * 100) || 0;

  const options: DonationOptions = { roundUp, customAmountCents };
  const breakdown = calculateDonation(
    items,
    orderSubtotal,
    shippingCents,
    options
  );

  useEffect(() => {
    onChange(options, breakdown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roundUp, customAmountCents, items, orderSubtotal, shippingCents]);

  return (
    <div className="border border-neutral-200 bg-neutral-50 p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-sm font-medium tracking-widest uppercase">
            Give Back
          </h2>
          <p className="mt-2 text-sm text-neutral-600">
            Every shirt supports {HABITAT_PARTNER_NAME}. We donate{" "}
            {formatPrice(DONATION_PER_SHIRT_CENTS)} per tee in your order.
          </p>
        </div>
        <span className="shrink-0 text-[10px] font-medium tracking-widest text-neutral-400 uppercase">
          Habitat
        </span>
      </div>

      {shirtCount > 0 ? (
        <div className="mt-4 flex justify-between border-t border-neutral-200 pt-4 text-sm">
          <span className="text-neutral-600">
            Automatic donation ({shirtCount} shirt{shirtCount !== 1 ? "s" : ""})
          </span>
          <span className="font-medium">{formatPrice(breakdown.baseAmount)}</span>
        </div>
      ) : (
        <p className="mt-4 text-sm text-neutral-500">
          No tees in this order — add a custom donation below to support the cause.
        </p>
      )}

      <div className="mt-4 space-y-4 border-t border-neutral-200 pt-4">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={roundUp}
            onChange={(e) => setRoundUp(e.target.checked)}
            className="mt-1 h-4 w-4 border-neutral-300"
          />
          <span className="text-sm">
            <span className="font-medium">Round up my total</span>
            <span className="mt-0.5 block text-neutral-500">
              {roundUp && breakdown.roundUpAmount > 0
                ? `Adds ${formatPrice(breakdown.roundUpAmount)} to reach the next dollar`
                : roundUp
                  ? "Your total is already a round dollar amount"
                  : "Donate the change to round your total to the nearest dollar"}
            </span>
          </span>
        </label>

        <div>
          <Label htmlFor="customDonation" className="text-neutral-700">
            Custom donation (optional)
          </Label>
          <div className="relative mt-2">
            <span className="absolute top-1/2 left-4 -translate-y-1/2 text-sm text-neutral-400">
              $
            </span>
            <Input
              id="customDonation"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={customDollars}
              onChange={(e) => setCustomDollars(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
      </div>

      {breakdown.total > 0 && (
        <div className="mt-4 flex justify-between border-t border-neutral-200 pt-4 text-sm font-medium">
          <span>Total Habitat donation</span>
          <span>{formatPrice(breakdown.total)}</span>
        </div>
      )}
    </div>
  );
}
