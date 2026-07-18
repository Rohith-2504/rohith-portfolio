"use client";

import { ArrowUp } from "lucide-react";
import { motion } from "framer-motion";
import { navLinks, profile } from "@/data/portfolio";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="border-t border-white/5 py-8 pb-24 lg:pb-8"
    >
      <div className="wrap flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div>
          <p className="font-[family-name:var(--font-display-next)] text-xl font-semibold">{profile.brandName}</p>
          <p className="mt-1 text-xs text-muted">© {new Date().getFullYear()} {profile.name}</p>
        </div>
        <p className="text-xs text-muted">Built with Next.js · Tailwind · FastAPI RAG</p>
        <nav className="hidden flex-wrap justify-center gap-4 md:flex">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="link-underline text-xs">{link.label}</a>
          ))}
        </nav>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="pill text-xs"
          aria-label="Back to top"
        >
          <ArrowUp size={14} /> Top
        </button>
      </div>
    </motion.footer>
  );
}
