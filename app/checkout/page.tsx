"use client";

import { useState } from "react";
import type { Coupon } from "@/types/coupon";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";

export default function CheckoutPage() {
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [discountAmount, setDiscountAmount] = useState(0);

  return (
    <main className="min-h-screen bg-[#FFF9FB]">
      <Navbar />

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-[#7A5C9E]">
              Checkout
            </p>
            <h1 className="text-4xl text-[#7A5C9E]">Complete your order</h1>
          </div>

          <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
            <CheckoutForm
              appliedCoupon={appliedCoupon}
              discountAmount={discountAmount}
              clearCoupon={() => {
                setAppliedCoupon(null);
                setDiscountAmount(0);
              }}
            />

            <CheckoutSummary
              appliedCoupon={appliedCoupon}
              setAppliedCoupon={setAppliedCoupon}
              discountAmount={discountAmount}
              setDiscountAmount={setDiscountAmount}
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}