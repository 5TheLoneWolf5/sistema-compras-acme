import { useContext, useEffect } from "react";
import AuthContext from "../../contexts/AuthContext";

const Home = (props) => {

    const auth = useContext(AuthContext);

    useEffect(() => {

        auth.setUserAuth({ ...auth.userAuth, route: window.location.pathname });

    }, []);

    return (
        <>
            <h1>Bem vindo ao sistema de compras da ACME!</h1>
            <p>Acesse as páginas acima para visualizar ou modificar as informações de compras e fornecedores da empresa.</p>
            <p>Para acessar a página de <strong>Dashboard</strong> e analisar os dados da organização, <a href="/api">clique aqui</a>.</p>
        </>
    );

};

export default Home;