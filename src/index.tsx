import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RecoilRoot } from 'recoil';
import MapContent from './components/Map';
import Sidebar from './components/Sidebar';
import LocationFoundControl from './components/Toolbar/LocationFoundButton';
import CreatePlaceButton from './components/Toolbar/CreatePlaceButton';
import { CreatePlaceModal } from './components/Toolbar/CreatePlaceModal';

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <React.Suspense fallback={<div>Loading...</div>}>
        <MapContent />
        <Sidebar />
        <LocationFoundControl />
        <CreatePlaceButton />
        <CreatePlaceModal />
      </React.Suspense>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
