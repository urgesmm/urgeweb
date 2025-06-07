import { createClient } from '@supabase/supabase-js';

// Supabase configuration for urgecontact project
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'Error: Supabase environment variables are missing. ' +
    'Make sure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY ' +
    'are set in your .env.local file.'
  );
}

// Initialize Supabase client with fallback values for development
// Using urgecontact project credentials
const supabase = createClient(
  supabaseUrl || 'https://fbhaattnnpjbwqoqhzdc.supabase.co',
  supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZiaGFhdHRubnBqYndxb3FoemRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3MDkwNTgsImV4cCI6MjA2MjI4NTA1OH0.n0JVcKfxY6OBsO7_fsG6mBSiyTfglr3kJAcPuv3UPvc'
);

export { supabase };
