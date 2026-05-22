"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  CreditCard,
  Gift,
  PackageCheck,
  Sparkles,
  Truck,
  Wallet,
  X,
} from "lucide-react";
import { useSubscriptions } from "@/context/SubscriptionContext";

const products = [
  {
    id: "regular",
    title: "Regular Comfort Pads",
    price: 199,
    desc: "Soft everyday comfort and regular flow protection.",
  },
  {
    id: "xl",
    title: "XL Comfort Pads",
    price: 249,
    desc: "Extra coverage and protection for longer comfort.",
  },
];

const plans = [
  {
    id: "3m",
    title: "3 Months",
    months: 3,
    deliveries: 2,
    discountPercent: 5,
    tag: "Starter",
  },
  {
    id: "6m",
    title: "6 Months",
    months: 6,
    deliveries: 3,
    discountPercent: 10,
    tag: "Popular",
  },
  {
    id: "12m",
    title: "12 Months",
    months: 12,
    deliveries: 6,
    discountPercent: 18,
    tag: "Best Value",
  },
];

const paymentMethods = [
  { id: "upi", title: "UPI", icon: Wallet },
  { id: "card", title: "Card", icon: CreditCard },
  { id: "pay-later", title: "Pay Later", icon: Gift },
];

export default function SubscriptionSection() {
  const { addSubscription } = useSubscriptions();

  const [mounted, setMounted] = useState(false);
  const [showBuilder, setShowBuilder] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState("regular");
  const [selectedPlanId, setSelectedPlanId] = useState("6m");
  const [selectedPaymentId, setSelectedPaymentId] = useState("upi");
  const [quantity, setQuantity] = useState(1);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setMounted(true);

    const openBuilder = () => setShowBuilder(true);
    window.addEventListener("open-subscription-builder", openBuilder);

    return () => {
      window.removeEventListener("open-subscription-builder", openBuilder);
    };
  }, []);

  const selectedProduct =
    products.find((product) => product.id === selectedProductId) || products[0];

  const selectedPlan =
    plans.find((plan) => plan.id === selectedPlanId) || plans[1];

  const safeQuantity = Math.max(1, quantity);

  const pricing = useMemo(() => {
    const packPrice = selectedProduct.price;
    const totalPacks = selectedPlan.deliveries * safeQuantity;
    const subtotal = packPrice * totalPacks;
    const discountAmount = Math.round(
      (subtotal * selectedPlan.discountPercent) / 100
    );
    const total = subtotal - discountAmount;

    return {
      packPrice,
      totalPacks,
      subtotal,
      discountAmount,
      total,
    };
  }, [selectedProduct, selectedPlan, safeQuantity]);

  const handleConfirmSubscription = () => {
    addSubscription({
      planName: `${selectedPlan.title} Comfort Plan`,
      productName: `${selectedProduct.title} x ${safeQuantity} pack per delivery`,
      frequency: "Every 2 Months",
    });

    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
      setShowBuilder(false);
    }, 1800);
  };

  if (!mounted) return null;

  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#FFF9FB] py-16 md:py-24">
        <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_14%_8%,rgba(255,226,236,0.92),transparent_34%),radial-gradient(circle_at_86%_18%,rgba(226,208,245,0.88),transparent_34%),radial-gradient(circle_at_52%_92%,rgba(255,240,201,0.45),transparent_32%),linear-gradient(180deg,#FFF9FB_0%,#FFF7FA_45%,#F8F0FF_100%)]" />

        <div className="absolute -left-32 top-0 -z-20 h-[28rem] w-[28rem] rounded-full bg-[#FFE2EC] blur-[120px]" />
        <div className="absolute -right-32 bottom-0 -z-20 h-[30rem] w-[30rem] rounded-full bg-[#DEC8F5] blur-[130px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
          <div className="rounded-[2.75rem] border border-white/70 bg-white/48 p-6 shadow-[0_30px_90px_rgba(91,54,113,0.12)] backdrop-blur-2xl md:p-9">
            <div className="mb-5 inline-flex rounded-full border border-white/70 bg-white/65 px-5 py-2 shadow-[0_14px_35px_rgba(122,92,158,0.08)] backdrop-blur-xl">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#7A5C9E] md:text-sm">
                Subscription Care
              </p>
            </div>

            <h2 className="mb-6 text-4xl font-medium leading-tight tracking-[-0.04em] text-[#553268] md:text-5xl">
              Never run out of comfort
            </h2>

            <p className="mb-8 max-w-xl text-base leading-8 text-[#70537C] md:text-lg md:leading-9">
              Choose your product, duration, quantity, and payment method.
              Blumyn delivers comfort to your doorstep every 2 months.
            </p>

            <div className="mb-8 grid gap-4 sm:grid-cols-2">
              {[
                { icon: CalendarDays, text: "Delivery every 2 months" },
                { icon: Truck, text: "Easy doorstep delivery" },
                { icon: Sparkles, text: "Softer premium comfort" },
                { icon: Gift, text: "Save more on longer plans" },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.text}
                    className="flex items-center gap-4 rounded-[1.5rem] border border-white/70 bg-white/70 p-4 shadow-[0_16px_40px_rgba(91,54,113,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white"
                  >
                    <div className="rounded-xl bg-[#F7E7F2] p-3 text-[#6F3E8F] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                      <Icon size={21} />
                    </div>

                    <p className="text-sm font-semibold text-[#70537C]">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setShowBuilder(true)}
              className="rounded-full bg-[#6F3E8F] px-9 py-3.5 text-sm font-semibold text-white shadow-[0_20px_45px_rgba(111,62,143,0.25)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#5E347A] hover:shadow-[0_26px_55px_rgba(111,62,143,0.32)]"
            >
              Start Your Journey With Us
            </button>
          </div>

          <div className="relative rounded-[2.75rem] border border-white/70 bg-white/35 p-3 shadow-[0_35px_100px_rgba(91,54,113,0.16)] backdrop-blur-2xl">
            <div className="absolute -left-8 top-8 h-32 w-32 rounded-full bg-white/40 blur-2xl" />
            <div className="absolute -right-8 bottom-8 h-44 w-44 rounded-full bg-[#E8D3F5]/70 blur-3xl" />

            <div className="relative h-[350px] overflow-hidden rounded-[2.25rem] border border-[#EBDDF3] bg-[#FFF7FB] shadow-[inset_0_1px_0_rgba(255,255,255,0.95)] md:h-[480px]">
              <Image
                src="/subscription.png"
                alt="Blumyn subscription"
                fill
                priority
                className="object-cover"
              />

              <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.38)_0%,transparent_34%,rgba(43,30,53,0.32)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#2B1E35]/55 via-[#2B1E35]/12 to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 rounded-[1.75rem] border border-white/50 bg-white/86 p-5 shadow-[0_20px_55px_rgba(0,0,0,0.12)] backdrop-blur-xl">
                <h3 className="mb-2 text-xl font-semibold text-[#553268]">
                  Comfort before you need it
                </h3>

                <p className="text-sm leading-7 text-[#70537C]">
                  One subscription. No last-minute stress. No repeated ordering.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showBuilder && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#2B1E35]/70 p-4 backdrop-blur-md">
          <div className="relative max-h-[95vh] w-full max-w-6xl overflow-y-auto rounded-[2.5rem] border border-white/45 bg-[#FFF9FB]/92 p-5 shadow-[0_40px_120px_rgba(0,0,0,0.28)] backdrop-blur-2xl md:p-8">
            <button
              type="button"
              onClick={() => setShowBuilder(false)}
              className="absolute right-5 top-5 z-10 rounded-full bg-white/90 p-2 text-[#6F3E8F] shadow-md transition-all duration-300 hover:rotate-90 hover:scale-110"
              aria-label="Close subscription form"
            >
              <X size={20} />
            </button>

            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#7A5C9E] md:text-sm">
                  Subscription Care
                </p>

                <h2 className="mb-5 text-3xl font-medium leading-tight tracking-[-0.04em] text-[#553268] md:text-5xl">
                  Build your comfort plan
                </h2>

                <p className="mb-7 text-sm leading-7 text-[#70537C] md:text-lg md:leading-9">
                  Select product, plan duration, quantity per delivery, and
                  payment method.
                </p>

                <div className="rounded-[2.25rem] border border-white/70 bg-white/50 p-3 shadow-[0_25px_70px_rgba(91,54,113,0.14)] backdrop-blur-xl">
                  <div className="relative h-[300px] overflow-hidden rounded-[1.8rem] md:h-[420px]">
                    <Image
                      src="/subscription.png"
                      alt="Subscription"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-[2.25rem] border border-white/70 bg-white/72 p-5 shadow-[0_25px_70px_rgba(91,54,113,0.14)] backdrop-blur-xl md:p-6">
                <div className="mb-7">
                  <h3 className="mb-4 text-2xl text-[#553268]">
                    Choose your product
                  </h3>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {products.map((product) => (
                      <button
                        key={product.id}
                        type="button"
                        onClick={() => setSelectedProductId(product.id)}
                        className={`rounded-[1.5rem] border p-5 text-left transition-all duration-300 ${
                          selectedProductId === product.id
                            ? "border-[#B18AD7] bg-[#FCEFFD] shadow-[0_16px_35px_rgba(111,62,143,0.1)]"
                            : "border-[#E6D6F2] bg-white/75 hover:bg-white"
                        }`}
                      >
                        <div className="mb-2 flex items-center justify-between gap-3">
                          <h4 className="text-lg font-semibold text-[#553268]">
                            {product.title}
                          </h4>

                          {selectedProductId === product.id && (
                            <PackageCheck
                              size={20}
                              className="shrink-0 text-[#6F3E8F]"
                            />
                          )}
                        </div>

                        <p className="mb-3 text-sm leading-6 text-[#70537C]">
                          {product.desc}
                        </p>

                        <p className="text-base font-bold text-[#2B1E35]">
                          ₹{product.price} / pack
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-7">
                  <h3 className="mb-4 text-2xl text-[#553268]">Choose plan</h3>

                  <div className="grid gap-4 sm:grid-cols-3">
                    {plans.map((plan) => (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => setSelectedPlanId(plan.id)}
                        className={`rounded-[1.5rem] border p-4 text-left transition-all duration-300 ${
                          selectedPlanId === plan.id
                            ? "border-[#B18AD7] bg-[#FCEFFD] shadow-[0_16px_35px_rgba(111,62,143,0.1)]"
                            : "border-[#E6D6F2] bg-white/75 hover:bg-white"
                        }`}
                      >
                        <span className="mb-3 inline-flex rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-[#6F3E8F]">
                          {plan.tag}
                        </span>

                        <h4 className="mb-2 text-xl font-semibold text-[#553268]">
                          {plan.title}
                        </h4>

                        <p className="mb-1 text-sm text-[#70537C]">
                          {plan.deliveries} deliveries
                        </p>

                        <p className="text-sm font-semibold text-[#6F3E8F]">
                          Save {plan.discountPercent}%
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-7 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-3 block text-sm font-semibold text-[#553268]">
                      Quantity per delivery
                    </label>

                    <input
                      type="number"
                      min={1}
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(Math.max(1, Number(e.target.value) || 1))
                      }
                      className="h-14 w-full rounded-[1.25rem] border border-[#E6D6F2] bg-[#FFF8FC] px-5 text-[#70537C] outline-none transition-all duration-300 focus:border-[#B18AD7] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="mb-3 block text-sm font-semibold text-[#553268]">
                      Payment method
                    </label>

                    <div className="grid grid-cols-3 gap-2">
                      {paymentMethods.map((method) => {
                        const Icon = method.icon;

                        return (
                          <button
                            key={method.id}
                            type="button"
                            onClick={() => setSelectedPaymentId(method.id)}
                            className={`flex h-14 items-center justify-center gap-2 rounded-[1rem] border text-xs font-semibold transition-all duration-300 ${
                              selectedPaymentId === method.id
                                ? "border-[#B18AD7] bg-[#FCEFFD] text-[#6F3E8F]"
                                : "border-[#E6D6F2] bg-white/75 text-[#70537C] hover:bg-white"
                            }`}
                          >
                            <Icon size={16} />
                            {method.title}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="rounded-[1.75rem] border border-[#E6D6F2] bg-[#FFF8FC]/80 p-5">
                  <div className="mb-3 flex items-center justify-between text-sm text-[#70537C]">
                    <span>Pack price</span>
                    <span>₹{pricing.packPrice}</span>
                  </div>

                  <div className="mb-3 flex items-center justify-between text-sm text-[#70537C]">
                    <span>Deliveries</span>
                    <span>{selectedPlan.deliveries}</span>
                  </div>

                  <div className="mb-3 flex items-center justify-between text-sm text-[#70537C]">
                    <span>Quantity per delivery</span>
                    <span>{safeQuantity}</span>
                  </div>

                  <div className="mb-3 flex items-center justify-between text-sm font-semibold text-[#70537C]">
                    <span>Subtotal</span>
                    <span>₹{pricing.subtotal}</span>
                  </div>

                  <div className="mb-4 flex items-center justify-between text-sm text-[#70537C]">
                    <span>Plan discount ({selectedPlan.discountPercent}%)</span>
                    <span>- ₹{pricing.discountAmount}</span>
                  </div>

                  <div className="flex items-center justify-between border-t border-[#E6D6F2] pt-4">
                    <p className="text-xl font-semibold text-[#553268]">
                      Total
                    </p>

                    <p className="text-3xl font-bold text-[#6F3E8F]">
                      ₹{pricing.total}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleConfirmSubscription}
                  className="mt-7 w-full rounded-full bg-[#6F3E8F] py-4 text-sm font-semibold text-white shadow-[0_20px_45px_rgba(111,62,143,0.25)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#5E347A]"
                >
                  Continue Subscription
                </button>

                {success && (
                  <p className="mt-4 rounded-2xl border border-[#E6D6F2] bg-[#FFF8FC] px-4 py-3 text-sm font-semibold text-[#70537C]">
                    Subscription added successfully.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}