import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useReveal } from '@/hooks/useReveal';

type Props = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  id?: string;
};

export function SectionHeader({ eyebrow, title, description, align = 'left', id }: Props) {
  const { ref, visible } = useReveal();
  const alignment = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left';

  return (
    <motion.div
      ref={ref}
      id={id}
      className={`flex max-w-2xl flex-col gap-4 ${alignment}`}
      initial={{ opacity: 0, y: 18 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">{title}</h2>
      {description && <p className="text-base leading-relaxed text-slate-400">{description}</p>}
    </motion.div>
  );
}
