import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { insertProduto, obtainProduto, removeProduto, updateProduto } from "./CrudProdutos";
import ErrorSection from "../../componentes/ErrorSection";
import CrudButtons from "../../componentes/CrudButtons";
import FormCrud from "../../componentes/FormCrud";

const FormProdutos = (props) => {

    const { register, handleSubmit, formState: { errors, isSubmitted }, reset, setValue, getValues, setError } = useForm();
    // const [optionsFornecedores, setOptionsFornecedores] = useState([]);

    // useEffect(() => {

    //     const generateFornecedores = async () => {

    //         const data = await listFornecedores();
    //         let result = [];
    
    //         for (let item in data) {
                
    //             result.push(<option value={'{"0": "' + data[item]["id"] + '", "1": "' + data[item]["nome"] + '"}'} key={data[item]["id"]}>{data[item]["nome"]}</option>);
    //             // console.log(result);
    //         }
    
    //         // Object.keys(data).map((item, idx) => <option>{data[item]["nome"]}</option>);

    //         setOptionsFornecedores(result);
    
    //     };

    //     generateFornecedores();

    // }, []);

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
                
                const produto = await obtainProduto(props.selectedData);
                setValue("produto", produto.produto);
                // setValue("fornecedor", '{"0": "' + produto.idFornecedor + '", "1": "' + produto.fornecedor + '"}');
                setValue("descricao", produto.descricao);

            } else {
                reset();
            }

        };

        fillFields();


    }, [props.selectedData]);

    const validateProdutos = () => {
           
        const fornecedor = getValues("fornecedor");

        if (fornecedor === "Default") {

            setError("setor", {
                type: "Erro default: Fornecedor não selecionado.",
                message: "Fornecedor não foi selecionado."
            });
            
        } else {

            return true;

        }

        return false;

    };

    const handleCreate = async (data) => {

         if (validateProdutos()) {

            props.setSelectedData("Criando...");
            const idFirebase = await insertProduto(data); // If ID is needed.
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

            await updateProduto(values);
            props.setSelectedData("");
            props.setSelectedRow((item) => !item);

        } else {
            console.log("Dado não selecionado para ser atualizado.");
        }


    };

    const handleRemove = async () => {

        if (props.selectedData) {
            await removeProduto(props.selectedData);
            props.setSelectedData("");
            props.setSelectedRow((item) => !item);
        } else {
            console.log("Dado não selecionado para ser removido.");
        }

    };

    return (
        <div style={{flexGrow: "1"}}>
            <FormCrud onSubmit={handleSubmit(handleCreate)}>
                <label htmlFor="produto">
                    Produto:<br />
                    <input {...register("produto", {
                    required: "Nome do produto é obrigatório.", 
                    validate: {
                        minLength: (value) => value.length >= 2 || "O campo nome do produto não é válido. Deve ter pelo menos mais de 1 caracteres.",
                        maxLength: (value) => value.length <= 100 || "O campo nome do produto não é válido. Deve ter 100 ou menos caracteres.",
                    }})} maxLength={100} />
                </label>
                <br />
                {/* <label htmlFor="fornecedor">
                    Fornecedor:<br />
                    <select defaultValue={"Default"} {...register("fornecedor", {
                        required: "Fornecedor é obrigatório.",
                    })}>
                        <option value="Default" disabled>Selecione...</option>
                        {optionsFornecedores}
                    </select>
                </label>
                <br /> */}
                <label htmlFor="descricao">
                    Descrição:<br />
                    <textarea {...register("descricao", {
                        validate: {
                            maxLength: (value) => value.length <= 1000 || "O campo descrição não é válido. Deve ter 1000 ou menos caracteres.",
                        }
                    })} maxLength={1000} className="textArea" type="textarea"></textarea>
                </label>
                <br />
                <CrudButtons functionedit={handleEdit} functionremove={handleRemove} />
            </FormCrud>
            <div>
                {(errors.produto?.message) && (
                    <ErrorSection>{errors.produto.message}</ErrorSection>
                )}
                {/* {errors.fornecedor?.message && (
                    <ErrorSection>{errors.fornecedor.message}</ErrorSection>
                )} */}
                {errors.descricao?.message && (
                    <ErrorSection>{errors.descricao.message}</ErrorSection>
                )}
            </div>
        </div>
    );

};

export default FormProdutos;