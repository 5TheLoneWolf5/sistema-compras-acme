import styled from "styled-components";
import ButtonModal from "../../componentes/ButtonModal";
import AddAdminModal from "../../componentes/Modals/AddAdminModal";
import { useContext, useState } from "react";
import AuthContext from "../../contexts/AuthContext";

const UserArea = styled.div`

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & > span {
    
        width: 300px;
        display: flex;
        justify-content: center;

    }

`;

const AdminArea = styled.div`

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & > span {
    
        width: 300px;
        display: flex;
        justify-content: center;

    }

`;

const ContainerConfiguracoes = styled.div`

    display: flex;
    flex-direction: column;

`;

const Configuracoes = (props) => {

    const [activateAddAdminModal, setActivateAddAdminModal] = useState(false);

    const auth = useContext(AuthContext);

    return (
        <ContainerConfiguracoes>
            <h1>Configurações</h1>
            <UserArea>
                <ButtonModal>Gerenciar Conta</ButtonModal>
            </UserArea>
            { auth.userAuth.role === "admin" &&
            <AdminArea>
                <ButtonModal activateModal={activateAddAdminModal} setActivateModal={setActivateAddAdminModal}>Adicionar Administrador</ButtonModal>
                { activateAddAdminModal && <AddAdminModal activateModal={activateAddAdminModal} setActivateModal={setActivateAddAdminModal} db={props.db} />}
                <ButtonModal>Remover Administrador</ButtonModal>
                <ButtonModal>Gerenciar Usuários</ButtonModal>
            </AdminArea> }
        </ContainerConfiguracoes>
    );

};

export default Configuracoes;