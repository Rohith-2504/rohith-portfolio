import { GraduationCap } from 'lucide-react';
import { education } from '../data/portfolio';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function Education() {
  return (
    <section id="education" className="section-padding section-band-chiffon">
      <div className="section-shell section-panel-light">
        <Reveal>
          <SectionHeading
            variant="chiffon"
            eyebrow="Certification & Education"
            title="Academic foundation in AI & ML"
            description="Formal training in artificial intelligence, machine learning, and computer science fundamentals."
          />
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          {education.map((item, index) => (
            <Reveal key={item.institution} delay={index * 0.06}>
              <article className="glass-card-light p-6 sm:p-8">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-2xl bg-milano-red/10 p-2.5 text-milano-red">
                    <GraduationCap size={18} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-milano-red">{item.institution}</h3>
                    <p className="text-sm text-on-chiffon">
                      {item.period} · {item.location}
                    </p>
                  </div>
                </div>
                <p className="text-base font-medium text-milano-red/90">{item.degree}</p>
                <ul className="mt-4 space-y-2">
                  {item.details.map((detail) => (
                    <li key={detail} className="text-sm text-on-chiffon">
                      {detail}
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
