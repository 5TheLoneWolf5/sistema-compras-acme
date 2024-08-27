import { useForm } from "react-hook-form";
import styled from "styled-components";
import { insertRequisicao, obtainRequisicao, removeRequisicao, updateRequisicao } from "./CrudRequisicoes";
import { useContext, useEffect, useState } from "react";
import { regexNumber } from "../../utils/regex";
import ErrorSection from "../../componentes/ErrorSection";
import FormCrud from "../../componentes/FormCrud";
import AuthContext from "../../contexts/AuthContext";

const CrudButtonsElements = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;

    & > label {
        display: flex;
        justify-content: space-between;
        cursor: pointer;
    }

    & > label > input {
        flex: 0.9 1 auto;
        cursor: pointer;
    }

    & > label > img {
        width: 30px;
    }
`;

const FormRequisicoes = (props) => {

    const { register, handleSubmit, formState: { errors, isSubmitted }, reset, setValue, getValues, setError } = useForm();
    const [optionsStatus, setOptionsStatus] = useState([]);
    // const [fornecedorRef, setFornecedorRef] = useState({});

    const auth = useContext(AuthContext);
    // console.log(auth);

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
                const requisicao = await obtainRequisicao(props.selectedData);
                // document.querySelector(".selectNome").innerHTML = <option>{contato.nome}</option>;
                
                // ID does not change or has a field. It continues to be the same, and the reference exists in the selectedData, retrieved from the Data Table (which gets data from firebase, but only renders the chosen fields).
                // setValue("id", props.selectedData);
                setValue("requisicao", requisicao.requisicao);
                setValue("justificativa", requisicao.justificativa);
                setValue("quantidade", requisicao.quantidade);
                auth.userAuth.role === "admin" ? setValue("status", requisicao.status) : null;
                // console.log(requisicao.status);
                // setValue("idFornecedor", contato.idFornecedor);
                // console.log(getValues("nome"));
            } else {
                // props.setToggleClearRows(true); // Because it is in useEffect.
                reset(); // When selectedData is empty (unselected), the form is reset.
            }

        };

        fillFields();

    }, [props.selectedData]);


    const handleCreate = async (data) => {

        // Setting a value to selectedData so values get updated when the form data gets wiped out.
        props.setSelectedData("Criando...");
        // console.log(data);

        const completeDataset = { ...data, emailUsuario: auth.userAuth.email, dataAbertura: new Date(), status: "Aberta", cotacoes: [] };
        // console.log(completeDataset);
        const idFirebase = await insertRequisicao(completeDataset); // Obtaining the ID created by Firebase so the reference is not lost here.
        // It would be used if render were forced regardless if selected is the same as before (this case is happening when document is created and then selected again);
        // props.setSelectedData(idFirebase);
        // reset();
        props.setSelectedData("");
        // props.setToggleClearRows(true);

    };

    const handleEdit = async () => {

        if (props.selectedData) {

            // console.log(getValues());
            
            // const values = getValues();
            // values.id = props.selectedData;
            // delete values["dataAbertura"];

            // console.log(getValues());

            await updateRequisicao(getValues(), props.selectedData);
            props.setSelectedData("");
            props.setSelectedRow((item) => !item);
            props.setSelectedStatus([]);

        } else {
            console.log("Dado não selecionado para ser atualizado.");
        }

    };

    const handleRemove = async () => {

        if (props.selectedData) {

            await removeRequisicao(props.selectedData);
            props.setSelectedData("");
            props.setSelectedRow((item) => !item);
            props.setSelectedStatus([]);

        } else {

            console.log("Dado não selecionado para ser removido.");

        }

    };

    return (
        <div>
            <FormCrud onSubmit={handleSubmit(handleCreate)}>
            {auth.userAuth.role === "user" && 
            <>
                <label htmlFor="requisicao">
                    Requisição de Produto:<br />
                    <textarea {...register("requisicao", {
                        required: "O campo requisição é obrigatório.",
                        validate: {
                            maxLength: (value) => value.length <= 300 || "O campo requisição não é válido. Deve ter 1000 ou menos caracteres.",
                        }
                    })} maxLength={1000} className="textArea" type="textarea"></textarea>
                </label>
                <br />
                <label htmlFor="justificativa">
                    Justificativa:<br />
                    <textarea {...register("justificativa", {
                        validate: {
                            maxLength: (value) => value.length <= 1000 || "O campo justificativa não é válido. Deve ter 1000 ou menos caracteres.",
                        }
                    })} className="textArea" type="textarea"></textarea>
                </label>
                <br />
                <label htmlFor="quantidade">
                    Quantidade:<br />
                    <input type="number" {...register("quantidade", {
                        validate: {
                            validate: (value) => regexNumber.test(value) || "O campo quantidade é inválido.",
                            min: (value) => value > 0 || "Quantidade deve ter pelo menos 1.",
                        }
                    })} />
                </label>
                <br />
            </>}
                {auth.userAuth.role === "admin" &&
                <>
                    <label htmlFor="status">
                        Status:<br />
                        <select {...register("status")} className="selectNome">
                            {props.selectedStatus.map((item, idx) => <option key={idx} value={item}>{item}</option>)}
                        </select>
                    </label>
                    <br />
                </>}
                <CrudButtonsElements>
                    {auth.userAuth.role === "user" && <label>
                        <input type="submit" value="Criar" size={100} />
                        <img src="./src/assets/add.svg" />
                    </label>}
                    {auth.userAuth.role === "admin" && <label>
                        <input type="button" value="Editar" onClick={handleEdit}/>
                        <img src="./src/assets/edit.svg" />
                    </label>}
                    <label>
                        <input type="button" value="Remover" onClick={handleRemove} />
                        <img src="./src/assets/remove.svg" />
                    </label>
                </CrudButtonsElements>
            </FormCrud>
            <div>
                {(errors.requisicao?.message) && (
                    <ErrorSection>{errors.requisicao.message}</ErrorSection>
                )}
                {errors.justificativa?.message && (
                    <ErrorSection>{errors.justificativa.message}</ErrorSection>
                )}
                {errors.quantidade?.message && (
                    <ErrorSection>{errors.quantidade.message}</ErrorSection>
                )}
                {errors.status?.message && (
                    <ErrorSection>{errors.status.message}</ErrorSection>
                )}
            </div>
        </div>
    );

};

export default FormRequisicoes;