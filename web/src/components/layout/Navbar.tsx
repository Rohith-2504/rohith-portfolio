"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { navLinks, profile } from "@/data/portfolio";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-4 lg:px-6 lg:pt-5">
        <motion.header
          layout
          className={`nav-shell flex w-full max-w-[1380px] items-center justify-between gap-4 px-4 transition-all duration-500 lg:px-5 ${compact ? "py-2" : "py-2.5"}`}
        >
          <a href="#home" className="shrink-0 font-[family-name:var(--font-display-next)] text-xl font-semibold lg:text-[1.35rem]">
            {profile.brandName}
          </a>

          <nav className="hidden flex-1 items-center justify-center gap-4 xl:gap-5 lg:flex">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="link-underline whitespace-nowrap text-[12px] font-medium">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <MagneticButton href={profile.resumePath} download className="btn-accent hidden px-4 py-2 text-[11px] sm:inline-flex">
              <Download size={14} />
              Resume
            </MagneticButton>
            <button type="button" className="p-2 lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
              <Menu size={20} />
            </button>
          </div>
        </motion.header>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-bg/95 backdrop-blur-md lg:hidden" onClick={() => setOpen(false)}>
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} className="card absolute inset-x-4 top-20 p-6" onClick={(e) => e.stopPropagation()}>
              <div className="mb-6 flex justify-between">
                <span className="font-[family-name:var(--font-display-next)] text-2xl">{profile.brandName}</span>
                <button type="button" onClick={() => setOpen(false)}><X size={22} /></button>
              </div>
              <nav className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <a key={link.label} href={link.href} onClick={() => setOpen(false)} className="text-base text-secondary">{link.label}</a>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
