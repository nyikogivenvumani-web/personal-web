import { Github, Mail, Linkedin, Terminal } from 'lucide-react';
import { NAV_LINKS, PROFILE } from '@/data/portfolio';

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-ink-900/50">
      <div className="section-shell py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-400 to-accent-500 text-ink-950">
                <Terminal className="h-5 w-5" />
              </span>
              <span className="font-display text-base font-semibold text-white">{PROFILE.name}</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">{PROFILE.tagline}</p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition-colors hover:border-brand-400/40 hover:text-white"
              >
                <Github className="h-5 w-5" />
              </a>
              <span
                aria-label="LinkedIn — coming soon"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-500"
                title="LinkedIn — coming soon"
              >
                <Linkedin className="h-5 w-5" />
              </span>
              <span
                aria-label="Email — coming soon"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-500"
                title="Email — coming soon"
              >
                <Mail className="h-5 w-5" />
              </span>
            </div>
          </div>

          <nav aria-label="Footer">
            <p className="mb-4 text-xs font-mono uppercase tracking-[0.2em] text-slate-500">Navigate</p>
            <ul className="grid grid-cols-2 gap-x-10 gap-y-2.5 sm:grid-cols-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="link-quiet">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 sm:flex-row">
          <p className="text-xs text-slate-500">© 2026 {PROFILE.name}. All rights reserved.</p>
          <p className="text-xs text-slate-600">Built with React, TypeScript & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
