import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { CONSOLE_LINES } from '@/data/portfolio';
import { useReveal } from '@/hooks/useReveal';

export function DeveloperConsole() {
  const { ref, visible } = useReveal();
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState('');
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!visible) return;
    if (step >= CONSOLE_LINES.length) return;

    const line = CONSOLE_LINES[step];
    const cmd = `nyiko@portfolio:~$ ${line.cmd}`;
    let i = 0;
    setTyped('');

    const typeCmd = () => {
      if (i <= cmd.length) {
        setTyped(cmd.slice(0, i));
        i++;
        timer.current = setTimeout(typeCmd, 28);
      } else {
        timer.current = setTimeout(() => setStep((s) => s + 1), 500);
      }
    };
    typeCmd();

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [step, visible]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [step, typed]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="mx-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-ink-900/80 shadow-card backdrop-blur-sm"
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-white/5 bg-ink-850/80 px-4 py-2.5">
        <Terminal className="h-4 w-4 text-brand-400" />
        <span className="font-mono text-xs text-slate-400">nyiko@portfolio — bash</span>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-err-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-warn-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent-500/70" />
        </div>
      </div>

      {/* Body */}
      <div
        ref={bodyRef}
        className="h-56 space-y-2 overflow-y-auto p-4 font-mono text-xs leading-relaxed sm:text-sm"
      >
        {CONSOLE_LINES.slice(0, step).map((line, i) => (
          <div key={i} className="space-y-1">
            <p className="text-slate-500">
              <span className="text-accent-400">nyiko@portfolio</span>
              <span className="text-slate-600">:~$ </span>
              {line.cmd}
            </p>
            <p className="pl-0 text-brand-300">{line.out}</p>
          </div>
        ))}

        {step < CONSOLE_LINES.length && (
          <div className="space-y-1">
            <p className="text-slate-500">
              <span className="text-accent-400">nyiko@portfolio</span>
              <span className="text-slate-600">:~$ </span>
              <span className="text-slate-300">{typed.slice(`nyiko@portfolio:~$ `.length)}</span>
              <span className="ml-0.5 inline-block h-3.5 w-1.5 animate-blink bg-brand-400 align-middle" />
            </p>
          </div>
        )}

        {step >= CONSOLE_LINES.length && (
          <p className="text-slate-500">
            <span className="text-accent-400">nyiko@portfolio</span>
            <span className="text-slate-600">:~$ </span>
            <span className="ml-0.5 inline-block h-3.5 w-1.5 animate-blink bg-brand-400 align-middle" />
          </p>
        )}
      </div>
    </motion.div>
  );
}
