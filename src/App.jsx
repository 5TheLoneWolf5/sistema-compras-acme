import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Carregando, Contatos, Cotacoes, Fornecedores, Home, Navbar, Produtos, Rodape } from "./entidades";
import { Suspense, useState } from "react";


const sizes = {

  small: "599px",
  medium: "768px",
  large: "899px",

};

function App() {

  return (

    <>
        <BrowserRouter>
        <div id="header-and-main">
          <Suspense fallback={<Carregando />}>
            <Navbar sizes={sizes} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="produtos" element={<Produtos />} />
              <Route path="cotacoes" element={<Cotacoes />} />
              <Route path="fornecedores" element={<Fornecedores />} />
              <Route path="contatos" element={<Contatos />} />
            </Routes>
          </Suspense>
          </div>
          <Rodape />
        </BrowserRouter>
    </>

  );

};

export default App;