import { Award } from "lucide-react";
import { certifications } from "@/data/portfolio";
import Reveal from "@/components/ui/Reveal";

export default function CertificationsSection() {
  return (
    <section id="certifications" className="section border-t border-border">
      <div className="wrap">
        <Reveal>
          <p className="section-label">Certifications</p>
          <h2 className="display-lg">Continuous learning.</h2>
        </Reveal>

        <div className="relative mt-16">
          <div className="absolute left-4 top-0 hidden h-full w-px bg-border md:block" />
          <div className="space-y-4">
            {certifications.map((cert, i) => (
              <Reveal key={cert.title} delay={i * 0.04}>
                <article className="card-hover relative md:pl-14">
                  <span className="absolute left-0 top-6 hidden h-3 w-3 rounded-full border-2 border-accent bg-bg md:block" />
                  <div className="flex gap-4 p-6">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-2 text-gold">
                      <Award size={16} />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-accent">{cert.year}</p>
                      <h3 className="mt-1 font-[family-name:var(--font-display-next)] text-xl font-semibold">{cert.title}</h3>
                      <p className="text-sm text-secondary">{cert.issuer}</p>
                      <p className="mt-2 text-sm text-muted">{cert.detail}</p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
