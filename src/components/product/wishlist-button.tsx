"use client";

import { Heart } from "lucide-react";
import type { Product } from "@/types";
import { useWishlistStore } from "@/store/wishlist";
import { cn } from "@/lib/utils";

interface WishlistButtonProps {
  product: Product;
  className?: string;
}

export function WishlistButton({ product, className }: WishlistButtonProps) {
  const { isInWishlist, toggleItem } = useWishlistStore();
  const inWishlist = isInWishlist(product.id);
  const image = product.variants[0]?.images[0] ?? "";

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        toggleItem({
          productId: product.id,
          slug: product.slug,
          title: product.title,
          image,
          price: product.price,
        });
      }}
      className={cn(
        "flex h-9 w-9 items-center justify-center bg-white/90 backdrop-blur-sm transition-colors hover:bg-white",
        className
      )}
      aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart
        className={cn(
          "h-4 w-4",
          inWishlist ? "fill-black text-black" : "text-neutral-600"
        )}
      />
    </button>
  );
}
