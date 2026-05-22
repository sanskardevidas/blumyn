const features = [
  {
    title: "Heavy Flow Protection",
    description: "Reliable coverage designed for days that feel more demanding.",
  },
  {
    title: "Leak Lock System",
    description: "Made to help you move through the day with more confidence.",
  },
  {
    title: "Odor Control",
    description: "Fresh-feeling comfort that helps you stay at ease for longer.",
  },
  {
    title: "Breathable Layers",
    description: "Airy construction that feels lighter and more comfortable.",
  },
  {
    title: "Rash-Free Comfort",
    description: "Gentle on sensitive skin where softness matters most.",
  },
  {
    title: "Ultra Soft Cotton",
    description: "A soft-touch feel created to make every wear more soothing.",
  },
];

const repeatedFeatures = [...features, ...features];

export default function ComfortFeatures() {
  return (
    <section className="overflow-hidden bg-background py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-accent">
            Comfort Features
          </p>
          <h2 className="mb-4 text-4xl text-accent md:text-5xl">
            Thoughtful details that make a difference
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-7 text-textSoft md:text-lg">
            Every feature is designed to support comfort, confidence, and
            everyday ease without making the experience feel clinical.
          </p>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />

          <div className="feature-marquee flex w-max gap-6">
            {repeatedFeatures.map((feature, index) => (
              <div
                key={`${feature.title}-${index}`}
                className="min-w-[280px] max-w-[280px] rounded-[1.5rem] border border-borderSoft bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-accent">
                  ✦
                </div>

                <h3 className="mb-3 text-2xl leading-snug text-accent">
                  {feature.title}
                </h3>

                <p className="text-sm leading-7 text-textSoft">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}