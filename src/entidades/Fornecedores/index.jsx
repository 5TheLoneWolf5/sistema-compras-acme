import { useContext, useEffect, useState } from "react";
import ContatosFornecedor from "./ContatosFornecedor";
import FormFornecedores from "./FormFornecedores";
import ListFornecedores from "./ListFornecedores";
import styled from "styled-components";
import { listFornecedores } from "./CrudFornecedores";
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

const Fornecedores = (props) => {

    const [data, setData] = useState([]);
    const [selectedData, setSelectedData] = useState("");
    const [selectedRow, setSelectedRow] = useState(false);
    const [selectedNome, setSelectedNome] = useState("");
    const [filter, setFilter] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    
    const auth = useContext(AuthContext);

    const fetchData = async () => setData(await listFornecedores());

    useEffect(() => {

        auth.setUserAuth({ ...auth.userAuth, route: window.location.pathname });

    }, []);

    useEffect(() => {

        // console.log(selectedData);

        fetchData();

        // console.log(toggledClearRows);
        // console.log(data);

    }, [selectedData]);

    useEffect(() => {

        // console.log(filter);

        setFilteredData(data.filter((item) => item?.nome.toLowerCase().startsWith(filter.toLowerCase())));

        // console.log(data.filter((item, idx) => item[idx].nome.startsWith(item)));
        // setData(data.filter((item, idx) => item[idx].nome.startsWith(item)));

    }, [filter]);

    return (
        <Container>
            <h1>Registrar e Ler Fornecedores</h1>
            <p>Você pode selecionar um fornecedor na tabela para obter seus pontos de contato.</p>
            <Main sizes={props.sizes}>
                <FormFornecedores selectedData={selectedData} setSelectedRow={setSelectedRow} setSelectedData={setSelectedData} />
                {(selectedData && selectedData != "Criando...") && <ContatosFornecedor selectedData={selectedData} selectedNome={selectedNome} />}
            </Main>
                <Filter filter={filter} setFilter={setFilter} placeholder="Pesquise pelo fornecedor..." />
                <ListFornecedores setSelectedData={setSelectedData} data={filter ? filteredData : data} setSelectedNome={setSelectedNome} selectedRow={selectedRow} />
        </Container>
    );

};

export default Fornecedores;