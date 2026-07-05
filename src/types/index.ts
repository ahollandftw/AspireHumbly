export type Gender = "mens" | "womens" | "unisex";

export interface ProductVariant {
  id: string;
  color: string;
  colorHex: string;
  sizes: ProductSize[];
  images: string[];
  printfulVariantId?: number;
}

export interface ProductSize {
  size: string;
  inStock: boolean;
  printfulVariantId?: number;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  gender: Gender;
  category: string;
  collections: string[];
  featured: boolean;
  bestSeller: boolean;
  newArrival: boolean;
  variants: ProductVariant[];
  fitDetails: string;
  materialDetails: string;
  shippingEstimate: string;
  fulfillmentStatus: "print-on-demand" | "in-stock";
  printfulProductId?: number;
  reviews: Review[];
  tags: string[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  verified: boolean;
}

export interface Collection {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  tagline: string;
}

export interface CartItem {
  productId: string;
  slug: string;
  title: string;
  image: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
  category?: string;
  printfulVariantId?: number;
}

export interface DiscountCode {
  code: string;
  type: "percentage" | "fixed";
  value: number;
  active: boolean;
  minOrder?: number;
}


export interface DonationOptions {
  roundUp: boolean;
  customAmountCents: number;
}

export interface DonationBreakdown {
  shirtCount: number;
  baseAmount: number;
  roundUpAmount: number;
  customAmount: number;
  total: number;
}

export interface Order {
  id: string;
  email: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  donation?: DonationBreakdown;
  total: number;
  status: "pending" | "paid" | "processing" | "shipped" | "delivered" | "cancelled";
  fulfillmentStatus?: string;
  trackingNumber?: string;
  trackingUrl?: string;
  stripeSessionId?: string;
  printfulOrderId?: number;
  createdAt: string;
  shippingAddress: ShippingAddress;
}

export interface ShippingAddress {
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Subscriber {
  id: string;
  email: string;
  phone?: string;
  source: string;
  createdAt: string;
}

export interface HomepageSection {
  id: string;
  type: "hero" | "featured" | "philosophy" | "statement" | "newsletter";
  title: string;
  subtitle?: string;
  content?: string;
  productIds?: string[];
  active: boolean;
  order: number;
}
