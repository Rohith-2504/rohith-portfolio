import { skillGroups } from '../data/portfolio';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function Skills() {
  return (
    <section id="skills" className="section-padding section-band-chiffon">
      <div className="section-shell section-panel-light">
        <Reveal>
          <SectionHeading
            variant="chiffon"
            eyebrow="Skills"
            title="Tools and technologies I work with"
            description="A blend of AI/ML expertise and modern full-stack engineering."
          />
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          {skillGroups.map((group, index) => (
            <Reveal key={group.title} delay={index * 0.05}>
              <div className="glass-card-light p-6 sm:p-8">
                <h3 className="text-lg font-semibold text-milano-red">{group.title}</h3>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {group.skills.map((skill) => (
                    <span key={skill} className="tag-pill">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
