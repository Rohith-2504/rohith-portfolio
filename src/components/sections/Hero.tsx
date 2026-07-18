"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, Bot, MapPin } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { osStats, profile, skillGroups } from "@/data/portfolio";
import MagneticButton from "@/components/ui/MagneticButton";

const stackPreview = skillGroups.flatMap((g) => g.skills).slice(0, 10);

function Sparkline() {
  const points = [4, 8, 6, 12, 10, 16, 14, 18, 12, 20, 16, 22];
  const max = Math.max(...points);
  return (
    <div className="flex h-10 items-end gap-0.5">
      {points.map((v, i) => (
        <div
          key={i}
          className="w-1.5 rounded-sm bg-accent/80"
          style={{ height: `${(v / max) * 100}%`, opacity: 0.35 + (i / points.length) * 0.65 }}
        />
      ))}
    </div>
  );
}

function RohithOS() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 40, y: 20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="os-panel w-full overflow-hidden lg:max-w-[360px] xl:max-w-[390px]"
    >
      <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-success" style={{ animation: "pulse-glow 2s infinite" }} />
          <span className="text-[10px] font-bold tracking-[0.22em] text-secondary">ROHITH.OS</span>
        </div>
        <span className="pill pill-accent text-[9px]">● LIVE</span>
      </div>

      <div className="grid grid-cols-3 gap-px border-b border-white/5 bg-white/5">
        {osStats.slice(0, 3).map((s) => (
          <div key={s.label} className="bg-surface/80 px-3 py-3 text-center">
            <p className="font-[family-name:var(--font-display-next)] text-xl font-semibold tabular-nums">{s.value}</p>
            <p className="text-[9px] uppercase tracking-wider text-muted">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="border-b border-white/5 px-4 py-3">
        <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.18em] text-muted">GitHub Activity</p>
        <Sparkline />
      </div>

      <div className="border-b border-white/5 px-4 py-3">
        <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.18em] text-muted">Current Stack</p>
        <div className="flex flex-wrap gap-1">
          {stackPreview.map((tech) => (
            <span key={tech} className="rounded-md border border-white/5 bg-surface-2/80 px-1.5 py-0.5 text-[9px] text-secondary">
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="border-b border-white/5 bg-black/20 px-4 py-2.5">
        <p className="truncate text-[10px] text-muted">
          Latest Commit · <span className="text-secondary">fix: optimize RAG pipeline performance</span>
        </p>
      </div>

      <a href="#ai-assistant" className="flex items-center gap-3 px-4 py-3 transition hover:bg-white/[0.03]">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/5 bg-surface-2 text-ai">
          <Bot size={14} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold">Ask Rohith AI</p>
          <p className="truncate text-[10px] text-muted">Tell me about your experience</p>
        </div>
        <ArrowUpRight size={14} className="text-muted" />
      </a>
    </motion.aside>
  );
}

export default function Hero() {
  const { scrollY } = useScroll();
  const portraitY = useTransform(scrollY, [0, 500], [0, 40]);

  const words = profile.headline.split(" ");
  const accentSet = new Set(["AI", "Products"]);

  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden pt-24 lg:pt-28">
      <div className="wrap relative h-full">
        <div className="grid min-h-[calc(100svh-7rem)] items-end gap-6 pb-8 lg:grid-cols-[1fr_420px_390px] lg:items-center lg:gap-4 xl:grid-cols-[minmax(0,1fr)_460px_390px] xl:gap-6">
          {/* LEFT COPY */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-20 pb-4 lg:pb-0"
          >
            <div className="pill mb-5 w-fit text-success">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              {profile.availability}
            </div>

            <h1 className="display-xl max-w-[14ch]">
              {words.map((word, i) => (
                <span
                  key={`${word}-${i}`}
                  className={`mr-[0.22em] inline-block ${accentSet.has(word.replace(/[^a-zA-Z]/g, "")) || word === "AI" ? "text-accent italic" : ""}`}
                >
                  {word}
                </span>
              ))}
            </h1>

            <p className="body-lg mt-5 max-w-md text-[15px]">{profile.subtitle}</p>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted">
              <span className="pill">
                <MapPin size={12} className="text-accent" /> {profile.location}
              </span>
              <span>
                @{" "}
                <a href={profile.companyUrl} className="text-accent hover:text-accent-hover">
                  {profile.company}
                </a>
              </span>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <MagneticButton href="#projects" className="btn-accent">
                Explore My Work <ArrowRight size={16} />
              </MagneticButton>
              <MagneticButton href="#contact" className="btn-ghost">
                Let&apos;s Connect <ArrowRight size={16} />
              </MagneticButton>
            </div>

            <div className="mt-6 flex gap-2">
              <a href={profile.github} target="_blank" rel="noreferrer" className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-surface/60 text-secondary transition hover:text-cream">
                <FaGithub size={15} />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-surface/60 text-secondary transition hover:text-cream">
                <FaLinkedin size={15} />
              </a>
            </div>
          </motion.div>

          {/* CENTER PORTRAIT — centerpiece */}
          <motion.div style={{ y: portraitY }} className="anime-portrait-wrap relative z-10 mx-auto w-full max-w-[420px] lg:mx-0 lg:max-w-none">
            <Image
              src={profile.heroPortrait}
              alt={profile.shortName}
              width={520}
              height={680}
              priority
              className="anime-portrait relative mx-auto h-auto w-full max-w-[420px] object-contain object-bottom drop-shadow-[0_30px_60px_rgba(0,0,0,0.65)] xl:max-w-[460px]"
            />
          </motion.div>

          {/* RIGHT DASHBOARD */}
          <div className="relative z-20 hidden lg:block">
            <RohithOS />
          </div>
        </div>

        {/* Mobile OS panel */}
        <div className="mt-4 lg:hidden">
          <RohithOS />
        </div>
      </div>
    </section>
  );
}
