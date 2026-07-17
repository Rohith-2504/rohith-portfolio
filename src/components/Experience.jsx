import { Briefcase } from 'lucide-react';
import { experience } from '../data/portfolio';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function Experience() {
  return (
    <section id="experience" className="section-padding section-band-red">
      <div className="section-shell section-panel">
        <Reveal>
          <SectionHeading
            variant="red"
            eyebrow="Expertise"
            title="Where I've built and shipped"
            description="Hands-on experience across product engineering, AI workflows, and full-stack development."
          />
        </Reveal>

        <div className="space-y-6">
          {experience.map((item, index) => (
            <Reveal key={`${item.company}-${item.period}`} delay={index * 0.06}>
              <article className="glass-card p-6 sm:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-chiffon/15 text-chiffon">
                      <Briefcase size={18} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-chiffon">{item.role}</h3>
                      <p className="mt-1 font-medium text-chiffon/90">{item.company}</p>
                    </div>
                  </div>
                  <div className="text-sm text-on-red">
                    <p>{item.period}</p>
                    <p>{item.location}</p>
                  </div>
                </div>

                <ul className="mt-6 space-y-3 border-t border-chiffon/15 pt-6">
                  {item.highlights.map((point) => (
                    <li key={point} className="flex gap-3 text-sm leading-7 text-on-red sm:text-[15px]">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-chiffon" />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
