export type Product = {
  id: number;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  category: string;
  flowType: "Light" | "Medium" | "Heavy";
  sizes: string[];
  featured?: boolean;
  subscriptionEligible?: boolean;
};