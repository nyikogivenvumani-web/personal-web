import { useEffect, useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock,
  Plus,
  Pencil,
  Trash2,
  X,
  Loader2,
  CheckCircle2,
  AlertCircle,
  LogOut,
  ArrowLeft,
  GripVertical,
  Star,
  ExternalLink,
  Github,
} from 'lucide-react';
import { useAuth } from '@/lib/auth';
import {
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
  type Project,
  type ProjectInput,
} from '@/lib/projects';

const ACCENTS = [
  'from-brand-500/20 to-accent-500/20',
  'from-violet-500/20 to-brand-500/20',
  'from-accent-500/20 to-brand-500/20',
  'from-brand-500/20 to-violet-500/20',
];

function pickAccent(index: number) {
  return ACCENTS[index % ACCENTS.length];
}

const EMPTY_FORM: ProjectInput = {
  name: '',
  description: '',
  tech: [],
  github_url: null,
  demo_url: null,
  status: 'Live',
  featured: false,
  sort_order: 0,
};

export function AdminPanel() {
  const { user, loading, signIn, signOut } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState<ProjectInput>(EMPTY_FORM);
  const [techInput, setTechInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    if (user) loadProjects();
  }, [user]);

  const loadProjects = async () => {
    try {
      const data = await fetchProjects();
      setProjects(data);
    } catch {
      setFormError('Could not load projects.');
    }
  };

  const openCreate = () => {
    setEditing(null);
    setForm({ ...EMPTY_FORM, sort_order: projects.length });
    setTechInput('');
    setFormError(null);
    setShowForm(true);
  };

  const openEdit = (p: Project) => {
    setEditing(p);
    setForm({
      name: p.name,
      description: p.description,
      tech: p.tech,
      github_url: p.github_url,
      demo_url: p.demo_url,
      status: p.status,
      featured: p.featured,
      sort_order: p.sort_order,
    });
    setTechInput('');
    setFormError(null);
    setShowForm(true);
  };

  const addTech = () => {
    const t = techInput.trim();
    if (t && !form.tech.includes(t)) {
      setForm((f) => ({ ...f, tech: [...f.tech, t] }));
    }
    setTechInput('');
  };

  const removeTech = (t: string) => {
    setForm((f) => ({ ...f, tech: f.tech.filter((x) => x !== t) }));
  };

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (!form.name.trim() || !form.description.trim()) {
      setFormError('Name and description are required.');
      return;
    }
    setSaving(true);
    setFormError(null);
    try {
      const payload = {
        ...form,
        github_url: form.github_url?.trim() || null,
        demo_url: form.demo_url?.trim() || null,
      };
      if (editing) {
        await updateProject(editing.id, payload);
      } else {
        await createProject(payload);
      }
      await loadProjects();
      setShowForm(false);
      setEditing(null);
    } catch {
      setFormError('Could not save project. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProject(id);
      setDeleteId(null);
      await loadProjects();
    } catch {
      setFormError('Could not delete project.');
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink-950">
        <Loader2 className="h-8 w-8 animate-spin text-brand-400" />
      </div>
    );
  }

  if (!user) {
    return <LoginScreen signIn={signIn} />;
  }

  return (
    <div className="min-h-screen bg-ink-950 pt-20">
      <div className="section-shell py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-white">Project Manager</h1>
            <p className="mt-1 text-sm text-slate-400">
              Add, edit, and remove projects shown on your portfolio.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" className="btn-ghost">
              <ArrowLeft className="h-4 w-4" /> Back to site
            </a>
            <button onClick={() => signOut()} className="btn-ghost">
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <p className="text-sm text-slate-400">
            {projects.length} project{projects.length !== 1 ? 's' : ''}
          </p>
          <button onClick={openCreate} className="btn-primary">
            <Plus className="h-4 w-4" /> Add Project
          </button>
        </div>

        {formError && (
          <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-err-500/30 bg-err-500/10 p-3.5 text-sm text-err-400">
            <AlertCircle className="h-5 w-5 shrink-0" /> {formError}
          </div>
        )}

        {/* Project list */}
        <div className="mt-6 space-y-3">
          {projects.length === 0 && !showForm && (
            <div className="card-surface p-8 text-center text-slate-400">
              No projects yet. Click "Add Project" to create your first one.
            </div>
          )}
          {projects.map((p, i) => (
            <div
              key={p.id}
              className="card-surface flex flex-wrap items-center gap-4 p-4"
            >
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${pickAccent(i)}`}
              >
                <GripVertical className="h-5 w-5 text-white/60" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-display font-semibold text-white">{p.name}</p>
                  {p.featured && (
                    <Star className="h-3.5 w-3.5 fill-warn-400 text-warn-400" />
                  )}
                  <span
                    className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase ${
                      p.status === 'Live'
                        ? 'border-accent-400/30 bg-accent-400/10 text-accent-300'
                        : p.status === 'Concept'
                          ? 'border-violet-400/30 bg-violet-400/10 text-violet-400'
                          : 'border-warn-500/30 bg-warn-500/10 text-warn-400'
                    }`}
                  >
                    {p.status}
                  </span>
                </div>
                <p className="mt-0.5 truncate text-xs text-slate-500">{p.description}</p>
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {p.tech.slice(0, 5).map((t) => (
                    <span key={t} className="chip text-[10px]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {p.github_url && (
                  <a
                    href={p.github_url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 hover:text-white"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                )}
                {p.demo_url && (
                  <a
                    href={p.demo_url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 hover:text-white"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
                <button
                  onClick={() => openEdit(p)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 hover:border-brand-400/40 hover:text-white"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setDeleteId(p.id)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 hover:border-err-500/40 hover:text-err-400"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Form modal */}
      <AnimatePresence>
        {showForm && (
          <ProjectFormModal
            form={form}
            setForm={setForm}
            techInput={techInput}
            setTechInput={setTechInput}
            addTech={addTech}
            removeTech={removeTech}
            onSubmit={handleSubmit}
            onClose={() => {
              setShowForm(false);
              setEditing(null);
            }}
            editing={!!editing}
            saving={saving}
            error={formError}
          />
        )}
      </AnimatePresence>

      {/* Delete confirm */}
      <AnimatePresence>
        {deleteId && (
          <DeleteConfirm
            onCancel={() => setDeleteId(null)}
            onConfirm={() => handleDelete(deleteId)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function LoginScreen({ signIn }: { signIn: (email: string, password: string) => Promise<{ error: string | null }> }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) setError('Invalid email or password.');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-950 px-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="card-surface p-8">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-accent-500 text-ink-950">
              <Lock className="h-5 w-5" />
            </span>
            <div>
              <h1 className="font-display text-lg font-bold text-white">Admin Access</h1>
              <p className="text-xs text-slate-500">Sign in to manage projects</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="admin-email" className="mb-1.5 block text-xs font-medium text-slate-400">
                Email
              </label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-ink-900/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-400/60"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label htmlFor="admin-password" className="mb-1.5 block text-xs font-medium text-slate-400">
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-ink-900/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-400/60"
                placeholder="••••••••"
                required
              />
            </div>
            {error && (
              <div className="flex items-center gap-2 text-xs text-err-400">
                <AlertCircle className="h-4 w-4" /> {error}
              </div>
            )}
            <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <a href="/" className="mt-4 block text-center text-xs text-slate-500 hover:text-brand-300">
            Back to portfolio
          </a>
        </div>
      </motion.div>
    </div>
  );
}

function ProjectFormModal({
  form,
  setForm,
  techInput,
  setTechInput,
  addTech,
  removeTech,
  onSubmit,
  onClose,
  editing,
  saving,
  error,
}: {
  form: ProjectInput;
  setForm: React.Dispatch<React.SetStateAction<ProjectInput>>;
  techInput: string;
  setTechInput: (v: string) => void;
  addTech: () => void;
  removeTech: (t: string) => void;
  onSubmit: (ev: FormEvent) => void;
  onClose: () => void;
  editing: boolean;
  saving: boolean;
  error: string | null;
}) {
  const inputClass =
    'w-full rounded-xl border border-white/10 bg-ink-900/60 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-400/60';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-ink-950/80 p-4 backdrop-blur-sm sm:p-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        onClick={(e) => e.stopPropagation()}
        className="card-surface w-full max-w-2xl p-6 sm:p-8"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-bold text-white">
            {editing ? 'Edit Project' : 'Add Project'}
          </h2>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="mt-6 space-y-5">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-400">Name *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className={inputClass}
              placeholder="Project name"
              required
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-400">Description *</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              className={`${inputClass} resize-none`}
              placeholder="What does this project do?"
              required
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-400">Technologies</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTech();
                  }
                }}
                className={inputClass}
                placeholder="Type a tech and press Enter"
              />
              <button type="button" onClick={addTech} className="btn-ghost shrink-0">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            {form.tech.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {form.tech.map((t) => (
                  <span key={t} className="chip">
                    {t}
                    <button type="button" onClick={() => removeTech(t)} className="ml-1 text-slate-500 hover:text-err-400">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-400">GitHub URL</label>
              <input
                type="url"
                value={form.github_url ?? ''}
                onChange={(e) => setForm((f) => ({ ...f, github_url: e.target.value || null }))}
                className={inputClass}
                placeholder="https://github.com/..."
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-400">Live Demo URL</label>
              <input
                type="url"
                value={form.demo_url ?? ''}
                onChange={(e) => setForm((f) => ({ ...f, demo_url: e.target.value || null }))}
                className={inputClass}
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-400">Status</label>
              <select
                value={form.status}
                onChange={(e) =>
                  setForm((f) => ({ ...f, status: e.target.value as ProjectInput['status'] }))
                }
                className={inputClass}
              >
                <option value="Live">Live</option>
                <option value="Concept">Concept</option>
                <option value="In Development">In Development</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-400">Sort order</label>
              <input
                type="number"
                value={form.sort_order}
                onChange={(e) => setForm((f) => ({ ...f, sort_order: Number(e.target.value) }))}
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-400">Featured</label>
              <button
                type="button"
                onClick={() => setForm((f) => ({ ...f, featured: !f.featured }))}
                className={`flex h-[42px] w-full items-center justify-center gap-2 rounded-xl border px-4 text-sm font-medium transition-colors ${
                  form.featured
                    ? 'border-warn-400/40 bg-warn-400/10 text-warn-400'
                    : 'border-white/10 bg-ink-900/60 text-slate-400'
                }`}
              >
                <Star className={`h-4 w-4 ${form.featured ? 'fill-warn-400' : ''}`} />
                {form.featured ? 'Featured' : 'Not featured'}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2.5 rounded-xl border border-err-500/30 bg-err-500/10 p-3 text-sm text-err-400">
              <AlertCircle className="h-4 w-4 shrink-0" /> {error}
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-ghost">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4" /> {editing ? 'Save Changes' : 'Create Project'}
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

function DeleteConfirm({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/80 p-4 backdrop-blur-sm"
      onClick={onCancel}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        onClick={(e) => e.stopPropagation()}
        className="card-surface w-full max-w-sm p-6"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-err-500/10 text-err-400">
            <Trash2 className="h-5 w-5" />
          </span>
          <h3 className="font-display text-lg font-bold text-white">Delete project?</h3>
        </div>
        <p className="mt-3 text-sm text-slate-400">
          This will permanently remove the project from your portfolio. This cannot be undone.
        </p>
        <div className="mt-5 flex justify-end gap-3">
          <button onClick={onCancel} className="btn-ghost">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-err-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-err-400"
          >
            <Trash2 className="h-4 w-4" /> Delete
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
