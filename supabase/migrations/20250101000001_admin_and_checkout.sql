/*
          # [Operation Name]
          Admin & Checkout System Schema

          ## Query Description: [This migration sets up the necessary database structures for the enhanced Admin Panel and the new Cart/Checkout system. It adds tables for site settings and shopping carts, updates existing tables for new relationships, and modifies Row Level Security (RLS) policies to grant administrators appropriate access. It also creates a function to help fetch user data for the admin dashboard. This is a structural change and is safe to run on the existing schema.]
          
          ## Metadata:
          - Schema-Category: "Structural"
          - Impact-Level: "Medium"
          - Requires-Backup: false
          - Reversible: true
          
          ## Structure Details:
          - Creates Tables: site_settings, cart, cart_items
          - Alters Tables: bookings, transactions
          - Creates Functions: get_users_with_booking_count()
          - Modifies RLS Policies: profiles, bookings, transactions, site_settings
          
          ## Security Implications:
          - RLS Status: Enabled
          - Policy Changes: Yes
          - Auth Requirements: Admin role is now used for expanded access.
          
          ## Performance Impact:
          - Indexes: Primary keys and foreign keys create indexes automatically.
          - Triggers: No new triggers.
          - Estimated Impact: Low performance impact.
          */

-- 1. Create site_settings table for admin configurations
CREATE TABLE IF NOT EXISTS public.site_settings (
  key TEXT PRIMARY KEY,
  value JSONB,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- RLS for site_settings
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Allow admin full access on settings" ON public.site_settings FOR ALL
  USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin')
  WITH CHECK ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- 2. Create tables for Cart functionality
CREATE TABLE IF NOT EXISTS public.cart (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.cart ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own cart" ON public.cart FOR ALL USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS public.cart_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cart_id UUID REFERENCES public.cart(id) ON DELETE CASCADE NOT NULL,
  puja_id BIGINT REFERENCES public.pujas(id) ON DELETE CASCADE NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  added_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own cart items" ON public.cart_items FOR ALL USING (auth.uid() = (SELECT user_id FROM cart WHERE id = cart_id));

-- 3. Modify existing tables to link bookings and transactions
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS transaction_id UUID REFERENCES public.transactions(id);
ALTER TABLE public.transactions ADD COLUMN IF NOT EXISTS booking_id UUID REFERENCES public.bookings(id);

-- 4. Update RLS policies to grant admins read access across the platform
-- Profiles
DROP POLICY IF EXISTS "Allow admin read access" ON public.profiles;
CREATE POLICY "Allow admin read access" ON public.profiles FOR SELECT
  USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');
-- Bookings
DROP POLICY IF EXISTS "Allow admin read access" ON public.bookings;
CREATE POLICY "Allow admin read access" ON public.bookings FOR SELECT
  USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');
-- Transactions
DROP POLICY IF EXISTS "Allow admin read access" ON public.transactions;
CREATE POLICY "Allow admin read access" ON public.transactions FOR SELECT
  USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- 5. Create RPC for Admin User Management to get user list with booking counts
CREATE OR REPLACE FUNCTION get_users_with_booking_count()
RETURNS TABLE(id UUID, full_name TEXT, email TEXT, phone_number TEXT, role TEXT, total_bookings BIGINT)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF (SELECT role FROM public.profiles WHERE id = auth.uid()) != 'admin' THEN
    RAISE EXCEPTION 'Access denied. Admin privileges required.';
  END IF;

  RETURN QUERY
  SELECT
    p.id,
    p.full_name,
    u.email,
    p.phone_number,
    p.role,
    (SELECT count(*) FROM public.bookings WHERE user_id = p.id) as total_bookings
  FROM
    public.profiles p
  JOIN
    auth.users u ON p.id = u.id;
END;
$$;
