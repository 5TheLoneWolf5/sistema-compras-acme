import { useEffect, useState } from "react";
import { listContatos } from "./CrudContatos";
import FormContatos from "./FormContatos";
import ListContatos from "./ListContatos";

const Contatos = (props) => {

    const [data, setData] = useState();
    const [selectedData, setSelectedData] = useState();

    useEffect(() => {

        const fetchData = async () => {
            setData(await listContatos());
        };

        // console.log(data);

        fetchData();

    }, []);

    return (
        <>
            <h1>Registrar e Ler Contatos</h1>
            <FormContatos />
            <ListContatos data={data} />
        </>
    );

};

export default Contatos;