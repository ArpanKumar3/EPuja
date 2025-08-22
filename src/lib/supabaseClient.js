import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

let supabase = null;

// A simple check to see if the env variables are placeholders or invalid
const isInvalidCredential = (value) => !value || value.startsWith('YOUR_') || value === 'API_KEY_ADDED';

if (!isInvalidCredential(supabaseUrl) && !isInvalidCredential(supabaseAnonKey)) {
  try {
    // This will throw an error if the URL is malformed, which we catch
    new URL(supabaseUrl); 
    supabase = createClient(supabaseUrl, supabaseAnonKey)
  } catch (error) {
    console.error("Error creating Supabase client:", error.message);
    console.warn("Supabase features will be disabled. Please check your .env file for valid credentials.");
  }
} else {
  console.warn('Supabase credentials are not set or are placeholders. Supabase features will be disabled. Please check your .env file.');
}

export { supabase }
