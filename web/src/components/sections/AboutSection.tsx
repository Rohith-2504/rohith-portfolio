import Image from "next/image";
import { aboutCards, profile } from "@/data/portfolio";
import Reveal from "@/components/ui/Reveal";

export default function AboutSection() {
  return (
    <section id="about" className="section border-t border-border">
      <div className="wrap">
        <Reveal>
          <p className="section-label">About</p>
          <h2 className="display-lg max-w-3xl text-balance">
            The workspace of an engineer who ships with{" "}
            <span className="text-accent italic">intent</span>.
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="relative mx-auto mt-14 max-w-sm">
            <div className="portrait-glow absolute inset-0 scale-125 rounded-3xl" />
            <Image
              src={profile.heroPortrait}
              alt={profile.shortName}
              width={400}
              height={500}
              className="relative rounded-3xl border border-border object-cover object-top"
            />
          </div>
        </Reveal>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {aboutCards.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.05}>
              <article className="card-hover h-full p-6 lg:p-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">{card.title}</p>
                <h3 className="mt-4 font-[family-name:var(--font-display-next)] text-xl font-semibold leading-snug">{card.value}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{card.detail}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
