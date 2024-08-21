import React from 'react';
import ReactDOM from 'react-dom/client';
import AppAPI from './AppAPI';
import "../Api.css";

// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppAPI />
  </React.StrictMode>,
);