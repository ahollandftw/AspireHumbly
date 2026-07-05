import type { Metadata } from "next";
import { CollectionCard } from "@/components/shop/collection-card";
import { getAllCollections } from "@/lib/products";

export const metadata: Metadata = {
  title: "Collections",
  description: "Explore Aspire Humbly collections. Quiet Confidence, Discipline, Hard Truth, and more.",
};

export default function CollectionsPage() {
  const collections = getAllCollections();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight uppercase md:text-5xl">Collections</h1>
      <p className="mt-4 max-w-2xl text-neutral-500">
        Curated drops built around the values that define Aspire Humbly.
      </p>
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {collections.map((collection) => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </div>
    </div>
  );
}
