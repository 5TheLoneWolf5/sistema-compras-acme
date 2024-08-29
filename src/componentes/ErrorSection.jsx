import styled from "styled-components";

const ErrorElement = styled.div`
    margin: 15px auto;
    width: 180px;
    border: 5px red solid;
    background-color: #f59987;
    padding: 10px;
    font-weight: bold;
    margin-top: 20px;
`;

const ErrorSection = (props) => {
    // console.log(props.children);
    return (
        <ErrorElement {...props}>
            {props.children}
        </ErrorElement>
    );

};

export default ErrorSection;