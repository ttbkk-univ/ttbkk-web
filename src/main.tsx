import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RecoilRoot } from 'recoil';
import Map from './components/Map';
import Features from './components/Features';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RecoilRoot>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Map />
        <Features />
      </React.Suspense>
    </RecoilRoot>
  </React.StrictMode>,
);
