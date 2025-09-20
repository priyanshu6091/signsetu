import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
// Note: In a production environment, these should be environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Check if we're in development mode
const isDevelopment = process.env.NODE_ENV === 'development';

if (!supabaseUrl || !supabaseAnonKey) {
  if (!isDevelopment) {
    console.error('Supabase URL or Anon Key is missing. Please check your environment variables.');
  }
}

// Create a real client only if credentials are available
let supabaseClient;
if (supabaseUrl && supabaseAnonKey) {
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
} else if (isDevelopment) {
  // In development, create a mock client if credentials are missing
  console.log('Using mock Supabase client in development mode');
  // This will be replaced by the mock implementation in AuthContext
  supabaseClient = null;
} else {
  throw new Error('Supabase credentials are required in production');
}

export const supabase = supabaseClient;