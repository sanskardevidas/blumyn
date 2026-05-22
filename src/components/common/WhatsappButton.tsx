"use client";

import { MessageCircle, Sparkles } from "lucide-react";

export default function WhatsappButton() {
  return (
    <div className="fixed bottom-5 right-5 z-[999]">
      <div className="relative">
        <div className="absolute inset-0 animate-pulse rounded-full bg-[#7A5C9E]/25 blur-2xl" />

        <a
          href="https://wa.me/918766589805"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="group relative flex items-center gap-3 overflow-hidden rounded-full border border-white/40 bg-[#7A5C9E]/90 px-4 py-3 text-white shadow-[0_20px_60px_rgba(122,92,158,0.35)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:bg-[#6F4C93] sm:px-5"
        >
          <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="absolute -left-10 top-0 h-20 w-20 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -right-8 bottom-0 h-16 w-16 rounded-full bg-[#FFE7F1]/20 blur-2xl" />
          </div>

          <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white/14 backdrop-blur-md">
            <MessageCircle size={20} />
          </div>

          <div className="relative hidden sm:block">
            <p className="text-sm font-semibold leading-none">
              Need Help?
            </p>

            <p className="mt-1 text-[11px] text-white/80">
              Chat with Blumyn Care
            </p>
          </div>

          <div className="relative hidden h-8 w-8 items-center justify-center rounded-full bg-white/12 sm:flex">
            <Sparkles size={14} />
          </div>
        </a>
      </div>
    </div>
  );
}