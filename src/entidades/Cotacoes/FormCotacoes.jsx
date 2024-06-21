import { useForm } from "react-hook-form";
import styled from "styled-components";
import { insertCotacao, obtainCotacao, removeCotacao, updateCotacao } from "./CrudCotacao";
import { useEffect, useState } from "react";
import { listProdutos } from "../Produtos/CrudProdutos";
import { listFornecedores } from "../Fornecedores/CrudFornecedores";
import { regexEmail, regexNumber } from "../../utils/regex";

const Form = styled.form`
    width: 250px;
    margin: 10px auto;
    background-color: #F5F5F5;
    border-radius: 4px;
    padding: 5px;

    & > *, & > * > * {
        width: 100%;
        padding: 5px;
    }

    & > label {
        display: flex;
        flex-direction: column;
    }
`;

const CrudButtons = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;

    & > label {
        display: flex;
        justify-content: space-between;
    }

    & > label > input {
        flex: 0.9 1 auto;
    }

    & > label > img {
        width: 30px;
    }
`;

const ErrorSection = styled.div`
    margin: 15px auto;
    width: 180px;
    border: 5px red solid;
    background-color: #f59987;
    padding: 10px;
    font-weight: bold;
    margin-top: 20px;
`;

const convertToUnix = (date) => {}



;

const FormCotacoes = (props) => {

    const { register, handleSubmit, formState: { errors, isSubmitted }, reset, setValue, getValues, setError } = useForm();
    const [options, setOptions] = useState([]);
    const [optionsProdutos, setOptionsProdutos] = useState([]);
    const [optionsFornecedores, setOptionsFornecedores] = useState([]);
    // const [fornecedorRef, setFornecedorRef] = useState({});

    useEffect(() => {

        const generateProdutos = async () => {

            const data = await listProdutos();
            let result = [];
    
            for (let item in data) {
                
                result.push(<option value={'{"0": "' + data[item]["id"] + '", "1": "' + data[item]["produto"] + '"}'} key={data[item]["id"]}>{data[item]["produto"]}</option>);
                // console.log(result);
            }
    
            // Object.keys(data).map((item, idx) => <option>{data[item]["nome"]}</option>);
    
            setOptions(result);
    
        };

        const generateFornecedores = async () => {

            const data = await listFornecedores();
            let result = [];
    
            for (let item in data) {
                
                result.push(<option value={'{"0": "' + data[item]["id"] + '", "1": "' + data[item]["nome"] + '"}'} key={data[item]["id"]}>{data[item]["nome"]}</option>);
                // console.log(result);
            }
    
            // Object.keys(data).map((item, idx) => <option>{data[item]["nome"]}</option>);
    
            setOptions(result);
    
        };

        generateProdutos();
        generateFornecedores();
        // console.log(getValues());

    }, []);

    useEffect(() => {

        const fillFields = async () => {

            /* Since I'm retrieving data from the server, it's important to note:
            - Input fields have no ID. This is generated automatically by firebase in the server. Which means that, when edited, the fields themselves don't have a reference to that specific row. This only happens because of the ID brought by the selection in the data table.
            - The value "nome" automatically selects the correct option because the value set shares the same data.
            - React Data Table gets its data directly from firebase, which means it has access to the ID field and all the others. */

            // console.log(props.selectedData, isSubmitted);

            if (props.selectedData === "Criando...") {

                console.log("Criando dado - condição especial para criação de novos documentos.");

            } else if (props.selectedData && !isSubmitted) {
                const cotacao = await obtainCotacao(props.selectedData);
                // document.querySelector(".selectNome").innerHTML = <option>{contato.nome}</option>;

                // ID does not change or has a field. It continues to be the same, and the reference exists in the selectedData, retrieved from the Data Table (which gets data from firebase, but only renders the chosen fields).
                // setValue("id", props.selectedData);
                setValue("produto", '{"0": "' + cotacao.idProduto + '", "1": "' + cotacao.produto + '"}');
                setValue("fornecedor", '{"0": "' + cotacao.idFornecedor + '", "1": "' + cotacao.nome + '"}');
                setValue("preco", cotacao.preco);
                setValue("dataCompra", cotacao.DataCompra);
                // setValue("idFornecedor", contato.idFornecedor);
                // console.log(getValues("nome"));
            } else {
                // props.setToggleClearRows(true); // Because it is in useEffect.
                reset(); // When selectedData is empty (unselected), the form is reset.
            }

        };

        fillFields();

    }, [props.selectedData]);

    const validateCotacoes = () => {

        ///// My own validations. /////

        /* This way, I can control the flow of validations (how I want the tests to be done [its logic], and when).
           Conditionals are stacked on top of each other so there's an else. */
           
        const [produto, fornecedor, preco, dataCompra] = [getValues("produto"), getValues("fornecedor"), getValues("preco"), getValues("dataCompra")];
        
        // console.log(nome, email, numero);
        // console.log(regexEmail.test(email), regexNumber.test(numero));

        if (produto === "Default") {

            setError("produto", {
                type: "Erro default: Produto não selecionado.",
                message: "Nome do produto não foi selecionado."
            });
            
        } else if (fornecedor === "Default") {

            setError("fornecedor", {
                type: "Erro default: Fornecedor não selecionado.",
                message: "Nome do fornecedor não foi selecionado."
            });

        } else {

            return true;

        }

        return false;

    };

    const handleCreate = async (data) => {

         if (validateCotacoes()) {
            // Setting a value to selectedData so values get updated when the form data gets wiped out.
            props.setSelectedData("Criando...");
            const idFirebase = await insertCotacao(data); // Obtaining the ID created by Firebase so the reference is not lost here.
            // It would be used if render were forced regardless if selected is the same as before (this case is happening when document is created and then selected again);
            // props.setSelectedData(idFirebase);
            // reset();
            props.setSelectedData("");
            props.setToggleClearRows(true);
        }

    };

    // const handleNome = (e) => {

    //     const id = JSON.parse(e.target.value)["0"];

    //     setFornecedorRef(id);

    // };

    const handleEdit = async () => {

        if (props.selectedData) {

            // console.log(getValues());

            const values = getValues();
            // console.log(values);
            values.id = props.selectedData;
            // console.log(values);

            await updateCotacao(values);
            props.setSelectedData("");
            props.setToggleClearRows(true);

        } else {
            console.log("Dado não selecionado para ser atualizado.");
        }


    };

    const handleRemove = async () => {

        if (props.selectedData) {
            await removeCotacao(props.selectedData);
            props.setSelectedData("");
            props.setToggleClearRows(true);
        } else {
            console.log("Dado não selecionado para ser removido.");
        }

    };

    return (
        <div>
            <Form onSubmit={handleSubmit(handleCreate)}>
                <label htmlFor="produto">
                    Produto:<br />
                    <select {...register("produto", {
                        required: "Produto é obrigatório",
                    })} defaultValue={"Default"} className="selectNome">
                        <option value="Default" disabled>Selecione...</option>
                        {options.map(item => item)}
                    </select>
                </label>
                <br />
                <label htmlFor="fornecedor">
                    Fornecedor:<br />
                    <select {...register("fornecedor", {
                        required: "Fornecedor é obrigatório",
                    })} defaultValue={"Default"} className="selectNome">
                        <option value="Default" disabled>Selecione...</option>
                        {options.map(item => item)}
                    </select>
                </label>
                <br />
                <label htmlFor="preco">
                    Preço:<br />
                    <input {...register("preco", {
                        required: "Preço é obrigatório",
                    })} />
                </label>
                <br />
                <label htmlFor="dataCompra">
                    Data de Compra:<br />
                    <input {...register("dataCompra", { })} type="date" />
                </label>
                <br />
                <CrudButtons>
                    <label>
                        <input type="submit" value="Criar" size={100} />
                        <img src="./src/assets/add.svg" />
                    </label>
                    <label>
                        <input type="button" value="Editar" onClick={handleEdit}/>
                        <img src="./src/assets/edit.svg" />
                    </label>
                    <label>
                        <input type="button" value="Remover" onClick={handleRemove} />
                        <img src="./src/assets/remove.svg" />
                    </label>
                </CrudButtons>
            </Form>
            <div>
                {(errors.produto?.message) && (
                    <ErrorSection>{errors.produto.message}</ErrorSection>
                )}
                {errors.fornecedor?.message && (
                    <ErrorSection>{errors.fornecedor.message}</ErrorSection>
                )}
                {errors.preco?.message && (
                    <ErrorSection>{errors.preco.message}</ErrorSection>
                )}
                {errors.dataCompra?.message && (
                    <ErrorSection>{errors.dataCompra.message}</ErrorSection>
                )}
            </div>
        </div>
    );

};

export default FormCotacoes;