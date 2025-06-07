-- Schema for the urgecontact Supabase project
-- This file documents the database structure for the contact form

-- Create the contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  nationality TEXT NOT NULL,
  "currentCountry" TEXT NOT NULL,
  "migrateCountry" TEXT NOT NULL,
  age TEXT NOT NULL,
  "currentOccupation" TEXT NOT NULL,
  education TEXT NOT NULL,
  "immigrationType" TEXT NOT NULL
);

-- Enable Row Level Security
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to insert data
CREATE POLICY "Allow anonymous inserts" ON contacts
  FOR INSERT TO anon
  WITH CHECK (true);
