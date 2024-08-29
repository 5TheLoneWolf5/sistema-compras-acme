import styled from "styled-components";

const LabelAuthElement = styled.label`

    background-color: white;
    display: flex;

`;

const LabelAuth = (props) => {
    
    return (
        <LabelAuthElement {...props}>
            {props.children}
        </LabelAuthElement>
    );

};

export default LabelAuth;