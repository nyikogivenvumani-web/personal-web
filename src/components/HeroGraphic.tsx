import { motion } from 'framer-motion';
import { Activity, Cpu, Sigma, Waypoints } from 'lucide-react';

const NODES = [
  { x: 20, y: 30, r: 4 },
  { x: 50, y: 18, r: 6 },
  { x: 78, y: 36, r: 4 },
  { x: 35, y: 58, r: 5 },
  { x: 68, y: 70, r: 4 },
  { x: 88, y: 56, r: 3 },
];

const EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [1, 3],
  [3, 4],
  [2, 5],
  [4, 5],
  [0, 3],
];

export function HeroGraphic() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
      className="relative mx-auto w-full max-w-md lg:max-w-none"
    >
      <div className="relative aspect-square w-full rounded-3xl border border-white/10 bg-ink-850/60 p-5 shadow-card backdrop-blur-sm">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-err-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-warn-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent-500/80" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
            neural_lab
          </span>
        </div>

        {/* Network graph */}
        <div className="relative mt-4 h-44 overflow-hidden rounded-xl border border-white/5 bg-ink-900/60">
          <svg viewBox="0 0 100 88" className="h-full w-full" preserveAspectRatio="none">
            {EDGES.map(([a, b], i) => (
              <motion.line
                key={i}
                x1={NODES[a].x}
                y1={NODES[a].y}
                x2={NODES[b].x}
                y2={NODES[b].y}
                stroke="rgba(34,211,238,0.25)"
                strokeWidth={0.4}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 + i * 0.12 }}
              />
            ))}
            {NODES.map((n, i) => (
              <motion.circle
                key={i}
                cx={n.x}
                cy={n.y}
                r={n.r * 0.4}
                fill="#22d3ee"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                style={{ transformOrigin: `${n.x}px ${n.y}px` }}
              />
            ))}
          </svg>
          <span className="absolute bottom-2 left-3 inline-flex items-center gap-1.5 font-mono text-[10px] text-slate-500">
            <Waypoints className="h-3 w-3 text-brand-400" /> network_graph.layer_1
          </span>
        </div>

        {/* Equation + code row */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-white/5 bg-ink-900/60 p-3">
            <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-accent-400">
              <Sigma className="h-3 w-3" /> math
            </div>
            <p className="mt-2 font-mono text-xs leading-relaxed text-slate-300">
              <span className="text-brand-300">P(y|X)</span> = σ(W·X + b)
            </p>
            <p className="mt-1 font-mono text-[10px] text-slate-500">argmin θ L(θ) + λ‖θ‖²</p>
          </div>

          <div className="rounded-xl border border-white/5 bg-ink-900/60 p-3">
            <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-brand-400">
              <Cpu className="h-3 w-3" /> code
            </div>
            <p className="mt-2 font-mono text-[10px] leading-relaxed text-slate-300">
              <span className="text-violet-400">def</span> train(X, y):
              <br />
              &nbsp;&nbsp;model.fit(X, y)
              <br />
              &nbsp;&nbsp;<span className="text-accent-400">return</span> model
            </p>
          </div>
        </div>

        {/* Data viz bars */}
        <div className="mt-3 rounded-xl border border-white/5 bg-ink-900/60 p-3">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-slate-500">
              <Activity className="h-3 w-3 text-accent-400" /> loss_curve
            </span>
            <span className="font-mono text-[10px] text-slate-600">epoch 42</span>
          </div>
          <div className="mt-2 flex h-12 items-end gap-1">
            {[90, 72, 58, 48, 39, 33, 28, 24, 21, 18, 16, 14].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 0.5, delay: 0.8 + i * 0.06 }}
                className="flex-1 rounded-t bg-gradient-to-t from-brand-500/40 to-accent-400/80"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Floating badge */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-4 -left-4 hidden rounded-xl border border-white/10 bg-ink-800/90 px-3.5 py-2.5 shadow-card backdrop-blur-md sm:block"
      >
        <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500">status</p>
        <p className="mt-0.5 text-sm font-semibold text-white">Training models</p>
      </motion.div>
    </motion.div>
  );
}
