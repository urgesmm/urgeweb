-- Drop the table if it exists (be careful with this in production)
DROP TABLE IF EXISTS contacts;

-- Create the contacts table
CREATE TABLE contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    "migrateCountry" TEXT NOT NULL,
    "ageRange" TEXT NOT NULL,
    education TEXT NOT NULL,
    "immigrationType" TEXT NOT NULL,
    "preferredLocation" TEXT NOT NULL
);

-- Enable Row Level Security (optional but recommended for production)
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to insert data
CREATE POLICY "Allow anonymous inserts"
ON contacts
FOR INSERT
TO anon
WITH CHECK (true);
