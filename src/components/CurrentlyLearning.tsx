import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';
import { CURRENTLY_LEARNING } from '@/data/portfolio';
import { SectionHeader } from './SectionHeader';
import { useReveal } from '@/hooks/useReveal';

export function CurrentlyLearning() {
  const { ref, visible } = useReveal();

  return (
    <section id="learning" className="section-pad">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Growth"
          title="Currently Learning"
          description="Always expanding — these are the areas I'm actively studying right now."
        />

        <div ref={ref} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CURRENTLY_LEARNING.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 18 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-ink-850/60 p-5 transition-all duration-300 hover:border-brand-400/30 hover:bg-ink-850/90"
            >
              <span className="pointer-events-none absolute -right-4 -top-4 h-16 w-16 rounded-full bg-brand-500/10 blur-xl transition-opacity duration-300 group-hover:opacity-100 opacity-0" />
              <Rocket className="h-5 w-5 text-brand-400 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110" />
              <p className="mt-3 font-display text-sm font-semibold text-white">{item}</p>
              <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={visible ? { width: '100%' } : {}}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.07 }}
                  className="h-full rounded-full bg-gradient-to-r from-brand-400/40 to-accent-400/40"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
