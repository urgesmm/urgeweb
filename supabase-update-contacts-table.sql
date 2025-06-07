-- SQL code to update the contacts table in Supabase

-- First, rename the ageRange column to age
ALTER TABLE contacts
  RENAME COLUMN "ageRange" TO "age";

-- Update existing age ranges to numeric values before changing the type
UPDATE contacts SET "age" =
  CASE
    WHEN "age" = '18-25' THEN '20' -- Set to minimum allowed age
    WHEN "age" = '26-35' THEN '26'
    WHEN "age" = '36-45' THEN '36'
    WHEN "age" = '46-55' THEN '46'
    WHEN "age" = '56+' THEN '56'
    ELSE '20' -- Default to minimum age if unknown
  END;

-- Now change the data type of the age column to integer
ALTER TABLE contacts
  ALTER COLUMN "age" TYPE integer USING "age"::integer;

-- Add a check constraint to ensure age is at least 20
ALTER TABLE contacts
  ADD CONSTRAINT age_minimum_check CHECK ("age" >= 20);

-- Update existing phone numbers to add a default country code if missing
UPDATE contacts SET phone = '+971 ' || phone WHERE phone NOT LIKE '+%';

-- Add a check constraint to ensure phone number starts with a plus sign (country code)
-- and has a proper format with country code and spaces
ALTER TABLE contacts
  ADD CONSTRAINT phone_country_code_check CHECK (phone LIKE '+%' AND length(phone) >= 8);

-- Remove the preferredLocation column if it exists
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'contacts'
    AND column_name = 'preferredLocation'
  ) THEN
    ALTER TABLE contacts DROP COLUMN "preferredLocation";
  END IF;
END $$;

-- Comment on the columns to document the changes
COMMENT ON COLUMN contacts."age" IS 'Age of the contact (minimum 20 years)';
COMMENT ON COLUMN contacts.phone IS 'Phone number with country code and proper format (e.g., +1 (123) 456-7890)';

-- Note: The script has automatically updated existing data to conform to the new constraints.
-- Age ranges have been converted to numeric values and phone numbers have been updated with country codes.
