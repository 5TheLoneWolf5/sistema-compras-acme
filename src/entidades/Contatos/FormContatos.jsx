import { useForm } from "react-hook-form";
import styled from "styled-components";
import { insertContato, obtainContato, removeContato, updateContato } from "./CrudContatos";
import { useEffect, useState } from "react";
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

            if (props.selectedData && !isSubmitted) {
                const contato = await obtainContato(props.selectedData);
                // document.querySelector(".selectNome").innerHTML = <option>{contato.nome}</option>;
                // setValue("id", props.selectedData);
                setValue("nome", '{"0": "' + contato.idFornecedor + '", "1": "' + contato.nome + '"}');
                setValue("email", contato.email);
                setValue("numero", contato.numero);
                setValue("idFornecedor", contato.idFornecedor);
                // console.log(getValues("nome"));
            } else {
                reset();
            }

        };

        fillFields();


    }, [props.selectedData]);

    const validateContatos = () => {

        ///// My own validations. /////

        /* This way, I can control the flow of validations (how I want the tests to be done [its logic], and when).
           Conditionals are stacked on top of each other so there's an else. */
           
        const [nome, email, numero] = [getValues("nome"), getValues("email"), getValues("numero")];
        
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
            await insertContato(data);
            props.setSelectedData(data.id);
            // reset();
        }

    };

    // const handleNome = (e) => {

    //     const id = JSON.parse(e.target.value)["0"];

    //     setFornecedorRef(id);

    // };

    const handleEdit = async () => {

        if (props.selectedData) {

            console.log(getValues());

            const values = getValues();
            // console.log(values);
            values.id = props.selectedData;
            // console.log(values);

            await updateContato(values);
            props.setSelectedData("");

        } else {
            console.log("Dado não selecionado para ser atualizado.");
        }


    };

    const handleRemove = async () => {

        if (props.selectedData) {
            await removeContato(props.selectedData);
            props.setSelectedData("");
        } else {
            console.log("Dado não selecionado para ser removido.");
        }

    };

    return (
        <div>
            <Form onSubmit={handleSubmit(handleCreate)}>
                <label htmlFor="nome">
                    Nome:<br />
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
                    <input {...register("numero")} />
                </label>
                <label htmlFor="idFornecedor">
                    <input {...register("idFornecedor")} type="hidden" />
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