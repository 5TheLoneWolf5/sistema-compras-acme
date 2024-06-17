import { useForm } from "react-hook-form";
import styled from "styled-components";

const Form = styled.form`

`;

const ErrorSection = styled.div`

`;

const FormContatos = (props) => {

    const { register, handleSubmit, formState: { errors, isSubmitted }, reset, setValue } = useForm();

    const submitFunctionality = (data) => {

    };

    return (
        <div>
            <Form onSubmit={handleSubmit(submitFunctionality)}>

            </Form>
            <ErrorSection>

            </ErrorSection>
        </div>
    );

};

export default FormContatos;