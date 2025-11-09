/*
  # Create todos table for testing demo

  1. New Tables
    - `todos`
      - `id` (uuid, primary key) - Unique identifier for each todo
      - `title` (text) - The todo item text
      - `completed` (boolean, default false) - Whether the todo is completed
      - `created_at` (timestamptz, default now()) - Timestamp of creation
      - `user_id` (uuid, nullable) - Optional user association for future auth

  2. Security
    - Enable RLS on `todos` table
    - Add policy for public read access (for demo purposes)
    - Add policy for public write access (for demo purposes)
    
  3. Notes
    - This is a simplified demo table for testing purposes
    - In production, you would restrict access based on authenticated users
*/

CREATE TABLE IF NOT EXISTS todos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  user_id uuid
);

ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to todos"
  ON todos
  FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert access to todos"
  ON todos
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update access to todos"
  ON todos
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete access to todos"
  ON todos
  FOR DELETE
  USING (true);
