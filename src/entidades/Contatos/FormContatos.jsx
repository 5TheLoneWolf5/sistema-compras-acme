import { useForm } from "react-hook-form";
import styled from "styled-components";
import { insertContato } from "./CrudContatos";
import { useEffect, useState } from "react";
import { listFornecedores } from "../Fornecedores/CrudFornecedores";
import { regexEmail, regexNumber } from "../../utils/regex";

const Form = styled.form`
    width: 250px;
    margin: auto;
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
    margin: auto;
    width: 150px;
    border: 5px red solid;
    background-color: #f59987;
    padding: 10px;
    font-weight: bold;
    margin-top: 20px;
`;

const FormContatos = (props) => {

    const { register, handleSubmit, formState: { errors, isSubmitted }, reset, setValue, getValues, setError } = useForm();
    const [options, setOptions] = useState([]);
    const [fornecedorRef, setFornecedorRef] = useState({});

    const submitFunctionality = async (data) => {
        await insertContato(data);
        reset();
    };

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

    const handleNome = (e) => {

        setFornecedorRef(JSON.parse(e.target.value)["0"]);

        if (getValues("nome") === "Default") {
            setError("nome", {
                type: "Erro default: Nome não selecionado.",
                message: "Nome do fornecedor não foi selecionado."
            });
        }

    }

    

    return (
        <div>
            <Form onSubmit={handleSubmit(submitFunctionality)}>
                <label htmlFor="nome">
                    Nome:<br />
                    <select {...register("nome", {
                        required: "Nome é obrigatório",
                        validate: {
                            minLength: (value) => value.length >= 2 || "Nome tem que ter pelo menos 2 caracteres.",
                            maxLength: (value) => value.length <= 50 || "Nome tem que ter pelo menos 2 caracteres.",
                        },
                        onChange: handleNome,
                    })} defaultValue={"Default"}>
                        <option value="Default" disabled >Selecione...</option>
                        {options.map(item => item)}
                    </select>
                </label>
                <br />
                <label htmlFor="email">
                    Email:<br />
                    <input {...register("email", {
                        required: "Email é obrigatório",
                        validate: {
                            minLength: (value) => value.length >= 2 || "Nome tem que ter pelo menos 2 caracteres",
                            maxLength: (value) => value.length <= 50 || "Nome tem que ter pelo menos 2 caracteres",
                            matchPattern: (value) => regexEmail.test(value) || "Email não é válido.",
                        },
                    })} />
                </label>
                <br />
                <label htmlFor="numero">
                    Número:<br />
                    <input {...register("numero", {
                        required: "Número é obrigatório",
                        validate: {
                            minLength: (value) => value.length >= 2 || "Nome tem que ter pelo menos 2 caracteres",
                            maxLength: (value) => value.length <= 50 || "Nome tem que ter pelo menos 2 caracteres",
                            matchPattern: (value) => regexNumber.test(value) || "Número não é válido.",
                        },
                    })} />
                </label>
                <label htmlFor="idFornecedor" style={{display: "none"}}>
                    <input {...register("idFornecedor", { })} value={fornecedorRef} />
                </label>
                <br />
                <CrudButtons>
                    <label>
                        <input type="submit" value="Criar" size={100} />
                        <img src="./src/assets/add.svg" />
                    </label>
                    <label>
                        <input type="button" value="Editar"/>
                        <img src="./src/assets/edit.svg" />
                    </label>
                    <label>
                        <input type="button" value="Remover"/>
                        <img src="./src/assets/remove.svg" />
                    </label>
                </CrudButtons>
            </Form>
            <div>
                {(errors.nome?.message) && (
                    <ErrorSection>{errors.nome?.message}</ErrorSection>
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