import styled from "styled-components";
import Modal from "../../../componentes/Modal";
import CotacaoRow from "./CotacaoRow";
import CotacaoCreate from "./CotacaoCreate";
import { useContext, useEffect, useState } from "react";
import { formatDate } from "../../../utils/functions";
import AuthContext from "../../../contexts/AuthContext";

const CotacaoInfo = styled.div`

`;

const Cotacoes = (props) => {

    const [approvedQuotation, setApprovedQuotation] = useState();

    const auth = useContext(AuthContext);

    useEffect(() => {

        setApprovedQuotation(props.data?.cotacoes ? props.data.cotacoes.filter((item) => item.ehAprovada === true)[0] : []);

    }, [props.selectedData]);

    // useEffect(() => console.log(props.data));
    
    // console.log(props.data);
    return (
        <>
            <Modal activateModal={props.activateModal} setActivateModal={props.setActivateModal}>
                <CotacaoInfo>
                    <h2>Cotações</h2>
                    <p>Requisição aberta por <strong>{props.data.emailUsuario}</strong> ({formatDate(props.data.dataAbertura).split(" ").join(" — ")}).</p>
                    <p>Pedido: {props.data.requisicao}</p>
                    <p>Justificativa: {props.data.justificativa}</p>
                    <p>Status: {props.data.status}</p>
                    {auth.userAuth.role === "admin" && <p>Cadastre <u>até 3 cotações</u> e aprove a desejada.</p>}
                </CotacaoInfo>
                {(auth.userAuth.role === "admin" && props.data?.cotacoes.length < 3) && <CotacaoCreate data={props.data} setSelectedRow={props.setSelectedRow} setSelectedData={props.setSelectedData} />}
                <br />
                {props.data?.cotacoes && props.data.cotacoes.map((item, idx) => (
                    <CotacaoRow key={idx} quotation={item} request={props.data} idx={idx} approvedQuotation={approvedQuotation} setApprovedQuotation={setApprovedQuotation} sizes={props.sizes} setSelectedRow={props.setSelectedRow} setSelectedData={props.setSelectedData} />
                ))}
            </Modal>
        </>
    );

};

export default Cotacoes;