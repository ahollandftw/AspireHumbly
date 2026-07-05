import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { WishlistButton } from "@/components/product/wishlist-button";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const image = product.variants[0]?.images[0];
  const hasSale = product.compareAtPrice && product.compareAtPrice > product.price;

  return (
    <div className="group relative">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
          {image && (
            <Image
              src={image}
              alt={product.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          )}
          {product.newArrival && (
            <span className="absolute top-3 left-3 bg-black px-2 py-1 text-[10px] tracking-widest text-white uppercase">
              New
            </span>
          )}
          {hasSale && (
            <span className="absolute top-3 right-3 bg-white px-2 py-1 text-[10px] tracking-widest text-black uppercase">
              Sale
            </span>
          )}
        </div>
        <div className="mt-4">
          <h3 className="text-sm font-medium">{product.title}</h3>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-sm">{formatPrice(product.price)}</span>
            {hasSale && (
              <span className="text-sm text-neutral-400 line-through">
                {formatPrice(product.compareAtPrice!)}
              </span>
            )}
          </div>
        </div>
      </Link>
      <div className="absolute top-3 right-3 opacity-0 transition-opacity group-hover:opacity-100">
        <WishlistButton product={product} />
      </div>
    </div>
  );
}
