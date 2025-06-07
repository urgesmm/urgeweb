# Supabase Database Update Instructions

This document provides instructions on how to update your Supabase database schema to match the changes made to the contact form.

## Changes Made to the Contact Form

1. Changed the "Age Range" dropdown to an "Age" number input with a minimum value of 20
2. Updated the phone number field to include a country code dropdown and proper formatting
   - Added a custom PhoneInput component that formats phone numbers based on the selected country
   - Each country has its own specific phone number format
   - The component automatically applies the correct spacing and formatting
   - Includes 70+ countries from around the world organized by continent
   - Features a searchable dropdown for easy country selection
   - Shows format hints to guide users on the expected phone number format
   - Displays full country names with native spellings (e.g., "UAE (United Arab Emirates / الإمارات)")
   - Highlights country codes with bold formatting for better readability
3. Removed the "Preferred Location" field completely from the form and database

## How to Apply the SQL Changes to Supabase

### Option 1: Using the Supabase SQL Editor

1. Log in to your Supabase dashboard
2. Navigate to the SQL Editor
3. Create a new query
4. Copy and paste the contents of the `supabase-update-contacts-table.sql` file
5. Run the query

### Option 2: Using the Supabase CLI

If you have the Supabase CLI installed, you can run:

```bash
supabase db execute --file ./supabase-update-contacts-table.sql
```

### Fixing Errors with Existing Data

If you encounter errors like `ERROR: 22P02: invalid input syntax for type integer: "18-25"`, use the fix script:

1. Navigate to the SQL Editor in your Supabase dashboard
2. Create a new query
3. Copy and paste the contents of the `supabase-fix-existing-data.sql` file
4. Run the query

This script will:
- Convert text age ranges (like "18-25") to numeric values
- Add country codes to phone numbers that don't have them
- Add the necessary constraints
- Remove the preferredLocation column

## Important Notes

1. **Backup Your Data**: Before applying these changes, make sure to back up your existing data.
2. **Data Migration**: The SQL files automatically handle data migration for existing records.
3. **Testing**: After applying the changes, test the form to ensure it works correctly with the new database schema.

## Troubleshooting

If you encounter any issues:

1. Check the Supabase logs for error messages
2. Ensure that your Supabase client is properly configured
3. Verify that the column names in your code match the column names in the database

## Reverting Changes

If you need to revert these changes, you can run the following SQL:

```sql
-- Remove constraints
ALTER TABLE contacts DROP CONSTRAINT IF EXISTS age_minimum_check;
ALTER TABLE contacts DROP CONSTRAINT IF EXISTS phone_country_code_check;

-- Change age back to text type
ALTER TABLE contacts ALTER COLUMN "age" TYPE text;

-- Rename age column back to ageRange
ALTER TABLE contacts RENAME COLUMN "age" TO "ageRange";

-- Add back the preferredLocation column if needed
ALTER TABLE contacts ADD COLUMN "preferredLocation" TEXT;
```
