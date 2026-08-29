import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Star, GitFork, ArrowUpRight, AlertCircle } from 'lucide-react';
import { PROFILE } from '@/data/portfolio';
import { SectionHeader } from './SectionHeader';
import { useReveal } from '@/hooks/useReveal';

type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  fork: boolean;
};

export function GitHubActivity() {
  const { ref, visible } = useReveal();
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${PROFILE.githubHandle}/repos?sort=updated&per_page=6`);
        if (!res.ok) throw new Error('fetch failed');
        const data: Repo[] = await res.json();
        if (!cancelled) {
          setRepos(data.filter((r) => !r.fork));
          setLoading(false);
        }
      } catch {
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="github" className="section-pad">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Open Source"
          title="Explore my GitHub."
          description="I believe the best way to understand how I think as a developer is to look at what I build."
        />

        <div className="mt-8 flex">
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
          >
            <Github className="h-5 w-5" />
            View GitHub
          </a>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mt-10"
        >
          {loading && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-36 animate-pulse rounded-2xl border border-white/5 bg-ink-850/40" />
              ))}
            </div>
          )}

          {error && !loading && (
            <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-ink-850/60 p-6 text-slate-400">
              <AlertCircle className="h-5 w-5 text-warn-400" />
              <p className="text-sm">
                Couldn&apos;t load live repositories right now. You can still explore my work directly on{' '}
                <a href={PROFILE.github} target="_blank" rel="noreferrer" className="text-brand-300 hover:underline">
                  GitHub
                </a>
                .
              </p>
            </div>
          )}

          {!loading && !error && repos.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {repos.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-col rounded-2xl border border-white/5 bg-ink-850/60 p-5 transition-all duration-200 hover:border-brand-400/30 hover:bg-ink-850/90"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-brand-300">{repo.name}</span>
                    <ArrowUpRight className="h-4 w-4 text-slate-500 transition-colors group-hover:text-white" />
                  </div>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
                    {repo.description ?? 'No description provided.'}
                  </p>
                  <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
                    {repo.language && <span className="text-slate-300">{repo.language}</span>}
                    <span className="inline-flex items-center gap-1">
                      <Star className="h-3 w-3" /> {repo.stargazers_count}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <GitFork className="h-3 w-3" /> {repo.forks_count}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          )}

          {!loading && !error && repos.length === 0 && (
            <div className="rounded-2xl border border-white/5 bg-ink-850/60 p-6 text-sm text-slate-400">
              No public repositories to show yet — check back soon.
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
