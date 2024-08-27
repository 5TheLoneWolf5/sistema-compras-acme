import { useContext, useEffect, useState } from "react";
import CotacoesProduto from "./CotacoesProduto";
import FormProdutos from "./FormProdutos";
import ListProdutos from "./ListProdutos";
import styled from "styled-components";
import { listProdutos } from "./CrudProdutos";
import AuthContext from "../../contexts/AuthContext";
import Filter from "../../componentes/Filter";

const Container = styled.div`

    width: 100%;

`;

const Main = styled.main`

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;

`;

const Produtos = (props) => {

    const [data, setData] = useState([]);
    const [selectedData, setSelectedData] = useState("");
    const [selectedRow, setSelectedRow] = useState(false);
    const [selectedProduto, setSelectedProduto] = useState("");
    const [filter, setFilter] = useState("");
    const [filteredData, setFilteredData] = useState([]);

    const auth = useContext(AuthContext);

    useEffect(() => {
        
        auth.setUserAuth({ ...auth.userAuth, route: window.location.pathname });

    }, []);

    useEffect(() => {

        // console.log(selectedData);

        const fetchData = async () => {
            setData(await listProdutos());
        };

        // console.log(data);

        fetchData();
        // console.log(toggledClearRows);

    }, [selectedData]);

    useEffect(() => {
        
        setFilteredData(data.filter((item) => item?.produto.toLowerCase().startsWith(filter.toLowerCase())));

    }, [filter]);

    return (
        <Container>
            <h1>Registrar e Ler Produtos</h1>
            <p>Você pode selecionar um produto na tabela para obter suas cotações.</p>
            <Main sizes={props.sizes}>
                <FormProdutos selectedData={selectedData} setSelectedRow={setSelectedRow} setSelectedData={setSelectedData} />
                {(selectedData && selectedData != "Criando...") && <CotacoesProduto selectedData={selectedData} selectedProduto={selectedProduto} />}
            </Main>
                <Filter filter={filter} setFilter={setFilter} placeholder="Pesquise pelo produto..." />
                <ListProdutos setSelectedData={setSelectedData} data={filter ? filteredData : data} setSelectedProduto={setSelectedProduto} selectedRow={selectedRow} />
        </Container>
    );

};

export default Produtos;