import { useEffect, useState } from "react";
import { listCotacoes } from "./CrudCotacao";
import FormCotacoes from "./FormCotacoes";
import ListCotacoes from "./ListCotacoes";

const Cotacao = (props) => {

    const [data, setData] = useState([]);
    const [selectedData, setSelectedData] = useState("");
    const [toggledClearRows, setToggleClearRows] = useState(false);

    useEffect(() => {

        const fetchData = async () => {
            setData(await listCotacoes());
            // console.log("Fresh data.");
        };

        // console.log(data);

        fetchData();

    }, [selectedData]);

    return (
        <>
            <h1>Registrar e Ler Cotações de Produtos</h1>
            <FormCotacoes selectedData={selectedData} setSelectedData={setSelectedData} setToggleClearRows={setToggleClearRows} />
            <ListCotacoes setSelectedData={setSelectedData} data={data} />
        </>
    );

};

export default Cotacao;