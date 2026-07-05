import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductCard } from "@/components/product/product-card";
import { ProductFilters } from "@/components/shop/product-filters";
import { filterProducts, getProductsByGender } from "@/lib/products";

export const metadata: Metadata = {
  title: "Men's",
  description: "Premium motivational apparel for men. Tees, hoodies, and essentials built for discipline.",
};

export default async function MensPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;
  const products = filterProducts({ ...params, gender: "mens" });

  return (
    <ShopLayout
      title="Men's"
      description="Premium pieces for those who lead with action and carry humility."
      products={products}
    />
  );
}

function ShopLayout({
  title,
  description,
  products,
}: {
  title: string;
  description: string;
  products: ReturnType<typeof getProductsByGender>;
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight uppercase md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-neutral-500">{description}</p>
      </div>
      <div className="grid gap-12 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">
          <Suspense>
            <ProductFilters products={products} />
          </Suspense>
        </aside>
        <div>
          {products.length === 0 ? (
            <p className="py-16 text-center text-neutral-500">No products found.</p>
          ) : (
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
