import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RecoilRoot } from 'recoil';
// import Features from './components/Features';
import MapContent from './components/Map/MapContent';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
      <React.Suspense fallback={<div>Loading...</div>}>
        <MapContent />
      </React.Suspense>
    </RecoilRoot>
  </React.StrictMode>,
);
