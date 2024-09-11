import { useContext, useEffect } from "react";
import AuthContext from "../../contexts/AuthContext";
import styled from "styled-components";

const ContainerBlockedHome = styled.div`

    background-color: #FFCCCB;
    margin-top: 10px;
    padding: 5px;
    border-radius: 5px;

`;

const BlockedHome = (props) => {

    const auth = useContext(AuthContext);

    useEffect(() => {

        auth.setUserAuth({ ...auth.userAuth, route: window.location.pathname });

    }, []);

    return (
        <ContainerBlockedHome>
            <h1>Olá, usuário <i>{auth.userAuth.email}</i>.</h1>
            <p>Seu perfil está bloqueado, e não possui permissões para acessar as funcionalidades do sistema de compras ACME.</p>
        </ContainerBlockedHome>
    );

};

export default BlockedHome;