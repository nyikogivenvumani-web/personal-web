import { motion } from 'framer-motion';
import { ABOUT_STATS } from '@/data/portfolio';
import { SectionHeader } from './SectionHeader';
import { useReveal } from '@/hooks/useReveal';

export function About() {
  const { ref, visible } = useReveal();

  return (
    <section id="about" className="section-pad">
      <div className="section-shell">
        <SectionHeader
          eyebrow="About"
          title="Mathematics, computing and AI — one foundation."
          description="A quick introduction to how I think and what I'm building toward."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="space-y-5 text-base leading-relaxed text-slate-300"
          >
            <p>
              I&apos;m a BSc Mathematics and Computer Science student with a strong interest in the
              intersection between mathematics, computing and artificial intelligence.
            </p>
            <p>
              My background in mathematics gives me a strong foundation in problem solving,
              statistics, algorithms and analytical thinking, while my computer science studies allow
              me to turn those ideas into practical software.
            </p>
            <p>
              I&apos;m particularly interested in Data Science, Machine Learning, AI Software
              Engineering and building technology that solves real-world problems.
            </p>
            <p className="text-slate-400">
              I enjoy learning new technologies, building projects and turning ideas into working
              products.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {ABOUT_STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                className="card-surface group p-5 transition-colors hover:border-brand-400/30"
              >
                <p className="font-display text-lg font-semibold text-white">{stat.value}</p>
                <p className="mt-1 text-sm leading-snug text-slate-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
