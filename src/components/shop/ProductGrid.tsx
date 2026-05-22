"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useShopFilters } from "@/context/ShopFilterContext";
import { supabase } from "@/lib/supabaseClient";

type Product = {
  id: string;
  name: string;
  slug: string | null;
  short_description: string | null;
  description: string | null;
  price: number;
  flow_type: string | null;
  size: string | null;
  image_url: string | null;
  stock: number | null;
  is_active: boolean | null;
  created_at?: string;
};

const fallbackProducts: Product[] = [
  {
    id: "1",
    name: "Blumyn Regular Pads",
    slug: "blumyn-regular-pads",
    short_description: "Soft daily comfort",
    description: "",
    price: 179,
    flow_type: "Medium",
    size: "Regular",
    image_url: "/product/regular.png",
    stock: 50,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Blumyn XL Pads",
    slug: "blumyn-xl-pads",
    short_description: "Extra protection",
    description: "",
    price: 189,
    flow_type: "Heavy",
    size: "XL",
    image_url: "/product/xl.png",
    stock: 50,
    is_active: true,
    created_at: new Date().toISOString(),
  },
];

function matchesPrice(price: number, selectedRanges: string[]) {
  if (selectedRanges.length === 0) return true;

  return selectedRanges.some((range) => {
    if (range === "100-300") return price >= 100 && price <= 300;
    if (range === "301-600") return price >= 301 && price <= 600;
    return false;
  });
}

export default function ProductGrid() {
  const { addToCart } = useCart();
  const { search, flowTypes, sizes, priceRanges } = useShopFilters();

  const [products, setProducts] = useState<Product[]>(fallbackProducts);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const timeout = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("Supabase request timeout")), 5000)
        );

        const request = supabase
          .from("products")
          .select(
            "id,name,slug,short_description,description,price,flow_type,size,image_url,stock,is_active,created_at"
          )
          .eq("is_active", true)
          .order("created_at", { ascending: false });

        const result = await Promise.race([request, timeout]);

        if (result.error) {
          setFetchError(result.error.message);
          setProducts(fallbackProducts);
          return;
        }

        setProducts(
          result.data && result.data.length > 0 ? result.data : fallbackProducts
        );
        setFetchError("");
      } catch {
        setFetchError("Could not load Supabase products. Showing fallback.");
        setProducts(fallbackProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesSearch =
        search.trim() === "" ||
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        (product.short_description || "")
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesFlow =
        flowTypes.length === 0 || flowTypes.includes(product.flow_type || "");

      const matchesSize =
        sizes.length === 0 || sizes.includes(product.size || "");

      const matchesPriceRange = matchesPrice(Number(product.price), priceRanges);

      return matchesSearch && matchesFlow && matchesSize && matchesPriceRange;
    });

    const sorted = [...filtered];

    if (sortBy === "price-low-high") {
      sorted.sort((a, b) => Number(a.price) - Number(b.price));
    }

    if (sortBy === "price-high-low") {
      sorted.sort((a, b) => Number(b.price) - Number(a.price));
    }

    if (sortBy === "name-a-z") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortBy === "newest") {
      sorted.sort(
        (a, b) =>
          new Date(b.created_at || "").getTime() -
          new Date(a.created_at || "").getTime()
      );
    }

    return sorted;
  }, [products, search, flowTypes, sizes, priceRanges, sortBy]);

  return (
    <section>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-textSoft">
            Showing {filteredAndSortedProducts.length} product
            {filteredAndSortedProducts.length !== 1 ? "s" : ""}
          </p>

          {fetchError && (
            <p className="mt-1 text-xs text-red-500">{fetchError}</p>
          )}
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-full border border-borderSoft bg-white px-4 py-2 text-sm text-textSoft outline-none shadow-soft"
        >
          <option value="default">Sort by</option>
          <option value="newest">Newest first</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
          <option value="name-a-z">Name: A-Z</option>
        </select>
      </div>

      {loading ? (
        <div className="rounded-[1.5rem] border border-borderSoft bg-white p-8 text-sm text-textSoft shadow-soft">
          Loading products...
        </div>
      ) : filteredAndSortedProducts.length === 0 ? (
        <div className="rounded-[1.5rem] border border-borderSoft bg-white p-8 text-sm text-textSoft shadow-soft">
          No products found.
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAndSortedProducts.map((product) => (
            <article
              key={product.id}
              className="overflow-hidden rounded-[1.75rem] border border-borderSoft bg-white shadow-soft transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex h-64 items-center justify-center overflow-hidden bg-secondary text-textSoft">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  "Product image"
                )}
              </div>

              <div className="p-6">
                <h3 className="mb-2 text-xl text-accent">{product.name}</h3>

                <p className="mb-2 text-sm text-textSoft">
                  {product.short_description}
                </p>

                <p className="mb-4 text-textSoft">₹{product.price}</p>

                <div className="flex gap-3">
                  <button
                    onClick={() =>
                      addToCart({
                        id: Date.now(),
                        name: product.name,
                        price: Number(product.price),
                      })
                    }
                    className="flex-1 rounded-full bg-accent px-4 py-2 text-sm text-white"
                  >
                    Add to Cart
                  </button>

                  <Link
                    href={`/product/${product.id}`}
                    className="flex-1 rounded-full border border-accent px-4 py-2 text-center text-sm text-accent"
                  >
                    View
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}