const reviews = [
  {
    name: "Anjali Sharma",
    city: "Delhi",
    role: "Working Professional",
    tag: "Soft Comfort",
    text: "Blumyn felt soft during long office hours and helped me feel more relaxed through the day.",
  },
  {
    name: "Nisha Rao",
    city: "Bangalore",
    role: "College Student",
    tag: "Leak Confidence",
    text: "It does not feel bulky, and I could move around without constantly worrying.",
  },
  {
    name: "Shruti Patil",
    city: "Pune",
    role: "Homemaker",
    tag: "Rash-Free Feel",
    text: "I usually get discomfort with regular pads, but Blumyn felt softer and easier to wear.",
  },
  {
    name: "Meera Joshi",
    city: "Mumbai",
    role: "Fitness Enthusiast",
    tag: "Breathable Layers",
    text: "I liked the breathable feel, especially on travel days and busy outdoor hours.",
  },
  {
    name: "Priya Nair",
    city: "Kochi",
    role: "Entrepreneur",
    tag: "Premium Care",
    text: "The experience feels premium, simple, and thoughtful for daily period care.",
  },
];

export default function ProductTestimonials() {
  const loopReviews = [...reviews, ...reviews];

  return (
    <section className="relative isolate overflow-hidden bg-[#FFF9FB] py-16 md:py-24">
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_14%_8%,rgba(255,226,236,0.88),transparent_34%),radial-gradient(circle_at_86%_18%,rgba(226,208,245,0.82),transparent_34%),radial-gradient(circle_at_50%_92%,rgba(255,240,201,0.38),transparent_32%),linear-gradient(180deg,#FFF9FB_0%,#FFF7FA_45%,#F8F0FF_100%)]" />

      <div className="absolute -left-32 top-0 -z-20 h-[28rem] w-[28rem] rounded-full bg-[#FFE2EC] blur-[120px]" />
      <div className="absolute -right-32 bottom-0 -z-20 h-[30rem] w-[30rem] rounded-full bg-[#DEC8F5] blur-[130px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-5 inline-flex rounded-full border border-white/70 bg-white/65 px-5 py-2 shadow-[0_14px_35px_rgba(122,92,158,0.08)] backdrop-blur-xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#7A5C9E] md:text-sm">
              Real Experiences
            </p>
          </div>

          <h2 className="text-3xl font-medium leading-tight tracking-[-0.04em] text-[#553268] md:text-5xl">
            Women who trust Blumyn
          </h2>
        </div>

        <div className="relative -mx-4 overflow-hidden px-4">
          <div className="testimonial-track flex w-max gap-5 md:gap-6">
            {loopReviews.map((review, index) => (
              <article
                key={`${review.name}-${index}`}
                className="group relative w-[310px] shrink-0 overflow-hidden rounded-[2.25rem] border border-white/70 bg-white/68 p-6 shadow-[0_24px_70px_rgba(91,54,113,0.1)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:bg-white hover:shadow-[0_34px_90px_rgba(91,54,113,0.16)] sm:w-[420px] md:w-[540px]"
              >
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#F7E7F2] blur-2xl transition-all duration-500 group-hover:bg-[#E8D3F5]" />

                <div className="relative mb-4 text-6xl font-serif leading-none text-[#DCCBE8]">
                  ”
                </div>

                <div className="relative mb-5 flex gap-1 text-sm text-[#C89B3C]">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>

                <p className="relative mb-7 text-lg italic leading-8 text-[#2E2440] md:text-2xl md:leading-9">
                  “{review.text}”
                </p>

                <div className="relative flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#6F3E8F] text-lg font-bold text-white shadow-[0_14px_35px_rgba(111,62,143,0.22)]">
                      {review.name.charAt(0)}
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-[#2E2440] md:text-base">
                        {review.name}
                      </h3>

                      <p className="text-xs text-[#70537C]">
                        {review.city} · {review.role}
                      </p>
                    </div>
                  </div>

                  <span className="hidden rounded-full border border-[#E6D6F2] bg-[#F8E8EE]/70 px-4 py-2 text-xs font-semibold text-[#6F3E8F] sm:block">
                    {review.tag}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .testimonial-track {
          animation: testimonialScroll 32s linear infinite;
        }

        .testimonial-track:hover {
          animation-play-state: paused;
        }

        @keyframes testimonialScroll {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}