import { SupabaseClient } from '@supabase/supabase-js';
import { createContext, useContext } from 'react';

export default function useSupabase(): SupabaseClient {
  const client = useContext(SupabaseContext);
  if (!client) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return client;
}

export const SupabaseContext = createContext<SupabaseClient | null>(null);
