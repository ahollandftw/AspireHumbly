import { products, discountCodes } from "@/data/products";
import { collections } from "@/data/collections";
import type { Product, DiscountCode } from "@/types";

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByGender(gender: "mens" | "womens"): Product[] {
  return products.filter(
    (p) => p.gender === gender || p.gender === "unisex"
  );
}

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.newArrival);
}

export function getBestSellers(): Product[] {
  return products.filter((p) => p.bestSeller);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getProductsByCollection(slug: string): Product[] {
  return products.filter((p) => p.collections.includes(slug));
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter(
      (p) =>
        p.id !== product.id &&
        p.collections.some((c) => product.collections.includes(c))
    )
    .slice(0, limit);
}

export function getAllCollections() {
  return collections;
}

export function getCollectionBySlug(slug: string) {
  return collections.find((c) => c.slug === slug);
}

export function validateDiscountCode(code: string): DiscountCode | null {
  const found = discountCodes.find(
    (d) => d.code.toLowerCase() === code.toLowerCase() && d.active
  );
  return found ?? null;
}

export function filterProducts(options: {
  gender?: string;
  collection?: string;
  color?: string;
  size?: string;
  category?: string;
  search?: string;
}): Product[] {
  let result = [...products];

  if (options.gender === "mens" || options.gender === "womens") {
    result = result.filter(
      (p) => p.gender === options.gender || p.gender === "unisex"
    );
  }

  if (options.collection) {
    result = result.filter((p) =>
      p.collections.includes(options.collection!)
    );
  }

  if (options.category) {
    result = result.filter((p) => p.category === options.category);
  }

  if (options.color) {
    result = result.filter((p) =>
      p.variants.some(
        (v) => v.color.toLowerCase() === options.color!.toLowerCase()
      )
    );
  }

  if (options.size) {
    result = result.filter((p) =>
      p.variants.some((v) =>
        v.sizes.some((s) => s.size === options.size && s.inStock)
      )
    );
  }

  if (options.search) {
    const q = options.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.includes(q))
    );
  }

  return result;
}
