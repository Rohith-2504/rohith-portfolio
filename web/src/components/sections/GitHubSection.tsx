"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Flame, GitCommit } from "lucide-react";
import { profile } from "@/data/portfolio";
import {
  buildContributionGrid,
  fetchGitHubData,
  getLatestCommitMessage,
  githubUsername,
  type GitHubEvent,
  type GitHubRepo,
} from "@/lib/github";
import Reveal from "@/components/ui/Reveal";

export default function GitHubSection() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [latestCommit, setLatestCommit] = useState("Loading latest activity…");
  const grid = buildContributionGrid();

  useEffect(() => {
    fetchGitHubData(githubUsername)
      .then(({ repos: r, events }) => {
        setRepos(r);
        setLatestCommit(getLatestCommitMessage(events as GitHubEvent[]));
      })
      .catch(() => setLatestCommit("Building in public on GitHub"));
  }, []);

  return (
    <section className="section border-t border-border">
      <div className="wrap">
        <Reveal>
          <div className="card p-8 lg:p-12">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="section-label">GitHub</p>
                <h2 className="display-lg">
                  Coding. <span className="text-accent italic">Consistently.</span>
                </h2>
              </div>
              <a href={profile.github} target="_blank" rel="noreferrer" className="link-underline inline-flex items-center gap-1 text-sm">
                View profile <ArrowUpRight size={14} />
              </a>
            </div>

            <div className="mt-10 overflow-x-auto">
              <div className="inline-grid grid-flow-col gap-1" style={{ gridTemplateRows: "repeat(7, 10px)" }}>
                {grid.map((cell) => (
                  <div
                    key={cell.id}
                    className="h-2.5 w-2.5 rounded-[2px]"
                    style={{ backgroundColor: `rgba(217, 58, 47, ${0.08 + cell.level * 0.14})` }}
                  />
                ))}
              </div>
            </div>

            <p className="mt-4 text-sm text-muted">
              Latest · <span className="text-secondary">{latestCommit}</span>
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-surface-2 p-5">
                <Flame size={18} className="text-gold" />
                <p className="mt-3 font-[family-name:var(--font-display-next)] text-2xl font-semibold">12</p>
                <p className="text-sm text-muted">Day coding streak</p>
              </div>
              <div className="rounded-xl border border-border bg-surface-2 p-5">
                <GitCommit size={18} className="text-accent" />
                <p className="mt-3 font-[family-name:var(--font-display-next)] text-2xl font-semibold">120+</p>
                <p className="text-sm text-muted">Commits this month</p>
              </div>
              <div className="rounded-xl border border-border bg-surface-2 p-5">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">Pinned repos</p>
                <ul className="mt-3 space-y-2">
                  {(repos.length ? repos : [{ name: "rohith-portfolio", language: "TypeScript", description: "" }]).map(
                    (r) => (
                      <li key={r.name} className="text-sm">
                        <span>{r.name}</span>
                        {r.language && <span className="text-muted"> · {r.language}</span>}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
