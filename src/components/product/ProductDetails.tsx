"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Check,
  Gift,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
  Wind,
  X,
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useCart } from "@/context/CartContext";

type ProductDetailsProps = {
  productId: string;
};

type ProductData = {
  id: string;
  name: string;
  image_url: string | null;
  flow_type: string | null;
  size: string | null;
  price: number;
};

export default function ProductDetails({ productId }: ProductDetailsProps) {
  const router = useRouter();
  const { addToCart, cartItems, decreaseQuantity } = useCart();

  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [variant, setVariant] = useState("Regular");
  const [quantity, setQuantity] = useState(1);
  const [showOfferPopup, setShowOfferPopup] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const { data, error } = await supabase
          .from("products")
          .select("id, name, image_url, flow_type, size, price")
          .eq("id", productId)
          .maybeSingle();

        if (error) {
          console.error("Error fetching product details:", error.message);
          setProduct(null);
          return;
        }

        if (data) {
          setProduct({
            id: data.id,
            name: data.name ?? "",
            image_url: data.image_url ?? null,
            flow_type: data.flow_type ?? null,
            size: data.size ?? null,
            price: Number(data.price ?? 0),
          });

          setVariant(data.size || "Regular");
        }
      } catch (error) {
        console.error("Product details crashed:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const cartProductName = product ? `${product.name} - ${variant}` : "";

  const currentProductCartQuantity = useMemo(() => {
    if (!cartProductName) return 0;

    return cartItems
      .filter((item) => item.name === cartProductName)
      .reduce((total, item) => total + item.quantity, 0);
  }, [cartItems, cartProductName]);

  const handleAddToCart = () => {
    if (!product) return;

    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: Date.now() + i,
        name: `${product.name} - ${variant}`,
        price: product.price,
      });
    }

    setShowOfferPopup(true);
  };

  const handleIncreaseCart = () => {
    if (!product) return;

    addToCart({
      id: Date.now(),
      name: `${product.name} - ${variant}`,
      price: product.price,
    });

    setShowOfferPopup(true);
  };

  const handleDecreaseCart = () => {
    const existingItem = cartItems.find((item) => item.name === cartProductName);

    if (!existingItem) return;

    decreaseQuantity(existingItem.id);
  };

  const handleBuyNow = () => {
    if (!product) return;

    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: Date.now() + i,
        name: `${product.name} - ${variant}`,
        price: product.price,
      });
    }

    router.push("/checkout");
  };

  if (loading) {
    return (
      <section className="bg-[#FFF9FB] py-12">
        <div className="mx-auto max-w-7xl px-6 text-sm text-[#70537C]">
          Loading product details...
        </div>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="bg-[#FFF9FB] py-12">
        <div className="mx-auto max-w-7xl px-6 text-sm text-[#70537C]">
          Product not found.
        </div>
      </section>
    );
  }

  const galleryImage = product.image_url;
  const shortProductId = product.id.slice(0, 8);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#FFF9FB] py-12 md:py-16">
        <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_14%_8%,rgba(255,226,236,0.88),transparent_34%),radial-gradient(circle_at_86%_18%,rgba(226,208,245,0.82),transparent_34%),radial-gradient(circle_at_50%_92%,rgba(255,240,201,0.42),transparent_32%),linear-gradient(180deg,#FFF9FB_0%,#FFF7FA_45%,#F8F0FF_100%)]" />

        <div className="absolute -left-32 top-0 -z-20 h-[28rem] w-[28rem] rounded-full bg-[#FFE2EC] blur-[120px]" />
        <div className="absolute -right-32 bottom-0 -z-20 h-[30rem] w-[30rem] rounded-full bg-[#DEC8F5] blur-[130px]" />

        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
          <div className="min-w-0">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-[#7A5C9E]">
                  Product Gallery
                </p>

                <h2 className="text-3xl leading-tight text-[#553268] md:text-4xl">
                  {product.name}
                </h2>
              </div>

              <p className="block text-xs font-medium text-[#70537C] lg:hidden">
                Swipe →
              </p>
            </div>

            <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 lg:mx-0 lg:grid lg:grid-cols-2 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="group relative min-w-[82%] snap-center overflow-hidden rounded-[2rem] border border-white/70 bg-white/68 shadow-[0_24px_70px_rgba(91,54,113,0.1)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:bg-white hover:shadow-[0_34px_90px_rgba(91,54,113,0.16)] lg:min-w-0"
                >
                  <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#F7E7F2] blur-2xl transition-all duration-500 group-hover:bg-[#E8D3F5]" />

                  <div className="relative flex h-[260px] items-center justify-center overflow-hidden bg-[#FBF7FB] p-5 sm:h-[320px] lg:h-[290px]">
                    {galleryImage ? (
                      <img
                        src={galleryImage}
                        alt={`${product.name} ${item}`}
                        className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    ) : (
                      <span className="text-sm text-[#70537C]">
                        Product image {item}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { icon: Sparkles, text: "Ultra soft feel" },
                { icon: ShieldCheck, text: "Leak lock protection" },
                { icon: Wind, text: "Breathable comfort" },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.text}
                    className="flex items-center gap-3 rounded-[1.5rem] border border-white/70 bg-white/70 px-4 py-4 shadow-[0_18px_50px_rgba(91,54,113,0.08)] backdrop-blur-xl"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F7E7F2] text-[#6F3E8F] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                      <Icon size={20} />
                    </div>

                    <p className="text-sm font-semibold text-[#70537C]">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <div className="rounded-[2.25rem] border border-white/70 bg-white/72 p-6 shadow-[0_30px_90px_rgba(91,54,113,0.12)] backdrop-blur-2xl lg:sticky lg:top-24">
              <div className="mb-5 inline-flex rounded-full border border-white/70 bg-white/70 px-4 py-2 shadow-[0_12px_30px_rgba(91,54,113,0.08)] backdrop-blur-xl">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#7A5C9E]">
                  Choose Your Comfort
                </p>
              </div>

              <h3 className="mb-3 text-4xl leading-tight text-[#553268]">
                ₹{product.price}
              </h3>

              <p className="mb-7 text-base leading-8 text-[#70537C]">
                Soft, breathable comfort designed to support confidence through
                every flow and every moment.
              </p>

              <div className="mb-5">
                <label className="mb-3 block text-sm font-semibold text-[#553268]">
                  Variant
                </label>

                <select
                  value={variant}
                  onChange={(e) => setVariant(e.target.value)}
                  className="h-14 w-full rounded-[1.2rem] border border-[#E6D6F2] bg-[#FFF8FC] px-4 text-sm text-[#70537C] outline-none transition-all duration-300 focus:border-[#B18AD7] focus:bg-white"
                >
                  <option value={product.size || "Regular"}>
                    {product.size || "Regular"}
                  </option>
                </select>
              </div>

              <div className="mb-6">
                <label className="mb-3 block text-sm font-semibold text-[#553268]">
                  Quantity
                </label>

                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, Number(e.target.value) || 1))
                  }
                  className="h-14 w-full rounded-[1.2rem] border border-[#E6D6F2] bg-[#FFF8FC] px-4 text-sm text-[#70537C] outline-none transition-all duration-300 focus:border-[#B18AD7] focus:bg-white"
                />
              </div>

              <div className="mb-7 space-y-3 rounded-[1.75rem] border border-[#E6D6F2] bg-[#FFF8FC]/80 p-5">
                {[
                  `Flow Type: ${product.flow_type || "Medium"}`,
                  "Ultra soft cotton comfort",
                  "Breathable everyday protection",
                  "Discreet packaging included",
                ].map((text) => (
                  <div
                    key={text}
                    className="flex items-center gap-3 text-sm text-[#70537C]"
                  >
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F7E7F2] text-[#6F3E8F]">
                      <Check size={14} />
                    </div>

                    {text}
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                {currentProductCartQuantity > 0 ? (
                  <div className="flex items-center gap-3 rounded-full border border-white/70 bg-white/70 p-2 shadow-[0_18px_45px_rgba(91,54,113,0.1)] backdrop-blur-xl">
                    <button
                      type="button"
                      onClick={handleDecreaseCart}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D4B9E7] bg-white text-[#6F3E8F] transition-all duration-300 hover:bg-[#F7E7F2]"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={18} />
                    </button>

                    <div className="flex flex-1 items-center justify-center rounded-full bg-[#6F3E8F] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_42px_rgba(111,62,143,0.22)]">
                      Qty: {currentProductCartQuantity}
                    </div>

                    <button
                      type="button"
                      onClick={handleIncreaseCart}
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-[#6F3E8F] text-white transition-all duration-300 hover:bg-[#5E347A]"
                      aria-label="Increase quantity"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#6F3E8F] px-5 py-4 text-sm font-semibold text-white shadow-[0_20px_45px_rgba(111,62,143,0.25)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#5E347A]"
                  >
                    <ShoppingBag size={18} />
                    Add to Cart
                  </button>
                )}

                {currentProductCartQuantity > 0 && (
                  <div className="rounded-[1.2rem] border border-[#E6D6F2] bg-white/75 px-4 py-3 text-center text-sm font-semibold text-[#6F3E8F]">
                    Cart has {currentProductCartQuantity} of this product
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-[#D4B9E7] bg-white/70 px-5 py-4 text-sm font-semibold text-[#6F3E8F] transition-all duration-300 hover:-translate-y-1 hover:border-[#6F3E8F] hover:bg-[#6F3E8F] hover:text-white"
                >
                  <Heart size={18} />
                  Buy Now
                </button>
              </div>

              <p className="mt-5 text-xs leading-6 text-[#70537C]">
                Product ID: {shortProductId} · Secure checkout · Discreet
                packaging
              </p>
            </div>
          </div>
        </div>
      </section>

      {showOfferPopup && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-[#2E1738]/35 px-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[0_35px_100px_rgba(46,23,56,0.25)] backdrop-blur-2xl">
            <button
              type="button"
              onClick={() => setShowOfferPopup(false)}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#F7E7F2] text-[#6F3E8F] transition-all duration-300 hover:bg-[#6F3E8F] hover:text-white"
              aria-label="Close offer popup"
            >
              <X size={17} />
            </button>

            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F7E7F2] text-[#6F3E8F]">
              <Gift size={26} />
            </div>

            <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-[#7A5C9E]">
              Offer Unlocked
            </p>

            <h3 className="mb-3 text-3xl leading-tight text-[#553268]">
              Save more when you add more
            </h3>

            <p className="mb-5 text-sm leading-7 text-[#70537C]">
              Your product has been added to cart. Here’s how Blumyn quantity
              offers work:
            </p>

            <div className="space-y-3 rounded-[1.5rem] border border-[#E6D6F2] bg-[#FFF8FC] p-4 text-sm font-semibold text-[#70537C]">
              <div className="flex items-center gap-3">
                <Truck size={18} className="text-[#6F3E8F]" />
                <span>1 item = ₹50 shipping</span>
              </div>

              <div className="flex items-center gap-3">
                <Gift size={18} className="text-[#6F3E8F]" />
                <span>2 items = Free shipping + 5% OFF</span>
              </div>

              <div className="flex items-center gap-3">
                <Gift size={18} className="text-[#6F3E8F]" />
                <span>3 items = Free shipping + 10% OFF</span>
              </div>

              <div className="flex items-center gap-3">
                <Gift size={18} className="text-[#6F3E8F]" />
                <span>4 items = Free shipping + 15% OFF</span>
              </div>

              <div className="flex items-center gap-3">
                <Gift size={18} className="text-[#6F3E8F]" />
                <span>5+ items = Free shipping + 20% OFF</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowOfferPopup(false)}
              className="mt-6 w-full rounded-full bg-[#6F3E8F] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_42px_rgba(111,62,143,0.22)] transition-all duration-300 hover:bg-[#5E347A]"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </>
  );
}