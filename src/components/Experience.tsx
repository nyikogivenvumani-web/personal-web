import { motion } from 'framer-motion';
import { EXPERIENCE } from '@/data/portfolio';
import { SectionHeader } from './SectionHeader';
import { useReveal } from '@/hooks/useReveal';

export function Experience() {
  const { ref, visible } = useReveal();

  return (
    <section id="experience" className="section-pad">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Experience"
          title="What I'm working on."
          description="Independent, self-driven work across software, AI and real-world problem solving."
        />

        <div ref={ref} className="relative mt-12 pl-6 sm:pl-8">
          {/* Vertical line */}
          <span className="absolute left-0 top-2 h-full w-px bg-gradient-to-b from-brand-400/50 via-white/10 to-transparent" />

          <div className="space-y-8">
            {EXPERIENCE.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -16 }}
                  animate={visible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="relative"
                >
                  <span className="absolute -left-[1.65rem] top-1 flex h-7 w-7 items-center justify-center rounded-full border border-brand-400/30 bg-ink-900 sm:-left-[2.15rem]">
                    <Icon className="h-3.5 w-3.5 text-brand-300" />
                  </span>
                  <div className="card-surface p-5 transition-colors hover:border-white/10">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-display text-base font-semibold text-white">{item.title}</h3>
                      <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-slate-400">
                        {item.tag}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
