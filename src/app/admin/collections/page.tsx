import { getAllCollections } from "@/lib/products";

export default function AdminCollectionsPage() {
  const collections = getAllCollections();

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight uppercase">Collections</h1>
      <p className="mt-2 text-sm text-neutral-500">
        Collections are defined in src/data/collections.ts
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {collections.map((collection) => (
          <div key={collection.id} className="border border-neutral-200 bg-white p-6">
            <p className="text-xs tracking-widest text-neutral-500 uppercase">
              {collection.tagline}
            </p>
            <h2 className="mt-2 font-bold">{collection.name}</h2>
            <p className="mt-2 text-sm text-neutral-500">{collection.description}</p>
            <a
              href={`/collections/${collection.slug}`}
              className="mt-4 inline-block text-xs tracking-widest uppercase underline"
            >
              View Collection
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
