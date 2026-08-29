import { supabase } from '@/lib/supabase';

export type Project = {
  id: string;
  name: string;
  description: string;
  tech: string[];
  github_url: string | null;
  demo_url: string | null;
  status: 'Live' | 'Concept' | 'In Development';
  featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type ProjectInput = {
  name: string;
  description: string;
  tech: string[];
  github_url: string | null;
  demo_url: string | null;
  status: 'Live' | 'Concept' | 'In Development';
  featured: boolean;
  sort_order: number;
};

export async function fetchProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return (data ?? []) as Project[];
}

export async function createProject(input: ProjectInput): Promise<Project> {
  const { data, error } = await supabase.from('projects').insert(input).select().single();
  if (error) throw error;
  return data as Project;
}

export async function updateProject(id: string, input: Partial<ProjectInput>): Promise<Project> {
  const { data, error } = await supabase
    .from('projects')
    .update(input)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data as Project;
}

export async function deleteProject(id: string): Promise<void> {
  const { error } = await supabase.from('projects').delete().eq('id', id);
  if (error) throw error;
}
