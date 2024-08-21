import { useContext, useEffect, useState } from "react";
import { listCotacoes } from "./CrudCotacao";
import FormCotacoes from "./FormCotacoes";
import ListCotacoes from "./ListCotacoes";
import AuthContext from "../../contexts/AuthContext";
import Filter from "../../componentes/Filter";

const Cotacao = (props) => {

    const [data, setData] = useState([]);
    const [selectedData, setSelectedData] = useState("");
    const [toggledClearRows, setToggleClearRows] = useState(false);
    const [filter, setFilter] = useState("");
    const [filteredData, setFilteredData] = useState([]);

    const auth = useContext(AuthContext);

    useEffect(() => {

        auth.setUserAuth({ ...auth.userAuth, route: window.location.pathname });

    }, []);

    useEffect(() => {

        const fetchData = async () => {
            setData(await listCotacoes());
            // console.log("Fresh data.");
        };

        // console.log(data);

        fetchData();

    }, [selectedData]);

    useEffect(() => {

        setFilteredData(data.filter((item) => {

            const conditions = item?.produto.toLowerCase().startsWith(filter.toLowerCase()) 
            || item?.fornecedor.toLowerCase().startsWith(filter.toLowerCase())
            || item?.preco === +filter;

            return conditions;

        }));

    }, [filter]);

    return (
        <>
            <h1>Registrar e Ler Cotações de Produtos</h1>
            <FormCotacoes selectedData={selectedData} setSelectedData={setSelectedData} setToggleClearRows={setToggleClearRows} />
            <Filter filter={filter} setFilter={setFilter} placeholder="Pesquise pelo produto, fornecedor ou preço da cotação..." />
            <ListCotacoes setSelectedData={setSelectedData} data={filter ? filteredData : data} />
        </>
    );

};

export default Cotacao;