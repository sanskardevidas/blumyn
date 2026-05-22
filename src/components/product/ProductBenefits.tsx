const benefits = [
  {
    title: "Ultra Soft Cotton",
    text: "Soft comfort for everyday care.",
  },
  {
    title: "Leak Lock Confidence",
    text: "Reliable protection for daily movement.",
  },
  {
    title: "Rash-Free Comfort",
    text: "Gentle feel for sensitive skin.",
  },
  {
    title: "Breathable Layers",
    text: "Light, airy comfort for long hours.",
  },
];

export default function ProductBenefits() {
  return (
    <section className="relative isolate overflow-hidden bg-[#FFF9FB] py-16 md:py-24">
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_14%_8%,rgba(255,226,236,0.88),transparent_34%),radial-gradient(circle_at_86%_18%,rgba(226,208,245,0.82),transparent_34%),radial-gradient(circle_at_50%_92%,rgba(255,240,201,0.38),transparent_32%),linear-gradient(180deg,#FFF9FB_0%,#FFF7FA_45%,#F8F0FF_100%)]" />

      <div className="absolute -left-32 top-0 -z-20 h-[28rem] w-[28rem] rounded-full bg-[#FFE2EC] blur-[120px]" />
      <div className="absolute -right-32 bottom-0 -z-20 h-[30rem] w-[30rem] rounded-full bg-[#DEC8F5] blur-[130px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10 text-center md:mb-14">
          <div className="mx-auto mb-5 inline-flex rounded-full border border-white/70 bg-white/65 px-5 py-2 shadow-[0_14px_35px_rgba(122,92,158,0.08)] backdrop-blur-xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#7A5C9E] md:text-sm">
              Why You’ll Love It
            </p>
          </div>

          <h2 className="mx-auto max-w-4xl text-3xl font-medium leading-tight tracking-[-0.04em] text-[#553268] md:text-5xl">
            Comfort-led benefits in every layer
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="group relative overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/68 p-5 shadow-[0_24px_70px_rgba(91,54,113,0.1)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:bg-white hover:shadow-[0_34px_90px_rgba(91,54,113,0.16)] md:rounded-[2rem] md:p-6"
            >
              <div className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-[#F7E7F2] blur-2xl transition-all duration-500 group-hover:bg-[#E8D3F5]" />

              <div className="relative mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#F7E7F2] text-sm text-[#6F3E8F] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] md:mb-6 md:h-12 md:w-12">
                ✦
              </div>

              <h3 className="relative mb-3 text-lg leading-tight text-[#553268] md:text-2xl">
                {benefit.title}
              </h3>

              <p className="relative text-xs leading-5 text-[#70537C] md:text-sm md:leading-6">
                {benefit.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}