"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import type { Product } from "@/types";

interface ProductFiltersProps {
  products: Product[];
}

const colors = ["Black", "White", "Heather Grey"];
const sizes = ["XS", "S", "M", "L", "XL", "2XL"];
const categories = ["tees", "hoodies"];

export function ProductFilters({ products: _products }: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xs font-medium tracking-widest uppercase">Category</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() =>
                updateFilter(
                  "category",
                  searchParams.get("category") === cat ? null : cat
                )
              }
              className={`border px-3 py-1.5 text-xs tracking-wider uppercase transition-colors ${
                searchParams.get("category") === cat
                  ? "border-black bg-black text-white"
                  : "border-neutral-300 hover:border-black"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-medium tracking-widest uppercase">Color</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() =>
                updateFilter(
                  "color",
                  searchParams.get("color") === color ? null : color
                )
              }
              className={`border px-3 py-1.5 text-xs tracking-wider uppercase transition-colors ${
                searchParams.get("color") === color
                  ? "border-black bg-black text-white"
                  : "border-neutral-300 hover:border-black"
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-medium tracking-widest uppercase">Size</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() =>
                updateFilter(
                  "size",
                  searchParams.get("size") === size ? null : size
                )
              }
              className={`border px-3 py-1.5 text-xs tracking-wider uppercase transition-colors ${
                searchParams.get("size") === size
                  ? "border-black bg-black text-white"
                  : "border-neutral-300 hover:border-black"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {(searchParams.get("category") ||
        searchParams.get("color") ||
        searchParams.get("size")) && (
        <button
          onClick={() => router.push("?", { scroll: false })}
          className="text-xs tracking-widest text-neutral-500 uppercase underline"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
