import { motion } from 'framer-motion';
import { profile } from '../data/portfolio';
import SpeakingPortrait from './SpeakingPortrait';

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-hero-gradient text-chiffon">
      <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-chiffon/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-chiffon/8 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-chiffon/20 to-transparent" />

      <div className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-5 pb-12 pt-32 sm:px-8 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="eyebrow-red mb-5">AI/ML Engineer · Full Stack Developer</p>

            <h1 className="max-w-xl font-display text-[2.65rem] leading-[1.02] tracking-[-0.02em] text-chiffon sm:text-5xl lg:text-[3.55rem]">
              I build fast, scalable and modern web applications using React, Node.js and Tailwind
              CSS.
            </h1>

            <p className="mt-6 max-w-lg text-base leading-8 text-on-red sm:text-[1.05rem]">
              Plus GenAI, RAG pipelines, and production APIs — currently shipping real products at{' '}
              <span className="font-semibold text-chiffon">Gopafy</span>.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a href="#projects" className="btn-primary">
                View My Work
              </a>
              <a href="#contact" className="btn-secondary">
                Contact Me
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 36, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <SpeakingPortrait />
          </motion.div>
        </div>

        <p className="mt-12 text-center text-[11px] uppercase tracking-[0.28em] text-chiffon/55">
          {profile.location} · {profile.email}
        </p>
      </div>
    </section>
  );
}
