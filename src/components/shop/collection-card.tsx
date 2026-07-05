import Link from "next/link";
import Image from "next/image";
import type { Collection } from "@/types";

interface CollectionCardProps {
  collection: Collection;
}

export function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <Link
      href={`/collections/${collection.slug}`}
      className="group relative block aspect-[4/5] overflow-hidden bg-neutral-100"
    >
      <Image
        src={collection.image}
        alt={collection.name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute right-0 bottom-0 left-0 p-6 text-white">
        <p className="text-[10px] tracking-[0.3em] uppercase opacity-80">
          {collection.tagline}
        </p>
        <h3 className="mt-2 text-lg font-bold tracking-tight uppercase">
          {collection.name}
        </h3>
      </div>
    </Link>
  );
}
