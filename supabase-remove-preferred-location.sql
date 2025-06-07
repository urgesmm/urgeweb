-- SQL code to remove the preferredLocation column from the contacts table in Supabase

-- First, check if the column exists to avoid errors
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'contacts'
    AND column_name = 'preferredLocation'
  ) THEN
    -- Remove the preferredLocation column
    ALTER TABLE contacts DROP COLUMN "preferredLocation";
    
    -- Log the change
    RAISE NOTICE 'Column preferredLocation has been removed from contacts table';
  ELSE
    RAISE NOTICE 'Column preferredLocation does not exist in contacts table';
  END IF;
END $$;
