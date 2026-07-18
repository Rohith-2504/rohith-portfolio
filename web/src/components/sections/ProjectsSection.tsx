"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { projects, type Project } from "@/data/portfolio";
import Reveal from "@/components/ui/Reveal";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const hasDemo = Boolean(project.liveDemo);
  const hasGithub = Boolean(project.github);

  return (
    <Reveal delay={index * 0.04} className="h-full">
      <motion.article
        id={project.id}
        data-project-tags={project.tags.join(",")}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.28 }}
        className="card-hover group flex h-full flex-col overflow-hidden"
      >
        {/* Preview — fixed aspect ratio */}
        <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden border-b border-white/5 bg-surface-2">
          {project.image ? (
            <Image
              src={project.image}
              alt={`${project.name} preview`}
              fill
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            />
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/40 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-cream backdrop-blur-sm">
            {project.category}
          </span>
        </div>

        {/* Content — flex fill for equal heights */}
        <div className="flex flex-1 flex-col p-4">
          <h3 className="font-[family-name:var(--font-display-next)] text-xl font-semibold leading-tight">
            {project.name}
          </h3>

          <p className="mt-2 min-h-[2.75rem] line-clamp-2 text-xs leading-5 text-muted">
            {project.solution}
          </p>

          <div className="mt-3 min-h-[3.25rem] content-start">
            <div className="flex flex-wrap gap-1.5">
              {project.stack.slice(0, 4).map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-white/5 bg-surface-2 px-1.5 py-0.5 text-[10px] text-secondary"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Footer — always same height, aligned */}
          <div className="mt-auto flex min-h-[2.25rem] items-center gap-4 border-t border-white/5 pt-3 text-[11px]">
            {hasDemo ? (
              <a
                href={project.liveDemo!}
                target="_blank"
                rel="noreferrer"
                className="link-underline inline-flex items-center gap-1"
              >
                <ExternalLink size={12} /> Live Demo
              </a>
            ) : (
              <span className="inline-flex items-center gap-1 text-muted/50">
                <ExternalLink size={12} /> Live Demo —
              </span>
            )}
            {hasGithub ? (
              <a
                href={project.github!}
                target="_blank"
                rel="noreferrer"
                className="link-underline inline-flex items-center gap-1"
              >
                <FaGithub size={12} /> GitHub
              </a>
            ) : (
              <span className="inline-flex items-center gap-1 text-muted/50">
                <FaGithub size={12} /> GitHub —
              </span>
            )}
          </div>
        </div>
      </motion.article>
    </Reveal>
  );
}

export default function ProjectsSection() {
  const featured = projects.filter((p) => p.featured);

  return (
    <section id="projects" className="section border-t border-white/5">
      <div className="wrap">
        <Reveal>
          <div className="mb-6">
            <p className="section-label">Featured Projects</p>
            <h2 className="display-lg">Work that ships.</h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3 xl:gap-5">
          {featured.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
