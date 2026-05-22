"use client";

import { Play, Sparkles, ShieldCheck, Wind } from "lucide-react";

export default function ProductDemoBlock() {
  return (
    <section className="relative isolate overflow-hidden bg-[#FFF9FB] py-16 md:py-24">
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_14%_8%,rgba(255,226,236,0.88),transparent_34%),radial-gradient(circle_at_86%_18%,rgba(226,208,245,0.82),transparent_34%),radial-gradient(circle_at_50%_92%,rgba(255,240,201,0.38),transparent_32%),linear-gradient(180deg,#FFF9FB_0%,#FFF7FA_45%,#F8F0FF_100%)]" />

      <div className="absolute -left-32 top-0 -z-20 h-[28rem] w-[28rem] rounded-full bg-[#FFE2EC] blur-[120px]" />
      <div className="absolute -right-32 bottom-0 -z-20 h-[30rem] w-[30rem] rounded-full bg-[#DEC8F5] blur-[130px]" />

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 md:grid-cols-[0.45fr_0.55fr] md:gap-14">
        <div>
          <div className="mb-5 inline-flex rounded-full border border-white/70 bg-white/65 px-5 py-2 shadow-[0_14px_35px_rgba(122,92,158,0.08)] backdrop-blur-xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#7A5C9E] md:text-sm">
              Product Demo
            </p>
          </div>

          <h2 className="mb-6 text-4xl font-medium leading-tight tracking-[-0.04em] text-[#553268] md:text-5xl">
            See how Blumyn supports your comfort
          </h2>

          <p className="max-w-xl text-base leading-8 text-[#70537C] md:text-lg">
            Explore how softness, protection, and breathable comfort come
            together to create a better everyday experience.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3">
            {[
              {
                icon: Sparkles,
                text: "Ultra soft feel",
              },
              {
                icon: ShieldCheck,
                text: "Leak lock protection",
              },
              {
                icon: Wind,
                text: "Breathable comfort",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.text}
                  className="flex items-center gap-3 rounded-[1.5rem] border border-white/70 bg-white/68 px-4 py-4 shadow-[0_18px_50px_rgba(91,54,113,0.08)] backdrop-blur-xl"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F7E7F2] text-[#6F3E8F] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                    <Icon size={20} />
                  </div>

                  <p className="text-sm font-semibold text-[#70537C]">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative rounded-[2.75rem] border border-white/70 bg-white/45 p-3 shadow-[0_35px_100px_rgba(91,54,113,0.16)] backdrop-blur-2xl">
          <div className="absolute -left-8 top-8 h-32 w-32 rounded-full bg-white/40 blur-2xl" />
          <div className="absolute -right-8 bottom-8 h-44 w-44 rounded-full bg-[#E8D3F5]/70 blur-3xl" />

          <div className="relative flex min-h-[380px] items-center justify-center overflow-hidden rounded-[2.2rem] border border-[#EBDDF3] bg-[#F7ECF8] text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.95)] md:min-h-[520px]">
            <img
              src="/product/demo.png"
              alt="Blumyn demo"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.28)_0%,transparent_30%,rgba(43,30,53,0.3)_100%)]" />

            <button
              type="button"
              className="relative z-20 flex h-24 w-24 items-center justify-center rounded-full border border-white/50 bg-white/85 text-[#6F3E8F] shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-all duration-300 hover:scale-110"
              aria-label="Play demo"
            >
              <Play size={34} fill="currentColor" />
            </button>

            <div className="absolute bottom-5 left-5 right-5 rounded-[1.75rem] border border-white/50 bg-white/86 p-5 text-left shadow-[0_20px_55px_rgba(0,0,0,0.12)] backdrop-blur-xl">
              <h3 className="mb-2 text-2xl text-[#553268]">
                Everyday Comfort
              </h3>

              <p className="text-sm leading-7 text-[#70537C]">
                A closer look at softness, protection, and thoughtful design in
                every Blumyn product.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}