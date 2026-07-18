"use client";

import Reveal from "@/components/ui/Reveal";
import AIChatCard from "@/components/sections/AIChatCard";
import { GitHubCard, SkillsCard } from "@/components/sections/DashboardCards";

export default function DashboardSection() {
  return (
    <section className="section border-t border-white/5">
      <div className="wrap">
        <div className="grid gap-4 lg:grid-cols-3">
          <Reveal><SkillsCard /></Reveal>
          <Reveal delay={0.05}><GitHubCard /></Reveal>
          <Reveal delay={0.1}><AIChatCard /></Reveal>
        </div>
      </div>
    </section>
  );
}
