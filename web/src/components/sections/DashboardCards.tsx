"use client";

import { useEffect, useState } from "react";
import { skillGroups } from "@/data/portfolio";

const categories = [
  { key: "Frontend", items: skillGroups.find((g) => g.title === "Frontend")?.skills ?? [] },
  { key: "Backend", items: skillGroups.find((g) => g.title === "Backend")?.skills ?? [] },
  { key: "Database", items: skillGroups.find((g) => g.title === "Database")?.skills ?? [] },
  { key: "Tools", items: skillGroups.find((g) => g.title === "Tools")?.skills ?? [] },
];

export function SkillsCard() {
  return (
    <article id="skills" className="card h-full p-5">
      <p className="section-label">Skills & Technologies</p>
      <h3 className="display-md text-[1.35rem]">Technologies I work with.</h3>
      <div className="mt-5 space-y-4">
        {categories.map((cat) => (
          <div key={cat.key}>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-accent">{cat.key}</p>
            <div className="flex flex-wrap gap-1.5">
              {cat.items.map((s) => (
                <span key={s} className="rounded-md border border-white/5 bg-surface-2 px-2 py-1 text-[10px] text-secondary">
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

export function GitHubCard() {
  const [repos, setRepos] = useState<{ name: string; language: string | null }[]>([]);
  const weeks = 26;
  const days = 7;

  useEffect(() => {
    fetch("https://api.github.com/users/Rohith-2504/repos?sort=updated&per_page=4")
      .then((r) => r.json())
      .then((data) => setRepos(data.filter((x: { fork: boolean }) => !x.fork).slice(0, 3)))
      .catch(() => setRepos([]));
  }, []);

  return (
    <article className="card h-full p-5">
      <p className="section-label">GitHub Activity</p>
      <h3 className="display-md text-[1.35rem]">
        Coding. <span className="text-accent italic">Consistently.</span>
      </h3>
      <div className="mt-4 overflow-x-auto">
        <div className="inline-grid grid-flow-col gap-0.5" style={{ gridTemplateRows: `repeat(${days}, 10px)` }}>
          {Array.from({ length: weeks * days }).map((_, i) => (
            <div
              key={i}
              className="h-2.5 w-2.5 rounded-[2px]"
              style={{ backgroundColor: `rgba(217, 58, 47, ${0.1 + ((i * 3) % 5) * 0.14})` }}
            />
          ))}
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {["TypeScript", "Python", "JavaScript"].map((lang, i) => (
          <div key={lang}>
            <div className="mb-1 flex justify-between text-[9px] text-muted">
              <span>{lang}</span>
              <span>{["42%", "35%", "23%"][i]}</span>
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-surface-2">
              <div className="h-full rounded-full bg-accent" style={{ width: `${[42, 35, 23][i]}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 border-t border-white/5 pt-3">
        <p className="text-[10px] font-bold uppercase tracking-wider text-muted">Latest repos</p>
        <ul className="mt-2 space-y-1">
          {(repos.length ? repos : [{ name: "rohith-portfolio", language: "TypeScript" }]).map((r) => (
            <li key={r.name} className="text-[11px]">
              <span className="text-cream">{r.name}</span>
              {r.language && <span className="text-muted"> · {r.language}</span>}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
