import styled from "styled-components";

const ContainerFormAuthElement = styled.div`

    width: 100%;
    height: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.7);
    padding: 55px;
    border-radius: 5px;
    margin: 15px;

    @media (min-width: ${(props) => props.sizes.small}) {
        width: ${(props) => props.sizes.small};
        margin-right: auto;
    }

`;

const ContainerFormAuth = (props) => {
    return (
        <ContainerFormAuthElement {...props}>
            {props.children}
        </ContainerFormAuthElement>
    );

};

export default ContainerFormAuth;