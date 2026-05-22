"use client";

import { CalendarDays, PackageCheck, Sparkles } from "lucide-react";

export default function CtaSection() {
  const openSubscriptionBuilder = () => {
    window.dispatchEvent(new Event("open-subscription-builder"));
  };

  return (
    <section className="relative isolate overflow-hidden bg-[#FFF9FB] py-16 md:py-24">
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_50%_0%,rgba(255,226,236,0.92),transparent_34%),radial-gradient(circle_at_86%_70%,rgba(226,208,245,0.9),transparent_34%),radial-gradient(circle_at_16%_90%,rgba(255,240,201,0.45),transparent_30%),linear-gradient(180deg,#FFF9FB_0%,#FFF7FA_46%,#F8F0FF_100%)]" />

      <div className="absolute left-1/2 top-8 -z-20 h-80 w-80 -translate-x-1/2 rounded-full bg-[#FFE2EC] blur-[120px]" />
      <div className="absolute -right-24 bottom-0 -z-20 h-[28rem] w-[28rem] rounded-full bg-[#DEC8F5] blur-[130px]" />
      <div className="absolute -left-28 bottom-10 -z-20 h-[24rem] w-[24rem] rounded-full bg-[#FFF0C9] blur-[120px]" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[2.75rem] border border-white/70 bg-white/55 px-6 py-12 text-center shadow-[0_35px_100px_rgba(91,54,113,0.16)] backdrop-blur-2xl md:px-14 md:py-16">
          <div className="absolute -left-16 -top-16 h-44 w-44 rounded-full bg-[#FFE2EC]/80 blur-3xl" />
          <div className="absolute -right-16 -bottom-16 h-52 w-52 rounded-full bg-[#E8D3F5]/80 blur-3xl" />

          <div className="relative mx-auto mb-7 grid max-w-2xl gap-3 sm:grid-cols-3">
            {[
              { icon: Sparkles, text: "Soft comfort" },
              { icon: PackageCheck, text: "Easy delivery" },
              { icon: CalendarDays, text: "Every 2 months" },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.text}
                  className="flex items-center justify-center gap-2 rounded-full border border-white/70 bg-white/68 px-4 py-2.5 text-xs font-semibold text-[#70537C] shadow-[0_12px_30px_rgba(91,54,113,0.08)] backdrop-blur-xl"
                >
                  <Icon size={15} className="text-[#6F3E8F]" />
                  {item.text}
                </div>
              );
            })}
          </div>

          <div className="relative mx-auto mb-5 inline-flex rounded-full border border-white/70 bg-white/65 px-5 py-2 shadow-[0_14px_35px_rgba(122,92,158,0.08)] backdrop-blur-xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#7A5C9E] md:text-sm">
              Take The Next Step
            </p>
          </div>

          <h2 className="relative mx-auto mb-5 max-w-3xl text-3xl font-medium leading-tight tracking-[-0.04em] text-[#553268] md:text-5xl">
            Take care of yourself today
          </h2>

          <p className="relative mx-auto mb-8 max-w-2xl text-sm leading-7 text-[#70537C] md:text-lg md:leading-8">
            Discover comfort-focused care designed to support you through every
            day with more softness, more confidence, and less stress.
          </p>

          <div className="relative flex flex-wrap justify-center gap-4">
            <a
              href="/shop"
              className="rounded-full bg-[#6F3E8F] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_20px_45px_rgba(111,62,143,0.25)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#5E347A]"
            >
              Shop Now
            </a>

            <button
              type="button"
              onClick={openSubscriptionBuilder}
              className="rounded-full border border-[#D4B9E7] bg-white/70 px-8 py-3.5 text-sm font-semibold text-[#6F3E8F] shadow-[0_16px_38px_rgba(122,92,158,0.1)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white"
            >
              Explore Subscription
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}