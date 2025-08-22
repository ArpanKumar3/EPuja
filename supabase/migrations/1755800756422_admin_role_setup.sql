/*
          # [Admin Role and Permissions Setup]
          This migration adds an 'admin' role to the system and grants it full access to manage pujas.

          ## Query Description: [This script modifies the 'profiles' table to include a 'role' column, defaulting new users to the 'user' role. It then updates the security policies on the 'pujas' table to allow anyone to view them, but restricts create, update, and delete operations to users with the 'admin' role. This is a critical security update for enabling administrative functions.]
          
          ## Metadata:
          - Schema-Category: ["Structural", "Security"]
          - Impact-Level: ["Medium"]
          - Requires-Backup: [true]
          - Reversible: [true]
          
          ## Structure Details:
          - Modifies table: `profiles` (adds `role` column)
          - Modifies RLS policies on table: `pujas`
          
          ## Security Implications:
          - RLS Status: [Enabled]
          - Policy Changes: [Yes]
          - Auth Requirements: [Admin role check]
          
          ## Performance Impact:
          - Indexes: [None]
          - Triggers: [None]
          - Estimated Impact: [Low]
          */

-- 1. Add a 'role' column to the profiles table
ALTER TABLE public.profiles
ADD COLUMN role TEXT DEFAULT 'user';

-- 2. Update RLS policies on the 'pujas' table
-- First, drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Enable read access for all users" ON public.pujas;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.pujas;

-- Create a function to check for admin role
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2.1. Allow public read access to all pujas
CREATE POLICY "Enable_read_for_everyone" ON public.pujas
FOR SELECT USING (true);

-- 2.2. Allow admins to insert new pujas
CREATE POLICY "Enable_insert_for_admins" ON public.pujas
FOR INSERT WITH CHECK (public.is_admin());

-- 2.3. Allow admins to update pujas
CREATE POLICY "Enable_update_for_admins" ON public.pujas
FOR UPDATE USING (public.is_admin());

-- 2.4. Allow admins to delete pujas
CREATE POLICY "Enable_delete_for_admins" ON public.pujas
FOR DELETE USING (public.is_admin());
