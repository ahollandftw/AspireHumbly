import { getAllProducts } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

export default function AdminProductsPage() {
  const products = getAllProducts();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight uppercase">Products</h1>
        <span className="text-sm text-neutral-500">{products.length} products</span>
      </div>
      <p className="mt-2 text-sm text-neutral-500">
        Products are defined in src/data/products.ts. Connect Printful to sync mockups and variants.
      </p>

      <div className="mt-8 overflow-x-auto border border-neutral-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50">
              <th className="px-4 py-3 font-medium">Product</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Featured</th>
              <th className="px-4 py-3 font-medium">Best Seller</th>
              <th className="px-4 py-3 font-medium">New</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-neutral-100">
                <td className="px-4 py-3">
                  <a href={`/products/${product.slug}`} className="hover:underline">
                    {product.title}
                  </a>
                </td>
                <td className="px-4 py-3 capitalize">{product.category}</td>
                <td className="px-4 py-3">{formatPrice(product.price)}</td>
                <td className="px-4 py-3">{product.featured ? "✓" : "—"}</td>
                <td className="px-4 py-3">{product.bestSeller ? "✓" : "—"}</td>
                <td className="px-4 py-3">{product.newArrival ? "✓" : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <form action="/api/printful/sync" method="POST" className="mt-6">
        <button
          type="submit"
          className="bg-black px-6 py-2 text-xs tracking-widest text-white uppercase"
        >
          Sync from Printful
        </button>
      </form>
    </div>
  );
}
