import styled from "styled-components";
import Modal from "../../../componentes/Modal";
import CotacaoRow from "./CotacaoRow";
import CotacaoCreate from "./CotacaoCreate";
import { useContext, useEffect, useState } from "react";
import { formatDate } from "../../../utils/functions";
import AuthContext from "../../../contexts/AuthContext";
import { listProdutos } from "../../Produtos/CrudProdutos";
import { listFornecedores } from "../../Fornecedores/CrudFornecedores";
import ExportTableCSV from "../../../componentes/ExportTableCSV";

const CotacaoInfo = styled.div`

`;

const changeStatus = (cotacoesLength) => {

    let result = "Aberta";

    if (cotacoesLength >= 1 && cotacoesLength < 3 ) {
        result = "Em Cotação";
    }

    if (cotacoesLength === 3) {
        result = "Cotada";
    }

    return result;

};

const Cotacoes = (props) => {

    const [approvedQuotation, setApprovedQuotation] = useState();
    const [produto, setProduto] = useState([]);
    const [fornecedor, setFornecedor] = useState([]);

    const auth = useContext(AuthContext);

    useEffect(() => {

        const generateOptionsProduto = async () => {

            const data = await listProdutos();
            let result = [];
    
            for (let item in data) {

                result.push(<option key={data[item]['id']} value={'{"0": "' + data[item]["id"] + '", "1": "' + data[item]["produto"] + '"}'}>{data[item]['produto']}</option>);
                // console.log(result);
            }

            // console.log(result);
    
            // Object.keys(data).map((item, idx) => <option>{data[item]["nome"]}</option>);
    
            setProduto(result);
    
        };

        const generateOptionsFornecedor = async () => {

            const data = await listFornecedores();
            let result = [];
    
            for (let item in data) {

                result.push(<option key={data[item]['id']} value={'{"0": "' + data[item]["id"] + '", "1": "' + data[item]["nome"] + '"}'}>{data[item]['nome']}</option>);
                // console.log(result);
            }
    
            // Object.keys(data).map((item, idx) => <option>{data[item]["nome"]}</option>);
    
            setFornecedor(result);
    
        };

        generateOptionsProduto();
        generateOptionsFornecedor();
        // console.log(getValues());

    }, []);

    useEffect(() => {

        setApprovedQuotation(props.data?.cotacoes ? props.data.cotacoes.filter((item) => item.ehAprovada === true)[0] : []);

    }, [props.selectedRow]);

    // useEffect(() => console.log(props.data));
    
    // console.log(props.data);
    return (
        <>
            <Modal activateModal={props.activateModal} setActivateModal={props.setActivateModal}>
                <CotacaoInfo>
                    <h2>Cotações</h2>
                    <p>• Requisição aberta por: <strong>{props.data.emailUsuario}</strong> ({formatDate(props.data.dataAbertura).split(" ").join(" — ")}).</p>
                    <p>• Pedido: {props.data.requisicao}</p>
                    <p>• Justificativa: {props.data.justificativa}</p>
                    <p>• Status: {props.data.status}.</p>
                    {auth.userAuth.role === "admin" && <p>Cadastre <u>até 3 cotações</u> e aprove a desejada.</p>}
                    <ExportTableCSV data={props.data?.cotacoes} />
                </CotacaoInfo>
                {(auth.userAuth.role === "admin" && props.data?.cotacoes.length < 3) && <CotacaoCreate data={props.data} setSelectedRow={props.setSelectedRow} produto={produto} fornecedor={fornecedor} changeStatus={changeStatus} />}
                <br />
                {props.data?.cotacoes && props.data.cotacoes.map((item, idx) => (
                    <CotacaoRow key={idx} quotation={item} request={props.data} idx={idx} approvedQuotation={approvedQuotation} setApprovedQuotation={setApprovedQuotation} sizes={props.sizes} setSelectedRow={props.setSelectedRow} produto={produto} fornecedor={fornecedor} changeStatus={changeStatus} />
                ))}
            </Modal>
        </>
    );

};

export default Cotacoes;