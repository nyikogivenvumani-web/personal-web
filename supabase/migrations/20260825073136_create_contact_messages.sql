/*
# Create contact_messages table (single-tenant, no auth)

1. New Tables
- `contact_messages`
- `id` (uuid, primary key)
- `name` (text, not null) — sender's name
- `email` (text, not null) — sender's email
- `subject` (text, not null) — message subject
- `message` (text, not null) — message body
- `created_at` (timestamptz, default now)

2. Security
- Enable RLS on `contact_messages`.
- This is a no-auth public contact form: anyone may submit a message (INSERT).
- Only reads are restricted — anon/authenticated cannot read messages (no SELECT policy),
  so submitted messages are private to the database owner.
*/

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow anyone (anon) to insert contact messages
DROP POLICY IF EXISTS "anon_insert_contact_messages" ON contact_messages;
CREATE POLICY "anon_insert_contact_messages" ON contact_messages
  FOR INSERT TO anon, authenticated WITH CHECK (true);
