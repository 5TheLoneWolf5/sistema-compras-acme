import { useEffect, useState } from "react";
import { listContatos } from "../Contatos/CrudContatos";
import styled from "styled-components";
import { obtainFornecedor } from "./CrudFornecedores";

const Column = styled.aside`

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border: 1px solid black;
    padding: 10px;
    height: fit-content;
    margin-right: 10px;

`;

const Item = styled.aside`

    width: 100%;
    margin: auto;

`;

const ContatoTitle = styled.h3`


`;

const ContatosFornecedor = (props) => {

    const [contatos, setContatos] = useState([]);
    // const [nomeFornecedor, setNomeFornecedor] = useState("");

    useEffect(() => {

        const generateContatos = async () => {

            const data = await listContatos();
            let result = [];
            let count = 0;

            for (let item in data) {

                if (props.selectedData === data[item]["idFornecedor"]) {
                    result.push(
                        <Item key={count}>
                            <ContatoTitle>Contato {++count}</ContatoTitle>
                            <p>Email: {data[item]["email"]}</p>
                            <p>Número: {data[item]["numero"]}</p>
                            <hr />
                        </Item>,);
                }

            }

            // console.log(result);

            if (result.length !== 0) {
                setContatos(result);
            } else {
                setContatos([<p key={0}>Não há contatos.</p>]);
            }

            // console.log(result);
    
        };

        generateContatos();

    }, []);

    // useEffect(() => {

    //     const getNome = async () => {

    //         obtainFornecedor(props.selectedData)
    //         .then((data) => setNomeFornecedor(data["nome"]));
        
    //     };

    //     getNome();

    // }, []);

    return (
        <Column>
            <h2>Contato(s) do Fornecedor <u>{props.selectedNome}</u></h2>
            {contatos.map(item => item)}
        </Column>
    );

};

export default ContatosFornecedor;