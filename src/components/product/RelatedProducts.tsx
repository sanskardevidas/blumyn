"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type RelatedProduct = {
  id: string;
  name: string;
  price: number;
  image_url: string | null;
};

export default function RelatedProducts() {
  const [products, setProducts] = useState<RelatedProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("id, name, price, image_url")
        .eq("is_active", true)
        .limit(3);

      if (error) {
        console.error("Error fetching related products:", error);
        setLoading(false);
        return;
      }

      const mappedProducts: RelatedProduct[] = (data || []).map((product) => ({
        id: product.id,
        name: product.name ?? "",
        price: Number(product.price ?? 0),
        image_url: product.image_url ?? null,
      }));

      setProducts(mappedProducts);
      setLoading(false);
    };

    fetchRelatedProducts();
  }, []);

  return (
    <section className="relative isolate overflow-hidden bg-[#FFF9FB] py-16 md:py-24">
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_14%_8%,rgba(255,226,236,0.88),transparent_34%),radial-gradient(circle_at_86%_18%,rgba(226,208,245,0.82),transparent_34%),radial-gradient(circle_at_50%_92%,rgba(255,240,201,0.38),transparent_32%),linear-gradient(180deg,#FFF9FB_0%,#FFF7FA_45%,#F8F0FF_100%)]" />

      <div className="absolute -left-32 top-0 -z-20 h-[28rem] w-[28rem] rounded-full bg-[#FFE2EC] blur-[120px]" />
      <div className="absolute -right-32 bottom-0 -z-20 h-[30rem] w-[30rem] rounded-full bg-[#DEC8F5] blur-[130px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10 text-center md:mb-14">
          <div className="mx-auto mb-5 inline-flex rounded-full border border-white/70 bg-white/65 px-5 py-2 shadow-[0_14px_35px_rgba(122,92,158,0.08)] backdrop-blur-xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#7A5C9E] md:text-sm">
              Related Products
            </p>
          </div>

          <h2 className="text-4xl font-medium leading-tight tracking-[-0.04em] text-[#553268] md:text-5xl">
            You may also like
          </h2>
        </div>

        {loading ? (
          <div className="rounded-[2rem] border border-white/70 bg-white/70 p-8 text-center text-[#70537C] shadow-[0_24px_70px_rgba(91,54,113,0.12)] backdrop-blur-xl">
            Loading related products...
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-[2rem] border border-white/70 bg-white/70 p-8 text-center text-[#70537C] shadow-[0_24px_70px_rgba(91,54,113,0.12)] backdrop-blur-xl">
            No related products found.
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-3">
            {products.map((product) => (
              <article
                key={product.id}
                className="group overflow-hidden rounded-[2.25rem] border border-white/75 bg-white/72 shadow-[0_28px_80px_rgba(91,54,113,0.13)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:bg-white hover:shadow-[0_38px_100px_rgba(91,54,113,0.2)]"
              >
                <div className="relative flex h-72 items-center justify-center overflow-hidden bg-[#F7ECF8] text-[#70537C]">
                  <div className="absolute inset-0 z-10 bg-[linear-gradient(135deg,rgba(255,255,255,0.48),transparent_38%,rgba(122,92,158,0.08))]" />

                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    />
                  ) : (
                    <span className="relative z-20 text-sm">
                      Related product image
                    </span>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="mb-3 text-2xl text-[#553268]">
                    {product.name}
                  </h3>

                  <p className="mb-6 text-xl font-semibold text-[#6F3E8F]">
                    ₹{product.price}
                  </p>

                  <Link
                    href={`/product/${product.id}`}
                    className="inline-flex rounded-full bg-[#6F3E8F] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_42px_rgba(111,62,143,0.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#5E347A]"
                  >
                    View Product
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}