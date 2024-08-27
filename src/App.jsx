import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Cadastro, Carregando, Configuracoes, Contatos, Requisicoes, Desconhecida, Fornecedores, Home, Login, Navbar, Produtos, Rodape } from "./entidades";
import { Suspense, useEffect, useState } from "react";
import AuthContext from "./contexts/AuthContext";
import { auth, db } from "./../../credentials/auth";
import { doc, getDoc } from "firebase/firestore";

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
      isLogged: false, // localStorage.getItem("user") == "",
      email: null,
      route: "/",
      role: "",
      auth: auth,
    }
  );
  
  const navigate = useNavigate();

  useEffect(() => {

    // console.log("Setting user saved in browser storage..");

    auth.onAuthStateChanged(async (user) => {

      if (user) {
        const docRef = doc(db, "roles", user.uid);
        // console.log(user);
        // const uid = user.uid;
        // console.log(user.providerData[0]);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // console.log(docSnap.data().role);
          setUserAuth((prevItems) => ({ ...prevItems, uid: user.uid, email: user.providerData[0].email, isLogged: true, role: docSnap.data().role }));
        }
        
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
              { userAuth.isLogged && <Navbar sizes={sizes} auth={auth} navigate={navigate} /> }
              <Routes>
                {/* If user has no authorization, the route must not be available to them. */}
                { !userAuth.isLogged ? 
                <>
                  <Route path="/login" element={<Login sizes={sizes} auth={auth} navigate={navigate} />} />
                  <Route path="/cadastro" element={<Cadastro sizes={sizes} auth={auth} db={db} />} />
                </> :
                <>
                  <Route path="/" element={<Home />} />
                  <Route path="/requisicoes" element={<Requisicoes sizes={sizes} />} />
                  <Route path="/configuracoes" element={<Configuracoes db={db} />} />
                  { userAuth.role === "admin" && 
                  <>
                    <Route path="/produtos" element={<Produtos sizes={sizes} />} />
                    <Route path="/fornecedores" element={<Fornecedores sizes={sizes} />} />
                    <Route path="/contatos" element={<Contatos />} />
                  </> }
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