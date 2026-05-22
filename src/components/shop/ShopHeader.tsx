export default function ShopHeader() {
  return (
    <section className="relative isolate overflow-hidden bg-[#FFF9FB] py-20 md:py-28">
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_14%_12%,rgba(255,226,236,0.95),transparent_34%),radial-gradient(circle_at_86%_18%,rgba(226,208,245,0.9),transparent_34%),radial-gradient(circle_at_50%_92%,rgba(255,240,201,0.48),transparent_32%),linear-gradient(135deg,#FFF9FB_0%,#FFF4F8_45%,#F8F0FF_100%)]" />

      <div className="absolute -left-32 top-10 -z-20 h-[28rem] w-[28rem] rounded-full bg-[#FFE2EC] blur-[120px]" />
      <div className="absolute -right-32 bottom-0 -z-20 h-[30rem] w-[30rem] rounded-full bg-[#DEC8F5] blur-[130px]" />

      <div className="absolute left-[8%] top-10 hidden h-40 w-40 rounded-full border border-white/70 bg-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] backdrop-blur-md lg:block" />
      <div className="absolute bottom-10 right-[10%] hidden h-28 w-28 rounded-full border border-white/70 bg-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] backdrop-blur-md lg:block" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="overflow-hidden rounded-[2.75rem] border border-white/70 bg-white/45 px-6 py-16 text-center shadow-[0_35px_100px_rgba(91,54,113,0.14)] backdrop-blur-2xl md:px-12 md:py-20">
          <div className="absolute -left-16 -top-16 h-44 w-44 rounded-full bg-[#FFE2EC]/80 blur-3xl" />
          <div className="absolute -right-16 -bottom-16 h-52 w-52 rounded-full bg-[#E8D3F5]/80 blur-3xl" />

          <div className="relative mx-auto mb-5 inline-flex rounded-full border border-white/70 bg-white/70 px-5 py-2 shadow-[0_14px_35px_rgba(122,92,158,0.08)] backdrop-blur-xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#7A5C9E] md:text-sm">
              Shop
            </p>
          </div>

          <h1 className="relative mx-auto mb-5 max-w-4xl text-4xl font-medium leading-[1.02] tracking-[-0.05em] text-[#553268] md:text-6xl">
            Find your perfect comfort
          </h1>

          <p className="relative mx-auto max-w-2xl text-base leading-8 text-[#70537C] md:text-lg">
            Explore our range of thoughtfully designed products made to support
            you through every flow and every moment.
          </p>
        </div>
      </div>
    </section>
  );
}