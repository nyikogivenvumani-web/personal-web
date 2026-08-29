import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SKILL_CATEGORIES } from '@/data/portfolio';
import { SectionHeader } from './SectionHeader';

export function Skills() {
  const [active, setActive] = useState(SKILL_CATEGORIES[0].id);
  const current = SKILL_CATEGORIES.find((c) => c.id === active) ?? SKILL_CATEGORIES[0];
  const ActiveIcon = current.icon;

  return (
    <section id="skills" className="section-pad">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Skills"
          title="A toolkit across the stack and the math behind it."
          description="Languages, frameworks and concepts I use to design, build and analyze."
        />

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {SKILL_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = cat.id === active;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActive(cat.id)}
                aria-pressed={isActive}
                className={`group relative flex flex-col items-start gap-3 rounded-2xl border p-5 text-left transition-all duration-200 ${
                  isActive
                    ? 'border-brand-400/40 bg-ink-850/80 shadow-glow'
                    : 'border-white/5 bg-ink-850/40 hover:border-white/10 hover:bg-ink-850/70'
                }`}
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                    isActive
                      ? 'bg-gradient-to-br from-brand-400 to-accent-500 text-ink-950'
                      : 'bg-white/5 text-slate-300 group-hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-sm font-semibold text-white">{cat.title}</p>
                  <p className="mt-1 text-xs leading-snug text-slate-500">{cat.blurb}</p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-6 card-surface overflow-hidden p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-400 to-accent-500 text-ink-950">
              <ActiveIcon className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-display text-lg font-semibold text-white">{current.title}</h3>
              <p className="text-xs text-slate-500">{current.blurb}</p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid gap-4 sm:grid-cols-2"
            >
              {current.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="rounded-xl border border-white/5 bg-ink-900/50 p-4 transition-colors hover:border-white/10"
                >
                  <div className="flex items-baseline justify-between">
                    <p className="font-medium text-white">{skill.name}</p>
                    <span className="font-mono text-[10px] text-slate-500">{skill.level}%</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-400">{skill.desc}</p>
                  <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.7, ease: 'easeOut' }}
                      className="h-full rounded-full bg-gradient-to-r from-brand-400 to-accent-400"
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
