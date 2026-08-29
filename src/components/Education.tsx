import { motion } from 'framer-motion';
import { GraduationCap, BookOpen } from 'lucide-react';
import { EDUCATION } from '@/data/portfolio';
import { SectionHeader } from './SectionHeader';
import { useReveal } from '@/hooks/useReveal';

export function Education() {
  const { ref, visible } = useReveal();

  return (
    <section id="education" className="section-pad">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Education"
          title="The academic foundation."
          description="Formal study in mathematics and computer science, with a growing focus on data and AI."
        />

        <div ref={ref} className="mt-12 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="card-surface relative overflow-hidden p-7"
          >
            <span className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-brand-500/10 blur-2xl" />
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-accent-500 text-ink-950">
              <GraduationCap className="h-6 w-6" />
            </span>
            <h3 className="mt-5 font-display text-xl font-semibold text-white">{EDUCATION.degree}</h3>
            <p className="mt-1 text-sm text-slate-400">{EDUCATION.institution}</p>
            <span className="mt-3 inline-flex rounded-full border border-warn-500/30 bg-warn-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-warn-400">
              {EDUCATION.status}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="card-surface p-7"
          >
            <div className="flex items-center gap-2.5">
              <BookOpen className="h-5 w-5 text-accent-400" />
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
                Relevant areas
              </p>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {EDUCATION.areas.map((area) => (
                <span key={area} className="chip">
                  {area}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
