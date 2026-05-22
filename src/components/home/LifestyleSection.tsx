const lifestyleCards = [
  {
    id: 1,
    title: "Office Days",
    description: "Stay comfortable and focused through meetings, work, and long hours.",
  },
  {
    id: 2,
    title: "Travel Days",
    description: "Protection you can trust when you're moving, exploring, or commuting.",
  },
  {
    id: 3,
    title: "Overnight Comfort",
    description: "Sleep peacefully with care designed for longer hours and better rest.",
  },
  {
    id: 4,
    title: "First Period Care",
    description: "Gentle comfort for moments that need softness, ease, and reassurance.",
  },
];

export default function LifestyleSection() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-accent">
            Made For Real Life
          </p>
          <h2 className="mb-4 text-4xl text-accent md:text-5xl">
            Comfort that fits your everyday moments
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-7 text-textSoft md:text-lg">
            From busy schedules to quiet nights, Blumyn is designed to support you
            through the moments that matter most.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {lifestyleCards.map((card) => (
            <article
              key={card.id}
              className="overflow-hidden rounded-[1.75rem] border border-borderSoft bg-white shadow-soft transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex h-64 items-center justify-center bg-primary text-center text-textSoft">
                Lifestyle image
                <br />
                placeholder
              </div>

              <div className="p-6">
                <h3 className="mb-3 text-2xl text-accent">{card.title}</h3>
                <p className="text-sm leading-7 text-textSoft">
                  {card.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}