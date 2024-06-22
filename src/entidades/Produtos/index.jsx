import { useEffect, useState } from "react";
import CotacoesProduto from "./CotacoesProduto";
import FormProdutos from "./FormProdutos";
import ListProdutos from "./ListProdutos";
import styled from "styled-components";
import { listProdutos } from "./CrudProdutos";

const Container = styled.div`

    width: 100%;

`;

const Main = styled.main`

    display: flex;
    flex-direction: column;
    width: 100%;

    @media (min-width: ${(props) => props.sizes.small}) {

        flex-direction: row;

    }

`;

const Produtos = (props) => {

    const [data, setData] = useState([]);
    const [selectedData, setSelectedData] = useState("");
    const [toggledClearRows, setToggleClearRows] = useState(false);
    const [selectedProduto, setSelectedProduto] = useState("");

    useEffect(() => {

        // console.log(selectedData);

        const fetchData = async () => {
            setData(await listProdutos());
        };

        // console.log(data);

        fetchData();
        // console.log(toggledClearRows);

    }, [selectedData]);

    return (
        <Container>
            <h1>Registrar e Ler Produtos</h1>
            <p>Você pode selecionar um produto na tabela para obter suas cotações.</p>
            <Main sizes={props.sizes}>
                <FormProdutos selectedData={selectedData} setToggleClearRows={setToggleClearRows} setSelectedData={setSelectedData} />
                {(selectedData && selectedData != "Criando...") && <CotacoesProduto selectedData={selectedData} selectedProduto={selectedProduto} />}
            </Main>
                <ListProdutos setSelectedData={setSelectedData} data={data} setSelectedProduto={setSelectedProduto} />
        </Container>
    );

};

export default Produtos;