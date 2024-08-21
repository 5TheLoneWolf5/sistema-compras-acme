import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Cadastro, Carregando, Contatos, Cotacoes, Desconhecida, Fornecedores, Home, Login, Navbar, Produtos, Rodape } from "./entidades";
import { Suspense, useEffect, useState } from "react";
import AuthContext from "./contexts/AuthContext";
import { auth } from "./../../credentials/auth";

const sizes = {

  small: "599px",
  medium: "768px",
  large: "899px",

};

const App = () => {

  // console.log(app);
  // console.log(auth);
  const [userAuth, setUserAuth] = useState(
    {
      isLogged: localStorage.getItem("user") == "",
      email: null,
      route: "/",
    }
  );
  
  const navigate = useNavigate();

  useEffect(() => {

      // console.log(userAuth.route);
    
      if (!userAuth.isLogged && userAuth.route !== "/cadastro" && userAuth.route !== "/login") {  
          navigate("/login");
      } else if (userAuth.isLogged && (userAuth.route === "/cadastro" || userAuth.route === "/login")) {
        navigate("/");
      }

      // console.log(userAuth.isLogged);

  }, [userAuth]);

  return (
    <>
        <AuthContext.Provider value={ { userAuth, setUserAuth } }>
          <div id="header-and-main">
            <Suspense fallback={<Carregando />}>
              { userAuth.isLogged && <Navbar sizes={sizes} auth={auth} navigate={navigate} /> }
              <Routes>
                {/* If user has no authorization, the route must not be available to them. */}
                { !userAuth.isLogged ? 
                <>
                  <Route path="/login" element={<Login sizes={sizes} auth={auth} navigate={navigate} />} />
                  <Route path="/cadastro" element={<Cadastro sizes={sizes} auth={auth} />} />
                </> :
                <>
                  <Route path="/" element={<Home />} />
                  <Route path="/produtos" element={<Produtos sizes={sizes} />} />
                  <Route path="/cotacoes" element={<Cotacoes />} />
                  <Route path="/fornecedores" element={<Fornecedores sizes={sizes} />} />
                  <Route path="/contatos" element={<Contatos />} />
                  <Route path="/*" element={<Desconhecida />} />
                </>
                }
                {/* <Redirect to="/" /> */}
              </Routes>
            </Suspense>
            </div>
          <Rodape />
        </AuthContext.Provider>
    </>

  );

};

export default App;