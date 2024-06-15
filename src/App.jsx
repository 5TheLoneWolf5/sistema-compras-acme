import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Carregando, Contatos, Cotacoes, Fornecedores, Home, Navbar, Produtos } from "./entidades";
import { Suspense } from "react";


const sizes = {
  
  small: "599px",
  medium: "768px",
  large: "899px",

};

function App() {

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Carregando  />}>

        <Routes>
          <Route path="/" element={<Home sizes={sizes} />}>
              <Route path="produtos" element={<Produtos />} />
              <Route path="cotacoes" element={<Cotacoes />} />
              <Route path="fornecedores" element={<Fornecedores />} />
              <Route path="contatos" element={<Contatos />} />
          </Route>
        </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );

};

export default App;