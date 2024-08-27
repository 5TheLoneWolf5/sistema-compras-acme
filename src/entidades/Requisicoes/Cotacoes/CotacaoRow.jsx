import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import AuthContext from "../../../contexts/AuthContext";
import { updateRequisicao } from "../CrudRequisicoes";

const ContainerCotacao = styled.div`

    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    border-radius: 5px;
    background-color: ${(props) => props.$approvedQuotationId === props.$quotationId && props.$approvedQuotationId && props.$quotationId ? "#D1FFBD" : "white"};
    padding: 8px;

    @media (min-width: ${(props) => props.sizes.small}) {
        flex-direction: row;
        justify-content: flex-start;
    }

`;

const ApproveButton = styled.button`

    display: flex;
    width: fit-content;
    align-items: center;
    gap: 5px;
    border-radius: 5px;
    background-color: #a9ffa1;
    padding: 5px 10px;
    cursor: pointer;

`;

const ApproveSection = styled.div`

    display: flex;
    align-items: center;

`;

const EditSection = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;

    & > input, & > select {
        width: 140px;
    }

    @media (min-width: ${(props) => props.sizes.small}) {
        flex-direction: row;
        gap: 5px;
    }

`;

const CotacaoRow = (props) => {

    // console.log(props.approvedQuotation[0]);
    // console.log(props.data.id);
    // console.log(props.approvedQuotation?.id, props.data.id)

    const [rowData, setRowData] = useState({  });

    const auth = useContext(AuthContext);

    const handleApprove = () => {

        let tempArray = structuredClone(props.request.cotacoes);
        tempArray.splice(tempArray.findIndex((item) => item.id === props.quotation.id), 1);
        // console.log(props.quotation, props.request.cotacoes)
        // console.log(tempArray.indexOf(props.quotation));
        console.log({...props.request, cotacoes: [...tempArray, { ...props.quotation, ehAprovada: true } ].sort((a, b) => a.id - b.id)});

        const newRequestList = {...props.request, cotacoes: [...tempArray, { ...props.quotation, ehAprovada: true } ].sort((a, b) => a.id - b.id)};
        updateRequisicao(newRequestList, props.request.id);
        props.setSelectedRow(newRequestList);
        props.setSelectedData("Approve " + props.quotation.id);

    };

    const handleEdit = () => {

        props.setSelectedData("Edit " + props.quotation.id);

    };

    const handleDelete = () => {

        // console.log({...props.request, cotacoes: [...props.request.cotacoes.filter((item) => item.id != props.data.id)]});
        const newRequestList = {...props.request, cotacoes: [...props.request.cotacoes.filter((item) => item.id != props.quotation.id)]};
        updateRequisicao(newRequestList, props.request.id);
        props.setSelectedRow(newRequestList);
        props.setSelectedData("Delete " +  + props.quotation.id);

    };

    return (
        <ContainerCotacao sizes={props.sizes} $approvedQuotationId={props.approvedQuotation?.id} $quotationId={props.quotation.id}>
            <ApproveSection sizes={props.sizes}>
                <span style={{ fontSize: "1.5em"}}>{props.idx + 1}.</span>
                {(!props.approvedQuotation && auth.userAuth.role === "admin") && <ApproveButton onClick={handleApprove}><img src="../src/assets/approve.svg" width="30px"/>Aprovar?</ApproveButton>}
            </ApproveSection>
            <EditSection sizes={props.sizes}>
                <input value={props.quotation.preco} disabled />
                <select defaultValue={props.quotation.idProduto} disabled>
                    <option value={props.quotation.idProduto}>{props.quotation.produto}</option>
                </select>
                <select defaultValue={props.quotation.idFornecedor} disabled>
                    <option value={props.quotation.idFornecedor}>{props.quotation.fornecedor}</option>
                </select>
                {auth.userAuth.role === "admin" && 
                <>
                    <button onClick={handleEdit}><img src="../src/assets/edit.svg" width="30px" title="Editar" /></button>
                    <button onClick={handleDelete}><img src="./src/assets/remove.svg" width="30px" title="Remover"/></button>
                </>}
            </EditSection>
        </ContainerCotacao>
    );

};

export default CotacaoRow;