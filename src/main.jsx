import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { app, auth, db } from "../../credentials/auth";
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

// console.log(app, auth, db);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App auth={auth} db={db} />
    </BrowserRouter>
  </React.StrictMode>,
);