"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { skillGroups } from "@/data/portfolio";
import Reveal from "@/components/ui/Reveal";

const filters = ["All", ...skillGroups.map((g) => g.title)];

export default function SkillsSection() {
  const [active, setActive] = useState("All");
  const skills =
    active === "All"
      ? skillGroups.flatMap((g) => g.skills.map((s) => ({ name: s, group: g.title })))
      : skillGroups.find((g) => g.title === active)?.skills.map((s) => ({ name: s, group: active })) || [];

  return (
    <section id="skills" className="section border-t border-border">
      <div className="wrap">
        <Reveal>
          <p className="section-label">Skills</p>
          <h2 className="display-lg">Technologies I work with.</h2>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-10 flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setActive(f)}
                className={`pill transition duration-250 ${active === f ? "pill-active" : ""}`}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mt-10 flex flex-wrap gap-2"
        >
          {skills.map((skill, i) => (
            <motion.span
              key={skill.name}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.015, duration: 0.28 }}
              whileHover={{ y: -3 }}
              className="pill cursor-default"
            >
              {skill.name}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
