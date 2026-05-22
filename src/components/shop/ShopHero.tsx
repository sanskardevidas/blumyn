"use client";

import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    title: "Find your perfect comfort",
    subtitle:
      "Explore products designed to support you through every flow with softness and care.",
  },
  {
    id: 2,
    title: "Made for your everyday moments",
    subtitle:
      "From busy days to restful nights, comfort should always stay with you.",
  },
  {
    id: 3,
    title: "Care that feels more natural",
    subtitle:
      "Thoughtfully designed products that understand your needs better.",
  },
  {
    id: 4,
    title: "Confidence in every step",
    subtitle:
      "Move freely and comfortably with protection you can trust.",
  },
];

export default function ShopHero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative isolate overflow-hidden bg-[#FFF9FB] px-4 py-6 sm:px-6 md:py-10">
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_14%_12%,rgba(255,226,236,0.95),transparent_34%),radial-gradient(circle_at_86%_18%,rgba(226,208,245,0.9),transparent_34%),radial-gradient(circle_at_50%_92%,rgba(255,240,201,0.48),transparent_32%),linear-gradient(135deg,#FFF9FB_0%,#FFF4F8_45%,#F8F0FF_100%)]" />

      <div className="absolute -left-32 top-10 -z-20 h-[28rem] w-[28rem] rounded-full bg-[#FFE2EC] blur-[120px]" />
      <div className="absolute -right-32 bottom-0 -z-20 h-[30rem] w-[30rem] rounded-full bg-[#DEC8F5] blur-[130px]" />

      <div className="mx-auto max-w-7xl">
        <div className="grid overflow-hidden rounded-[2.75rem] border border-white/70 bg-white/45 p-3 shadow-[0_35px_100px_rgba(91,54,113,0.16)] backdrop-blur-2xl lg:grid-cols-[0.42fr_0.58fr]">
          <div className="relative z-10 flex min-h-[420px] items-center rounded-[2.25rem] bg-white/68 px-7 py-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] backdrop-blur-xl sm:px-10 md:min-h-[560px] md:px-14 lg:min-h-[660px]">
            <div className="max-w-xl">
              <div className="mb-5 inline-flex rounded-full border border-white/70 bg-white/70 px-5 py-2 shadow-[0_14px_35px_rgba(122,92,158,0.08)] backdrop-blur-xl">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#7A5C9E]">
                  Shop Blumyn
                </p>
              </div>

              <h1 className="mb-6 max-w-[540px] text-[2.7rem] font-medium leading-[1.02] tracking-[-0.055em] text-[#553268] sm:text-5xl md:text-6xl">
                {slides[current].title}
              </h1>

              <p className="mb-8 max-w-md text-base leading-8 text-[#70537C]">
                {slides[current].subtitle}
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href="#products"
                  className="rounded-full bg-[#6F3E8F] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_20px_45px_rgba(111,62,143,0.25)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#5E347A]"
                >
                  Shop Now
                </a>

                <a
                  href="#filters"
                  className="rounded-full border border-[#D4B9E7] bg-white/70 px-7 py-3.5 text-sm font-semibold text-[#6F3E8F] shadow-[0_16px_38px_rgba(122,92,158,0.1)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white"
                >
                  Explore More
                </a>
              </div>

              <div className="mt-8 flex gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setCurrent(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      current === i
                        ? "w-9 bg-[#6F3E8F] shadow-[0_0_18px_rgba(111,62,143,0.35)]"
                        : "w-2.5 bg-[#DCCBE8] hover:bg-[#BFA4D8]"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="relative mt-3 min-h-[380px] overflow-hidden rounded-[2.25rem] border border-[#EBDDF3] bg-[#F7ECF8] shadow-[inset_0_1px_0_rgba(255,255,255,0.95)] sm:min-h-[460px] md:min-h-[560px] lg:mt-0 lg:min-h-[660px]">
            <img
              src="/shop/shopwelcome.png"
              alt="Blumyn shop welcome"
              className="absolute inset-0 h-full w-full scale-[1.03] object-cover object-[68%_center] sm:object-[65%_center] md:object-[62%_center] lg:object-center"
            />

            <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.42)_0%,transparent_30%,transparent_72%,rgba(126,78,151,0.1)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white/35 via-white/8 to-transparent" />
            <div className="absolute left-8 top-8 h-28 w-28 rounded-full bg-[#FFEAC7]/35 blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}