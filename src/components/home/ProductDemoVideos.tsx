"use client";

import { Play, X } from "lucide-react";
import { useState } from "react";

export default function ProductDemoVideos() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#FFF9FB] py-16 md:py-24">
        <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_14%_8%,rgba(255,231,239,0.9),transparent_34%),radial-gradient(circle_at_86%_18%,rgba(226,208,245,0.82),transparent_34%),radial-gradient(circle_at_50%_90%,rgba(255,240,201,0.42),transparent_30%),linear-gradient(180deg,#FFF9FB_0%,#FFF7FA_45%,#F8F0FF_100%)]" />

        <div className="absolute -left-32 top-0 -z-20 h-[28rem] w-[28rem] rounded-full bg-[#FFE2EC] blur-[120px]" />
        <div className="absolute -right-32 bottom-0 -z-20 h-[30rem] w-[30rem] rounded-full bg-[#DEC8F5] blur-[130px]" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 text-center md:mb-12">
            <div className="mx-auto mb-5 inline-flex rounded-full border border-white/70 bg-white/60 px-5 py-2 shadow-[0_14px_35px_rgba(122,92,158,0.08)] backdrop-blur-xl">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#7A5C9E] md:text-sm">
                Product Demo
              </p>
            </div>

            <h2 className="mx-auto mb-5 max-w-4xl text-3xl font-medium leading-tight tracking-[-0.04em] text-[#553268] md:text-5xl">
              See how Blumyn works for you
            </h2>

            <p className="mx-auto max-w-2xl text-sm leading-7 text-[#70537C] md:text-lg">
              A visual look at the comfort, protection, and thoughtful design
              behind every product.
            </p>
          </div>

          <div className="relative rounded-[2.75rem] border border-white/70 bg-white/35 p-3 shadow-[0_35px_100px_rgba(91,54,113,0.16)] backdrop-blur-2xl">
            <div className="absolute -left-8 top-8 h-32 w-32 rounded-full bg-white/40 blur-2xl" />
            <div className="absolute -right-8 bottom-8 h-44 w-44 rounded-full bg-[#E8D3F5]/70 blur-3xl" />

            <div className="relative min-h-[300px] overflow-hidden rounded-[2.25rem] border border-[#EBDDF3] bg-[#F7ECF8] shadow-[inset_0_1px_0_rgba(255,255,255,0.95)] sm:min-h-[430px] md:min-h-[560px]">
              <video
                src="/videos/product-demo.mp4"
                poster="/videos/product-demo-thumb.jpg"
                muted
                loop
                playsInline
                autoPlay
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.35)_0%,transparent_35%,rgba(43,30,53,0.42)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#2B1E35]/70 via-[#2B1E35]/20 to-transparent" />

              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="absolute left-1/2 top-1/2 z-10 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-white/85 text-[#6F3E8F] shadow-[0_18px_55px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-all duration-300 hover:scale-110"
                aria-label="Play product demo"
              >
                <Play size={30} fill="currentColor" />
              </button>

              <div className="absolute bottom-6 left-6 right-6 rounded-[1.75rem] border border-white/50 bg-white/82 p-5 text-left shadow-[0_20px_55px_rgba(0,0,0,0.12)] backdrop-blur-xl md:bottom-8 md:left-8 md:right-auto md:max-w-md">
                <h3 className="mb-2 text-2xl text-[#553268]">
                  Soft Cotton Comfort
                </h3>

                <p className="text-sm leading-7 text-[#70537C]">
                  A full-width product demo space for showing softness,
                  absorbency, and comfort in one clear video.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#2B1E35]/75 px-4 backdrop-blur-md">
          <div className="relative w-full max-w-5xl rounded-[2.25rem] border border-white/40 bg-white/85 p-4 shadow-[0_40px_120px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-5 top-5 z-20 rounded-full bg-white/90 p-2 text-[#6F3E8F] shadow-md transition-all duration-300 hover:scale-110"
              aria-label="Close video"
            >
              <X size={22} />
            </button>

            <div className="overflow-hidden rounded-[1.8rem] bg-black">
              <video
                src="/videos/product-demo.mp4"
                controls
                autoPlay
                className="h-[78vh] max-h-[720px] w-full object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}