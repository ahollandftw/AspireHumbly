import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductCard } from "@/components/product/product-card";
import { ProductFilters } from "@/components/shop/product-filters";
import { filterProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Women's",
  description: "Premium motivational apparel for women. Quiet confidence, bold design.",
};

export default async function WomensPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;
  const products = filterProducts({ ...params, gender: "womens" });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight uppercase md:text-5xl">Women&apos;s</h1>
        <p className="mt-4 max-w-2xl text-neutral-500">
          Understated power. Premium pieces designed with purpose.
        </p>
      </div>
      <div className="grid gap-12 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">
          <Suspense>
            <ProductFilters products={products} />
          </Suspense>
        </aside>
        <div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
