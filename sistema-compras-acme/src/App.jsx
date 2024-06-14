import { Router, Routes } from 'react-router-dom';
import './App.css';
import { Carregando } from './entidades';
import { Suspense } from 'react';

function App() {


  return (
    <>
      <Router>
        <Suspense fallback={<Carregando  />} />
        <Routes>
          
        </Routes>
      </Router>
    </>
  )
}

export default App;