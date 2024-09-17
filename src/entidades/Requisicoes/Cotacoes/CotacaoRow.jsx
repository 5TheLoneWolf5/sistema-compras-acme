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

    &:hover {
    
        background-color: #AFE1AF;

    }

    &:active {
    
        background-color: #50C878;

    }

`;

const ApproveSection = styled.div`

    display: flex;
    gap: 3px;
    flex-direction: column;
    align-items: center;

    @media (min-width: ${(props) => props.sizes.small}) {
        flex-direction: row;
        gap: 5px;
    }

`;

const EditSection = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    & > input, & > select {
        width: 100%;
        height: 30px;
    }

    & > div, & > div > div.containerEditButtons {

        width: 100%;

    }

    & > div > div.containerEditButtons {
    
        display: flex;
        flex-direction: column;

    }

    & > div > div.containerEditButtons > button {
    
        cursor: pointer;
        margin: 2px;
        width: 100%;

    }

    & > div > div.containerEditButtons > button > img {
    
        width: 30px;

    }

    @media (min-width: ${(props) => props.sizes.small}) {
    
        flex-direction: row;
        gap: 5px;

        & > input, & > select {
            width: 140px;
        }

        & > div > div.containerEditButtons {

            flex-direction: row;

        }

    }

`;

const HRMobile = styled.hr`

    width: 100%;

    // @media (min-width: ${(props) => props.sizes.small}) {
    //     display: none;
    // }

`;

const CotacaoRow = (props) => {

    // console.log(props.approvedQuotation[0]);
    // console.log(props.data.id);
    // console.log(props.approvedQuotation?.id, props.data.id)

    const [inputPreco, setInputPreco] = useState(props.quotation.preco);
    const [inputProduto, setInputProduto] = useState('{"0": "' + props.quotation.idProduto + '", "1": "' + props.quotation.produto.replaceAll("\"", "'") + '"}');
    const [inputFornecedor, setInputFornecedor] = useState('{"0": "' + props.quotation.idFornecedor + '", "1": "' + props.quotation.fornecedor.replaceAll("\"", "'") + '"}');
    const [toggleEdit, setToogleEdit] = useState(false);

    // const [inputProduto, setInputProduto] = useState("{'0': '" + props.quotation.idProduto + "', '1': '" + props.quotation.produto + "'}");

    const auth = useContext(AuthContext);

    // useEffect(() => console.log(inputProduto));

    const handleApprove = async () => {

        let tempArray = structuredClone(props.request.cotacoes);
        tempArray.splice(tempArray.findIndex((item) => item.id === props.quotation.id), 1);
        // console.log(props.quotation, props.request.cotacoes);
        // console.log(tempArray.indexOf(props.quotation));
        // console.log({...props.request, cotacoes: [...tempArray, { ...props.quotation, ehAprovada: true } ].sort((a, b) => a.id - b.id)});

        const newRequestList = {...props.request, cotacoes: [...tempArray, { ...props.quotation, ehAprovada: true } ].sort((a, b) => a.id - b.id)};
        await updateRequisicao(newRequestList, props.request.id);
        props.setSelectedRow(newRequestList);

    };

    const handleEdit = () => {

        setToogleEdit(true);

    };

    const handleConfirm = async () => {

        let tempArray = structuredClone(props.request.cotacoes);
        tempArray.splice(tempArray.findIndex((item) => item.id === props.quotation.id), 1);
        // console.log(inputPreco, inputProduto, inputFornecedor);
        const idProduto = JSON.parse(inputProduto)["0"];
        const produtoValue = JSON.parse(inputProduto)["1"];

        const idFornecedor = JSON.parse(inputFornecedor)["0"];
        const fornecedorValue = JSON.parse(inputFornecedor)["1"];

        const newRequestList = {...props.request, cotacoes: [...tempArray, { ...props.quotation, preco: +inputPreco, idProduto: idProduto, produto: produtoValue, idFornecedor: idFornecedor, fornecedor: fornecedorValue, } ].sort((a, b) => a.id - b.id)};
        // console.log(newRequestList);
        await updateRequisicao(newRequestList, props.request.id).then(() => {

            props.setSelectedRow(newRequestList);

            setToogleEdit(false);

        });

    };

    const handleCancel = () => {

        setToogleEdit(false);
        setInputPreco(props.quotation.preco);
        setInputProduto(props.quotation.idProduto);
        setInputFornecedor(props.quotation.idFornecedor);

    };

    const handleDelete = async () => {

        // console.log({...props.request, cotacoes: [...props.request.cotacoes.filter((item) => item.id != props.data.id)]});
        const newRequestList = {...props.request, status: props.changeStatus(props.request.cotacoes.length - 1), cotacoes: [...props.request.cotacoes.filter((item) => item.id != props.quotation.id)]};
        await updateRequisicao(newRequestList, props.request.id);
        props.setSelectedRow(newRequestList);

    };

    return (
        <>
            <ContainerCotacao sizes={props.sizes} $approvedQuotationId={props.approvedQuotation?.id} $quotationId={props.quotation.id}>
                <ApproveSection sizes={props.sizes}>
                    <span style={{ fontSize: "1.5em", border: "1px solid", borderRadius: "30px", padding: "8px 10px", backgroundColor: "white" }}>{props.idx + 1}ª</span>
                    {(!props.approvedQuotation && auth.userAuth.role === "admin" && props.request.cotacoes.length === 3) && <ApproveButton onClick={handleApprove} disabled={toggleEdit}><img src="../src/assets/approve.svg" width="30px"/>Aprovar?</ApproveButton>}
                </ApproveSection>
                <EditSection sizes={props.sizes}>
                    <input type="number" min={0} value={inputPreco} onChange={(e) => setInputPreco(e.target.value)} disabled={!toggleEdit} />
                    <select disabled={!toggleEdit} value={inputProduto} onChange={(e) => setInputProduto(e.target.value)} required>
                        {/* <option value={props.quotation.idProduto}>{props.quotation.produto}</option> */}
                        {props.produto.map((item) => item)}
                    </select>
                    <select disabled={!toggleEdit} value={inputFornecedor} onChange={(e) => setInputFornecedor(e.target.value)} required>
                        {/* <option value={props.quotation.idFornecedor}>{props.quotation.fornecedor}</option> */}
                        {props.fornecedor.map((item) => item)}
                    </select>
                    {auth.userAuth.role === "admin" && 
                    <div>
                        { !toggleEdit ?
                        <div className="containerEditButtons">
                            <button onClick={handleEdit}><img src="../src/assets/edit.svg" title="Editar" /></button>
                            <button onClick={handleDelete}><img src="./src/assets/remove.svg" title="Remover"/></button>
                        </div> : 
                        <div className="containerEditButtons">
                            <button onClick={handleConfirm}><img src="../src/assets/checkmark.svg" title="Confirmar" /></button>
                            <button onClick={handleCancel}><img src="./src/assets/cancel.svg" title="Cancelar"/></button>
                        </div> }
                    </div> }
                </EditSection>
            </ContainerCotacao>
            <HRMobile sizes={props.sizes} />
        </>
    );

};

export default CotacaoRow;