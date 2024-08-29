import styled from "styled-components";

const TextBlockElement = styled.span`

    background-color: white;
    padding: 8px 40px;
    margin-top: 20px;

`;

const TextBlock = (props) => {
    
    return (
        <TextBlockElement {...props}>
            {props.children}
        </TextBlockElement>
    );

};

export default TextBlock;