import { useState } from "react";
import styled from "styled-components";
import { updateRequisicao } from "../CrudRequisicoes";

const ContainerCotacaoCreate = styled.div`
    
        display: flex;
        flex-direction: column;
        gap: 15px;
        border: 1px solid black;
        border-bottom: 5px solid gray;
        padding: 8px;
        border-radius: 5px;

        & > button {
        
            cursor: pointer;

        }

    `;

const ContainerPreco = styled.label`

    display: flex;
    background-color: white;
    border: 1px solid black;
    padding: 5px;

    & > input {
    
        border: 1px solid;
        width: 100%;

    }

    & > * {
    
        padding: 5px;

    }

`;

const Currency = styled.span`

    border: 1px solid black;

`;

const CotacaoCreate = (props) => {

    const [inputPreco, setInputPreco] = useState(0);
    const [inputProduto, setInputProduto] = useState("Default");
    const [inputFornecedor, setInputFornecedor] = useState("Default");

    // useEffect(() => {

    // }, [inputPreco]);

    // useEffect(() => {

    // }, [inputProduto]);
    
    // useEffect(() => {

        
    // }, [inputFornecedor]);

    const handleCreate = async () => {

        // console.log(inputProduto, inputFornecedor);
        const idProduto = JSON.parse(inputProduto)["0"];
        const produtoValue = JSON.parse(inputProduto)["1"];

        const idFornecedor = JSON.parse(inputFornecedor)["0"];
        const fornecedorValue = JSON.parse(inputFornecedor)["1"];
        // console.log(props.data);

        let id;
        let newRequestList = {};

        if (props.data?.cotacoes?.length > 0) {

            id = props.data.cotacoes[props.data.cotacoes.length - 1].id + 1;

            newRequestList = { ...props.data, cotacoes: [...props.data?.cotacoes, { id: id, preco: +inputPreco, idProduto: idProduto, produto: produtoValue, idFornecedor: idFornecedor, fornecedor: fornecedorValue, ehAprovada: false, }] };

            await updateRequisicao(newRequestList, props.data.id);

        } else {

            id = 1;

            newRequestList = { ...props.data, cotacoes: [{ id: id, preco: +inputPreco, idProduto: idProduto, produto: produtoValue, idFornecedor: idFornecedor, fornecedor: fornecedorValue, ehAprovada: false, }] };

            await updateRequisicao(newRequestList, props.data.id);

        }

        // console.log(newRequestList);
        props.setSelectedRow(newRequestList);
        setInputPreco(0);
        setInputProduto("Default");
        setInputFornecedor("Default");

    };
    
    return (
        <ContainerCotacaoCreate>
            <p>Crie uma nova cotação:</p>
            <label htmlFor="preco">
                Preço:
                <ContainerPreco htmlFor="preco">
                    <Currency>R$</Currency>
                    <input type="number" min={0} value={inputPreco} onChange={(e) => setInputPreco(e.target.value)} required />
                </ContainerPreco>
            </label>
            
            <label htmlFor="produto">
                Produto:<br />
                <select className="selectNome" value={inputProduto} onChange={(e) => setInputProduto(e.target.value)} style={{ padding: "5px", width: "100%" }} required>
                    <option value="Default" disabled>Selecione...</option>
                    {props.produto.map((item) => item)}
                </select>
            </label>
            <label htmlFor="fornecedor">
                Fornecedor:<br />
                <select className="selectNome" value={inputFornecedor} onChange={(e) => setInputFornecedor(e.target.value)} style={{ padding: "5px", width: "100%" }} required>
                    <option value="Default" disabled>Selecione...</option>
                    {props.fornecedor.map((item) => item)}
                </select>
            </label>
            <button onClick={handleCreate}><img src="../src/assets/add.svg" width="30px" title="Adicionar" /></button>
        </ContainerCotacaoCreate>
    );

};

export default CotacaoCreate;