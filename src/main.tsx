import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RecoilRoot } from 'recoil';
import { QueryClientProvider } from '@tanstack/react-query';
import MapContent from './components/Map/MapContent';
import { queryClient } from './utils/ReactQuery';
import { SupabaseContext } from './hooks/useSupabase.ts';
import { createClient } from '@supabase/supabase-js';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
      <SupabaseContext.Provider
        value={createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY)}
      >
        <QueryClientProvider client={queryClient}>
          <React.Suspense fallback={<div>Loading...</div>}>
            <MapContent />
          </React.Suspense>
        </QueryClientProvider>
      </SupabaseContext.Provider>
    </RecoilRoot>
  </React.StrictMode>,
);
