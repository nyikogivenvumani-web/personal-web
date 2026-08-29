import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, Loader2, Github, Linkedin, Mail } from 'lucide-react';
import { PROFILE } from '@/data/portfolio';
import { supabase } from '@/lib/supabase';
import { SectionHeader } from './SectionHeader';

type Status = 'idle' | 'loading' | 'success' | 'error';
type Errors = Partial<Record<'name' | 'email' | 'subject' | 'message', string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');

  const validate = (): Errors => {
    const e: Errors = {};
    if (!form.name.trim()) e.name = 'Please enter your name.';
    if (!form.email.trim()) e.email = 'Please enter your email.';
    else if (!EMAIL_RE.test(form.email)) e.email = 'Please enter a valid email address.';
    if (!form.subject.trim()) e.subject = 'Please add a subject.';
    if (!form.message.trim()) e.message = 'Please write a message.';
    else if (form.message.trim().length < 10) e.message = 'Message should be at least 10 characters.';
    return e;
  };

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus('loading');
    const { error } = await supabase.from('contact_messages').insert({
      name: form.name.trim(),
      email: form.email.trim(),
      subject: form.subject.trim(),
      message: form.message.trim(),
    });

    if (error) {
      setStatus('error');
      return;
    }
    setStatus('success');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  const update = (field: keyof typeof form, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const fieldClass = (field: keyof Errors) =>
    `w-full rounded-xl border bg-ink-900/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-400/60 ${
      errors[field] ? 'border-err-500/50' : 'border-white/10'
    }`;

  return (
    <section id="contact" className="section-pad">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Contact"
          title="Let's build something."
          description="Whether you're interested in working together, discussing a technology idea, or simply connecting, I'd love to hear from you."
          align="center"
        />

        <div className="mx-auto mt-12 grid max-w-4xl gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="card-surface space-y-5 p-6 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-slate-400">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  className={fieldClass('name')}
                  placeholder="Your name"
                  aria-invalid={!!errors.name}
                />
                {errors.name && <p className="mt-1.5 text-xs text-err-400">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-slate-400">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  className={fieldClass('email')}
                  placeholder="you@example.com"
                  aria-invalid={!!errors.email}
                />
                {errors.email && <p className="mt-1.5 text-xs text-err-400">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="mb-1.5 block text-xs font-medium text-slate-400">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                value={form.subject}
                onChange={(e) => update('subject', e.target.value)}
                className={fieldClass('subject')}
                placeholder="What's this about?"
                aria-invalid={!!errors.subject}
              />
              {errors.subject && <p className="mt-1.5 text-xs text-err-400">{errors.subject}</p>}
            </div>

            <div>
              <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-slate-400">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                value={form.message}
                onChange={(e) => update('message', e.target.value)}
                className={`${fieldClass('message')} resize-none`}
                placeholder="Tell me about your idea, project, or opportunity..."
                aria-invalid={!!errors.message}
              />
              {errors.message && <p className="mt-1.5 text-xs text-err-400">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" /> Sending...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" /> Send Message
                </>
              )}
            </button>

            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2.5 rounded-xl border border-accent-400/30 bg-accent-400/10 p-3.5 text-sm text-accent-300"
              >
                <CheckCircle2 className="h-5 w-5 shrink-0" />
                Thanks! Your message has been sent. I'll get back to you soon.
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2.5 rounded-xl border border-err-500/30 bg-err-500/10 p-3.5 text-sm text-err-400"
              >
                <AlertCircle className="h-5 w-5 shrink-0" />
                Something went wrong sending your message. Please try again or reach out on GitHub.
              </motion.div>
            )}
          </form>

          {/* Social links */}
          <div className="flex flex-col gap-4">
            <div className="card-surface p-6">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">Connect</p>
              <div className="mt-4 space-y-3">
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-white/5 bg-ink-900/50 p-3.5 transition-colors hover:border-brand-400/30 hover:bg-ink-900/80"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-slate-200">
                    <Github className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">GitHub</p>
                    <p className="text-xs text-slate-500">@{PROFILE.githubHandle}</p>
                  </div>
                </a>

                <div
                  className="flex items-center gap-3 rounded-xl border border-white/5 bg-ink-900/50 p-3.5"
                  title="LinkedIn — coming soon"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-slate-500">
                    <Linkedin className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-400">LinkedIn</p>
                    <p className="text-xs text-slate-600">Coming soon</p>
                  </div>
                </div>

                <div
                  className="flex items-center gap-3 rounded-xl border border-white/5 bg-ink-900/50 p-3.5"
                  title="Email — coming soon"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-slate-500">
                    <Mail className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-400">Email</p>
                    <p className="text-xs text-slate-600">Coming soon</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
