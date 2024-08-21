import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useEffect } from "react";
import { insertFornecedor, obtainFornecedor, removeFornecedor, updateFornecedor } from "./CrudFornecedores";
import ErrorSection from "../../componentes/ErrorSection";
import CrudButtons from "../../componentes/CrudButtons";
import FormCrud from "../../componentes/FormCrud";

const FormFornecedores = (props) => {

    const { register, handleSubmit, formState: { errors, isSubmitted }, reset, setValue, getValues, setError } = useForm();

    useEffect(() => {

        // console.log(props.selectedData);
        
        const fillFields = async () => {

            /* Since I'm retrieving data from the server, it's important to note:
            - Input fields have no ID. This is generated automatically by firebase in the server. Which means that, when edited, the fields themselves don't have a reference to that specific row. This only happens because of the ID brought by the selection in the data table.
            - The value "nome" automatically selects the correct option because the value set shares the same data.
            - React Data Table gets its data directly from firebase, which means it has access to the ID field and all the others. */

            if (props.selectedData === "Criando...") {

                console.log("Criando dado - condição especial para criação de novos documentos.");

            }
            else if (props.selectedData && !isSubmitted) {

                const fornecedor = await obtainFornecedor(props.selectedData);
                setValue("nome", fornecedor.nome);
                setValue("nomePessoa", fornecedor.nomePessoa);
                setValue("setor", fornecedor.setor);
                setValue("observacoes", fornecedor.observacoes);

            } else {
                reset();
            }

        };

        fillFields();


    }, [props.selectedData]);

    const validateFornecedores = () => {
           
        const setor = getValues("setor");
        const nomePessoa = getValues("nomePessoa");

        if (setor === "Default") {

            setError("setor", {
                type: "Erro default: Setor não selecionado.",
                message: "Setor não foi selecionado."
            });
            
        } else if (!(nomePessoa.length >= 2 && nomePessoa.length <= 30) && nomePessoa !== "") {

            setError("nomePessoa", {
                type: "Erro:  Campo nome da pessoa é inválido.",
                message: "O campo nome da pessoa não é válido. Deve ter pelo menos mais ou o mesmo que 2 caracteres e ir até ou igual 30 a caracteres."
            });

        } else {

            return true;

        }

        return false;

    };

    const handleCreate = async (data) => {

         if (validateFornecedores()) {

            props.setSelectedData("Criando...");
            const idFirebase = await insertFornecedor(data); // If ID is needed.
            props.setSelectedData("");
            // props.setToggleClearRows(true);
        }

    };

    const handleEdit = async () => {

        if (props.selectedData) {

            // console.log(getValues());

            const values = getValues();
            // console.log(values);
            values.id = props.selectedData;
            // console.log(values);

            await updateFornecedor(values);
            props.setSelectedData("");
            props.setToggleClearRows(true);

        } else {
            console.log("Dado não selecionado para ser atualizado.");
        }


    };

    const handleRemove = async () => {

        if (props.selectedData) {
            await removeFornecedor(props.selectedData);
            props.setSelectedData("");
            // props.setToggleClearRows(true);
        } else {
            console.log("Dado não selecionado para ser removido.");
        }

    };

    return (
        <div style={{flexGrow: "1"}}>
            <FormCrud onSubmit={handleSubmit(handleCreate)}>
                <label htmlFor="nome">
                    Nome da Empresa:<br />
                    <input {...register("nome", {
                    required: "Nome da empresa é obrigatório.", 
                    validate: {
                        minLength: (value) => value.length >= 2 || "O campo nome da empresa não é válido. Deve ter pelo menos mais de 2 caracteres.",
                        maxLength: (value) => value.length <= 50 || "O campo nome da empresa não é válido. Deve ter 50 ou menos caracteres.",
                    }})} maxLength={50} />
                </label>
                <br />
                <label htmlFor="nomePessoa">
                    Nome da Pessoa:<br />
                    <input {...register("nomePessoa")} maxLength={30} />
                </label>
                <br />
                <label htmlFor="setor">
                    Setor:<br />
                    <select defaultValue={"Default"} {...register("setor")}>
                        <option value="Default" disabled>Selecione...</option>
                        <option value="Hardware">Hardware</option>
                        <option value="Software">Software</option>
                        <option value="Móveis">Móveis</option>
                        <option value="Decoração">Decoração</option>
                        <option value="Papelaria">Papelaria</option>
                        <option value="Limpeza">Limpeza</option>
                        <option value="Outro">Outro</option>
                    </select>
                </label>
                <br />
                <label htmlFor="observacoes">
                    Observações:<br />
                    <textarea {...register("observacoes", {
                        validate: {
                            maxLength: (value) => value.length <= 1000 || "O campo de observações não é válido. Deve ter 1000 ou menos caracteres.",
                        }
                    })} maxLength={1000} className="textArea" type="textarea" />
                </label>
                <br />
                <CrudButtons functionedit={handleEdit} functionremove={handleRemove} />
            </FormCrud>
            <div>
                {(errors.nome?.message) && (
                    <ErrorSection>{errors.nome.message}</ErrorSection>
                )}
                {errors.nomePessoa?.message && (
                    <ErrorSection>{errors.nomePessoa.message}</ErrorSection>
                )}
                {errors.setor?.message && (
                    <ErrorSection>{errors.setor.message}</ErrorSection>
                )}
                {errors.observacoes?.message && (
                    <ErrorSection>{errors.setor.observacoes}</ErrorSection>
                )}
            </div>
        </div>
    );

};

export default FormFornecedores;