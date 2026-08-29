/*
# Create projects table

1. New Tables
- `projects`
- `id` (uuid, primary key)
- `name` (text, not null) — project name
- `description` (text, not null) — project description
- `tech` (text[], default '{}') — technologies used
- `github_url` (text, nullable) — GitHub repository link
- `demo_url` (text, nullable) — live demo link
- `status` (text, not null default 'Live') — 'Live' | 'Concept' | 'In Development'
- `featured` (boolean, default false) — whether to show as featured card
- `sort_order` (integer, default 0) — display ordering
- `created_at` (timestamptz, default now())
- `updated_at` (timestamptz, default now())

2. Security
- Enable RLS on `projects`.
- Public read: anyone (anon + authenticated) can SELECT — projects are displayed on the public portfolio.
- Write restricted: only authenticated users can INSERT/UPDATE/DELETE (admin manages projects).
- updated_at auto-updated via trigger.

3. Notes
- No user_id column needed — this is a single-owner portfolio, not multi-tenant.
- All visitors can see projects; only the authenticated owner can modify them.
*/

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  tech text[] NOT NULL DEFAULT '{}',
  github_url text,
  demo_url text,
  status text NOT NULL DEFAULT 'Live' CHECK (status IN ('Live', 'Concept', 'In Development')),
  featured boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Public read: anyone can view projects
DROP POLICY IF EXISTS "public_select_projects" ON projects;
CREATE POLICY "public_select_projects" ON projects
  FOR SELECT TO anon, authenticated USING (true);

-- Only authenticated users can insert
DROP POLICY IF EXISTS "auth_insert_projects" ON projects;
CREATE POLICY "auth_insert_projects" ON projects
  FOR INSERT TO authenticated WITH CHECK (true);

-- Only authenticated users can update
DROP POLICY IF EXISTS "auth_update_projects" ON projects;
CREATE POLICY "auth_update_projects" ON projects
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- Only authenticated users can delete
DROP POLICY IF EXISTS "auth_delete_projects" ON projects;
CREATE POLICY "auth_delete_projects" ON projects
  FOR DELETE TO authenticated USING (true);

-- Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS projects_updated_at ON projects;
CREATE TRIGGER projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
