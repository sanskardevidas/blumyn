"use client";

import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartItems() {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } =
    useCart();

  if (cartItems.length === 0) {
    return (
      <div className="relative overflow-hidden rounded-[2.25rem] border border-white/70 bg-white/68 p-8 shadow-[0_30px_90px_rgba(91,54,113,0.12)] backdrop-blur-2xl">
        <div className="absolute -right-14 -top-14 h-40 w-40 rounded-full bg-[#F7E7F2] blur-3xl" />

        <div className="relative">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F7E7F2] text-[#6F3E8F]">
            <ShoppingBag size={24} />
          </div>

          <h2 className="mb-3 text-3xl text-[#553268]">Your cart is empty</h2>

          <p className="text-[#70537C]">
            Add some comfort essentials from the shop to see them here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="group relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/68 p-5 shadow-[0_24px_70px_rgba(91,54,113,0.1)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-[0_34px_90px_rgba(91,54,113,0.16)]"
        >
          <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#F7E7F2] blur-2xl transition-all duration-500 group-hover:bg-[#E8D3F5]" />

          <div className="relative flex gap-5">
            <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-[1.5rem] bg-[#F7E7F2] text-sm font-semibold text-[#6F3E8F] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
              Image
            </div>

            <div className="flex flex-1 flex-col justify-between gap-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl leading-tight text-[#553268]">
                    {item.name}
                  </h3>

                  <p className="mt-2 text-lg font-semibold text-[#6F3E8F]">
                    ₹{item.price}
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E6D6F2] bg-white/70 text-[#6F3E8F] transition-all duration-300 hover:bg-[#6F3E8F] hover:text-white"
                  aria-label="Remove item"
                >
                  <Trash2 size={17} />
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D4B9E7] bg-white/70 text-[#6F3E8F] transition-all duration-300 hover:bg-[#6F3E8F] hover:text-white"
                  aria-label="Decrease quantity"
                >
                  <Minus size={15} />
                </button>

                <span className="min-w-8 text-center font-semibold text-[#553268]">
                  {item.quantity}
                </span>

                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D4B9E7] bg-white/70 text-[#6F3E8F] transition-all duration-300 hover:bg-[#6F3E8F] hover:text-white"
                  aria-label="Increase quantity"
                >
                  <Plus size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}