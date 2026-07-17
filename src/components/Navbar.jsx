import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navLinks, profile } from '../data/portfolio';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'border-b border-milano-red/10 bg-chiffon/80 py-4 backdrop-blur-xl'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 sm:px-8 lg:px-10">
          <a
            href="#home"
            className={`font-display text-[1.65rem] leading-none transition-colors ${
              scrolled ? 'text-milano-red' : 'text-chiffon'
            }`}
          >
            {profile.brandName}
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={scrolled ? 'nav-link-dark' : 'nav-link'}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={profile.resumePath}
              download
              className={`hidden rounded-full px-4 py-2 text-[13px] font-semibold transition sm:inline-flex ${
                scrolled ? 'btn-secondary-dark px-4 py-2' : 'btn-secondary px-4 py-2'
              }`}
            >
              Resume
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className={`rounded-full p-2.5 lg:hidden ${scrolled ? 'text-milano-red' : 'text-chiffon'}`}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-milano-red/40 backdrop-blur-sm lg:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="absolute right-0 top-0 flex h-full w-[min(88vw,320px)] flex-col border-l border-chiffon/20 bg-chiffon px-6 py-8 shadow-hero"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-10 flex items-center justify-between">
                <span className="font-display text-2xl text-milano-red">{profile.brandName}</span>
                <button type="button" onClick={() => setOpen(false)} aria-label="Close menu">
                  <X size={22} className="text-milano-red" />
                </button>
              </div>

              <nav className="flex flex-col gap-5">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-lg font-medium text-milano-red/80 transition hover:text-milano-red"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <a href={profile.resumePath} download className="btn-primary mt-auto text-center">
                Download Resume
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
