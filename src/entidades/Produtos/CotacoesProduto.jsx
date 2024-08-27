import { useEffect, useState } from "react";
import styled from "styled-components";
import { listRequisicoes } from "../Requisicoes/CrudRequisicoes";
import { formatDate } from "../../utils/functions";

const Column = styled.aside`

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border: 1px solid black;
    padding: 10px;
    height: fit-content;

`;

const Item = styled.aside`

    width: 100%;
    margin: auto;

`;

const CotacaoTitle = styled.h3`


`;

const CotacoesProduto = (props) => {

    const [cotacoes, setCotacoes] = useState([]);

    useEffect(() => {

        const generateCotacoes = async () => {

            const data = await listRequisicoes();
            let result = [];
            let count = 0;

            for (let item in data) {

                // console.log(data[item]);

                if (data[item]?.cotacoes && data[item]?.cotacoes.length > 0) {

                    for (let cotacao in data[item].cotacoes) { 
                        // console.log(data[item]);
                        if (props.selectedData === data[item].cotacoes[cotacao]?.idProduto) {
                            result.push(
                                <Item key={count}>
                                    <CotacaoTitle>Produto {++count}</CotacaoTitle>
                                    {/* <p>Fornecedor: {data[item]["fornecedor"]}</p> */}
                                    <p>Preço: {data[item].cotacoes[cotacao]["preco"]}</p>
                                    <p>Fornecedor: {data[item].cotacoes[cotacao]["fornecedor"]}</p>
                                    <hr />
                                </Item>,);
                        }
    
                    }
    
                }

            }

            // console.log(result);

            if (result.length !== 0) {
                setCotacoes(result);
            } else {
                setCotacoes([<p key={0}>Não há cotações.</p>]);
            }

            // console.log(result);
    
        };

        generateCotacoes();

    }, [props.selectedData]); // So it updates even when between different values.

    return (
        <Column className="columnRelationship">
            <h2>Cotações(s) do Produto <u>{props.selectedProduto}</u></h2>
            {cotacoes.map(item => item)}
        </Column>
    );

};

export default CotacoesProduto;