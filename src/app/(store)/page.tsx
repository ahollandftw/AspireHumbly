import Link from "next/link";
import {
  HeroSection,
  StatementBanner,
  PhilosophySection,
  LifestyleGrid,
} from "@/components/home/sections";
import { NewsletterForm } from "@/components/home/newsletter-form";
import { ProductCard } from "@/components/product/product-card";
import { CollectionCard } from "@/components/shop/collection-card";
import {
  getFeaturedProducts,
  getBestSellers,
  getAllCollections,
} from "@/lib/products";

export default function HomePage() {
  const featured = getFeaturedProducts().slice(0, 4);
  const bestSellers = getBestSellers().slice(0, 4);
  const collections = getAllCollections().filter(
    (c) => !["new-arrivals", "best-sellers"].includes(c.slug)
  );

  return (
    <>
      <HeroSection />

      <section className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs tracking-[0.3em] text-neutral-500 uppercase">
              Featured
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight uppercase md:text-4xl">
              The Collection
            </h2>
          </div>
          <Link
            href="/collections"
            className="hidden text-xs tracking-widest uppercase underline sm:block"
          >
            View All
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <StatementBanner text="Discipline Over Motivation" />

      <section className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs tracking-[0.3em] text-neutral-500 uppercase">
              Community Favorites
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight uppercase md:text-4xl">
              Best Sellers
            </h2>
          </div>
          <Link
            href="/best-sellers"
            className="hidden text-xs tracking-widest uppercase underline sm:block"
          >
            Shop All
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
        <p className="text-xs tracking-[0.3em] text-neutral-500 uppercase">
          Collections
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight uppercase md:text-4xl">
          Find Your Collection
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {collections.slice(0, 5).map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      </section>

      <PhilosophySection />
      <StatementBanner text="Choose Your Hard" />
      <LifestyleGrid />
      <NewsletterForm />
    </>
  );
}
