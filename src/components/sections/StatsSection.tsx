"use client";

import {
  Award,
  Briefcase,
  Code2,
  FolderKanban,
  GitCommit,
  GraduationCap,
} from "lucide-react";
import { stats } from "@/data/portfolio";
import useCountUp from "@/hooks/useCountUp";
import Reveal from "@/components/ui/Reveal";

const icons = [FolderKanban, Briefcase, Award, Code2, GitCommit, GraduationCap];

function StatItem({
  value,
  suffix,
  label,
  Icon,
}: {
  value: number;
  suffix: string;
  label: string;
  Icon: typeof FolderKanban;
}) {
  const { count, ref } = useCountUp(value);
  return (
    <div ref={ref} className="flex min-w-[140px] flex-1 items-center gap-3 border-white/5 px-4 py-4 lg:border-r lg:last:border-r-0">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/5 bg-surface-2 text-accent">
        <Icon size={15} />
      </div>
      <div>
        <p className="font-[family-name:var(--font-display-next)] text-2xl font-semibold tabular-nums leading-none">
          {count}
          {suffix}
        </p>
        <p className="mt-1 text-[11px] text-muted">{label}</p>
      </div>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="pb-8 lg:pb-10">
      <div className="wrap">
        <Reveal>
          <div className="stats-ribbon flex overflow-x-auto overscroll-x-contain">
            {stats.map((item, i) => (
              <StatItem key={item.label} {...item} Icon={icons[i]} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
