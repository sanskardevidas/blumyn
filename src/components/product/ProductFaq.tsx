const faqs = [
  {
    question: "Is Blumyn suitable for sensitive skin?",
    answer:
      "Yes, Blumyn is designed with a soft, gentle feel for everyday comfort.",
  },
  {
    question: "Can I use it for heavy flow days?",
    answer:
      "Yes, choose the right variant based on your flow and coverage needs.",
  },
  {
    question: "Is subscription available?",
    answer:
      "Yes, eligible products can be added to a recurring comfort plan.",
  },
  {
    question: "Is the packaging discreet?",
    answer:
      "Yes, Blumyn orders are designed to feel private, clean, and thoughtful.",
  },
  {
    question: "How do I choose the right size?",
    answer:
      "Start with Regular for daily use and XL or Overnight for longer coverage.",
  },
];

export default function ProductFaq() {
  const loopFaqs = [...faqs, ...faqs];

  return (
    <section className="relative isolate overflow-hidden bg-[#FFF9FB] py-16 md:py-24">
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_14%_8%,rgba(255,226,236,0.88),transparent_34%),radial-gradient(circle_at_86%_18%,rgba(226,208,245,0.82),transparent_34%),radial-gradient(circle_at_50%_92%,rgba(255,240,201,0.38),transparent_32%),linear-gradient(180deg,#FFF9FB_0%,#FFF7FA_45%,#F8F0FF_100%)]" />

      <div className="absolute -left-32 top-0 -z-20 h-[28rem] w-[28rem] rounded-full bg-[#FFE2EC] blur-[120px]" />
      <div className="absolute -right-32 bottom-0 -z-20 h-[30rem] w-[30rem] rounded-full bg-[#DEC8F5] blur-[130px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-5 inline-flex rounded-full border border-white/70 bg-white/65 px-5 py-2 shadow-[0_14px_35px_rgba(122,92,158,0.08)] backdrop-blur-xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#7A5C9E] md:text-sm">
              FAQ
            </p>
          </div>

          <h2 className="text-3xl font-medium leading-tight tracking-[-0.04em] text-[#553268] md:text-5xl">
            Common questions
          </h2>
        </div>

        <div className="relative -mx-4 overflow-hidden px-4">
          <div className="faq-track flex w-max gap-5 md:gap-6">
            {loopFaqs.map((faq, index) => (
              <article
                key={`${faq.question}-${index}`}
                className="group relative w-[280px] shrink-0 overflow-hidden rounded-[2rem] border border-white/70 bg-white/68 p-6 shadow-[0_24px_70px_rgba(91,54,113,0.1)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:bg-white hover:shadow-[0_34px_90px_rgba(91,54,113,0.16)] sm:w-[340px] md:w-[390px]"
              >
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#F7E7F2] blur-2xl transition-all duration-500 group-hover:bg-[#E8D3F5]" />

                <div className="relative mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#F7E7F2] text-sm text-[#6F3E8F] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                  ?
                </div>

                <h3 className="relative mb-3 text-lg leading-snug text-[#553268] md:text-xl">
                  {faq.question}
                </h3>

                <p className="relative text-sm leading-7 text-[#70537C]">
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .faq-track {
          animation: faqScroll 28s linear infinite;
        }

        .faq-track:hover {
          animation-play-state: paused;
        }

        @keyframes faqScroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}