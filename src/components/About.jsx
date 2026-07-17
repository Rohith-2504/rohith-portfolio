import { profile } from '../data/portfolio';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function About() {
  return (
    <section id="about" className="section-padding section-band-chiffon">
      <div className="section-shell section-panel-light">
        <Reveal>
          <SectionHeading
            variant="chiffon"
            eyebrow="About Me"
            title="Engineering intelligent products with purpose"
            description="From GenAI pipelines to production-ready web apps — I build systems that are scalable, thoughtful, and user-focused."
          />
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal delay={0.08}>
            <div className="glass-card-light p-8 sm:p-10">
              <p className="text-base leading-8 text-milano-red/85 sm:text-[1.05rem]">{profile.summary}</p>
              <p className="mt-6 text-base leading-8 text-on-chiffon">
                Currently interning at <strong className="font-semibold text-milano-red">Gopafy</strong>,
                where I contribute to scalable SaaS products and client platforms.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {[
              { label: 'Email', value: profile.email },
              { label: 'Phone', value: profile.phone },
              { label: 'Location', value: profile.location },
              { label: 'Focus', value: 'GenAI · Full Stack · Web Apps' },
            ].map((item, index) => (
              <Reveal key={item.label} delay={0.12 + index * 0.05}>
                <div className="glass-card-light p-5">
                  <p className="eyebrow-dark mb-2 text-[10px]">{item.label}</p>
                  <p className="text-sm font-medium text-milano-red">{item.value}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
