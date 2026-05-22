"use client";

import Link from "next/link";
import { ShieldCheck, Sparkles, Users, Wind } from "lucide-react";
import { useEffect, useState } from "react";

const heroSlides = [
  {
    id: 1,
    title: "Because those days shouldn’t feel heavy.",
    subtitle:
      "Soft, breathable period care designed to help you feel comfortable, calm, and confident through the day.",
  },
  {
    id: 2,
    title: "Comfort that stays with you all day.",
    subtitle:
      "Thoughtfully made pads with gentle softness, reliable protection, and a premium feel for everyday moments.",
  },
  {
    id: 3,
    title: "Care that feels more thoughtful, more human.",
    subtitle:
      "Blumyn brings together comfort, confidence, and care for women who want period products that feel better.",
  },
];

const trustCards = [
  {
    icon: Users,
    title: "50,000+",
    text: "Women trust Blumyn",
    position:
      "left-2 top-6 sm:left-4 sm:top-8 md:-left-6 md:top-10 lg:-left-10",
  },
  {
    icon: ShieldCheck,
    title: "Rash-Free",
    text: "Gentle comfort",
    position:
      "right-2 top-20 sm:right-4 sm:top-24 md:-right-6 md:top-28 lg:-right-10",
  },
  {
    icon: Sparkles,
    title: "Dermatologically",
    text: "Tested care",
    position:
      "left-4 bottom-20 sm:left-6 sm:bottom-24 md:-left-8 md:bottom-24 lg:-left-12",
  },
  {
    icon: Wind,
    title: "Leak Lock",
    text: "Breathable protection",
    position:
      "right-4 bottom-6 sm:right-6 sm:bottom-8 md:-right-8 md:bottom-12 lg:-right-12",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const openSubscriptionBuilder = () => {
    window.dispatchEvent(new Event("open-subscription-builder"));
  };

  return (
    <section className="relative isolate overflow-hidden bg-[#FFF9FB]">
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_14%_14%,rgba(255,226,236,0.95),transparent_34%),radial-gradient(circle_at_82%_24%,rgba(226,208,245,0.95),transparent_36%),radial-gradient(circle_at_50%_92%,rgba(255,240,201,0.58),transparent_34%),linear-gradient(135deg,#FFF9FB_0%,#FFF4F8_42%,#F8F0FF_100%)]" />

      <div className="absolute -left-32 top-20 -z-20 h-[30rem] w-[30rem] rounded-full bg-[#FFE2EC] blur-[120px]" />
      <div className="absolute -right-36 top-32 -z-20 h-[32rem] w-[32rem] rounded-full bg-[#DEC8F5] blur-[130px]" />
      <div className="absolute bottom-[-12rem] left-1/3 -z-20 h-[28rem] w-[28rem] rounded-full bg-[#FFF0C9] blur-[130px]" />

      <div className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,rgba(255,255,255,0.7)_0%,transparent_42%,rgba(255,255,255,0.34)_100%)] opacity-70" />

      <div className="absolute left-[5%] top-24 hidden h-40 w-40 rounded-full border border-white/70 bg-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] backdrop-blur-md lg:block" />
      <div className="absolute bottom-14 right-[8%] hidden h-28 w-28 rounded-full border border-white/70 bg-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] backdrop-blur-md lg:block" />

      <div className="relative mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-12 px-4 py-12 sm:px-6 md:grid-cols-[0.9fr_1.1fr] md:py-16 lg:gap-16">
        <div className="z-10">
          <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/70 bg-white/60 px-4 py-2 shadow-[0_14px_35px_rgba(122,92,158,0.08)] backdrop-blur-xl">
            <span className="h-2 w-2 rounded-full bg-[#B889D9] shadow-[0_0_18px_rgba(184,137,217,0.9)]" />
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.28em] text-[#7A5C9E] md:text-xs">
              Comfort • Care • Confidence
            </p>
          </div>

          <h1 className="mb-6 max-w-2xl text-[2.75rem] font-medium leading-[1.02] tracking-[-0.055em] text-[#553268] sm:text-6xl md:text-6xl lg:text-7xl">
            {heroSlides[currentSlide].title}
          </h1>

          <p className="mb-8 max-w-xl text-base leading-8 text-[#70537C] sm:text-lg">
            {heroSlides[currentSlide].subtitle}
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/shop"
              className="group rounded-full bg-[#6F3E8F] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_20px_45px_rgba(111,62,143,0.25)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#5E347A] hover:shadow-[0_26px_55px_rgba(111,62,143,0.32)]"
            >
              Shop Now
              <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>

            <button
              type="button"
              onClick={openSubscriptionBuilder}
              className="rounded-full border border-[#D4B9E7] bg-white/65 px-8 py-3.5 text-sm font-semibold text-[#6F3E8F] shadow-[0_16px_38px_rgba(122,92,158,0.1)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white"
            >
              Subscription
            </button>
          </div>

          <p className="mt-6 text-sm font-medium text-[#765985]">
            Trusted by women who choose comfort first.
          </p>

          <div className="mt-7 flex gap-2">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.id}
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => setCurrentSlide(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "w-9 bg-[#6F3E8F] shadow-[0_0_18px_rgba(111,62,143,0.35)]"
                    : "w-2.5 bg-[#DCCBE8] hover:bg-[#BFA4D8]"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[660px] pb-6 md:pb-0">
          <div className="absolute -left-8 top-8 h-32 w-32 rounded-full bg-white/35 blur-2xl" />
          <div className="absolute -right-10 bottom-10 h-44 w-44 rounded-full bg-[#E8D3F5]/70 blur-3xl" />

          <div className="relative mx-auto rounded-[2.75rem] border border-white/70 bg-white/35 p-3 shadow-[0_35px_100px_rgba(91,54,113,0.18)] backdrop-blur-2xl">
            <div className="relative aspect-[0.92/1] max-h-[690px] overflow-hidden rounded-[2.25rem] border border-[#EBDDF3] bg-[#FFF7FB] shadow-[inset_0_1px_0_rgba(255,255,255,0.95)]">
              <img
                src="/shop/shopwelcome.png"
                alt="Blumyn comfort product"
                className="h-full w-full scale-[1.03] object-cover object-[62%_center]"
              />

              <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.45)_0%,transparent_28%,transparent_70%,rgba(126,78,151,0.08)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white/38 via-white/8 to-transparent" />
              <div className="absolute left-8 top-8 h-28 w-28 rounded-full bg-[#FFEAC7]/35 blur-3xl" />
            </div>
          </div>

          {trustCards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className={`absolute ${card.position} flex items-center gap-3 rounded-2xl border border-white/75 bg-white/88 px-4 py-3 shadow-[0_20px_50px_rgba(91,54,113,0.14)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white`}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F7E7F2] text-[#6F3E8F] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                  <Icon size={21} />
                </div>

                <div>
                  <p className="text-base font-bold leading-tight text-[#2E2440]">
                    {card.title}
                  </p>
                  <p className="text-xs text-[#6F517D]">{card.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}