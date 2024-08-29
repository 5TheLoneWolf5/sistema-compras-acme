import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { listRequisicoes } from "../Requisicoes/CrudRequisicoes";
import Filter from "../../componentes/Filter";
import ExportTableCSV from "../../componentes/ExportTableCSV";
import AuthContext from "../../contexts/AuthContext";

const ComprasTable = styled.table`

    border: 1px solid black;
    margin: 10px auto 0;
    padding: 5px;
    width: fit-content;
    text-align: center;

    & > caption {
        text-align: right;
        caption-side: top;
        margin: 2px;
    }

    @media (min-width: ${(props) => props.sizes.small}) {
        width: ${(props) => props.sizes.small};
    }

`;

const ComprasHeader = styled.thead`

    border: 1px solid black;
    // text-align: left;

    & > tr > th {

        border: 1px solid black;
        padding: 5px;

    }

`;

const ComprasBody = styled.tbody`

    border: 1px solid black;

    & > tr > td {
        padding: 10px;
        border-right: 1px solid black;
        border-left: 1px solid black;
        border-bottom: 1px solid black;
    }

    & > tr:nth-child(even) {
        // background-color: #D3D3D3;
    }

`;

const Compras = (props) => {

    const [approvedQuotations, setApprovedQuotations] = useState([]);
    const [filter, setFilter] = useState("");

    const auth = useContext(AuthContext);

    useEffect(() => {

        auth.setUserAuth({ ...auth.userAuth, route: window.location.pathname });

        const fetchData = async () => { 

            const data = await listRequisicoes();
            let tempArray = [];

            for (let i = 0; i < data.length; i++) {

                const filterApproved = data[i].cotacoes.filter((item) => item.ehAprovada === true)[0];

                if (filterApproved) {
                    tempArray.push(filterApproved);
                }

            }

            // console.log(tempArray);
            setApprovedQuotations(tempArray); 

        };

        fetchData();

    }, []);

    const filteredQuotations = () => {

        const filteredData = approvedQuotations.filter((item) => {
            
            const conditions = item?.preco === +filter
            || item?.produto.toLowerCase().includes(filter.toLowerCase()) 
            || item?.fornecedor.toLowerCase().includes(filter.toLowerCase());
            
            return conditions;

        });

        if (filteredData) {
            return filteredData;
        } else {
            return approvedQuotations;
        }

    };

    return (
        <>
            {approvedQuotations.length > 0 ?
            <>
                <h1>Tabela de Compras</h1>
                <p>Compras confirmadas no sistema.</p>
                <Filter filter={filter} setFilter={setFilter} placeholder="Pesquise pelo preço, produto, ou fornecedor..." />
                <div style={{ overflowX: "auto", }}>
                    <ComprasTable sizes={props.sizes}>
                        <caption><ExportTableCSV data={filteredQuotations()} /></caption>
                        <ComprasHeader>
                            <tr>
                                <th>Preço</th>
                                <th>Produto</th>
                                <th>Fornecedor</th>
                            </tr>
                        </ComprasHeader>
                        <ComprasBody>
                            {
                                filteredQuotations().map((item, idx) => { 
                                    return <tr key={idx}>
                                        <td>R$ {item.preco}</td>
                                        <td>{item.produto}</td>
                                        <td>{item.fornecedor}</td>
                                    </tr>
                                })
                            }
                        </ComprasBody>
                    </ComprasTable>
                </div>
            </>
             : <h1>Não dá compras registradas no sistema.</h1>}
        </>
    );

};

export default Compras;