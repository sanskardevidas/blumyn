"use client";

import { useState } from "react";
import { Heart, ShieldCheck, Sparkles, X } from "lucide-react";

const guides = [
  {
    id: 1,
    icon: Sparkles,
    title: "How to choose the right pad",
    description:
      "A simple guide to finding the right comfort based on your flow and routine.",
    details:
      "Choosing the right pad depends on your flow, daily routine, and comfort preference. For regular days, a soft daily pad can feel lighter and easier to wear. For long office hours, travel, or heavier flow, XL or overnight variants give better coverage and confidence. Always look for softness, breathability, leak protection, and a pad that does not feel bulky.",
  },
  {
    id: 2,
    icon: Heart,
    title: "Tips to stay comfortable during periods",
    description:
      "Small care habits that can make those days feel lighter and more manageable.",
    details:
      "Comfort during periods is not only about the pad. Change regularly, wear breathable clothing, stay hydrated, and avoid ignoring discomfort. A warm drink, light movement, and proper rest can also help. Blumyn focuses on making period care feel softer, calmer, and easier so your day feels less stressful.",
  },
  {
    id: 3,
    icon: ShieldCheck,
    title: "Rash-free care guide",
    description:
      "Learn how softer materials and better hygiene choices can support your skin.",
    details:
      "Rashes usually happen because of friction, trapped moisture, or long usage without changing. Choose soft, breathable pads, change them on time, and keep the area clean and dry. Blumyn is designed with gentle comfort in mind, so women can feel protected without the harsh, irritating feel of ordinary pads.",
  },
];

export default function GuidePreview() {
  const [selectedGuide, setSelectedGuide] = useState<(typeof guides)[0] | null>(
    null
  );

  return (
    <>
      <section
        id="guide-care"
        className="relative isolate overflow-hidden bg-[#FFF9FB] py-16 md:py-24"
      >
        <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_14%_8%,rgba(255,226,236,0.92),transparent_34%),radial-gradient(circle_at_86%_16%,rgba(226,208,245,0.85),transparent_34%),radial-gradient(circle_at_50%_92%,rgba(255,240,201,0.42),transparent_32%),linear-gradient(180deg,#FFF9FB_0%,#FFF7FA_45%,#F8F0FF_100%)]" />

        <div className="absolute -left-32 top-0 -z-20 h-[28rem] w-[28rem] rounded-full bg-[#FFE2EC] blur-[120px]" />
        <div className="absolute -right-32 bottom-0 -z-20 h-[30rem] w-[30rem] rounded-full bg-[#DEC8F5] blur-[130px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <div className="mx-auto mb-5 inline-flex rounded-full border border-white/70 bg-white/60 px-5 py-2 shadow-[0_14px_35px_rgba(122,92,158,0.08)] backdrop-blur-xl">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#7A5C9E] md:text-sm">
                Guide & Care
              </p>
            </div>

            <h2 className="mx-auto mb-5 max-w-4xl text-3xl font-medium leading-tight tracking-[-0.04em] text-[#553268] md:text-5xl">
              We’re here to help, not just sell
            </h2>

            <p className="mx-auto max-w-2xl text-sm leading-7 text-[#70537C] md:text-lg">
              Helpful guidance to support comfort, care, and confidence through
              every phase of your period routine.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3 md:gap-7">
            {guides.map((guide) => {
              const Icon = guide.icon;

              return (
                <article
                  key={guide.id}
                  className="group relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/68 p-6 shadow-[0_26px_75px_rgba(91,54,113,0.12)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:bg-white hover:shadow-[0_36px_95px_rgba(91,54,113,0.18)]"
                >
                  <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#F7E7F2] blur-2xl transition-all duration-500 group-hover:bg-[#E8D3F5]" />

                  <div className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F7E7F2] text-[#6F3E8F] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-all duration-300 group-hover:scale-105">
                    <Icon size={28} />
                  </div>

                  <h3 className="relative mb-3 text-2xl leading-snug text-[#553268]">
                    {guide.title}
                  </h3>

                  <p className="relative mb-7 text-sm leading-7 text-[#70537C]">
                    {guide.description}
                  </p>

                  <button
                    type="button"
                    onClick={() => setSelectedGuide(guide)}
                    className="relative rounded-full border border-[#D4B9E7] bg-white/70 px-5 py-2.5 text-sm font-semibold text-[#6F3E8F] transition-all duration-300 hover:border-[#6F3E8F] hover:bg-[#6F3E8F] hover:text-white"
                  >
                    Read More
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {selectedGuide && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#2B1E35]/70 px-4 backdrop-blur-md">
          <div className="relative w-full max-w-2xl rounded-[2.25rem] border border-white/45 bg-[#FFF9FB]/92 p-6 shadow-[0_40px_120px_rgba(0,0,0,0.28)] backdrop-blur-2xl md:p-8">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-[#7A5C9E]">
                  Guide & Care
                </p>

                <h3 className="text-3xl leading-tight text-[#553268]">
                  {selectedGuide.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedGuide(null)}
                className="rounded-full border border-white/70 bg-white/80 p-2 text-[#6F3E8F] shadow-md transition-all duration-300 hover:rotate-90 hover:scale-110"
                aria-label="Close guide"
              >
                <X size={20} />
              </button>
            </div>

            <p className="text-sm leading-8 text-[#70537C] md:text-base">
              {selectedGuide.details}
            </p>

            <button
              type="button"
              onClick={() => setSelectedGuide(null)}
              className="mt-7 rounded-full bg-[#6F3E8F] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_42px_rgba(111,62,143,0.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#5E347A]"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}