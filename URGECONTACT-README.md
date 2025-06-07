# URGE MANAGEMENT - Supabase Contact Form Integration

This document explains the integration of the contact form with the Supabase "urgecontact" project.

## Overview

The contact form on the website is connected to a Supabase database that stores all form submissions. The form collects various details from users interested in immigration services and stores them in a structured format.

## Supabase Project Details

- **Project Name**: urgecontact
- **Project ID**: fbhaattnnpjbwqoqhzdc
- **Region**: ap-south-1
- **Database URL**: https://fbhaattnnpjbwqoqhzdc.supabase.co

## Database Schema

The contact form data is stored in a table called `contacts` with the following structure:

| Column Name | Data Type | Description |
|-------------|-----------|-------------|
| id | UUID | Primary key, automatically generated |
| created_at | TIMESTAMP | Submission timestamp, automatically generated |
| name | TEXT | User's full name |
| email | TEXT | User's email address |
| phone | TEXT | User's phone number with country code |
| whatsapp | TEXT | User's WhatsApp number with country code |
| nationality | TEXT | User's nationality/country of citizenship |
| currentCountry | TEXT | User's current country of residence |
| migrateCountry | TEXT | Destination country for immigration |
| age | TEXT | User's age (minimum 20 years) |
| currentOccupation | TEXT | User's current job or profession |
| education | TEXT | User's highest level of education |
| immigrationType | TEXT | Type of immigration program interested in |

## Form Validation

The form includes the following validation:
- All fields are required
- Age must be at least 20 years
- Phone and WhatsApp numbers must include country code and be properly formatted
- Immigration type options change dynamically based on the selected destination country

## Security

- Row Level Security (RLS) is enabled on the contacts table
- An anonymous insert policy allows form submissions without authentication
- The database is accessed using the Supabase client with the project's anon key

## Environment Variables

The following environment variables are used for the Supabase connection:

```
NEXT_PUBLIC_SUPABASE_URL=https://fbhaattnnpjbwqoqhzdc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZiaGFhdHRubnBqYndxb3FoemRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU4NTg2NTgsImV4cCI6MjAzMTQzNDY1OH0.Rl-PVPQYQJnS9VdGBntmQUSVxBCpYHvJXnbwsX3NrAA
```

## Implementation Files

- **Contact Form**: `pages/contact.js`
- **Supabase Client**: `lib/supabaseClient.js`
- **Database Schema**: `urgecontact-schema.sql`

## Dropdown Components

The form uses several custom dropdown components:
- `PhoneInput`: For selecting country code and entering phone number
- `WhatsAppInput`: For selecting country code and entering WhatsApp number
- `CountrySelect`: For selecting nationality and current country
- `CustomSelect`: For selecting education, destination country, and immigration type

## Form Submission Process

1. User fills out all required fields
2. Client-side validation checks all inputs
3. On form submission, data is formatted and sent to Supabase
4. Success/error message is displayed to the user
5. Form is reset after successful submission

## Accessing Submitted Data

To view submitted contact form data:
1. Log in to the Supabase dashboard
2. Select the "urgecontact" project
3. Go to the "Table Editor" in the left sidebar
4. Select the "contacts" table
5. Use filters and sorting as needed to find specific submissions
