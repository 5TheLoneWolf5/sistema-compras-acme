import styled from "styled-components";

const FormAuthElement = styled.form`

    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;

    & > * {
        padding: 5px;
    }

    & > label > * {

        width: 100%;
        padding: 15px;
        border: 0px;
        border-bottom: 1px solid gray;
        font-size: 14px;

    }

    & > label > * {
        background-color: #f5f5f5;
    }
    
`;

const FormAuth = (props) => {

    return (
        <FormAuthElement {...props}>
            {props.children}
        </FormAuthElement>
    );

};

export default FormAuth;