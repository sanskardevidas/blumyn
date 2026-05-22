"use client";

import Link from "next/link";
import { ReceiptText, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartSummary() {
  const { cartItems, subtotal, clearCart, cartCount } = useCart();

  const shipping = cartItems.length > 0 ? 50 : 0;
  const total = subtotal + shipping;

  return (
    <div className="relative h-fit overflow-hidden rounded-[2.25rem] border border-white/70 bg-white/68 p-6 shadow-[0_30px_90px_rgba(91,54,113,0.12)] backdrop-blur-2xl">
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
              Review your cart before checkout.
            </p>
          </div>
        </div>

        <div className="mb-6 space-y-4 rounded-[1.75rem] border border-[#E6D6F2] bg-[#FFF8FC]/80 p-5 text-sm text-[#70537C]">
          <div className="flex justify-between">
            <span>Items</span>
            <span className="font-semibold text-[#553268]">{cartCount}</span>
          </div>

          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-semibold text-[#553268]">₹{subtotal}</span>
          </div>

          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="font-semibold text-[#553268]">₹{shipping}</span>
          </div>

          <div className="flex justify-between border-t border-[#E6D6F2] pt-5 text-xl font-semibold text-[#553268]">
            <span>Total</span>
            <span className="text-2xl text-[#6F3E8F]">₹{total}</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href="/checkout"
            className={`flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-center text-sm font-semibold text-white transition-all duration-300 ${
              cartItems.length > 0
                ? "bg-[#6F3E8F] shadow-[0_20px_45px_rgba(111,62,143,0.25)] hover:-translate-y-1 hover:bg-[#5E347A]"
                : "pointer-events-none bg-[#DCCBE8]"
            }`}
          >
            <ShoppingBag size={18} />
            Proceed to Checkout
          </Link>

          <button
            type="button"
            onClick={clearCart}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-[#D4B9E7] bg-white/70 px-6 py-4 text-sm font-semibold text-[#6F3E8F] transition-all duration-300 hover:-translate-y-1 hover:border-[#6F3E8F] hover:bg-[#6F3E8F] hover:text-white"
          >
            <Trash2 size={17} />
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}