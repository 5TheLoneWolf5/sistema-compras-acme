import styled from "styled-components";
import { updateUsuario } from "./CrudUsuarios";

const ContainerUsuario = styled.tr`

    ${(props) => props.$isBlocked ? "background-color: #F0CCCB": ""}

`;

const ActionsSection = styled.td`

    display: flex;
    justify-content: center;
    align-items: stretch;
    gap: 8px;

`;

const buttonStyles = {

    width: "90px",
    height: "75px",
    cursor: "pointer",

};

const UsuarioRow = (props) => {

    const handleAddAdmin = async () => {

        await updateUsuario({ ...props.user, role: "admin" }, props.user.id);
        props.setDataChange("Add Admin " + props.user.id);

    };

    const handleRemoveAdmin = async () => {

        await updateUsuario({ ...props.user, role: "user" }, props.user.id);
        props.setDataChange("Remove Admin " + props.user.id);

    };

    const handleBlockUser = async () => {

        await updateUsuario({ ...props.user, isBlocked: true, }, props.user.id);
        props.setDataChange("Block " + props.user.id);

    };

    const handleUnblockUser = async () => {

        // const data = { ...props.user, isBlocked: false, };
        // delete data.id;
        
        await updateUsuario({ ...props.user, isBlocked: false, }, props.user.id);
        props.setDataChange("Unblock " + props.user.id);

    };

    const hoverPadlock = (e, toLock) => {

        // Using event.currentTarget, instead of event.target. Referring to the element the event handler is attached to.
        const children = e.currentTarget.children;
        // console.log(e.currentTarget, children, toLock);

        if (toLock) {
            children[0].src = '../src/assets/locked_padlock.svg';

        } else {
            children[0].src = '../src/assets/unlocked_padlock.svg';
        }

    };

    return (
        <ContainerUsuario sizes={props.sizes} $isBlocked={props.user.isBlocked}>
            <td>{props.user.id}</td>
            <td>{props.user.email}</td>
            <td>{props.user.role.charAt(0).toUpperCase() + props.user.role.slice(1)}</td>
            <ActionsSection>
                { props.user.role !== "admin" ? <button style={buttonStyles} onClick={handleAddAdmin}><img src="../src/assets/add_admin.svg" title="Adicionar administrador" /></button> :
                <button style={buttonStyles} onClick={handleRemoveAdmin}><img src="./src/assets/remove_admin.svg" title="Remover administrador"/></button> }
                { props.user.role !== "admin" && (
                    <>
                        { !props.user.isBlocked ? <button style={buttonStyles} onClick={handleBlockUser} onMouseEnter={(e) => hoverPadlock(e, true)} onMouseLeave={(e) => hoverPadlock(e, false)}><img src="../src/assets/unlocked_padlock.svg" title="Bloquear usuário" width={40} /></button> :
                        <button style={buttonStyles} onClick={handleUnblockUser} onMouseEnter={(e) => hoverPadlock(e, false)} onMouseLeave={(e) => hoverPadlock(e, true)}><img src="../src/assets/locked_padlock.svg" title="Desbloquear usuário" width={40} /></button> }
                    </>
                ) }
            </ActionsSection>
        </ContainerUsuario>
    );

};

export default UsuarioRow;