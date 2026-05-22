"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Product } from "@/types/product";

type NewProductInput = {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  category: string;
  flowType: "Light" | "Medium" | "Heavy";
  sizes?: string[];
  featured?: boolean;
  subscriptionEligible?: boolean;
};

type ProductContextType = {
  products: Product[];
  addProduct: (product: NewProductInput) => void;
  deleteProduct: (id: number) => void;
  clearProducts: () => void;
  getProductById: (id: number) => Product | undefined;
};

const PRODUCT_STORAGE_KEY = "blumyn_products";

const initialProducts: Product[] = [
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

const ProductContext = createContext<ProductContextType | undefined>(undefined);

function normalizeProduct(raw: any, fallbackId: number): Product {
  return {
    id: typeof raw?.id === "number" ? raw.id : fallbackId,
    slug:
      typeof raw?.slug === "string" && raw.slug.trim() !== ""
        ? raw.slug
        : String(raw?.name || `product-${fallbackId}`)
            .toLowerCase()
            .replace(/\s+/g, "-"),
    name: raw?.name || "Unnamed Product",
    shortDescription: raw?.shortDescription || "",
    description: raw?.description || raw?.shortDescription || "",
    price: Number(raw?.price) || 0,
    category: raw?.category || "Pads",
    flowType:
      raw?.flowType === "Light" ||
      raw?.flowType === "Medium" ||
      raw?.flowType === "Heavy"
        ? raw.flowType
        : "Medium",
    sizes: Array.isArray(raw?.sizes)
      ? raw.sizes
      : Array.isArray(raw?.variants)
      ? raw.variants
      : ["Regular"],
    featured: Boolean(raw?.featured),
    subscriptionEligible:
      typeof raw?.subscriptionEligible === "boolean"
        ? raw.subscriptionEligible
        : true,
  };
}

const ProductContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(PRODUCT_STORAGE_KEY);

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setProducts(parsed.map((item, index) => normalizeProduct(item, Date.now() + index)));
        } else {
          setProducts(initialProducts);
        }
      } catch {
        setProducts(initialProducts);
      }
    } else {
      setProducts(initialProducts);
    }

    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(products));
  }, [products, hydrated]);

  const addProduct = (product: NewProductInput) => {
    const newProduct: Product = {
      id: Date.now(),
      slug:
        product.slug && product.slug.trim() !== ""
          ? product.slug
          : product.name.toLowerCase().replace(/\s+/g, "-"),
      name: product.name,
      shortDescription: product.shortDescription,
      description: product.description,
      price: Number(product.price),
      category: product.category,
      flowType: product.flowType,
      sizes: Array.isArray(product.sizes) && product.sizes.length > 0 ? product.sizes : ["Regular"],
      featured: Boolean(product.featured),
      subscriptionEligible:
        typeof product.subscriptionEligible === "boolean"
          ? product.subscriptionEligible
          : true,
    };

    setProducts((prev) => [newProduct, ...prev]);
  };

  const deleteProduct = (id: number) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const clearProducts = () => {
    setProducts([]);
  };

  const getProductById = (id: number) => {
    return products.find((product) => product.id === id);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        deleteProduct,
        clearProducts,
        getProductById,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContextProvider as ProductProvider };

export function useProducts() {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }

  return context;
}