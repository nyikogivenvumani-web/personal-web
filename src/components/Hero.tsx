import { motion } from 'framer-motion';
import { ArrowRight, FileDown, FolderGit2, Sparkles } from 'lucide-react';
import { PROFILE } from '@/data/portfolio';
import { HeroGraphic } from './HeroGraphic';

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36">
      {/* Background grid + glows */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid mask-fade-b opacity-60" />
      <div className="pointer-events-none absolute -top-24 right-1/4 -z-10 h-72 w-72 rounded-full bg-brand-500/10 blur-3xl" />
      <div className="pointer-events-none absolute top-40 -left-20 -z-10 h-72 w-72 rounded-full bg-accent-500/10 blur-3xl" />

      <div className="section-shell grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-slate-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-400" />
            </span>
            Open to opportunities
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: 'easeOut' }}
            className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Building intelligent technology with{' '}
            <span className="text-gradient">Mathematics &amp; Computer Science</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16, ease: 'easeOut' }}
            className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg"
          >
            I&apos;m {PROFILE.name}, a Mathematics &amp; Computer Science student passionate about Data
            Science, Artificial Intelligence, Machine Learning and Software Engineering.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24, ease: 'easeOut' }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a href="#projects" className="btn-primary">
              <FolderGit2 className="h-5 w-5" />
              View My Projects
            </a>
            <a href="#contact" className="btn-ghost">
              Let&apos;s Connect
              <ArrowRight className="h-5 w-5" />
            </a>
            <a href="#" className="link-quiet inline-flex items-center gap-1.5 px-1 py-3">
              <FileDown className="h-4 w-4" />
              Download CV
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.36 }}
            className="mt-8 flex flex-wrap gap-2"
          >
            {['Data Science', 'AI / ML', 'Software Engineering', 'Mathematics'].map((t) => (
              <span key={t} className="chip">
                <Sparkles className="h-3 w-3 text-brand-400" />
                {t}
              </span>
            ))}
          </motion.div>
        </div>

        <HeroGraphic />
      </div>
    </section>
  );
}
