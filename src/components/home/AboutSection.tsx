export default function AboutSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#F8F0FF] py-16 md:py-24">
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_12%_10%,rgba(255,231,239,0.85),transparent_34%),radial-gradient(circle_at_88%_18%,rgba(226,208,245,0.85),transparent_34%),radial-gradient(circle_at_50%_90%,rgba(255,240,201,0.42),transparent_30%),linear-gradient(180deg,#F8F0FF_0%,#FFF8FB_45%,#FFF9FB_100%)]" />

      <div className="absolute inset-x-0 -top-28 -z-20 h-56 bg-gradient-to-b from-[#F8F0FF] via-[#F8F0FF]/90 to-transparent" />

      <div className="absolute -left-32 top-10 -z-20 h-[28rem] w-[28rem] rounded-full bg-[#FFE2EC] blur-[120px]" />
      <div className="absolute -right-32 bottom-8 -z-20 h-[30rem] w-[30rem] rounded-full bg-[#DEC8F5] blur-[130px]" />

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 md:grid-cols-2 md:gap-14">
        <div className="order-2 rounded-[2.5rem] border border-white/70 bg-white/55 p-6 shadow-[0_30px_90px_rgba(91,54,113,0.12)] backdrop-blur-2xl md:order-1 md:p-9">
          <div className="mb-5 inline-flex rounded-full border border-white/70 bg-white/65 px-5 py-2 shadow-[0_14px_35px_rgba(122,92,158,0.08)] backdrop-blur-xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#7A5C9E] md:text-sm">
              About Blumyn
            </p>
          </div>

          <h2 className="mb-6 text-3xl font-medium leading-tight tracking-[-0.04em] text-[#553268] md:text-5xl">
            Made with care for days that ask for softness
          </h2>

          <p className="mb-4 text-sm leading-7 text-[#70537C] md:text-lg md:leading-8">
            Blumyn was created with one simple thought: period care should feel
            more comforting, more thoughtful, and more human.
          </p>

          <p className="mb-8 text-sm leading-7 text-[#70537C] md:text-lg md:leading-8">
            Instead of treating those days like something to just “manage,” we
            want women to feel understood, supported, and confident with every
            product they choose.
          </p>

          <a
            href="#guide-care"
            className="inline-flex rounded-full border border-[#6F3E8F] bg-white/65 px-7 py-3 text-sm font-semibold text-[#6F3E8F] shadow-[0_16px_38px_rgba(122,92,158,0.1)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-[#6F3E8F] hover:text-white"
          >
            Learn More
          </a>
        </div>

        <div className="order-1 md:order-2">
          <div className="relative rounded-[2.75rem] border border-white/70 bg-white/35 p-3 shadow-[0_35px_100px_rgba(91,54,113,0.16)] backdrop-blur-2xl">
            <div className="absolute -left-8 top-8 h-32 w-32 rounded-full bg-white/40 blur-2xl" />
            <div className="absolute -right-8 bottom-8 h-40 w-40 rounded-full bg-[#E8D3F5]/70 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2.25rem] border border-[#EBDDF3] bg-[#FFF7FB] shadow-[inset_0_1px_0_rgba(255,255,255,0.95)]">
              <img
                src="/about/about.png"
                alt="About Blumyn"
                className="h-[340px] w-full object-cover transition-transform duration-700 hover:scale-[1.035] md:h-[470px]"
              />

              <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.4)_0%,transparent_30%,transparent_72%,rgba(126,78,151,0.1)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white/35 via-white/8 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}