"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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

export default function ProductPreview() {
  const [products, setProducts] = useState<Product[]>(fallbackProducts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
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
          setProducts(fallbackProducts);
          return;
        }

        setProducts(
          result.data && result.data.length > 0 ? result.data : fallbackProducts
        );
      } catch {
        setProducts(fallbackProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <section className="relative isolate -mt-1 overflow-hidden bg-[#FFF9FB] py-14 md:py-20">
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_16%_0%,rgba(255,231,239,0.95),transparent_34%),radial-gradient(circle_at_82%_2%,rgba(229,213,245,0.9),transparent_35%),radial-gradient(circle_at_48%_28%,rgba(255,240,201,0.5),transparent_30%),linear-gradient(180deg,#FFF9FB_0%,#FFF7FA_36%,#F8F0FF_100%)]" />

      <div className="absolute inset-x-0 -top-40 -z-20 h-80 bg-gradient-to-b from-[#FFF9FB] via-[#FFF7FA] to-transparent" />

      <div className="absolute -left-32 top-0 -z-20 h-[28rem] w-[28rem] rounded-full bg-[#FFE2EC] blur-[120px]" />
      <div className="absolute -right-32 top-10 -z-20 h-[30rem] w-[30rem] rounded-full bg-[#DEC8F5] blur-[130px]" />
      <div className="absolute bottom-0 left-1/3 -z-20 h-[24rem] w-[24rem] rounded-full bg-[#FFF0C9] blur-[120px]" />

      <div className="absolute left-[5%] top-10 hidden h-36 w-36 rounded-full border border-white/70 bg-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] backdrop-blur-md lg:block" />
      <div className="absolute right-[6%] top-20 hidden h-28 w-28 rounded-full border border-white/70 bg-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] backdrop-blur-md lg:block" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10 text-center md:mb-14">
          <div className="mx-auto mb-5 inline-flex rounded-full border border-white/70 bg-white/60 px-5 py-2 shadow-[0_14px_35px_rgba(122,92,158,0.08)] backdrop-blur-xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#7A5C9E] md:text-sm">
              Featured Collection
            </p>
          </div>

          <h2 className="mx-auto mb-5 max-w-3xl text-3xl font-medium leading-tight tracking-[-0.04em] text-[#553268] md:text-5xl">
            Find what feels right for you
          </h2>

          <p className="mx-auto max-w-2xl text-sm leading-7 text-[#70537C] md:text-lg">
            Thoughtfully made for comfort, confidence, and care across every day
            and every flow.
          </p>
        </div>

        {loading ? (
          <div className="rounded-[2rem] border border-white/70 bg-white/70 p-8 text-center text-sm text-[#70537C] shadow-[0_24px_70px_rgba(91,54,113,0.12)] backdrop-blur-xl">
            Loading products...
          </div>
        ) : (
          <>
            <div className="max-h-[640px] snap-y snap-mandatory space-y-6 overflow-y-auto pr-1 md:hidden">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="block snap-start overflow-hidden rounded-[2rem] border border-white/75 bg-white/78 shadow-[0_24px_70px_rgba(91,54,113,0.13)] backdrop-blur-xl"
                >
                  <div className="flex h-[310px] items-center justify-center overflow-hidden bg-[#F7ECF8] text-center text-[#70537C]">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <>
                        Product image
                        <br />
                        placeholder
                      </>
                    )}
                  </div>

                  <div className="p-5">
                    <h3 className="mb-2 text-2xl text-[#553268]">
                      {product.name}
                    </h3>

                    <p className="mb-4 text-sm leading-6 text-[#70537C]">
                      {product.short_description || "Soft comfort protection"}
                    </p>

                    <div className="flex items-center justify-between">
                      <p className="text-lg font-semibold text-[#6F3E8F]">
                        ₹{product.price}
                      </p>

                      <span className="rounded-full border border-[#D4B9E7] bg-white/70 px-5 py-2 text-sm font-semibold text-[#6F3E8F]">
                        View
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="hidden gap-[5%] md:grid md:grid-cols-2">
              {products.slice(0, 2).map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="group overflow-hidden rounded-[2.4rem] border border-white/75 bg-white/78 shadow-[0_28px_80px_rgba(91,54,113,0.14)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:bg-white hover:shadow-[0_38px_100px_rgba(91,54,113,0.2)]"
                >
                  <div className="relative h-[440px] overflow-hidden bg-[#F7ECF8] lg:h-[520px] xl:h-[560px]">
                    <div className="absolute inset-0 z-10 bg-[linear-gradient(135deg,rgba(255,255,255,0.48),transparent_38%,rgba(122,92,158,0.08))]" />

                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.045]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-center text-[#70537C]">
                        Product image
                        <br />
                        placeholder
                      </div>
                    )}
                  </div>

                  <div className="p-7 lg:p-8">
                    <h3 className="mb-3 text-3xl text-[#553268]">
                      {product.name}
                    </h3>

                    <p className="mb-6 min-h-[52px] text-base leading-7 text-[#70537C]">
                      {product.short_description || "Soft comfort protection"}
                    </p>

                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-semibold text-[#6F3E8F]">
                        ₹{product.price}
                      </p>

                      <span className="rounded-full border border-[#D4B9E7] bg-white/70 px-7 py-3 text-sm font-semibold text-[#6F3E8F] transition-all duration-300 group-hover:border-[#6F3E8F] group-hover:bg-[#6F3E8F] group-hover:text-white">
                        View Product
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}