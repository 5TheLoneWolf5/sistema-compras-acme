import { useEffect, useState } from "react";
import { listContatos } from "./CrudContatos";
import FormContatos from "./FormContatos";
import ListContatos from "./ListContatos";

const Contatos = (props) => {

    const [data, setData] = useState([]);
    const [selectedData, setSelectedData] = useState("");
    const [toggledClearRows, setToggleClearRows] = useState(false);

    useEffect(() => {

        const fetchData = async () => {
            setData(await listContatos());
            // console.log("Fresh data.");
        };

        // console.log(data);

        fetchData();

    }, [selectedData]);

    return (
        <>
            <h1>Registrar e Ler Contatos de Fornecedores</h1>
            <p>Caso queira, é possível adicionar apenas o email ou o número de contato em uma única entrada, mas é <strong>obrigatório</strong> a existência de um ponto de contato.</p>
            <FormContatos selectedData={selectedData} setSelectedData={setSelectedData} setToggleClearRows={setToggleClearRows} />
            <ListContatos setSelectedData={setSelectedData} data={data} />
        </>
    );

};

export default Contatos;