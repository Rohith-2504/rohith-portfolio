import Image from "next/image";
import { GraduationCap, MapPin, Quote } from "lucide-react";
import { aboutCards, profile, timeline } from "@/data/portfolio";
import Reveal from "@/components/ui/Reveal";

export default function AboutExperienceSection() {
  const mission = aboutCards.find((c) => c.title === "Mission");
  const education = aboutCards.find((c) => c.title === "Education");

  return (
    <section id="about" className="section">
      <div className="wrap">
        <div className="grid gap-4 lg:grid-cols-12">
          {/* ABOUT */}
          <Reveal className="lg:col-span-4">
            <article className="card h-full p-6 lg:p-7">
              <p className="section-label">About Me</p>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/5 bg-surface-2 text-accent">
                <Quote size={16} />
              </div>
              <h2 className="display-md">
                Building solutions that make <span className="text-accent italic">impact.</span>
              </h2>
              <p className="body-lg mt-4 text-sm">{profile.mission}</p>
              <div className="mt-6 space-y-3 border-t border-white/5 pt-5">
                <div className="flex items-start gap-3">
                  <GraduationCap size={16} className="mt-0.5 text-accent" />
                  <div>
                    <p className="text-sm font-medium">{education?.value}</p>
                    <p className="text-xs text-muted">{education?.detail}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="mt-0.5 text-accent" />
                  <div>
                    <p className="text-sm font-medium">{profile.location}</p>
                    <p className="text-xs text-muted">Open to remote & hybrid roles</p>
                  </div>
                </div>
              </div>
              {mission && (
                <p className="mt-5 rounded-xl border border-white/5 bg-surface-2/50 p-4 text-sm italic text-secondary">
                  &ldquo;{mission.value}&rdquo;
                </p>
              )}
            </article>
          </Reveal>

          {/* ANIME ILLUSTRATION */}
          <Reveal delay={0.06} className="lg:col-span-4">
            <article className="card relative h-full min-h-[320px] overflow-hidden lg:min-h-full">
              <Image
                src={profile.animeAbout}
                alt="Anime cityscape inspiration"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent" />
              <div className="absolute bottom-0 p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Interests</p>
                <p className="mt-1 text-sm text-secondary">Photography · AI · Music · Technology</p>
              </div>
            </article>
          </Reveal>

          {/* TIMELINE */}
          <Reveal delay={0.1} className="lg:col-span-4" >
            <article id="experience" className="card h-full p-6 lg:p-7">
              <p className="section-label">Experience</p>
              <h2 className="display-md">
                My <span className="text-accent italic">journey</span> so far
              </h2>
              <div className="relative mt-6 space-y-0">
                <div className="absolute bottom-2 left-[5px] top-2 w-px bg-gradient-to-b from-accent/60 via-accent/20 to-transparent" />
                {timeline.map((item) => (
                  <div key={item.id} className="relative flex gap-4 pb-5 last:pb-0">
                    <span className="relative z-10 mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full border border-accent bg-bg shadow-[0_0_12px_rgba(217,58,47,0.45)]" />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-accent">{item.year}</p>
                      <h3 className="mt-0.5 text-sm font-semibold text-cream">{item.title}</h3>
                      <p className="mt-1 text-xs leading-5 text-muted">{item.summary}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
