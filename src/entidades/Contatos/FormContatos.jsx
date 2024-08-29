import { useForm } from "react-hook-form";
import styled from "styled-components";
import { insertContato, obtainContato, removeContato, updateContato } from "./CrudContatos";
import { useEffect, useState } from "react";
import { listFornecedores } from "../Fornecedores/CrudFornecedores";
import { regexEmail, regexNumber } from "../../utils/regex";
import ErrorSection from "../../componentes/ErrorSection";
import CrudButtons from "../../componentes/CrudButtons";
import FormCrud from "../../componentes/FormCrud";

const FormContatos = (props) => {

    const { register, handleSubmit, formState: { errors, isSubmitted }, reset, setValue, getValues, setError } = useForm();
    const [options, setOptions] = useState([]);
    // const [fornecedorRef, setFornecedorRef] = useState({});

    useEffect(() => {

        const generateOptions = async () => {

            const data = await listFornecedores();
            let result = [];
    
            for (let item in data) {

                result.push(<option value={'{"0": "' + data[item]["id"] + '", "1": "' + data[item]["nome"] + '"}'} key={data[item]["id"]}>{data[item]["nome"]}</option>);
                // console.log(result);
            }
    
            // Object.keys(data).map((item, idx) => <option>{data[item]["nome"]}</option>);
    
            setOptions(result);
    
        };

        generateOptions();
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
                const contato = await obtainContato(props.selectedData);
                // document.querySelector(".selectNome").innerHTML = <option>{contato.nome}</option>;

                // ID does not change or has a field. It continues to be the same, and the reference exists in the selectedData, retrieved from the Data Table (which gets data from firebase, but only renders the chosen fields).
                // setValue("id", props.selectedData);
                setValue("nome", '{"0": "' + contato.idFornecedor + '", "1": "' + contato.nome + '"}');
                setValue("email", contato.email);
                setValue("numero", contato.numero);
                // setValue("idFornecedor", contato.idFornecedor);
                // console.log(getValues("nome"));
            } else {
                // props.setToggleClearRows(true); // Because it is in useEffect.
                reset(); // When selectedData is empty (unselected), the form is reset.
            }

        };

        fillFields();


    }, [props.selectedData]);

    const validateContatos = () => {

        ///// My own validations. /////

        /* This way, I can control the flow of validations (how I want the tests to be done [its logic], and when).
           Conditionals are stacked on top of each other so there's an else. */
        
        const [nome, email, numero] = [getValues("nome"), getValues("email"), String(getValues("numero"))];
        
        // console.log(nome, email, numero);
        // console.log(regexEmail.test(email), regexNumber.test(numero));

        if (nome === "Default") {

            setError("nome", {
                type: "Erro default: Nome não selecionado.",
                message: "Nome do fornecedor não foi selecionado."
            });
            
        } else if (email === "" && numero === "") {

            setError("email", {
                type: "Erro: email e número vazios.",
                message: "Pelo menos um email ou número de contato é obrigatório."
            });

        } else if (!regexEmail.test(email) && email !== "") {

            setError("email", {
                type: "Erro: email inválido.",
                message: "Este email não é válido."
            });

            // minLength: (value) => value.length >= 5 || "Email tem que ter pelo menos 5 caracteres",
            // maxLength: (value) => value.length <= 50 || "Email tem que ter pelo menos 50 caracteres",

        } else if (!regexNumber.test(numero) && numero !== "") {

            setError("numero", {
                type: "Erro: número inválido.",
                message: "Este número não é válido."
            });

            // minLength: (value) => value.length >= 8 || "Número tem que ter pelo menos 8 números",
            // matchPattern: (value) => regexNumber.test(value) || "Número não é válido.",
        } else {

            return true;

        }

        return false;

    };

    const handleCreate = async (data) => {
        
         if (validateContatos()) {
            // Setting a value to selectedData so values get updated when the form data gets wiped out.
            props.setSelectedData("Criando...");
            const idFirebase = await insertContato(data); // Obtaining the ID created by Firebase so the reference is not lost here.
            // It would be used if render were forced regardless if selected is the same as before (this case is happening when document is created and then selected again);
            // props.setSelectedData(idFirebase);
            // reset();
            props.setSelectedData("");
            // props.setToggleClearRows(true);
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

            await updateContato(values);
            props.setSelectedData("");
            props.setSelectedRow((item) => !item);

        } else {
            console.log("Dado não selecionado para ser atualizado.");
        }


    };

    const handleRemove = async () => {

        if (props.selectedData) {
            await removeContato(props.selectedData);
            props.setSelectedData("");
            props.setSelectedRow((item) => !item);
        } else {
            console.log("Dado não selecionado para ser removido.");
        }

    };

    return (
        <div>
            <FormCrud onSubmit={handleSubmit(handleCreate)}>
                <label htmlFor="nome">
                    Nome da Empresa:<br />
                    <select {...register("nome", {
                        required: "Nome é obrigatório",
                    })} defaultValue={"Default"} className="selectNome">
                        <option value="Default" disabled>Selecione...</option>
                        {options.map(item => item)}
                    </select>
                </label>
                <br />
                <label htmlFor="email">
                    Email:<br />
                    <input {...register("email")} />
                </label>
                <br />
                <label htmlFor="numero">
                    Número:<br />
                    <input {...register("numero")} type="number" />
                </label>
                {/* <label htmlFor="idFornecedor">
                    <input {...register("idFornecedor")} type="hidden" />
                </label> */}
                <br />
                <CrudButtons functionedit={handleEdit} functionremove={handleRemove} />
            </FormCrud>
            <div>
                {(errors.nome?.message) && (
                    <ErrorSection>{errors.nome.message}</ErrorSection>
                )}
                {errors.email?.message && (
                    <ErrorSection>{errors.email.message}</ErrorSection>
                )}
                {errors.numero?.message && (
                    <ErrorSection>{errors.numero.message}</ErrorSection>
                )}
            </div>
        </div>
    );

};

export default FormContatos;