import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Carregando, Contatos, Cotacoes, Desconhecida, Fornecedores, Home, Navbar, Produtos, Rodape } from "./entidades";
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
          <div id="header-and-main">
            <Suspense fallback={<Carregando />}>
              <Navbar sizes={sizes} />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/produtos" element={<Produtos sizes={sizes} />} />
                <Route path="/cotacoes" element={<Cotacoes />} />
                <Route path="/fornecedores" element={<Fornecedores sizes={sizes} />} />
                <Route path="/contatos" element={<Contatos />} />
                <Route path="/*" element={<Desconhecida />} />
                {/* <Redirect to="/" /> */}
              </Routes>
            </Suspense>
            </div>
          <Rodape />
        </BrowserRouter>
    </>

  );

};

export default App;