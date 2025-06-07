# Supabase Setup Guide for URGE MANAGEMENT Website

This guide will help you set up Supabase for the contact form functionality.

## 1. Create a Supabase Account and Project

1. Go to [Supabase](https://supabase.com/) and sign up for an account if you don't have one.
2. Create a new project by clicking on "New Project".
3. Enter a name for your project (e.g., "urge-of-immigration").
4. Set a secure password for the database.
5. Choose a region closest to your target audience.
6. Click "Create new project".

## 2. Create the Contacts Table

1. Once your project is created, go to the "Table Editor" in the left sidebar.
2. Click "New Table".
3. Set the table name to `contacts`.
4. Add the following columns:

| Name | Type | Default Value | Primary | Is Nullable |
|------|------|--------------|---------|-------------|
| id | uuid | uuid_generate_v4() | Yes (PK) | No |
| created_at | timestamp with time zone | now() | No | No |
| name | text | - | No | No |
| email | text | - | No | No |
| phone | text | - | No | No |
| migrateCountry | text | - | No | No |
| ageRange | text | - | No | No |
| education | text | - | No | No |
| immigrationType | text | - | No | No |
| preferredLocation | text | - | No | No |

5. Click "Save" to create the table.

## 3. Get Your API Keys

1. Go to "Settings" in the left sidebar, then "API".
2. You'll find your project URL and anon/public key.
3. Copy these values as you'll need them for your environment variables.

## 4. Set Up Environment Variables

1. Create a `.env.local` file in the root of your project.
2. Add the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

3. Replace `your-project-url` and `your-anon-key` with the values from step 3.

## 5. Install Dependencies

The project already has the Supabase client installed. If you need to reinstall it, run:

```bash
npm install @supabase/supabase-js
```

## 6. Run the Project

Now you can run the project with:

```bash
npm run dev
```

The contact form should now be connected to your Supabase database.

## 7. Testing the Form

1. Fill out the contact form on the website.
2. Submit the form.
3. Go to your Supabase dashboard, navigate to "Table Editor", and select the "contacts" table.
4. You should see your form submission data in the table.

## 8. Security Considerations

- The current implementation uses the anon key, which is safe to use in browser environments.
- Row-level security (RLS) is not enabled by default. For production, consider enabling RLS to restrict who can insert data.
- To enable RLS:
  1. Go to "Authentication" > "Policies" in your Supabase dashboard.
  2. Enable RLS for the contacts table.
  3. Create a policy that allows inserts from anyone.
