import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Carregando, Fornecedores, Home, Navbar, Produtos } from "./entidades";
import { Suspense } from "react";

function App() {

  return (
    <>
      <BrowserRouter>
        
        <Suspense fallback={<Carregando  />}>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />}>
              <Route path="fornecedores" element={<Fornecedores />} />
              <Route path="produtos" element={<Produtos />} />
          </Route>
        </Routes>

        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App;