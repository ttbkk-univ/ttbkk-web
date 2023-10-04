import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import MapContent from './components/Map/MapContent';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={new QueryClient()}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <MapContent />
        </React.Suspense>
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>,
);
