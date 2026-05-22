import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: 1,
    slug: "regular-comfort-pads",
    name: "Regular Comfort Pads",
    shortDescription: "Soft, breathable comfort for everyday protection.",
    description:
      "Designed for everyday ease, these pads provide soft comfort, breathable layers, and reliable support for regular flow days.",
    price: 199,
    category: "Pads",
    flowType: "Medium",
    sizes: ["Regular", "XL", "XXL", "Overnight"],
    featured: true,
    subscriptionEligible: true,
  },
  {
    id: 2,
    slug: "xl-comfort-pads",
    name: "XL Comfort Pads",
    shortDescription: "Extra coverage for days you need more confidence.",
    description:
      "Built with extra coverage and gentle comfort to support longer days and more demanding moments.",
    price: 249,
    category: "Pads",
    flowType: "Heavy",
    sizes: ["XL", "XXL", "Overnight"],
    featured: true,
    subscriptionEligible: true,
  },
  {
    id: 3,
    slug: "overnight-protection-pads",
    name: "Overnight Protection Pads",
    shortDescription: "Calm, secure comfort for worry-free nights.",
    description:
      "Created for overnight protection with better coverage, softness, and peace of mind while you sleep.",
    price: 299,
    category: "Pads",
    flowType: "Heavy",
    sizes: ["Overnight", "XXL"],
    featured: true,
    subscriptionEligible: true,
  },
  {
    id: 4,
    slug: "blumyn-combo-pack",
    name: "Blumyn Combo Pack",
    shortDescription: "A complete comfort set for different flow needs.",
    description:
      "A versatile combo that gives you multiple options for different flow days, routines, and comfort needs.",
    price: 499,
    category: "Combo",
    flowType: "Heavy",
    sizes: ["Combo Pack"],
    featured: true,
    subscriptionEligible: true,
  },
  {
    id: 5,
    slug: "ultra-soft-pack",
    name: "Ultra Soft Pack",
    shortDescription: "Gentle softness made for sensitive skin.",
    description:
      "Ideal for users who prioritize softness and skin-friendly materials during regular period care.",
    price: 279,
    category: "Pads",
    flowType: "Light",
    sizes: ["Regular", "XL"],
    featured: false,
    subscriptionEligible: true,
  },
  {
    id: 6,
    slug: "heavy-flow-pack",
    name: "Heavy Flow Pack",
    shortDescription: "Reliable support for heavy flow days.",
    description:
      "High-confidence protection with comfortable layering for users who need stronger support.",
    price: 349,
    category: "Pads",
    flowType: "Heavy",
    sizes: ["XL", "XXL", "Overnight"],
    featured: false,
    subscriptionEligible: true,
  },
];

export function getProductById(id: number) {
  return products.find((product) => product.id === id);
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}