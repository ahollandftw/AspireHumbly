import type { Metadata } from "next";
import { ProductCard } from "@/components/product/product-card";
import { getBestSellers } from "@/lib/products";

export const metadata: Metadata = {
  title: "Best Sellers",
  description: "Community favorites from Aspire Humbly. Proven pieces worn with purpose.",
};

export default function BestSellersPage() {
  const products = getBestSellers();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight uppercase md:text-5xl">Best Sellers</h1>
      <p className="mt-4 text-neutral-500">The pieces our community keeps coming back to.</p>
      <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
