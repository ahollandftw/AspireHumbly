import type { Product } from "@/types";

const sizes = ["XS", "S", "M", "L", "XL", "2XL"];

function makeSizes(inStock = true) {
  return sizes.map((size) => ({ size, inStock }));
}

const blackVariant = (images: string[]) => ({
  id: "black",
  color: "Black",
  colorHex: "#0a0a0a",
  sizes: makeSizes(),
  images,
});

const whiteVariant = (images: string[]) => ({
  id: "white",
  color: "White",
  colorHex: "#f5f5f5",
  sizes: makeSizes(),
  images,
});

const heatherVariant = (images: string[]) => ({
  id: "heather",
  color: "Heather Grey",
  colorHex: "#9ca3af",
  sizes: makeSizes(),
  images,
});

export const products: Product[] = [
  {
    id: "core-tee",
    slug: "aspire-humbly-core-tee",
    title: "Aspire Humbly Core Tee",
    description:
      "The foundation of the brand. Premium heavyweight cotton with the signature AH monogram. A clean essential for everyday discipline.",
    price: 3800,
    gender: "unisex",
    category: "tees",
    collections: ["core-logo", "best-sellers"],
    featured: true,
    bestSeller: true,
    newArrival: false,
    variants: [
      blackVariant([
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
        "https://images.unsplash.com/photo-1583743814966-6a8c0b7a3176?w=800&q=80",
      ]),
      whiteVariant([
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
      ]),
    ],
    fitDetails: "Relaxed fit. True to size. Model is 6'1\" wearing size L.",
    materialDetails: "100% combed ring-spun cotton, 6.1 oz. Pre-shrunk.",
    shippingEstimate: "5–9 business days",
    fulfillmentStatus: "print-on-demand",
    tags: ["tee", "logo", "essential"],
    reviews: [
      {
        id: "r1",
        author: "Marcus T.",
        rating: 5,
        title: "Perfect weight",
        body: "Heavy enough to feel premium, not too thick. The fit is exactly what I wanted.",
        date: "2025-11-12",
        verified: true,
      },
      {
        id: "r2",
        author: "Jordan K.",
        rating: 5,
        title: "Clean design",
        body: "Minimal branding done right. Gets compliments without being loud.",
        date: "2025-10-28",
        verified: true,
      },
    ],
  },
  {
    id: "whsh-tee",
    slug: "work-hard-stay-humble-tee",
    title: "Work Hard Stay Humble Tee",
    description:
      "The mantra that started it all. Bold typography on premium cotton for those who lead with action and carry humility.",
    price: 4200,
    gender: "unisex",
    category: "tees",
    collections: ["core-logo", "best-sellers", "discipline"],
    featured: true,
    bestSeller: true,
    newArrival: false,
    variants: [
      blackVariant([
        "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80",
      ]),
      heatherVariant([
        "https://images.unsplash.com/photo-1618354691373-d851c5c3f990?w=800&q=80",
      ]),
    ],
    fitDetails: "Oversized fit. Size down for a regular fit.",
    materialDetails: "100% combed ring-spun cotton, 6.5 oz.",
    shippingEstimate: "5–9 business days",
    fulfillmentStatus: "print-on-demand",
    tags: ["tee", "statement"],
    reviews: [
      {
        id: "r3",
        author: "Alex R.",
        rating: 5,
        title: "Daily uniform",
        body: "This is my go-to gym and street tee. Message hits different.",
        date: "2025-12-01",
        verified: true,
      },
    ],
  },
  {
    id: "choose-hard-tee",
    slug: "choose-your-hard-tee",
    title: "Choose Your Hard Tee",
    description:
      "Life is hard. Growth is hard. Staying the same is hard. Choose wisely. Premium oversized tee with statement front print.",
    price: 4200,
    gender: "mens",
    category: "tees",
    collections: ["hard-truth", "new-arrivals"],
    featured: true,
    bestSeller: false,
    newArrival: true,
    variants: [
      blackVariant([
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
      ]),
      whiteVariant([
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80",
      ]),
    ],
    fitDetails: "Oversized boxy fit. Size down for standard fit.",
    materialDetails: "100% combed ring-spun cotton, 6.5 oz.",
    shippingEstimate: "5–9 business days",
    fulfillmentStatus: "print-on-demand",
    tags: ["tee", "statement"],
    reviews: [],
  },
  {
    id: "discipline-tee",
    slug: "discipline-over-motivation-tee",
    title: "Discipline Over Motivation Tee",
    description:
      "Motivation fades. Discipline remains. A bold reminder on heavyweight cotton for the ones who show up regardless.",
    price: 4200,
    gender: "unisex",
    category: "tees",
    collections: ["discipline", "best-sellers"],
    featured: false,
    bestSeller: true,
    newArrival: false,
    variants: [
      blackVariant([
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
      ]),
    ],
    fitDetails: "Relaxed fit. True to size.",
    materialDetails: "100% combed ring-spun cotton, 6.1 oz.",
    shippingEstimate: "5–9 business days",
    fulfillmentStatus: "print-on-demand",
    tags: ["tee", "statement"],
    reviews: [
      {
        id: "r4",
        author: "Chris M.",
        rating: 4,
        title: "Great quality",
        body: "Print quality is excellent. Washes well after multiple wears.",
        date: "2025-09-15",
        verified: true,
      },
    ],
  },
  {
    id: "ah-hoodie",
    slug: "ah-logo-hoodie",
    title: "AH Logo Hoodie",
    description:
      "Premium fleece hoodie featuring the bold AH monogram. Built for early mornings, late nights, and everything in between.",
    price: 6800,
    compareAtPrice: 7800,
    gender: "unisex",
    category: "hoodies",
    collections: ["core-logo", "best-sellers"],
    featured: true,
    bestSeller: true,
    newArrival: false,
    variants: [
      blackVariant([
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
        "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80",
      ]),
      heatherVariant([
        "https://images.unsplash.com/photo-1618354691373-d851c5c3f990?w=800&q=80",
      ]),
    ],
    fitDetails: "Relaxed oversized fit. Drop shoulders.",
    materialDetails: "80% cotton, 20% polyester fleece. 10 oz.",
    shippingEstimate: "7–12 business days",
    fulfillmentStatus: "print-on-demand",
    tags: ["hoodie", "logo"],
    reviews: [
      {
        id: "r5",
        author: "Taylor S.",
        rating: 5,
        title: "Worth every penny",
        body: "Thick, warm, and the logo placement is perfect. My new favorite hoodie.",
        date: "2025-11-20",
        verified: true,
      },
    ],
  },
  {
    id: "quiet-confidence-tee",
    slug: "quiet-confidence-oversized-tee",
    title: "Quiet Confidence Oversized Tee",
    description:
      "For those who don't need to announce their ambition. Subtle back print, premium oversized silhouette.",
    price: 4500,
    gender: "womens",
    category: "tees",
    collections: ["quiet-confidence", "new-arrivals"],
    featured: true,
    bestSeller: false,
    newArrival: true,
    variants: [
      whiteVariant([
        "https://images.unsplash.com/photo-1583743814966-6a8c0b7a3176?w=800&q=80",
      ]),
      blackVariant([
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
      ]),
    ],
    fitDetails: "Oversized unisex fit. Cropped option available in size guide.",
    materialDetails: "100% combed ring-spun cotton, 6.5 oz.",
    shippingEstimate: "5–9 business days",
    fulfillmentStatus: "print-on-demand",
    tags: ["tee", "womens"],
    reviews: [],
  },
  {
    id: "earn-daily-tee",
    slug: "earn-it-daily-tee",
    title: "Earn It Daily Tee",
    description:
      "Nothing is given. Everything is earned. A daily reminder on soft-touch premium cotton.",
    price: 4000,
    gender: "mens",
    category: "tees",
    collections: ["legacy", "new-arrivals"],
    featured: false,
    bestSeller: false,
    newArrival: true,
    variants: [
      blackVariant([
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80",
      ]),
      heatherVariant([
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
      ]),
    ],
    fitDetails: "Athletic fit. True to size.",
    materialDetails: "100% combed ring-spun cotton, 6.1 oz.",
    shippingEstimate: "5–9 business days",
    fulfillmentStatus: "print-on-demand",
    tags: ["tee", "statement"],
    reviews: [],
  },
  {
    id: "no-one-coming-tee",
    slug: "no-one-is-coming-tee",
    title: "No One Is Coming Tee",
    description:
      "The hard truth collection staple. Nobody is coming to save you. Do the work.",
    price: 4200,
    gender: "unisex",
    category: "tees",
    collections: ["hard-truth"],
    featured: false,
    bestSeller: false,
    newArrival: true,
    variants: [
      blackVariant([
        "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80",
      ]),
    ],
    fitDetails: "Oversized fit.",
    materialDetails: "100% combed ring-spun cotton, 6.5 oz.",
    shippingEstimate: "5–9 business days",
    fulfillmentStatus: "print-on-demand",
    tags: ["tee", "statement"],
    reviews: [],
  },
  {
    id: "built-quietly-tee",
    slug: "built-quietly-tee",
    title: "Built Quietly Tee",
    description:
      "Let the results speak. Minimal front chest mark with bold back statement.",
    price: 4000,
    gender: "womens",
    category: "tees",
    collections: ["quiet-confidence"],
    featured: false,
    bestSeller: false,
    newArrival: false,
    variants: [
      whiteVariant([
        "https://images.unsplash.com/photo-1618354691373-d851c5c3f990?w=800&q=80",
      ]),
    ],
    fitDetails: "Relaxed fit. True to size.",
    materialDetails: "100% combed ring-spun cotton, 6.1 oz.",
    shippingEstimate: "5–9 business days",
    fulfillmentStatus: "print-on-demand",
    tags: ["tee", "womens"],
    reviews: [],
  },
  {
    id: "legacy-hoodie",
    slug: "legacy-hoodie",
    title: "Legacy Hoodie",
    description:
      "Build something that outlasts you. Premium heavyweight hoodie from the Legacy Collection.",
    price: 7200,
    gender: "mens",
    category: "hoodies",
    collections: ["legacy"],
    featured: false,
    bestSeller: false,
    newArrival: true,
    variants: [
      blackVariant([
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
      ]),
    ],
    fitDetails: "Relaxed oversized fit.",
    materialDetails: "80% cotton, 20% polyester fleece. 12 oz.",
    shippingEstimate: "7–12 business days",
    fulfillmentStatus: "print-on-demand",
    tags: ["hoodie"],
    reviews: [],
  },
];

export const discountCodes = [
  { code: "HUMBLE10", type: "percentage" as const, value: 10, active: true },
  { code: "WELCOME15", type: "percentage" as const, value: 15, active: true, minOrder: 5000 },
];
