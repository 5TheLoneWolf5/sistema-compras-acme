import { useContext, useEffect, useState } from "react";
import { listRequisicoes } from "./CrudRequisicoes";
import FormRequisicoes from "./FormRequisicoes";
import ListRequisicoes from "./ListRequisicoes";
import AuthContext from "../../contexts/AuthContext";
import Filter from "../../componentes/Filter";

const Requisicoes = (props) => {

    const [data, setData] = useState([]);
    const [selectedData, setSelectedData] = useState("");
    const [selectedStatus, setSelectedStatus] = useState([]);
    const [selectedRow, setSelectedRow] = useState(false);
    const [filter, setFilter] = useState("");
    const [filteredData, setFilteredData] = useState([]);

    const auth = useContext(AuthContext);

    // useEffect(() => console.log(data));

    useEffect(() => {

        auth.setUserAuth({ ...auth.userAuth, route: window.location.pathname });

    }, []);

    useEffect(() => {

        const fetchData = async () => {

            const data = await listRequisicoes();
            
            setData(auth.userAuth.role === "admin" ? data : data.filter((item) => item.emailUsuario === auth.userAuth.email));
            // console.log("Fresh data.");
        };

        fetchData();

    }, [selectedData]);

    useEffect(() => {

        setFilteredData(data.filter((item) => {
            
            const conditions = item?.emailUsuario.toLowerCase().startsWith(filter.toLowerCase()) 
            || item?.requisicao.toLowerCase().includes(filter.toLowerCase());
            
            return conditions;

        }));

    }, [filter]);

    return (
        <>
            <h1>Registrar e Ler Requisições</h1>
            <p>Clique em uma requisição para visualizar suas cotações.</p>
            <FormRequisicoes selectedData={selectedData} setSelectedData={setSelectedData} setSelectedRow={setSelectedRow} selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} />
            <Filter filter={filter} setFilter={setFilter} placeholder="Pesquise pelo usuário ou requisição..." />
            <ListRequisicoes setSelectedData={setSelectedData} setSelectedStatus={setSelectedStatus} data={filter ? filteredData : data} sizes={props.sizes} selectedRow={selectedRow} selectedData={selectedData} />
        </>
    );

};

export default Requisicoes;