import type { Metadata } from "next";
import { ProductCard } from "@/components/product/product-card";
import { getNewArrivals } from "@/lib/products";

export const metadata: Metadata = {
  title: "New Arrivals",
  description: "The latest drops from Aspire Humbly. Fresh designs for a new season of work.",
};

export default function NewArrivalsPage() {
  const products = getNewArrivals();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight uppercase md:text-5xl">New Arrivals</h1>
      <p className="mt-4 text-neutral-500">Just dropped. Limited first-run pieces.</p>
      <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
