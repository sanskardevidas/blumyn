"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle,
  Gift,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
  Wind,
  X,
} from "lucide-react";

import { useCart } from "@/context/CartContext";
import { useSubscriptions } from "@/context/SubscriptionContext";
import { supabase } from "@/lib/supabaseClient";

type ProductHeroProps = {
  productId: string;
};

type Product = {
  id: string;
  name: string;
  slug: string | null;
  short_description: string | null;
  description: string | null;
  price: number;
  compare_at_price: number | null;
  flow_type: string | null;
  size: string | null;
  image_url: string | null;
  stock: number | null;
  is_active: boolean | null;
};

const fallbackProduct: Product = {
  id: "fallback-1",
  name: "Blumyn Regular Pads",
  slug: "blumyn-regular-pads",
  short_description: "Soft, breathable comfort for everyday protection.",
  description: "Designed for everyday ease, softness, and confidence.",
  price: 199,
  compare_at_price: 249,
  flow_type: "Medium",
  size: "Regular",
  image_url: null,
  stock: 50,
  is_active: true,
};

export default function ProductHero({ productId }: ProductHeroProps) {
  const { addToCart, cartItems, decreaseQuantity } = useCart();
  const { addSubscription } = useSubscriptions();

  const [product, setProduct] = useState<Product>(fallbackProduct);
  const [subscribed, setSubscribed] = useState(false);
  const [showOfferPopup, setShowOfferPopup] = useState(false);

  const currentProductCartQuantity = useMemo(() => {
    return cartItems
      .filter((item) => item.name === product.name)
      .reduce((total, item) => total + item.quantity, 0);
  }, [cartItems, product.name]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select(
            "id,name,slug,short_description,description,price,compare_at_price,flow_type,size,image_url,stock,is_active"
          )
          .eq("id", productId)
          .maybeSingle();

        if (error) {
          console.warn("Product fetch failed:", error.message);
          setProduct(fallbackProduct);
          return;
        }

        if (data) {
          setProduct({
            id: data.id,
            name: data.name ?? "",
            slug: data.slug ?? null,
            short_description: data.short_description ?? null,
            description: data.description ?? null,
            price: Number(data.price ?? 0),
            compare_at_price: data.compare_at_price
              ? Number(data.compare_at_price)
              : null,
            flow_type: data.flow_type ?? null,
            size: data.size ?? null,
            image_url: data.image_url ?? null,
            stock: data.stock ?? null,
            is_active: data.is_active ?? true,
          });
        }
      } catch (error) {
        console.warn("Product fetch crashed:", error);
        setProduct(fallbackProduct);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleQuickAdd = () => {
    addToCart({
      id: Date.now(),
      name: product.name,
      price: Number(product.price),
    });

    setShowOfferPopup(true);
  };

  const handleDecreaseCart = () => {
    const existingItem = cartItems.find((item) => item.name === product.name);

    if (!existingItem) return;

    decreaseQuantity(existingItem.id);
  };

  const handleSubscribe = () => {
    addSubscription({
      planName: "Annual Comfort Subscription",
      productName: product.name,
      frequency: "Every 2 Months",
    });

    setSubscribed(true);

    setTimeout(() => {
      setSubscribed(false);
    }, 2500);
  };

  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#FFF9FB] py-16 md:py-24">
        <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_14%_8%,rgba(255,226,236,0.92),transparent_34%),radial-gradient(circle_at_86%_18%,rgba(226,208,245,0.88),transparent_34%),radial-gradient(circle_at_50%_92%,rgba(255,240,201,0.45),transparent_32%),linear-gradient(180deg,#FFF9FB_0%,#FFF7FA_45%,#F8F0FF_100%)]" />

        <div className="absolute -left-32 top-0 -z-20 h-[28rem] w-[28rem] rounded-full bg-[#FFE2EC] blur-[120px]" />
        <div className="absolute -right-32 bottom-0 -z-20 h-[30rem] w-[30rem] rounded-full bg-[#DEC8F5] blur-[130px]" />

        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div>
            <div className="mb-5 inline-flex rounded-full border border-white/70 bg-white/65 px-5 py-2 shadow-[0_14px_35px_rgba(122,92,158,0.08)] backdrop-blur-xl">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#7A5C9E] md:text-sm">
                Product Details
              </p>
            </div>

            <h1 className="mb-6 text-4xl font-medium leading-[1.02] tracking-[-0.05em] text-[#553268] md:text-6xl">
              {product.name}
            </h1>

            <p className="mb-7 max-w-xl text-base leading-8 text-[#70537C] md:text-lg">
              {product.description || product.short_description}
            </p>

            <div className="mb-8 flex items-end gap-4">
              <span className="text-4xl font-semibold tracking-[-0.04em] text-[#6F3E8F]">
                ₹{product.price}
              </span>

              {product.compare_at_price && (
                <span className="pb-1 text-xl text-[#9B84AB] line-through">
                  ₹{product.compare_at_price}
                </span>
              )}
            </div>

            <div className="mb-8 grid gap-4 sm:grid-cols-3">
              {[
                { icon: Sparkles, text: "Ultra soft feel" },
                { icon: ShieldCheck, text: "Leak lock protection" },
                { icon: Wind, text: "Breathable comfort" },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.text}
                    className="flex items-center gap-3 rounded-[1.5rem] border border-white/70 bg-white/68 px-4 py-4 shadow-[0_18px_50px_rgba(91,54,113,0.08)] backdrop-blur-xl"
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

            <div className="flex flex-wrap items-center gap-4">
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

                  <div className="flex min-w-[150px] items-center justify-center gap-2 rounded-full bg-[#6F3E8F] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_42px_rgba(111,62,143,0.22)]">
                    <CheckCircle size={17} />
                    Qty: {currentProductCartQuantity}
                  </div>

                  <button
                    type="button"
                    onClick={handleQuickAdd}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-[#6F3E8F] text-white transition-all duration-300 hover:bg-[#5E347A]"
                    aria-label="Increase quantity"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleQuickAdd}
                  className="flex items-center gap-2 rounded-full bg-[#6F3E8F] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_20px_45px_rgba(111,62,143,0.25)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#5E347A]"
                >
                  <ShoppingBag size={18} />
                  Add to Cart
                </button>
              )}

              {currentProductCartQuantity > 0 && (
                <div className="rounded-full border border-[#E6D6F2] bg-white/70 px-5 py-3 text-sm font-semibold text-[#6F3E8F] shadow-[0_14px_35px_rgba(122,92,158,0.08)] backdrop-blur-xl">
                  Cart has {currentProductCartQuantity} of this product
                </div>
              )}
            </div>

            {subscribed && (
              <div className="mt-5 rounded-[1.2rem] border border-[#E6D6F2] bg-[#FFF8FC] px-4 py-3 text-sm font-semibold text-[#70537C]">
                Subscription added successfully.
              </div>
            )}
          </div>

          <div className="relative rounded-[2.75rem] border border-white/70 bg-white/45 p-3 shadow-[0_35px_100px_rgba(91,54,113,0.16)] backdrop-blur-2xl">
            <div className="absolute -left-8 top-8 h-32 w-32 rounded-full bg-white/40 blur-2xl" />
            <div className="absolute -right-8 bottom-8 h-44 w-44 rounded-full bg-[#E8D3F5]/70 blur-3xl" />

            <div className="relative flex min-h-[480px] items-center justify-center overflow-hidden rounded-[2.2rem] border border-[#EBDDF3] bg-[#FBF7FB] shadow-[inset_0_1px_0_rgba(255,255,255,0.95)] md:min-h-[620px]">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
              ) : (
                <div className="text-center text-[#70537C]">
                  Main product image
                  <br />
                  placeholder
                </div>
              )}

              <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.42)_0%,transparent_30%,transparent_72%,rgba(126,78,151,0.1)_100%)]" />

              <div className="absolute bottom-5 left-5 right-5 rounded-[1.75rem] border border-white/50 bg-white/86 p-5 shadow-[0_20px_55px_rgba(0,0,0,0.12)] backdrop-blur-xl">
                <h3 className="mb-2 text-2xl text-[#553268]">
                  Soft Cotton Comfort
                </h3>

                <p className="text-sm leading-7 text-[#70537C]">
                  Thoughtfully designed for softness, comfort, confidence, and
                  breathable protection through every moment.
                </p>
              </div>
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