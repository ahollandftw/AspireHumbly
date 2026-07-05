import { getFeaturedProducts, getBestSellers, getNewArrivals } from "@/lib/products";

export default function AdminHomepagePage() {
  const featured = getFeaturedProducts();
  const bestSellers = getBestSellers();
  const newArrivals = getNewArrivals();

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight uppercase">Homepage Sections</h1>
      <p className="mt-2 text-sm text-neutral-500">
        Homepage sections pull from product flags: featured, bestSeller, newArrival
      </p>

      <section className="mt-8">
        <h2 className="font-bold tracking-tight uppercase">Featured Products</h2>
        <ul className="mt-4 space-y-2 border border-neutral-200 bg-white p-4">
          {featured.map((p) => (
            <li key={p.id} className="text-sm">{p.title}</li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="font-bold tracking-tight uppercase">Best Sellers</h2>
        <ul className="mt-4 space-y-2 border border-neutral-200 bg-white p-4">
          {bestSellers.map((p) => (
            <li key={p.id} className="text-sm">{p.title}</li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="font-bold tracking-tight uppercase">New Arrivals</h2>
        <ul className="mt-4 space-y-2 border border-neutral-200 bg-white p-4">
          {newArrivals.map((p) => (
            <li key={p.id} className="text-sm">{p.title}</li>
          ))}
        </ul>
      </section>

      <section className="mt-8 border border-neutral-200 bg-white p-6">
        <h2 className="font-bold tracking-tight uppercase">Statement Banners</h2>
        <ul className="mt-4 space-y-2 text-sm text-neutral-600">
          <li>Discipline Over Motivation</li>
          <li>Choose Your Hard</li>
          <li>Work Hard. Stay Humble.</li>
          <li>No One Is Coming</li>
          <li>Earn It Daily</li>
          <li>Built Quietly</li>
        </ul>
      </section>
    </div>
  );
}
