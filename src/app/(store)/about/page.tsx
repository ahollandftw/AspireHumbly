import type { Metadata } from "next";
import Image from "next/image";
import { StatementBanner } from "@/components/home/sections";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Aspire Humbly — a premium motivational apparel brand built on ambition, humility, and discipline.",
};

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
        <p className="text-xs tracking-[0.3em] text-neutral-500 uppercase">Est. 2024</p>
        <h1 className="mt-4 max-w-4xl text-5xl font-bold tracking-tight uppercase md:text-7xl">
          About Aspire Humbly
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-neutral-600">
          Aspire Humbly is a modern lifestyle apparel brand built around ambition,
          humility, discipline, hard work, and quiet confidence. We believe the
          strongest people don&apos;t need to announce themselves — they simply show up
          and do the work.
        </p>
      </section>

      <div className="relative aspect-[21/9] bg-neutral-100">
        <Image
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1400&q=80"
          alt="Aspire Humbly"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <section className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight uppercase">Our Mission</h2>
            <p className="mt-6 leading-relaxed text-neutral-600">
              To create premium apparel that inspires without preaching. Every piece is
              designed for people who are building something — a business, a body, a
              legacy — and doing it with humility and relentless consistency.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight uppercase">Our Values</h2>
            <ul className="mt-6 space-y-4">
              {[
                "Discipline over motivation",
                "Ambition with humility",
                "Quality over quantity",
                "Built quietly, worn boldly",
              ].map((value) => (
                <li key={value} className="border-l-2 border-black pl-4 text-neutral-600">
                  {value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <StatementBanner text="No One Is Coming" />
    </>
  );
}
