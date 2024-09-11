import styled from "styled-components";
import ButtonModal from "../../componentes/ButtonModal";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import AccountModal from "../../componentes/Modals/AccountModal";
import GerenciaUsuarios from "./GerenciaUsuarios";

const ContainerConfiguracoes = styled.div`

    display: flex;
    flex-direction: column;
    padding-bottom: 20px;

`;

const UserArea = styled.div`

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;

    & > span {
    
        width: 100%;
        display: flex;
        justify-content: center;
        text-align: center;

    }

    @media (min-width: ${(props) => props.sizes.small}) {

        & > span { 

            width: ${(props) => props.sizes.small};
        
        }
    }

`;

const AdminArea = styled.div`

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    border: 1px solid black;
    border-radius: 4px;
    background-color: #FFCCCB ;
    padding: 15px;
    margin-top: 5px;

    & > span {
    
        width: 100%;
        display: flex;
        justify-content: center;
        text-align: center;

    }

    @media (min-width: ${(props) => props.sizes.small}) {

        & > span { 

            width: ${(props) => props.sizes.small};
        
        }

    }

`;

const Configuracoes = (props) => {

    const [activateAccountModal, setActivateAccountModal] = useState(false);
    const [activateManageUsersModal, setActivateManageUsersModal] = useState(false);

    const auth = useContext(AuthContext);

    useEffect(() => {

        auth.setUserAuth({ ...auth.userAuth, route: window.location.pathname });

    }, []);

    return (
        <ContainerConfiguracoes>
            <h1>Configurações</h1>
            <UserArea sizes={props.sizes}>
                <ButtonModal activateModal={activateAccountModal} setActivateModal={setActivateAccountModal}>Gerenciar Conta</ButtonModal>
                { activateAccountModal && <AccountModal activateModal={activateAccountModal} setActivateModal={setActivateAccountModal} />}
            </UserArea>
            { auth.userAuth.role === "admin" &&
            <AdminArea sizes={props.sizes}>
                <h3>Área do Administrador</h3>
                <p>Clicando no botão abaixo, você terá uma lista de todos os usuários do sistema. Nela, é possível adicionar e remover administradores, assim como também bloquear usuários.</p>
                <ButtonModal activateModal={activateManageUsersModal} setActivateModal={setActivateManageUsersModal}>Gerenciar Usuários</ButtonModal>
                { activateManageUsersModal && <GerenciaUsuarios activateModal={activateManageUsersModal} setActivateModal={setActivateManageUsersModal} db={props.db} sizes={props.sizes} />}
            </AdminArea>
            }
        </ContainerConfiguracoes>
    );

};

export default Configuracoes;