"use client";

import { useState } from "react";
import type { Coupon } from "@/types/coupon";
import { BadgePercent, ReceiptText, X } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useCart } from "@/context/CartContext";

type CheckoutSummaryProps = {
  appliedCoupon: Coupon | null;
  setAppliedCoupon: (coupon: Coupon | null) => void;
  discountAmount: number;
  setDiscountAmount: (amount: number) => void;
};

export default function CheckoutSummary({
  appliedCoupon,
  setAppliedCoupon,
  discountAmount,
  setDiscountAmount,
}: CheckoutSummaryProps) {
  const { subtotal } = useCart();

  const [couponCode, setCouponCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const shipping = subtotal > 0 ? 50 : 0;
  const total = Math.max(subtotal + shipping - discountAmount, 0);

  const applyCoupon = async () => {
    const cleanedCode = couponCode.trim();

    if (!cleanedCode) {
      setError("Please enter a coupon code");
      return;
    }

    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("coupons")
      .select("*")
      .ilike("code", cleanedCode)
      .maybeSingle();

    console.log("Coupon search:", cleanedCode);
    console.log("Coupon data:", data);
    console.log("Coupon error:", error);

    setLoading(false);

    if (error) {
      setError(error.message || "Failed to fetch coupon");
      return;
    }

    if (!data) {
      setError("Coupon not found in database");
      return;
    }

    if (!data.is_active) {
      setError("Coupon is not active");
      return;
    }

    let discount = 0;

    if (data.type === "percentage") {
      discount = (subtotal * Number(data.value)) / 100;
    } else {
      discount = Number(data.value);
    }

    discount = Math.min(discount, subtotal);

    setAppliedCoupon({
      id: data.id,
      code: data.code,
      type: data.type,
      value: Number(data.value),
      active: data.is_active,
    });

    setDiscountAmount(discount);
    setError("");
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setDiscountAmount(0);
    setCouponCode("");
    setError("");
  };

  return (
    <div className="relative overflow-hidden rounded-[2.25rem] border border-white/70 bg-white/68 p-6 shadow-[0_30px_90px_rgba(91,54,113,0.12)] backdrop-blur-2xl md:p-8">
      <div className="absolute -right-14 -top-14 h-40 w-40 rounded-full bg-[#F7E7F2] blur-3xl" />
      <div className="absolute -left-12 bottom-0 h-32 w-32 rounded-full bg-[#FFEAC7]/40 blur-3xl" />

      <div className="relative">
        <div className="mb-6 flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F7E7F2] text-[#6F3E8F] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
            <ReceiptText size={24} />
          </div>

          <div>
            <h2 className="text-3xl leading-tight text-[#553268]">
              Order Summary
            </h2>
            <p className="mt-1 text-sm text-[#70537C]">
              Review total, shipping, and coupon savings.
            </p>
          </div>
        </div>

        <div className="mb-7 rounded-[1.75rem] border border-[#E6D6F2] bg-[#FFF8FC]/80 p-5">
          <label className="mb-3 block text-sm font-semibold text-[#553268]">
            Apply Coupon
          </label>

          <div className="flex gap-2">
            <div className="relative flex-1">
              <BadgePercent
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#70537C]"
              />

              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="h-14 w-full rounded-[1.2rem] border border-[#E6D6F2] bg-white/80 py-3 pl-11 pr-4 text-sm text-[#70537C] outline-none transition-all duration-300 placeholder:text-[#A58AB6] focus:border-[#B18AD7] focus:bg-white"
                placeholder="Enter coupon code"
              />
            </div>

            <button
              type="button"
              onClick={applyCoupon}
              disabled={loading}
              className="rounded-full bg-[#6F3E8F] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_38px_rgba(111,62,143,0.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#5E347A] disabled:cursor-not-allowed disabled:bg-[#DCCBE8]"
            >
              {loading ? "..." : "Apply"}
            </button>
          </div>

          {error && (
            <p className="mt-3 rounded-[1rem] border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600">
              {error}
            </p>
          )}

          {appliedCoupon && (
            <div className="mt-3 flex items-center justify-between rounded-[1rem] border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              <span>Coupon applied: {appliedCoupon.code}</span>

              <button
                type="button"
                onClick={removeCoupon}
                className="flex items-center gap-1 text-red-500"
              >
                <X size={14} />
                Remove
              </button>
            </div>
          )}
        </div>

        <div className="space-y-4 rounded-[1.75rem] border border-[#E6D6F2] bg-white/70 p-5 text-sm text-[#70537C]">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-semibold text-[#553268]">₹{subtotal}</span>
          </div>

          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="font-semibold text-[#553268]">₹{shipping}</span>
          </div>

          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span className="font-semibold">-₹{discountAmount}</span>
          </div>

          <div className="mt-5 flex justify-between border-t border-[#E6D6F2] pt-5 text-xl font-semibold text-[#553268]">
            <span>Total</span>
            <span className="text-2xl text-[#6F3E8F]">₹{total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}