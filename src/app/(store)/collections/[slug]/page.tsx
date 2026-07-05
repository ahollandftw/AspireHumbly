import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product/product-card";
import {
  getCollectionBySlug,
  getProductsByCollection,
  getAllCollections,
} from "@/lib/products";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllCollections().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) return { title: "Collection Not Found" };
  return {
    title: collection.name,
    description: collection.description,
  };
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) notFound();

  const products = getProductsByCollection(slug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <p className="text-xs tracking-[0.3em] text-neutral-500 uppercase">
        {collection.tagline}
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight uppercase md:text-5xl">
        {collection.name}
      </h1>
      <p className="mt-4 max-w-2xl text-neutral-500">{collection.description}</p>
      <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {products.length === 0 && (
        <p className="mt-12 text-center text-neutral-500">
          Products coming soon to this collection.
        </p>
      )}
    </div>
  );
}
