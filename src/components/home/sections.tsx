import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/logo";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center bg-white px-4">
      <Logo variant="full" size="hero" priority className="animate-in fade-in duration-1000" />
      <h1 className="mt-12 text-center text-4xl font-bold tracking-tight uppercase md:text-6xl lg:text-7xl">
        Work Hard. Stay Humble.
      </h1>
      <p className="mt-6 max-w-xl text-center text-base text-neutral-500 md:text-lg">
        Premium apparel for those building quietly and moving with purpose.
      </p>
      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Button size="lg" asChild>
          <Link href="/mens">Shop Men&apos;s</Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link href="/womens">Shop Women&apos;s</Link>
        </Button>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="h-8 w-px bg-neutral-300" />
      </div>
    </section>
  );
}

export function StatementBanner({ text }: { text: string }) {
  return (
    <section className="bg-black py-20 text-white md:py-32">
      <p className="text-center text-3xl font-bold tracking-tight uppercase md:text-5xl lg:text-6xl">
        {text}
      </p>
    </section>
  );
}

export function PhilosophySection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
      <div className="grid items-center gap-16 lg:grid-cols-2">
        <div>
          <p className="text-xs tracking-[0.3em] text-neutral-500 uppercase">
            Our Philosophy
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight uppercase md:text-5xl">
            Built Quietly
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-neutral-600">
            Aspire Humbly was born from a simple truth: ambition and humility are
            not opposites. They are partners. We create premium apparel for people
            who show up daily, do the work when no one is watching, and carry
            themselves with quiet confidence.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-neutral-600">
            No hype. No shortcuts. Just discipline, purpose, and pieces designed
            to move with you through every rep, every meeting, every moment that
            matters.
          </p>
          <Button variant="outline" className="mt-8" asChild>
            <Link href="/about">Our Story</Link>
          </Button>
        </div>
        <div className="relative aspect-[4/5] bg-neutral-100">
          <Image
            src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80"
            alt="Aspire Humbly lifestyle"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}

export function LifestyleGrid() {
  const images = [
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80",
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80",
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-3">
      {images.map((src, i) => (
        <div key={i} className="relative aspect-square bg-neutral-100">
          <Image
            src={src}
            alt={`Lifestyle ${i + 1}`}
            fill
            className="object-cover"
            sizes="33vw"
          />
        </div>
      ))}
    </section>
  );
}

