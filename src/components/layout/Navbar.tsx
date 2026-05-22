"use client";

import Link from "next/link";
import {
  Menu,
  Search,
  ShoppingCart,
  Sparkles,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartCount } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-[#FFF9FB]/78 shadow-[0_10px_35px_rgba(91,54,113,0.08)] backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F7E7F2] text-[#6F3E8F] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] transition-all duration-300 group-hover:scale-105">
            <Sparkles size={22} />
          </span>

          <span className="text-3xl font-semibold tracking-[-0.04em] text-[#553268]">
            Blumyn
          </span>
        </Link>

        <nav className="hidden items-center gap-2 rounded-full border border-white/70 bg-white/55 p-1.5 shadow-[0_14px_35px_rgba(122,92,158,0.08)] backdrop-blur-xl md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-full px-5 py-2.5 text-sm font-semibold text-[#70537C] transition-all duration-300 hover:bg-[#6F3E8F] hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            aria-label="Search"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/60 text-[#6F3E8F] shadow-[0_14px_35px_rgba(122,92,158,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#6F3E8F] hover:text-white"
          >
            <Search size={19} />
          </button>

          <Link
            href="/account"
            aria-label="Account"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/60 text-[#6F3E8F] shadow-[0_14px_35px_rgba(122,92,158,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#6F3E8F] hover:text-white"
          >
            <User size={19} />
          </Link>

          <Link
            href="/cart"
            aria-label="Cart"
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/60 text-[#6F3E8F] shadow-[0_14px_35px_rgba(122,92,158,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#6F3E8F] hover:text-white"
          >
            <ShoppingCart size={19} />

            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex min-h-[22px] min-w-[22px] items-center justify-center rounded-full bg-[#6F3E8F] px-1 text-[11px] font-bold text-white shadow-[0_10px_25px_rgba(111,62,143,0.25)]">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/65 text-[#6F3E8F] shadow-[0_14px_35px_rgba(122,92,158,0.08)] backdrop-blur-xl transition-all duration-300 active:scale-95 md:hidden"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/70 bg-[#FFF9FB]/95 px-4 pb-5 pt-3 shadow-[0_20px_60px_rgba(91,54,113,0.12)] backdrop-blur-2xl md:hidden">
          <nav className="mx-auto max-w-7xl rounded-[2rem] border border-white/70 bg-white/58 p-3 shadow-[0_18px_50px_rgba(91,54,113,0.1)] backdrop-blur-xl">
            <div className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block rounded-[1.2rem] px-4 py-3 text-sm font-semibold text-[#70537C] transition-all duration-300 hover:bg-[#6F3E8F] hover:text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-3 border-t border-[#E6D6F2] px-1 pt-4">
              <button
                type="button"
                aria-label="Search"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E6D6F2] bg-white/70 text-[#6F3E8F] transition-all duration-300 active:scale-95"
              >
                <Search size={20} />
              </button>

              <Link
                href="/account"
                aria-label="Account"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E6D6F2] bg-white/70 text-[#6F3E8F] transition-all duration-300 active:scale-95"
                onClick={() => setMobileOpen(false)}
              >
                <User size={20} />
              </Link>

              <Link
                href="/cart"
                aria-label="Cart"
                className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[#E6D6F2] bg-white/70 text-[#6F3E8F] transition-all duration-300 active:scale-95"
                onClick={() => setMobileOpen(false)}
              >
                <ShoppingCart size={20} />

                {cartCount > 0 && (
                  <span className="absolute -right-2 -top-2 flex min-h-[22px] min-w-[22px] items-center justify-center rounded-full bg-[#6F3E8F] px-1 text-[11px] font-bold text-white shadow">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}