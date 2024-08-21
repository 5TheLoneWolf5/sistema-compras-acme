import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";

const Desconhecida = (props) => {

    const auth = useContext(AuthContext);

    useEffect(() => {

        auth.setUserAuth({ ...auth.userAuth, route: window.location.pathname });

    }, []);

    return (
        <>
            <h1>Página Desconhecida</h1>
            <p><Link to="/">Clique aqui</Link> para retornar.</p>
        </>
    );

};

export default Desconhecida;