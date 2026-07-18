"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { timeline } from "@/data/portfolio";
import Reveal from "@/components/ui/Reveal";

export default function ExperienceSection() {
  const [openId, setOpenId] = useState(timeline[0].id);

  return (
    <section id="experience" className="section border-t border-border">
      <div className="wrap">
        <Reveal>
          <p className="section-label">Experience</p>
          <h2 className="display-lg">Engineering journey.</h2>
        </Reveal>

        <div className="relative mt-16 max-w-3xl">
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-[7px] top-2 hidden w-px bg-border sm:block"
          />

          <div className="space-y-4">
            {timeline.map((item, index) => {
              const open = openId === item.id;
              return (
                <Reveal key={item.id} delay={index * 0.06}>
                  <article className="card overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setOpenId(open ? "" : item.id)}
                      className="flex w-full items-start gap-4 p-6 text-left transition hover:bg-surface-2/50 sm:items-center"
                    >
                      <span className="relative z-10 mt-1 hidden h-3.5 w-3.5 shrink-0 rounded-full border-2 border-accent bg-bg sm:block" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium uppercase tracking-wider text-accent">{item.year}</p>
                        <h3 className="mt-1 font-[family-name:var(--font-display-next)] text-xl font-semibold">{item.title}</h3>
                        <p className="mt-1 text-sm text-secondary">{item.summary}</p>
                      </div>
                      <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
                        <ChevronDown size={18} className="text-muted" />
                      </motion.span>
                    </button>

                    <AnimatePresence>
                      {open && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden border-t border-border"
                        >
                          <ul className="space-y-2 px-6 py-5 sm:pl-14">
                            {item.details.map((d) => (
                              <li key={d} className="flex gap-2 text-sm leading-6 text-muted">
                                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                                {d}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
