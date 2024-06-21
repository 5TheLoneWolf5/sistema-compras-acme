import { useEffect, useState } from "react";
import ContatosFornecedor from "./ContatosFornecedor";
import FormFornecedores from "./FormProdutos";
import ListFornecedores from "./ListProdutos";
import styled from "styled-components";
import { listProdutos } from "./CrudProdutos";

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
    const [toggledClearRows, setToggleClearRows] = useState(false);
    const [selectedNome, setSelectedNome] = useState("");

    useEffect(() => {

        // console.log(selectedData);

        const fetchData = async () => {
            setData(await listProdutos());
        };

        // console.log(data);

        fetchData();
        console.log(toggledClearRows);

    }, [selectedData]);

    return (
        <Container>
            <h1>Registrar e Ler Fornecedores</h1>
            <p>Você pode selecionar um fornecedor na tabela para obter seus pontos de contato.</p>
            <Main>
                <FormFornecedores selectedData={selectedData} setToggleClearRows={setToggleClearRows} setSelectedData={setSelectedData} />
                {(selectedData && selectedData != "Criando...") && <ContatosFornecedor selectedData={selectedData} selectedNome={selectedNome} />}
            </Main>
                <ListFornecedores setSelectedData={setSelectedData} data={data} toggledClearRows={toggledClearRows} setToggleClearRows={setToggleClearRows} setSelectedNome={setSelectedNome} />
        </Container>
    );

};

export default Fornecedores;