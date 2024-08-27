import styled from "styled-components";

const FormCrudElement = styled.form`

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

const FormCrud = (props) => {
    
    return (
        <FormCrudElement {...props}>
            {props.children}
        </FormCrudElement>
    );

};

export default FormCrud;