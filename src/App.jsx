import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Cadastro, Carregando, Configuracoes, Contatos, Requisicoes, Desconhecida, Fornecedores, Home, Login, Navbar, Produtos, Rodape, Compras, BlockedHome } from "./entidades";
import { Suspense, useEffect, useState } from "react";
import AuthContext from "./contexts/AuthContext";
import { obtainUsuario } from "./entidades/Configuracoes/GerenciaUsuarios/CrudUsuarios";

const sizes = {

  small: "599px",
  medium: "768px",
  large: "899px",

};

const App = (props) => {

  // console.log(app);
  // console.log(auth);
  const [userAuth, setUserAuth] = useState(
    {
      isLogged: false, // localStorage.getItem("user") == "",
      email: "",
      route: "/",
      role: "",
      auth: props.auth,
      isBlocked: false,
    }
  );
  
  const navigate = useNavigate();

  useEffect(() => {

    // console.log("Setting user saved in browser storage..");

    props.auth.onAuthStateChanged(async (user) => {

      if (user) {

        const data = await obtainUsuario(user.uid);
        // console.log(data);

        // console.log(docSnap.data().role);
        setUserAuth((prevItems) => ({ ...prevItems, uid: user.uid, email: user.providerData[0].email, isLogged: true, role: data.role, isBlocked: data.isBlocked, }));
        
      }

    });

    // console.log("Testing something.");

  }, []);

  useEffect(() => {

      // console.log(userAuth.route);
      // console.log("Conditions to navigate.");
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
          <div id="header-and-main"> { /* onLoad={authUser} */}
            <Suspense fallback={<Carregando />}>
              { userAuth.isLogged && <Navbar sizes={sizes} auth={props.auth} navigate={navigate} /> }
              <Routes>
                {/* If user has no authorization, the route must not be available to them. */}
                { !userAuth.isLogged ? 
                <>
                  <Route path="/login" element={<Login sizes={sizes} auth={props.auth} navigate={navigate} />} />
                  <Route path="/cadastro" element={<Cadastro sizes={sizes} auth={props.auth} db={props.db} />} />
                </> :
                <>
                  { !userAuth.isBlocked ? (
                  <>
                    <Route path="/" element={<Home />} />
                    <Route path="/requisicoes" element={<Requisicoes sizes={sizes} />} />
                    <Route path="/configuracoes" element={<Configuracoes db={props.db} sizes={sizes} />} />
                    { userAuth.role === "admin" && 
                    <>
                      <Route path="/compras" element={<Compras sizes={sizes} />} />
                      <Route path="/produtos" element={<Produtos sizes={sizes} />} />
                      <Route path="/fornecedores" element={<Fornecedores sizes={sizes} />} />
                      <Route path="/contatos" element={<Contatos />} />
                    </> 
                    }
                  </>
                  ) : <Route path="/" element={<BlockedHome />} /> }
                </>
                }
                <Route path="/*" element={<Desconhecida />} />
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