import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, ArrowUpRight, Loader2, AlertCircle, FolderGit2 } from 'lucide-react';
import { fetchProjects, type Project } from '@/lib/projects';
import { PROFILE } from '@/data/portfolio';
import { SectionHeader } from './SectionHeader';
import { useReveal } from '@/hooks/useReveal';

const STATUS_STYLES: Record<Project['status'], string> = {
  Live: 'border-accent-400/30 bg-accent-400/10 text-accent-300',
  Concept: 'border-violet-400/30 bg-violet-400/10 text-violet-400',
  'In Development': 'border-warn-500/30 bg-warn-500/10 text-warn-400',
};

const ACCENTS = [
  'from-brand-500/20 to-accent-500/20',
  'from-violet-500/20 to-brand-500/20',
  'from-accent-500/20 to-brand-500/20',
  'from-brand-500/20 to-violet-500/20',
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { ref, visible } = useReveal();
  const featured = project.featured;
  const accent = ACCENTS[index % ACCENTS.length];

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: 'easeOut' }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-ink-850/60 transition-all duration-300 hover:border-brand-400/30 hover:shadow-card ${
        featured ? 'lg:col-span-2' : ''
      }`}
    >
      {/* Visual header */}
      <div className={`relative h-40 overflow-hidden bg-gradient-to-br ${accent}`}>
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <FolderGit2 className="h-16 w-16 text-white/70 transition-transform duration-500 group-hover:scale-110" />
        </div>
        <span
          className={`absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${
            STATUS_STYLES[project.status]
          }`}
        >
          {project.status === 'Live' && (
            <span className="h-1.5 w-1.5 rounded-full bg-accent-400 animate-pulse-soft" />
          )}
          {project.status}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-semibold text-white">{project.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-3 pt-1">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-200 transition-colors hover:border-brand-400/40 hover:text-white"
            >
              <Github className="h-3.5 w-3.5" /> GitHub
            </a>
          )}
          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-200 transition-colors hover:border-brand-400/40 hover:text-white"
            >
              <ExternalLink className="h-3.5 w-3.5" /> Live Demo
            </a>
          )}
          {!project.github_url && !project.demo_url && (
            <span className="text-xs text-slate-500">Repository coming soon</span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section id="projects" className="section-pad">
      <div className="section-shell">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            eyebrow="Projects"
            title="Things I'm building."
            description="A mix of live applications and ambitious concepts aimed at real-world problems."
          />
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noreferrer"
            className="btn-ghost shrink-0"
          >
            View All Projects
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        {loading && (
          <div className="mt-12 flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-brand-400" />
          </div>
        )}

        {error && !loading && (
          <div className="mt-12 flex items-center gap-3 rounded-2xl border border-white/5 bg-ink-850/60 p-6 text-slate-400">
            <AlertCircle className="h-5 w-5 text-warn-400" />
            <p className="text-sm">
              Couldn&apos;t load projects right now. Please check back later.
            </p>
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div className="mt-12 rounded-2xl border border-white/5 bg-ink-850/60 p-8 text-center text-slate-400">
            No projects to show yet. New work is on the way.
          </div>
        )}

        {!loading && !error && projects.length > 0 && (
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
