"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, Truck, Package, Shield } from "lucide-react";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";
import { WishlistButton } from "@/components/product/wishlist-button";
import { ProductCard } from "@/components/product/product-card";
import { trackEvent } from "@/components/analytics";
import { cn } from "@/lib/utils";

interface ProductDetailProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const addItem = useCartStore((s) => s.addItem);

  const avgRating =
    product.reviews.length > 0
      ? product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length
      : 0;

  function handleAddToCart() {
    if (!selectedVariant || !selectedSize) return;
    addItem({
      productId: product.id,
      slug: product.slug,
      title: product.title,
      image: selectedVariant.images[0],
      color: selectedVariant.color,
      size: selectedSize,
      price: product.price,
      quantity: 1,
      printfulVariantId: selectedVariant.printfulVariantId,
    });
    trackEvent("add_to_cart", {
      product_id: product.id,
      value: product.price / 100,
    });
  }

  return (
    <div>
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <div className="relative aspect-[3/4] bg-neutral-100">
            {selectedVariant?.images[selectedImage] && (
              <Image
                src={selectedVariant.images[selectedImage]}
                alt={product.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            )}
          </div>
          {selectedVariant && selectedVariant.images.length > 1 && (
            <div className="mt-4 flex gap-2">
              {selectedVariant.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={cn(
                    "relative h-20 w-16 border-2",
                    selectedImage === i ? "border-black" : "border-transparent"
                  )}
                >
                  <Image src={img} alt="" fill className="object-cover" sizes="64px" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs tracking-widest text-neutral-500 uppercase">
                {product.category}
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight">{product.title}</h1>
            </div>
            <WishlistButton product={product} className="opacity-100" />
          </div>

          {product.reviews.length > 0 && (
            <div className="mt-3 flex items-center gap-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-4 w-4",
                      i < Math.round(avgRating)
                        ? "fill-black text-black"
                        : "text-neutral-300"
                    )}
                  />
                ))}
              </div>
              <span className="text-sm text-neutral-500">
                ({product.reviews.length} reviews)
              </span>
            </div>
          )}

          <div className="mt-4 flex items-center gap-3">
            <span className="text-2xl font-medium">{formatPrice(product.price)}</span>
            {product.compareAtPrice && (
              <span className="text-lg text-neutral-400 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          <p className="mt-6 leading-relaxed text-neutral-600">{product.description}</p>

          <div className="mt-8">
            <p className="text-xs font-medium tracking-widest uppercase">Color</p>
            <div className="mt-3 flex gap-3">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => {
                    setSelectedVariant(variant);
                    setSelectedImage(0);
                    setSelectedSize(null);
                  }}
                  className={cn(
                    "flex items-center gap-2 border px-4 py-2 text-xs tracking-wider uppercase",
                    selectedVariant?.id === variant.id
                      ? "border-black"
                      : "border-neutral-300"
                  )}
                >
                  <span
                    className="h-4 w-4 rounded-full border border-neutral-300"
                    style={{ backgroundColor: variant.colorHex }}
                  />
                  {variant.color}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium tracking-widest uppercase">Size</p>
              <a href="/size-guide" className="text-xs text-neutral-500 underline">
                Size Guide
              </a>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {selectedVariant?.sizes.map((s) => (
                <button
                  key={s.size}
                  disabled={!s.inStock}
                  onClick={() => setSelectedSize(s.size)}
                  className={cn(
                    "min-w-[3rem] border px-4 py-2 text-xs tracking-wider uppercase",
                    selectedSize === s.size
                      ? "border-black bg-black text-white"
                      : "border-neutral-300",
                    !s.inStock && "cursor-not-allowed opacity-40 line-through"
                  )}
                >
                  {s.size}
                </button>
              ))}
            </div>
          </div>

          <Button
            className="mt-8 w-full"
            size="lg"
            disabled={!selectedSize}
            onClick={handleAddToCart}
          >
            {selectedSize ? "Add to Cart" : "Select a Size"}
          </Button>

          <div className="mt-8 space-y-4 border-t border-neutral-200 pt-8">
            <div className="flex items-start gap-3 text-sm">
              <Truck className="mt-0.5 h-4 w-4 shrink-0" />
              <div>
                <p className="font-medium">Shipping Estimate</p>
                <p className="text-neutral-500">{product.shippingEstimate}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <Package className="mt-0.5 h-4 w-4 shrink-0" />
              <div>
                <p className="font-medium">Fulfillment</p>
                <p className="text-neutral-500 capitalize">
                  {product.fulfillmentStatus.replace("-", " ")} — made to order
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <Shield className="mt-0.5 h-4 w-4 shrink-0" />
              <div>
                <p className="font-medium">Fit</p>
                <p className="text-neutral-500">{product.fitDetails}</p>
              </div>
            </div>
          </div>

          <details className="mt-6 border-t border-neutral-200 pt-6">
            <summary className="cursor-pointer text-xs font-medium tracking-widest uppercase">
              Materials & Care
            </summary>
            <p className="mt-3 text-sm text-neutral-600">{product.materialDetails}</p>
          </details>
        </div>
      </div>

      {product.reviews.length > 0 && (
        <section className="mt-24 border-t border-neutral-200 pt-16">
          <h2 className="text-2xl font-bold tracking-tight uppercase">Reviews</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {product.reviews.map((review) => (
              <div key={review.id} className="border border-neutral-200 p-6">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-3 w-3",
                          i < review.rating
                            ? "fill-black text-black"
                            : "text-neutral-300"
                        )}
                      />
                    ))}
                  </div>
                  {review.verified && (
                    <span className="text-[10px] tracking-wider text-neutral-500 uppercase">
                      Verified
                    </span>
                  )}
                </div>
                <h3 className="mt-3 font-medium">{review.title}</h3>
                <p className="mt-2 text-sm text-neutral-600">{review.body}</p>
                <p className="mt-3 text-xs text-neutral-400">
                  {review.author} — {review.date}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {relatedProducts.length > 0 && (
        <section className="mt-24 border-t border-neutral-200 pt-16">
          <h2 className="text-2xl font-bold tracking-tight uppercase">
            You May Also Like
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
