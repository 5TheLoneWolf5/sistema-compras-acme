import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../contexts/AuthContext";
import ExportTableCSV from "../../../componentes/ExportTableCSV";
import { listUsuarios } from "./CrudUsuarios";
import Filter from "../../../componentes/Filter";
import UsuarioRow from "./UsuarioRow";
import Modal from "../../../componentes/Modal";
import styled from "styled-components";

const UsuariosTable = styled.table`

    border: 1px solid black;
    margin: 10px auto 0;
    padding: 5px;
    width: fit-content;
    text-align: center;

    & > caption {
        text-align: right;
        caption-side: top;
        margin: 2px;
    }

    @media (min-width: ${(props) => props.sizes.small}) {
        width: ${(props) => props.sizes.small};
    }

`;

const UsuariosHeader = styled.thead`

    border: 1px solid black;
    // text-align: left;

    & > tr > th {

        border: 1px solid black;
        padding: 5px;

    }

`;

const UsuariosBody = styled.tbody`

    border: 1px solid black;

    & > tr > td {
        padding: 10px;
        border: 1px solid black;
    }

    & > tr:nth-child(even) {
        // background-color: #D3D3D3;
    }

`;

const GerenciaUsuarios = (props) => {

    const [allUsers, setAllUsers] = useState([]);
    const [dataChange, setDataChange] = useState("");
    const [filter, setFilter] = useState("");

    const auth = useContext(AuthContext);

    useEffect(() => {

        const fetchUsers = async () => {

            const data = await listUsuarios();
    
            setAllUsers(data);
    
        };

        fetchUsers();

    }, [dataChange]);

    const filteredUsers = () => {
        
        const filteredData = allUsers.filter((item) => {
            
            const conditions = item?.email.toLowerCase().includes(filter.toLowerCase()) ||
                               item?.id.toLowerCase().startsWith(filter.toLowerCase()) ;
            
            return conditions;

        });

        if (filter) {
            return filteredData;
        } else {
            return allUsers;
        }

    };

    // useEffect(() => console.log(allUsers));
    
    return (
        <>
            <Modal activateModal={props.activateModal} setActivateModal={props.setActivateModal}>
            <h2 style={{ marginBottom: "0" }}>Gerenciamento de Usuários</h2>
            <p style={{ margin: "0 15px", }}>Em caso de alterar informações de outros usuários ou do próprio, é necessário atualizar a página da aplicação web para observar as mudanças.</p>
                <Filter filter={filter} setFilter={setFilter} placeholder="Pesquise pelo ID ou usuário..." />
                <br />
                <div style={{ overflowX: "auto", width: "100%" }}>
                    <UsuariosTable sizes={props.sizes}>
                        <caption style={{ captionSide: "top", textAlign: "left" }}><ExportTableCSV data={filteredUsers()} /></caption>
                        <UsuariosHeader>
                            { allUsers.length > 0 ? (
                                <tr>
                                    <th>ID</th>
                                    <th>Email</th>
                                    <th>Função</th>
                                    <th>Ações</th>
                                    </tr>
                                ) : <tr><th>Informação.</th></tr>
                            }
                        </UsuariosHeader>
                        <UsuariosBody>
                            { allUsers.length > 0 ? filteredUsers().map((item, idx) => (
                                <UsuarioRow key={idx} user={item} sizes={props.sizes} setDataChange={setDataChange} />
                                )) : <tr><td>Não existem usuários.</td></tr>
                            }
                        </UsuariosBody>
                    </UsuariosTable>
                </div>
            </Modal>
        </>
    );

};

export default GerenciaUsuarios;