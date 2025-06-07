-- SQL code to fix existing data in the contacts table

-- Fix age values if they are still in text format
DO $$
BEGIN
  -- Check if age column exists and is text type
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'contacts'
    AND column_name = 'age'
    AND data_type = 'text'
  ) THEN
    -- Update existing age ranges to numeric values
    UPDATE contacts SET "age" =
      CASE
        WHEN "age" = '18-25' THEN '20' -- Set to minimum allowed age
        WHEN "age" = '26-35' THEN '26'
        WHEN "age" = '36-45' THEN '36'
        WHEN "age" = '46-55' THEN '46'
        WHEN "age" = '56+' THEN '56'
        ELSE '20' -- Default to minimum age if unknown
      END;

    -- Change the data type of the age column to integer
    ALTER TABLE contacts
      ALTER COLUMN "age" TYPE integer USING "age"::integer;

    RAISE NOTICE 'Age column has been converted from text to integer';
  ELSIF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'contacts'
    AND column_name = 'ageRange'
  ) THEN
    -- If ageRange still exists, rename it and convert it
    ALTER TABLE contacts
      RENAME COLUMN "ageRange" TO "age";

    -- Update existing age ranges to numeric values
    UPDATE contacts SET "age" =
      CASE
        WHEN "age" = '18-25' THEN '20' -- Set to minimum allowed age
        WHEN "age" = '26-35' THEN '26'
        WHEN "age" = '36-45' THEN '36'
        WHEN "age" = '46-55' THEN '46'
        WHEN "age" = '56+' THEN '56'
        ELSE '20' -- Default to minimum age if unknown
      END;

    -- Change the data type of the age column to integer
    ALTER TABLE contacts
      ALTER COLUMN "age" TYPE integer USING "age"::integer;

    RAISE NOTICE 'ageRange column has been renamed to age and converted to integer';
  ELSE
    RAISE NOTICE 'Age column is already in the correct format';
  END IF;
END $$;

-- Fix phone numbers if they don't have country codes
DO $$
DECLARE
  updated_rows integer;
BEGIN
  -- Update existing phone numbers to add a default country code if missing
  UPDATE contacts SET phone = '+971 ' || phone WHERE phone NOT LIKE '+%';

  -- Get the count of updated rows
  GET DIAGNOSTICS updated_rows = ROW_COUNT;

  IF updated_rows > 0 THEN
    RAISE NOTICE 'Updated % phone numbers to include country code', updated_rows;
  ELSE
    RAISE NOTICE 'All phone numbers already have country codes';
  END IF;
END $$;

-- Add constraints if they don't exist
DO $$
BEGIN
  -- Check if age_minimum_check constraint exists
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.constraint_column_usage
    WHERE table_name = 'contacts'
    AND constraint_name = 'age_minimum_check'
  ) THEN
    -- Add a check constraint to ensure age is at least 20
    ALTER TABLE contacts
      ADD CONSTRAINT age_minimum_check CHECK ("age" >= 20);

    RAISE NOTICE 'Added age_minimum_check constraint';
  ELSE
    RAISE NOTICE 'age_minimum_check constraint already exists';
  END IF;

  -- Check if phone_country_code_check constraint exists
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.constraint_column_usage
    WHERE table_name = 'contacts'
    AND constraint_name = 'phone_country_code_check'
  ) THEN
    -- Add a check constraint to ensure phone number starts with a plus sign
    ALTER TABLE contacts
      ADD CONSTRAINT phone_country_code_check CHECK (phone LIKE '+%' AND length(phone) >= 8);

    RAISE NOTICE 'Added phone_country_code_check constraint';
  ELSE
    RAISE NOTICE 'phone_country_code_check constraint already exists';
  END IF;
END $$;

-- Remove preferredLocation column if it exists
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'contacts'
    AND column_name = 'preferredLocation'
  ) THEN
    ALTER TABLE contacts DROP COLUMN "preferredLocation";
    RAISE NOTICE 'Removed preferredLocation column';
  ELSE
    RAISE NOTICE 'preferredLocation column does not exist';
  END IF;
END $$;

-- Add comments to document the columns
COMMENT ON COLUMN contacts."age" IS 'Age of the contact (minimum 20 years)';
COMMENT ON COLUMN contacts.phone IS 'Phone number with country code and proper format (e.g., +1 (123) 456-7890)';
