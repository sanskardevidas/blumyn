"use client";

import { Play, X } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Anjali",
    city: "Delhi",
    quote: "No more fear of leaks",
    video: "/videos/testimonial1.mp4",
    thumbnail: "/videos/thumb1.jpg",
  },
  {
    id: 2,
    name: "Nisha",
    city: "Bangalore",
    quote: "Finally something so soft",
    video: "/videos/testimonial2.mp4",
    thumbnail: "/videos/thumb2.jpg",
  },
  {
    id: 3,
    name: "Meera",
    city: "Mumbai",
    quote: "I feel confident now",
    video: "/videos/testimonial3.mp4",
    thumbnail: "/videos/thumb3.jpg",
  },
  {
    id: 4,
    name: "Shruti",
    city: "Pune",
    quote: "Gentle comfort all day",
    video: "/videos/testimonial4.mp4",
    thumbnail: "/videos/thumb4.jpg",
  },
  {
    id: 5,
    name: "Riya",
    city: "Hyderabad",
    quote: "It feels lighter and safer",
    video: "/videos/testimonial5.mp4",
    thumbnail: "/videos/thumb5.jpg",
  },
  {
    id: 6,
    name: "Priya",
    city: "Chennai",
    quote: "Perfect for long days",
    video: "/videos/testimonial6.mp4",
    thumbnail: "/videos/thumb6.jpg",
  },
];

export default function VideoTestimonials() {
  const [selectedVideo, setSelectedVideo] = useState<
    (typeof testimonials)[0] | null
  >(null);

  const loopTestimonials = [...testimonials, ...testimonials];

  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#FFF9FB] py-16 md:py-24">
        <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_12%_10%,rgba(255,231,239,0.88),transparent_34%),radial-gradient(circle_at_88%_18%,rgba(226,208,245,0.85),transparent_34%),radial-gradient(circle_at_50%_90%,rgba(255,240,201,0.4),transparent_30%),linear-gradient(180deg,#FFF9FB_0%,#FFF7FA_42%,#F8F0FF_100%)]" />

        <div className="absolute -left-32 top-0 -z-20 h-[28rem] w-[28rem] rounded-full bg-[#FFE2EC] blur-[120px]" />
        <div className="absolute -right-32 bottom-0 -z-20 h-[30rem] w-[30rem] rounded-full bg-[#DEC8F5] blur-[130px]" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <div className="mx-auto mb-5 inline-flex rounded-full border border-white/70 bg-white/60 px-5 py-2 shadow-[0_14px_35px_rgba(122,92,158,0.08)] backdrop-blur-xl">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#7A5C9E] md:text-sm">
                Real Stories
              </p>
            </div>

            <h2 className="mx-auto mb-5 max-w-4xl text-3xl font-medium leading-tight tracking-[-0.04em] text-[#553268] md:text-5xl">
              Women who chose comfort, chose Blumyn
            </h2>

            <p className="mx-auto max-w-2xl text-sm leading-7 text-[#70537C] md:text-lg">
              Real voices, real experiences, and the comfort that made a
              difference.
            </p>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div className="testimonial-video-track flex w-max gap-6 px-4 md:gap-8">
            {loopTestimonials.map((item, index) => (
              <button
                key={`${item.id}-${index}`}
                type="button"
                onClick={() => setSelectedVideo(item)}
                className="group relative w-[240px] shrink-0 overflow-hidden rounded-[2rem] border border-white/70 bg-white/70 text-left shadow-[0_28px_80px_rgba(91,54,113,0.14)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_38px_100px_rgba(91,54,113,0.22)] sm:w-[270px]"
              >
                <div className="relative h-[420px] overflow-hidden bg-[#F7ECF8] sm:h-[480px]">
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  />

                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(43,30,53,0.08)_45%,rgba(43,30,53,0.78)_100%)]" />

                  <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-white/80 text-[#6F3E8F] shadow-[0_12px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-all duration-300 group-hover:scale-110">
                    <Play size={24} fill="currentColor" />
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <p className="mb-3 text-lg font-semibold leading-7">
                      “{item.quote}”
                    </p>

                    <p className="text-sm text-white/90">
                      {item.name} • {item.city}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <style>{`
          .testimonial-video-track {
            animation: testimonialVideoScroll 34s linear infinite;
          }

          .testimonial-video-track:hover {
            animation-play-state: paused;
          }

          @keyframes testimonialVideoScroll {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-50%);
            }
          }
        `}</style>
      </section>

      {selectedVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#2B1E35]/70 px-4 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-[2.2rem] border border-white/40 bg-white/85 p-4 shadow-[0_40px_120px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
            <button
              type="button"
              onClick={() => setSelectedVideo(null)}
              className="absolute right-4 top-4 z-20 rounded-full bg-white/90 p-2 text-[#6F3E8F] shadow-md transition-all duration-300 hover:scale-110"
              aria-label="Close video"
            >
              <X size={20} />
            </button>

            <div className="overflow-hidden rounded-[1.8rem] bg-black">
              <video
                src={selectedVideo.video}
                controls
                autoPlay
                className="h-[70vh] min-h-[500px] w-full object-cover"
              />
            </div>

            <div className="px-2 pb-2 pt-5">
              <h3 className="mb-2 text-2xl text-[#553268]">
                {selectedVideo.name} • {selectedVideo.city}
              </h3>

              <p className="text-sm leading-7 text-[#70537C]">
                “{selectedVideo.quote}”
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}