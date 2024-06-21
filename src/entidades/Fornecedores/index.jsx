import { act, useEffect, useState } from "react";
import ContatosFornecedor from "./ContatosFornecedor";
import FormFornecedores from "./FormFornecedores";
import ListFornecedores from "./ListFornecedores";
import styled from "styled-components";
import { listFornecedores } from "./CrudFornecedores";

const Container = styled.div`

    width: 100%;

`;

const Main = styled.main`

    display: flex;
    width: 100%;

`;

const Fornecedores = (props) => {

    const [data, setData] = useState([]);
    const [selectedData, setSelectedData] = useState("");
    const [selectedNome, setSelectedNome] = useState("");
    const [actionDelete, setActionDelete] = useState(false);

    useEffect(() => {

        // console.log(selectedData);

        const fetchData = async () => {
            setData(await listFornecedores());
        };

        // console.log(data);

        fetchData();

    }, [selectedData]);

    return (
        <Container>
            <h1>Registrar e Ler Fornecedores</h1>
            <p>Você pode selecionar um fornecedor na tabela para obter seus pontos de contato.</p>
            <Main>
                <FormFornecedores selectedData={selectedData} setSelectedData={setSelectedData} setActionDelete={setActionDelete} />
                {(selectedData && selectedData != "Criando...") && <ContatosFornecedor selectedData={selectedData} selectedNome={selectedNome} />}
            </Main>
                <ListFornecedores setSelectedData={setSelectedData} data={data} setSelectedNome={setSelectedNome} actionDelete={actionDelete} />
        </Container>
    );

};

export default Fornecedores;