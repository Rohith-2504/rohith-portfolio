import { ArrowUpRight } from 'lucide-react';

export default function ProjectCard({ project, variant = 'red' }) {
  const isRed = variant === 'red';

  return (
    <article className={`${isRed ? 'glass-card' : 'glass-card-light'} group flex h-full flex-col p-6 sm:p-8`}>
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${isRed ? 'eyebrow-red' : 'eyebrow-dark'}`}>
            {project.category}
          </p>
          <h3 className={`mt-2 font-display text-2xl ${isRed ? 'text-chiffon' : 'text-milano-red'}`}>
            {project.name}
          </h3>
        </div>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className={`rounded-xl border p-2 transition duration-300 ${
              isRed
                ? 'border-chiffon/20 text-chiffon/50 group-hover:border-chiffon/45 group-hover:text-chiffon'
                : 'border-milano-red/15 text-milano-red/40 group-hover:border-milano-red/30 group-hover:text-milano-red'
            }`}
            aria-label={`Open ${project.name}`}
          >
            <ArrowUpRight size={18} />
          </a>
        )}
      </div>

      <p className={`flex-1 text-sm leading-7 sm:text-[15px] ${isRed ? 'text-on-red' : 'text-on-chiffon'}`}>
        {project.description}
      </p>

      <ul className="mt-5 space-y-2">
        {project.highlights.map((item) => (
          <li key={item} className={`flex gap-2 text-sm ${isRed ? 'text-on-red' : 'text-on-chiffon'}`}>
            <span className={isRed ? 'text-chiffon' : 'text-milano-red'}>▹</span>
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <span key={tech} className={isRed ? 'tag-pill-red' : 'tag-pill'}>
            {tech}
          </span>
        ))}
      </div>
    </article>
  );
}
