import { Building2, Sparkles } from 'lucide-react';
import { gopafyProjects, personalProjects } from '../data/portfolio';
import ProjectCard from './ProjectCard';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function Projects() {
  return (
    <section id="projects" className="section-padding section-band-red">
      <div className="section-shell section-panel">
        <Reveal>
          <SectionHeading
            variant="red"
            eyebrow="Projects"
            title="Work that reflects my engineering range"
            description="Products and platforms built at Gopafy, alongside personal AI/ML projects."
          />
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-2xl bg-chiffon/15 p-2.5 text-chiffon">
              <Building2 size={18} />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-chiffon">At Gopafy</h3>
              <p className="text-sm text-on-red">SaaS products and client platforms</p>
            </div>
          </div>
        </Reveal>

        <div className="mb-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {gopafyProjects.map((project, index) => (
            <Reveal key={project.name} delay={index * 0.04}>
              <ProjectCard project={project} variant="red" />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-2xl bg-chiffon/15 p-2.5 text-chiffon">
              <Sparkles size={18} />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-chiffon">Personal Projects</h3>
              <p className="text-sm text-on-red">AI/ML systems and research builds</p>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          {personalProjects.map((project, index) => (
            <Reveal key={project.name} delay={index * 0.06}>
              <ProjectCard project={project} variant="red" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
