import { useContext, useEffect, useState } from "react";
import { listContatos } from "./CrudContatos";
import FormContatos from "./FormContatos";
import ListContatos from "./ListContatos";
import AuthContext from "../../contexts/AuthContext";
import Filter from "../../componentes/Filter";

const Contatos = (props) => {

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
            setData(await listContatos());
            // console.log("Fresh data.");
        };

        // console.log(data);

        fetchData();

    }, [selectedData]);

    useEffect(() => {

        setFilteredData(data.filter((item) => item?.nome.toLowerCase().startsWith(filter.toLowerCase())));

    }, [filter]);

    return (
        <>
            <h1>Registrar e Ler Contatos de Fornecedores</h1>
            <p>Caso queira, é possível adicionar apenas o email ou o número de contato em uma única entrada, mas é <strong>obrigatório</strong> a existência de um ponto de contato.</p>
            <FormContatos selectedData={selectedData} setSelectedData={setSelectedData} setToggleClearRows={setToggleClearRows} />
            <Filter filter={filter} setFilter={setFilter} placeholder="Pesquise pelo fornecedor ou empresa..." />
            <ListContatos setSelectedData={setSelectedData} data={filter ? filteredData : data} />
        </>
    );

};

export default Contatos;