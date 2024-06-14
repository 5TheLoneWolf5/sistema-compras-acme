import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./entidades/Navbar";
import { Carregando, Home } from "./entidades";
import { Suspense } from "react";

function App() {

  return (
    <>
      <BrowserRouter>
        
        <Suspense fallback={<Carregando  />}>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />}>

          </Route>
        </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App;